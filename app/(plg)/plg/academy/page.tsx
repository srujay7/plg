import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Academy — CommerceIQ Content Agent",
};

const STEPS = [
  {
    n: "01",
    title: "Confirm your topics",
    body:
      "Content Agent resolves your brand to the shopper categories it sells in on Amazon, then proposes the topics it thinks matter most. You can rename, remove, or add topics before anything is scored.",
  },
  {
    n: "02",
    title: "Review your shopper prompts",
    body:
      "Each topic carries a set of real shopper questions — a mix of head, mid-tail, and long-tail phrasing. Keep, edit, or add your own before generation, or accept the smart defaults.",
  },
  {
    n: "03",
    title: "We score every prompt",
    body:
      "Each prompt is submitted to Alexa AI in a fresh session, and we record whether your brand appears, how prominently, and in what position — across every topic.",
  },
  {
    n: "04",
    title: "Your report",
    body:
      "Results roll up by brand, topic, competitor, and individual prompt, plus a one-SKU content teardown with an advisory rewrite — all in the report's tabs.",
  },
];

const METRICS = [
  {
    id: "def-01",
    n: "01",
    title: "Visibility %",
    body:
      "How often a brand shows up at all. At the brand and topic level, it's the share of questions where at least one of the brand's products appears in the assistant's answer.",
    formula: "prompts with the brand ÷ all prompts",
  },
  {
    id: "def-02",
    n: "02",
    title: "Weighted share of voice",
    body:
      "How much of the assistant's attention a brand owns. Products listed earlier count for more, so a top spot is worth far more than a mention near the bottom.",
    formula: "Σ(1 ÷ position) for the brand ÷ Σ(1 ÷ position) for all",
  },
  {
    id: "def-03",
    n: "03",
    title: "Average best position",
    body:
      "Where the best-placed product for a brand typically lands, averaged across questions. Lower is better — position 1 is the top of the list.",
    formula: "avg of best brand position per prompt · lower = better",
  },
];

// Standalone page (not a slide-over) explaining how the product works and the metric
// definitions used throughout the report — linked from the "Academy" button in the top
// header instead of opening an in-page panel.
export default async function AcademyPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;
  // Academy is only ever reached from the finished report (Topbar's Academy link, which
  // passes ?brand=), so "back" should return straight to the report tab rather than
  // restarting the research/topics/prompts curation flow.
  const backHref = `/plg/report?screen=report${brand ? `&brand=${encodeURIComponent(brand)}` : ""}`;

  return (
    <div className="mx-auto max-w-[860px] px-7 py-14">
      <Link
        href={backHref}
        className="mb-8 inline-block text-[13px] font-semibold text-[var(--plg-muted)] hover:text-[var(--plg-indigo)]"
      >
        &larr; Back to report
      </Link>

      <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
        Academy
      </div>
      <h1 className="mt-2 text-[clamp(28px,4vw,38px)] font-bold leading-tight tracking-tight text-[var(--plg-ink)]">
        How Content Agent measures your AI-shelf visibility
      </h1>
      <p className="mt-4 max-w-[64ch] text-base leading-relaxed text-[var(--plg-text2)]">
        A quick walkthrough of how the report gets built, and the exact math behind every
        number you see in it.
      </p>

      <h2 className="mt-12 text-[19px] font-semibold text-[var(--plg-ink)]">How it works</h2>
      <div className="mt-4 flex flex-col gap-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="flex gap-4 rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-5"
          >
            <div className="font-mono text-xs font-medium text-[var(--plg-accent)]">{s.n}</div>
            <div>
              <h3 className="text-[15px] font-semibold text-[var(--plg-ink)]">{s.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--plg-text2)]">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-[19px] font-semibold text-[var(--plg-ink)]">The three metrics</h2>
      <p className="mt-3 max-w-[64ch] text-[14.5px] leading-relaxed text-[var(--plg-text2)]">
        The same three metrics are computed at every level — brand, topic, and prompt. Each
        shopper question is asked in a fresh assistant session, and we record which products it
        surfaces and in what order.
      </p>
      <div className="mt-4 flex flex-col gap-3.5">
        {METRICS.map((d) => (
          <div
            key={d.id}
            id={d.id}
            className="scroll-mt-24 rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-5"
          >
            <div className="font-mono text-xs font-medium text-[var(--plg-accent)]">{d.n}</div>
            <h3 className="mt-2 text-base font-semibold text-[var(--plg-ink)]">{d.title}</h3>
            <p className="mt-2 text-[13.5px] text-[var(--plg-text2)]">{d.body}</p>
            <div className="mt-3 rounded-lg border border-[var(--plg-hair)] bg-[var(--plg-surface)] px-2.5 py-2 font-mono text-xs text-[var(--plg-indigo)]">
              {d.formula}
            </div>
          </div>
        ))}
      </div>
      <div
        id="ai-rank"
        className="mt-5 scroll-mt-24 border-l-[3px] border-[var(--plg-accent)] py-0.5 pl-3.5 text-[12.5px] text-[var(--plg-muted)]"
      >
        Basic surfaces two headline numbers throughout the report —{" "}
        <b className="text-[var(--plg-ink)]">AI Visibility</b> (metric 01) and{" "}
        <b className="text-[var(--plg-ink)]">AI Rank</b>, a single simplification of metrics 02
        and 03. This page shows the full underlying math for transparency.
      </div>
    </div>
  );
}
