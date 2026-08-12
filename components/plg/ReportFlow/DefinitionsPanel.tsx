"use client";

import { cn } from "@/lib/cn";
import { META } from "@/data/plgReportData";

// Slide-over "metric definitions" panel, opened from "What we measure" (tab bar) or any
// per-KPI (i) button. Ported from openDefsPanel()/.defspanel in the report mock.
const DEFS = [
  {
    id: "def-01",
    n: "01",
    title: "Visibility %",
    body: `How often ${META.brand} shows up at all. At the brand and topic level, it's the share of questions where at least one ${META.brand} product appears in ${META.assistant}'s answer.`,
    formula: "prompts with the brand ÷ all prompts",
  },
  {
    id: "def-02",
    n: "02",
    title: "Weighted share of voice",
    body: `How much of ${META.assistant}'s attention ${META.brand} owns. Products listed earlier count for more, so a top spot is worth far more than a mention near the bottom.`,
    formula: "Σ(1 ÷ position) for the brand ÷ Σ(1 ÷ position) for all",
  },
  {
    id: "def-03",
    n: "03",
    title: "Average best position",
    body: `Where the best-placed ${META.brand} product typically lands, averaged across questions. Lower is better — position 1 is the top of the list.`,
    formula: "avg of best brand position per prompt · lower = better",
  },
];

export function DefinitionsPanel({
  open,
  anchor,
  onClose,
}: {
  open: boolean;
  anchor: string | null;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[70] bg-[rgba(4,2,9,.6)] transition-opacity",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[71] flex h-full w-full max-w-[420px] flex-col border-l border-white/10 bg-[#0B0714] shadow-[-30px_0_80px_rgba(0,0,0,.6)] transition-transform duration-250",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-none items-start justify-between gap-3 border-b border-white/10 p-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
              What we measure
            </div>
            <h3 className="mt-1 text-[19px] font-semibold text-[var(--plg-ink)]">Metric definitions</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border border-white/10 text-[var(--plg-muted)] hover:border-[var(--plg-secondary)] hover:text-[var(--plg-secondary)]"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto p-6 pb-8">
          <p className="mb-4.5 text-[13.5px] leading-relaxed text-[var(--plg-muted)]">
            The same three metrics are computed at every level. Each question is asked in a
            fresh {META.assistant} session, and we record which products {META.assistant}{" "}
            surfaces and in what order.
          </p>
          {DEFS.map((d) => (
            <div
              key={d.id}
              id={d.id}
              className={cn(
                "mb-3.5 rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition",
                anchor === d.id && "border-[var(--plg-secondary)] shadow-[0_0_0_3px_rgba(90,175,254,.18)]"
              )}
            >
              <div className="font-mono text-xs font-medium text-[var(--plg-accent)]">{d.n}</div>
              <h3 className="mt-2 text-base font-semibold text-[var(--plg-ink)]">{d.title}</h3>
              <p className="mt-2 text-[13.5px] text-[var(--plg-text2)]">{d.body}</p>
              <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-2 font-mono text-xs text-[var(--plg-indigo)]">
                {d.formula}
              </div>
            </div>
          ))}
          <div className="mt-4 border-l-[3px] border-[var(--plg-accent)] py-0.5 pl-3.5 text-[12.5px] text-[var(--plg-muted)]">
            Basic surfaces two headline numbers throughout this report —{" "}
            <b className="text-[var(--plg-ink)]">AI Visibility</b> (metric 01) and{" "}
            <b className="text-[var(--plg-ink)]">AI Rank</b>, a single simplification of metrics
            02 + 03 (formula TBD — see PRD open questions). This panel shows the full underlying
            math for transparency.
          </div>
        </div>
      </aside>
    </>
  );
}
