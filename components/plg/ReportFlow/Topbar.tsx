"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { REPORT_TABS, type TabKey } from "@/components/plg/ReportFlow/reportTabs";
import { useReportData } from "@/components/plg/ReportFlow/ReportDataContext";

export type ProductScreen = "research" | "topics" | "generatingPrompts" | "prompts" | "wait" | "report";

// Internal-only scenario switch (not a customer-facing control) so anyone reviewing the
// product — including on a Vercel preview, where there's no way to trigger a real "brand
// isn't AI-visible" run — can flip between the two illustrative report states. Drives
// applyScenario() in lib/plg.ts; every report tab that reads from useReportData() (Brand,
// Topic, Prompt) re-derives its mock data from whichever scenario is selected here.
function ScenarioToggle() {
  const { scenario, setScenario } = useReportData();
  const inTop10 = scenario === "in-top-10";
  return (
    <div className="flex flex-none items-center gap-1 rounded-full border border-[rgba(255,255,255,.3)] bg-[rgba(0,0,0,.15)] p-1">
      <span className="pl-1.5 pr-1 text-[9.5px] font-bold uppercase tracking-[.06em] text-[rgba(255,255,255,.55)]">
        Internal only
      </span>
      <button
        onClick={() => setScenario("in-top-10")}
        className={cn(
          "whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition",
          inTop10 ? "bg-white text-[var(--plg-accent)]" : "text-[rgba(255,255,255,.75)] hover:text-white"
        )}
      >
        Top 10
      </button>
      <button
        onClick={() => setScenario("outside-top-10")}
        className={cn(
          "whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition",
          !inTop10 ? "bg-white text-[var(--plg-accent)]" : "text-[rgba(255,255,255,.75)] hover:text-white"
        )}
      >
        Outside top 10
      </button>
    </div>
  );
}

// Single top header for the whole product surface. Before the report exists (research /
// topic / prompt curation), it's just the brand mark — no nav options, since those screens
// run in the foreground as a one-time setup, not a place to jump around. Once the report
// itself is showing, the report's own section tabs (Brand/Topic/Competitors/Prompt/SKU
// teardown) appear here instead — there's no separate tab bar duplicating this header.
export function Topbar({
  screen,
  activeTab,
  onTabChange,
  onPilotClick,
}: {
  screen: ProductScreen;
  brand: string;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  onPilotClick: () => void;
}) {
  const showingReport = screen === "report";
  const [shareOpen, setShareOpen] = useState(false);
  const [shareInput, setShareInput] = useState("");
  const [sharedWith, setSharedWith] = useState<string[]>([]);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleAddRecipient() {
    const val = shareInput.trim();
    if (!val || sharedWith.includes(val)) return;
    setSharedWith((prev) => [...prev, val]);
    setShareInput("");
  }
  return (
    <div className="sticky top-0 z-30 border-b border-[rgba(255,255,255,.12)] bg-[#7A1FB8]">
      {/* Single row, no wrap: the left group (brand + retailer + tabs) scrolls horizontally
          if it's too wide, so the right group (Academy + Request a free pilot) never gets
          pushed onto a second line. */}
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-7 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex flex-none items-center gap-2.5 font-bold tracking-tight text-white">
            <span
              className="h-2.5 w-2.5 rounded-[3px] shadow-[0_0_12px_rgba(255,255,255,.6)]"
              style={{ background: "#ffffff" }}
            />
            CommerceIQ
          </div>
          {showingReport && (
            <>
              <span className="h-5 w-px flex-none bg-[rgba(255,255,255,.25)]" />
              <nav className="flex min-w-0 items-center gap-1 overflow-x-auto">
                {REPORT_TABS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => onTabChange(key)}
                    className={cn(
                      "whitespace-nowrap rounded-lg px-3.5 py-2 text-[13.5px] font-semibold text-[rgba(255,255,255,.75)] hover:bg-[rgba(255,255,255,.12)] hover:text-white",
                      activeTab === key && "bg-[rgba(255,255,255,.22)] text-white"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </>
          )}
        </div>
        <div className="flex flex-none items-center gap-2.5">
          <ScenarioToggle />
          {showingReport && (
            <div className="flex flex-none items-center gap-2">
              <div ref={shareRef} className="relative">
                <button
                  onClick={() => setShareOpen((o) => !o)}
                  title="Share this report"
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-[rgba(255,255,255,.35)] text-[rgba(255,255,255,.8)] hover:border-white hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px]">
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22l-4-9-9-4Z" />
                  </svg>
                </button>
                {shareOpen && (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-[300px] rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-4 shadow-[0_20px_50px_rgba(33,2,53,.18)]">
                    <div className="text-[13px] font-bold text-[var(--plg-ink)]">Share this report</div>
                    <div className="mt-3 flex gap-1.5">
                      <input
                        value={shareInput}
                        onChange={(e) => setShareInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddRecipient()}
                        placeholder="Email or user ID"
                        className="flex-1 rounded-[6px] border border-[var(--plg-hair)] bg-[var(--plg-surface)] px-2.5 py-1.5 text-[13px] text-[var(--plg-ink)] outline-none focus:border-[var(--plg-secondary)]"
                      />
                      <button
                        onClick={handleAddRecipient}
                        className="flex-none rounded-[6px] bg-[var(--plg-accent)] px-3 py-1.5 text-[13px] font-semibold text-white hover:brightness-105"
                      >
                        Share
                      </button>
                    </div>
                    {sharedWith.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {sharedWith.map((who) => (
                          <li
                            key={who}
                            className="flex items-center justify-between gap-2 rounded-[6px] bg-[var(--plg-surface)] px-2.5 py-1.5 text-[12.5px] text-[var(--plg-text2)]"
                          >
                            <span className="truncate">{who}</span>
                            <span className="flex-none text-[var(--plg-good)]">✓ Shared</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={onPilotClick}
                className="whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-[var(--plg-accent)] shadow-[0_6px_20px_rgba(0,0,0,.18)] transition hover:brightness-105"
              >
                Request a free pilot
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
