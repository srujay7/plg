"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { META, PROMPTS } from "@/data/plgReportData";
import { topicsFromPrompts } from "@/lib/plg";
import { BrandTab } from "@/components/plg/ReportFlow/tabs/BrandTab";
import { TopicTab } from "@/components/plg/ReportFlow/tabs/TopicTab";
import { PromptTab } from "@/components/plg/ReportFlow/tabs/PromptTab";
import { TeardownTab } from "@/components/plg/ReportFlow/tabs/TeardownTab";

type TabKey = "brand" | "topic" | "prompt" | "teardown";

const TABS: { key: TabKey; idx: string; label: string }[] = [
  { key: "brand", idx: "01", label: "By brand" },
  { key: "topic", idx: "02", label: "By topic" },
  { key: "prompt", idx: "03", label: "By prompt" },
  { key: "teardown", idx: "04", label: "SKU teardown" },
];

// The report itself (PLG-06b/07): hero, revenue-at-risk band, 4 tabs, standing pilot/upgrade
// CTAs, and the footer. Ported from the #reportscreen markup + activate()/#risk-figure fills.
export function ReportView({
  onOpenDefs,
  onPilotClick,
  onUpgradeClick,
}: {
  onOpenDefs: (anchor: string) => void;
  onPilotClick: () => void;
  onUpgradeClick: () => void;
}) {
  const [tab, setTab] = useState<TabKey>("brand");
  const total = PROMPTS.length;
  const topicCount = topicsFromPrompts(PROMPTS).length;

  return (
    <div>
      <header className="px-7 pb-6.5 pt-11">
        <div className="mx-auto max-w-[1120px]">
          <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
            Answer engine optimization &middot; {META.retailerLabel}
          </div>
          <h1 className="mt-2 max-w-[20ch] text-[clamp(30px,4.4vw,46px)] font-bold leading-[1.05] tracking-tight text-[var(--plg-ink)]">
            How shoppers find <span className="text-[var(--plg-secondary)]">{META.brand}</span> when
            they ask {META.assistant}
          </h1>
          <p className="mt-4 max-w-[64ch] text-[17px] text-[var(--plg-text2)]">
            {META.assistant}, Amazon&rsquo;s AI shopping assistant, answers shoppers in its own
            words and points them to a short list of products. This report shows where{" "}
            <span className="font-semibold text-[var(--plg-secondary)]">{META.brand}</span> shows
            up in those answers across {total} real shopper questions — at the brand, topic, and
            question level.
          </p>
          <div className="mt-5.5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[12.5px] font-medium text-[var(--plg-ink)]">
              Retailer &middot; <b className="text-[var(--plg-indigo)]">{META.retailerLabel}</b>
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[12.5px] font-medium text-[var(--plg-ink)]">
              Prompts tracked &middot; <b className="text-[var(--plg-indigo)]">{total}</b>
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[12.5px] font-medium text-[var(--plg-ink)]">
              Topics &middot; <b className="text-[var(--plg-indigo)]">{topicCount}</b>
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[12.5px] font-medium text-[var(--plg-ink)]">
              Run date &middot; <b className="text-[var(--plg-indigo)]">{new Date(META.runDate + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</b>
            </span>
          </div>
        </div>
      </header>

      <div className="border-y border-[rgba(90,175,254,.25)] bg-[linear-gradient(135deg,rgba(90,175,254,.28)_0%,rgba(31,34,178,.55)_55%,rgba(90,175,254,.22)_100%)] bg-[var(--plg-bg)] text-white">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-6 px-7 py-8.5">
          <div className="min-w-[280px] flex-1">
            <div className="text-xs font-semibold uppercase tracking-[.14em] text-[#D6ECFF]">
              Revenue at risk &middot; AEO/chatbot traffic &middot; PLG-05
            </div>
            <div className="mt-2 text-[clamp(32px,4.2vw,46px)] font-bold leading-none tracking-tight">
              $1.2M–$1.8M
              <span className="ml-3 rounded-full bg-white/[0.16] px-2.5 py-1 align-middle text-[13px] font-semibold">
                Estimate
              </span>
            </div>
            <div className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[#E4F1FF]">
              Both shoppers who ask {META.assistant} directly and AI shopping agents that query
              it on their behalf only buy what {META.assistant} cites. This is the annualized
              revenue {META.brand} may be losing across your {topicCount} selected topics because
              it isn&rsquo;t consistently cited.
              <span className="mt-2 block text-[11.5px] italic text-[#C3DFFF]">
                Method: AI Visibility/Rank gap × category query volume (SQP) × conversion × AOV —
                scoped to {META.assistant} (AEO/chatbot) traffic only, not total brand revenue.
                Directional, not measured — see PLG-05.
              </span>
            </div>
          </div>
          <div className="flex min-w-[200px] flex-col gap-2.5">
            <button
              onClick={onPilotClick}
              className="rounded-[10px] bg-white px-5 py-3.5 text-sm font-bold text-[#1E1030] hover:opacity-90"
            >
              Start a 45-day pilot
            </button>
            <button
              onClick={onUpgradeClick}
              className="rounded-[10px] border-[1.5px] border-white/50 px-5 py-3.5 text-sm font-bold text-white"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-[25] border-b border-white/10 bg-[rgba(9,5,16,.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-7">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "whitespace-nowrap border-b-[2.5px] border-transparent px-5 py-4.5 text-[15px] font-semibold tracking-tight text-[var(--plg-muted)] hover:text-[var(--plg-ink)]",
                  tab === t.key && "border-[var(--plg-accent)] text-[var(--plg-ink)]"
                )}
              >
                <span className="mr-2 font-mono text-xs text-[var(--plg-gap)]">{t.idx}</span>
                {t.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => onOpenDefs("")}
            className="flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 px-3 py-1.5 text-[12.5px] font-semibold text-[var(--plg-muted)] hover:border-[var(--plg-secondary)] hover:text-[var(--plg-secondary)]"
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-current text-[9px] font-bold italic">
              i
            </span>
            <span className="hidden sm:inline">What we measure</span>
          </button>
        </div>
      </div>

      <div className="plg-fade-in">
        {tab === "brand" && <BrandTab onOpenDefs={onOpenDefs} />}
        {tab === "topic" && <TopicTab />}
        {tab === "prompt" && <PromptTab />}
        {tab === "teardown" && <TeardownTab />}
      </div>

      <div className="border-y border-[rgba(90,175,254,.22)] bg-[linear-gradient(135deg,rgba(90,175,254,.14),rgba(90,175,254,.08))] py-10 text-center">
        <div className="mx-auto max-w-[1120px] px-7">
          <h3 className="text-xl font-semibold text-[var(--plg-ink)]">Ready to act on these gaps?</h3>
          <p className="mx-auto my-2 max-w-[52ch] text-sm text-[var(--plg-text2)]">
            Every tier includes a 45-day Content Agent pilot — the on-ramp to full catalog
            optimization.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={onPilotClick}
              className="rounded-[10px] bg-gradient-to-r from-[var(--plg-accent)] to-[var(--plg-secondary)] px-6 py-3.5 text-sm font-bold text-[#0B041A] shadow-[0_6px_20px_rgba(90,175,254,.35)]"
            >
              Request a pilot
            </button>
            <button
              onClick={onUpgradeClick}
              className="rounded-[10px] border-[1.5px] border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-[var(--plg-ink)]"
            >
              Talk to sales about Pro
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 px-7 py-11">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-start justify-between gap-6">
          <div className="flex items-center gap-2.5 font-bold tracking-tight text-[var(--plg-ink)]">
            <span
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{
                background:
                  "conic-gradient(from 210deg,var(--plg-accent),var(--plg-indigo),var(--plg-secondary),var(--plg-accent))",
              }}
            />
            CommerceIQ
          </div>
          <div className="max-w-[60ch] text-[12.5px] text-[var(--plg-muted)]">
            <b className="text-[var(--plg-ink)]">Methodology.</b> Measured on {META.retailerLabel}{" "}
            via the Content Agent AEO skill. Each of the {total} shopper prompts is submitted in a
            fresh {META.assistant} session so earlier questions don&rsquo;t influence the answer;
            positions and share are recorded per response.
            <br />
            Data run: <b className="text-[var(--plg-ink)]">{META.runDate}</b>. Brand: {META.brand}.
          </div>
        </div>
        <div className="mt-5.5 text-[11.5px] tracking-[.04em] text-[var(--plg-gap)]">
          Prepared for {META.company} &middot; Contains {META.company} performance data &middot;
          Confidential
        </div>
      </footer>
    </div>
  );
}
