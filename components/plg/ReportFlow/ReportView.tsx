"use client";

import { META, PROMPTS } from "@/data/plgReportData";
import type { TabKey } from "@/components/plg/ReportFlow/reportTabs";
import { BrandTab } from "@/components/plg/ReportFlow/tabs/BrandTab";
import { TopicTab } from "@/components/plg/ReportFlow/tabs/TopicTab";
import { CompetitorsTab } from "@/components/plg/ReportFlow/tabs/CompetitorsTab";
import { PromptTab } from "@/components/plg/ReportFlow/tabs/PromptTab";
import { TeardownTab } from "@/components/plg/ReportFlow/tabs/TeardownTab";
import { PricingTab } from "@/components/plg/ReportFlow/tabs/PricingTab";

// The report itself (PLG-06b/07): section content for whichever tab is active, standing
// pilot/upgrade CTAs, and the footer. The tab switcher itself now lives in the top Topbar
// (once the report is showing) rather than a second header here — `tab` is controlled by
// the parent (ReportFlow) so both stay in sync.
export function ReportView({
  tab,
  onPilotClick,
  onUpgradeClick,
}: {
  tab: TabKey;
  onPilotClick: () => void;
  onUpgradeClick: () => void;
}) {
  const total = PROMPTS.length;

  return (
    <div>
      <div className="plg-fade-in">
        {tab === "brand" && <BrandTab />}
        {tab === "topic" && <TopicTab />}
        {tab === "competitors" && <CompetitorsTab />}
        {tab === "prompt" && <PromptTab />}
        {tab === "teardown" && <TeardownTab />}
        {tab === "pricing" && <PricingTab onPilotClick={onPilotClick} onUpgradeClick={onUpgradeClick} />}
      </div>

      <div className="border-y border-[rgba(90,175,254,.22)] bg-[linear-gradient(135deg,rgba(90,175,254,.14),rgba(90,175,254,.08))] py-10 text-center">
        <div className="mx-auto max-w-[1120px] px-7">
          <h3 className="text-xl font-semibold text-[var(--plg-ink)]">Ready to act on these gaps?</h3>
          <p className="mx-auto my-2 max-w-[52ch] text-sm text-[var(--plg-text2)]">
            Every tier includes a free 45-day Content Agent pilot — the on-ramp to full catalog
            optimization.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={onPilotClick}
              className="rounded-[10px] bg-gradient-to-r from-[var(--plg-accent)] to-[var(--plg-secondary)] px-6 py-3.5 text-sm font-bold text-[#0B041A] shadow-[0_6px_20px_rgba(90,175,254,.35)]"
            >
              Request a free pilot
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
