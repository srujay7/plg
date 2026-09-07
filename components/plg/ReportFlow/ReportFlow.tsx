"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Topbar, type ProductScreen } from "@/components/plg/ReportFlow/Topbar";
import type { TabKey } from "@/components/plg/ReportFlow/reportTabs";
import { ResearchScreen } from "@/components/plg/ReportFlow/ResearchScreen";
import { TopicsScreen } from "@/components/plg/ReportFlow/TopicsScreen";
import { GeneratingPromptsScreen } from "@/components/plg/ReportFlow/GeneratingPromptsScreen";
import { PromptsScreen } from "@/components/plg/ReportFlow/PromptsScreen";
import { WaitScreen } from "@/components/plg/ReportFlow/WaitScreen";
import { ReportView } from "@/components/plg/ReportFlow/ReportView";
import { TalkToSalesModal } from "@/components/plg/shared/TalkToSalesModal";
import {
  META,
  OB_PREFILLED_TOPICS,
  OB_PROMPT_BANK,
  OB_UNCOVERED_TOPICS,
} from "@/data/plgReportData";
import { syncPromptsForTopics, type CuratedPrompt } from "@/lib/plg";

// Orchestrates the product experience that sits between sign-up and the finished report
// (PLG-03 through PLG-07): Topics -> Prompts -> wait/generating -> the report itself, plus
// the single top Topbar, which shows no nav options until the report itself is showing —
// then it becomes the report's own section tabs.
export function ReportFlow() {
  // The brand entered at sign-up (PLG-01, Screen 4) travels here via ?brand= — falls back to
  // the demo brand when visiting this page directly (e.g. via the nav) without going through
  // sign-up first. The report's own data (KPIs, leaderboard, teardown, etc.) stays tied to
  // the static demo dataset in plgReportData — only the curation-phase masthead/copy uses the
  // real input, since there's no backend yet to regenerate report content per brand.
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand")?.trim() || META.brand;

  // Round-tripping through Academy (or any other page) shouldn't restart the curation flow —
  // ?screen=report (set by Topbar's Academy link, and forwarded by Academy's back link) skips
  // straight to the finished report instead of defaulting to "research".
  const initialScreen = searchParams.get("screen") === "report" ? "report" : "research";
  const [screen, setScreen] = useState<ProductScreen>(initialScreen);
  const [tab, setTab] = useState<TabKey>("brand");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(OB_PREFILLED_TOPICS.slice());
  const [prompts, setPrompts] = useState<CuratedPrompt[]>([]);
  const [modal, setModal] = useState<"pilot" | "upgrade" | null>(null);

  function finishGeneratingPrompts() {
    setPrompts((prev) => syncPromptsForTopics(prev, selectedTopics, OB_PROMPT_BANK, OB_UNCOVERED_TOPICS));
    setScreen("prompts");
  }

  return (
    <div>
      <Topbar
        screen={screen}
        brand={brand}
        activeTab={tab}
        onTabChange={setTab}
        onPilotClick={() => setModal("pilot")}
      />

      {screen === "research" && (
        <ResearchScreen brand={brand} onDone={() => setScreen("topics")} />
      )}

      {screen === "topics" && (
        <TopicsScreen
          brand={brand}
          selectedTopics={selectedTopics}
          onChangeSelected={setSelectedTopics}
          onContinue={() => setScreen("generatingPrompts")}
        />
      )}

      {screen === "generatingPrompts" && (
        <GeneratingPromptsScreen onDone={finishGeneratingPrompts} />
      )}

      {screen === "prompts" && (
        <PromptsScreen
          brand={brand}
          prompts={prompts}
          onChangePrompts={setPrompts}
          onBack={() => setScreen("topics")}
          onGenerate={() => setScreen("wait")}
        />
      )}

      {screen === "wait" && <WaitScreen onDone={() => setScreen("report")} />}

      {screen === "report" && (
        <ReportView
          tab={tab}
          onPilotClick={() => setModal("pilot")}
          onUpgradeClick={() => setModal("upgrade")}
        />
      )}

      {modal === "pilot" && (
        <TalkToSalesModal
          title="Request a free 45-day pilot"
          body="Talk to our sales team — fill out this form and our sales executive will get in touch with you."
          onClose={() => setModal(null)}
        />
      )}
      {modal === "upgrade" && (
        <TalkToSalesModal
          title="Talk to sales about Pro"
          body="Talk to our sales team — fill out this form and our sales executive will get in touch with you."
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
