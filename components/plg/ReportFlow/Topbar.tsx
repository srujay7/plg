"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { REPORT_TABS, type TabKey } from "@/components/plg/ReportFlow/reportTabs";
import { RetailerDropdown } from "@/components/plg/shared/RetailerDropdown";

export type ProductScreen = "research" | "topics" | "generatingPrompts" | "prompts" | "wait" | "report";

// Single top header for the whole product surface. Before the report exists (research /
// topic / prompt curation), it's just the brand mark — no nav options, since those screens
// run in the foreground as a one-time setup, not a place to jump around. Once the report
// itself is showing, the report's own section tabs (Brand/Topic/Competitors/Prompt/SKU
// teardown) appear here instead — there's no separate tab bar duplicating this header.
export function Topbar({
  screen,
  brand,
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
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(7,4,13,.72)] backdrop-blur-xl">
      {/* Single row, no wrap: the left group (brand + retailer + tabs) scrolls horizontally
          if it's too wide, so the right group (Academy + Request a free pilot) never gets
          pushed onto a second line. */}
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-7 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex flex-none items-center gap-2.5 font-bold tracking-tight text-[var(--plg-ink)]">
            <span
              className="h-2.5 w-2.5 rounded-[3px] shadow-[0_0_12px_rgba(90,175,254,.5)]"
              style={{
                background:
                  "conic-gradient(from 210deg,var(--plg-accent),var(--plg-indigo),var(--plg-secondary),var(--plg-accent))",
              }}
            />
            CommerceIQ
          </div>
          {showingReport && <RetailerDropdown />}
          {showingReport && (
            <nav className="flex min-w-0 items-center gap-1 overflow-x-auto">
              {REPORT_TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onTabChange(key)}
                  className={cn(
                    "whitespace-nowrap rounded-lg px-3.5 py-2 text-[13.5px] font-semibold text-[var(--plg-muted)] hover:bg-white/[0.035] hover:text-[var(--plg-ink)]",
                    activeTab === key && "bg-[rgba(90,175,254,.14)] text-[var(--plg-ink)]"
                  )}
                >
                  {label}
                </button>
              ))}
            </nav>
          )}
        </div>
        {showingReport && (
          <div className="flex flex-none items-center gap-2">
            <Link
              href={`/plg/academy?brand=${encodeURIComponent(brand)}`}
              title="Academy"
              className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-white/10 text-[11px] font-bold italic text-[var(--plg-muted)] hover:border-[var(--plg-secondary)] hover:text-[var(--plg-secondary)]"
            >
              i
            </Link>
            <button
              onClick={onPilotClick}
              className="whitespace-nowrap rounded-full bg-gradient-to-r from-[var(--plg-accent)] to-[var(--plg-secondary)] px-3.5 py-2 text-[13px] font-semibold text-[#0B041A] shadow-[0_6px_20px_rgba(90,175,254,.35)] hover:brightness-105"
            >
              Request a free pilot
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
