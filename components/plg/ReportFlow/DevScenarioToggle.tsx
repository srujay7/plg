"use client";

import { useReportData } from "@/components/plg/ReportFlow/ReportDataContext";

// Local-build-only affordance — never rendered in a production build — for previewing the
// "brand isn't in the top 10 / doesn't rank at all" report state (see applyScenario in
// lib/plg.ts) without needing a real audit run that produces that outcome.
export function DevScenarioToggle() {
  const { scenario, setScenario } = useReportData();
  if (process.env.NODE_ENV === "production") return null;

  const inTop10 = scenario === "in-top-10";

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-[var(--plg-hair)] bg-[var(--plg-paper)] px-3 py-2 text-[12px] shadow-[0_8px_24px_rgba(33,2,53,.18)]">
      <span className="font-semibold uppercase tracking-[.06em] text-[var(--plg-muted)]">Dev</span>
      <button
        onClick={() => setScenario("in-top-10")}
        className={`rounded-full px-2.5 py-1 font-semibold transition ${
          inTop10 ? "bg-[var(--plg-indigo-btn)] text-white" : "text-[var(--plg-text2)] hover:bg-[var(--plg-surface-2)]"
        }`}
      >
        In top 10
      </button>
      <button
        onClick={() => setScenario("outside-top-10")}
        className={`rounded-full px-2.5 py-1 font-semibold transition ${
          !inTop10 ? "bg-[var(--plg-indigo-btn)] text-white" : "text-[var(--plg-text2)] hover:bg-[var(--plg-surface-2)]"
        }`}
      >
        Outside top 10
      </button>
    </div>
  );
}
