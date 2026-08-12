"use client";

import { useState } from "react";
import { Topbar, type ProductScreen } from "@/components/plg/ReportFlow/Topbar";
import { TopicsScreen } from "@/components/plg/ReportFlow/TopicsScreen";
import { PromptsScreen } from "@/components/plg/ReportFlow/PromptsScreen";
import { WaitScreen } from "@/components/plg/ReportFlow/WaitScreen";
import { ReportView } from "@/components/plg/ReportFlow/ReportView";
import { DefinitionsPanel } from "@/components/plg/ReportFlow/DefinitionsPanel";
import { TalkToSalesModal } from "@/components/plg/shared/TalkToSalesModal";
import {
  OB_PREFILLED_TOPICS,
  OB_PROMPT_BANK,
  OB_UNCOVERED_TOPICS,
} from "@/data/plgReportData";
import { syncPromptsForTopics, type CuratedPrompt } from "@/lib/plg";

// Orchestrates the product experience that sits between sign-up and the finished report
// (PLG-03 through PLG-07): Topics -> Prompts -> wait/generating -> the report itself, plus
// the persistent Home/Topics/Prompts nav that lets a user jump back into curation any time.
export function ReportFlow() {
  const [screen, setScreen] = useState<ProductScreen>("topics");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(OB_PREFILLED_TOPICS.slice());
  const [customTopics, setCustomTopics] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<CuratedPrompt[]>([]);
  const [defsOpen, setDefsOpen] = useState(false);
  const [defsAnchor, setDefsAnchor] = useState<string | null>(null);
  const [modal, setModal] = useState<"pilot" | "upgrade" | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function goToPromptsFromTopics() {
    setPrompts((prev) => syncPromptsForTopics(prev, selectedTopics, OB_PROMPT_BANK, OB_UNCOVERED_TOPICS));
    setScreen("prompts");
  }

  function handleAddCustomTopic(topic: string) {
    setCustomTopics((prev) => [...prev, topic]);
    setSelectedTopics((prev) => [...prev, topic]);
  }

  function openDefs(anchor: string) {
    setDefsAnchor(anchor || null);
    setDefsOpen(true);
  }

  function flashToast(label: string) {
    setToast(label);
    setTimeout(() => setToast(null), 1200);
  }

  function handleNavigate(next: ProductScreen) {
    if (next === "report" && prompts.length === 0) {
      // Home before a report has ever been generated — treat it the same as finishing setup.
      goToPromptsFromTopics();
      return;
    }
    setScreen(next);
  }

  return (
    <div>
      <Topbar
        screen={screen}
        onNavigate={handleNavigate}
        onCopyLink={() => flashToast("Link copied")}
        onExport={() => flashToast("Exporting…")}
        onShare={() => flashToast("Share dialog")}
        onPilotClick={() => setModal("pilot")}
      />

      {screen === "topics" && (
        <TopicsScreen
          selectedTopics={selectedTopics}
          customTopics={customTopics}
          onChangeSelected={setSelectedTopics}
          onAddCustomTopic={handleAddCustomTopic}
          onContinue={goToPromptsFromTopics}
        />
      )}

      {screen === "prompts" && (
        <PromptsScreen
          prompts={prompts}
          onChangePrompts={setPrompts}
          onBack={() => setScreen("topics")}
          onGenerate={() => setScreen("wait")}
        />
      )}

      {screen === "wait" && <WaitScreen onDone={() => setScreen("report")} />}

      {screen === "report" && (
        <ReportView
          onOpenDefs={openDefs}
          onPilotClick={() => setModal("pilot")}
          onUpgradeClick={() => setModal("upgrade")}
        />
      )}

      <DefinitionsPanel open={defsOpen} anchor={defsAnchor} onClose={() => setDefsOpen(false)} />

      {modal === "pilot" && (
        <TalkToSalesModal
          title="Request a 45-day pilot"
          body="Sales-assisted in v1 — this captures your request and routes it to the CommerceIQ team. No self-serve pilot start yet."
          onClose={() => setModal(null)}
        />
      )}
      {modal === "upgrade" && (
        <TalkToSalesModal
          title="Talk to sales about Pro"
          body="No self-serve payment in v1 — every upgrade CTA routes here. Sales raises your account caps once approved."
          onClose={() => setModal(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[80] rounded-full border border-white/10 bg-[#120B1E] px-4 py-2 text-sm text-[var(--plg-ink)] shadow-lg">
          {toast} ✓
        </div>
      )}
    </div>
  );
}
