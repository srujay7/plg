"use client";

import Link from "next/link";
import { PROMPTS, LEADERBOARD, META } from "@/data/plgReportData";
import { aggregate } from "@/lib/plg";

function InfoDot({ anchor }: { anchor: string }) {
  return (
    <Link
      href={`/plg/academy#${anchor}`}
      title="How this is calculated"
      className="flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full border border-[var(--plg-hair)] text-[10px] font-bold italic text-[var(--plg-muted)] hover:border-[var(--plg-secondary)] hover:text-[var(--plg-secondary)]"
    >
      i
    </Link>
  );
}

// "By brand" tab: KPI trio + narrative read + PLG-06b Alexa AI top-10 leaderboard.
// Ported from the mock's IIFEs building #kpis / #readpts / #brand-takeaway / #leaderboard.
export function BrandTab() {
  const brand = aggregate(PROMPTS);
  const total = PROMPTS.length;
  const shown = brand.shown;
  const rankHi = brand.rank == null ? 0 : Math.round(brand.rank);

  const visX = brand.vis >= 80 ? "almost every" : brand.vis >= 60 ? "most" : "some";
  const shareD =
    brand.sov >= 40
      ? "often the standout product"
      : brand.sov >= 20
      ? "usually one of a few products it highlights"
      : "typically one of several products it names";
  const posD =
    (brand.rank ?? 99) <= 2.5
      ? "near the top of the list, in the first slots shoppers see"
      : (brand.rank ?? 99) <= 4.5
      ? "in the upper-middle of the list"
      : "in the middle of the list rather than the top slots shoppers see first";
  const shareLab = brand.sov >= 40 ? "Strong" : "Modest";
  const posLab = (brand.rank ?? 99) <= 2.5 ? "Top" : (brand.rank ?? 99) <= 4.5 ? "Upper-mid" : "Mid-list";

  const takeaway = `${META.brand} is ${
    brand.vis >= 70 ? "widely recognized" : "selectively surfaced"
  } on ${META.assistant}${(brand.rank ?? 0) > 4 ? ", but rarely in the top few positions" : ""}. The opportunity is ${
    brand.vis >= 70 ? "less about being seen and more about climbing" : "both broader coverage and stronger placement"
  } — turning presence into top-of-list share on the questions that matter most.`;

  // PLG-06b: leaderboard scenario — the brand is in the top 10 for this sample run.
  const maxScore = Math.max(...LEADERBOARD.map((r) => r[1]));
  const youIdx = LEADERBOARD.findIndex(([name]) => name === META.brand);

  return (
    <div className="mx-auto max-w-[1120px] px-7 py-12">
      <div className="max-w-[64ch]">
        <h2 className="text-[clamp(23px,3vw,30px)] font-semibold tracking-tight text-[var(--plg-ink)]">
          {META.brand} visibility on {META.assistant}
        </h2>
        <p className="mt-3 text-base text-[var(--plg-text2)]">
          The brand&rsquo;s overall standing across every tracked shopper question, rolled up to
          a single view.
        </p>
      </div>

      <h3 className="mt-8 text-[19px] font-semibold text-[var(--plg-ink)]">Brand Visibility Breakdown</h3>
      <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-hair)] md:grid-cols-2">
        <div className="bg-[var(--plg-bg)] p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[12.5px] font-semibold text-[var(--plg-muted)]">Brand visibility</div>
            <InfoDot anchor="def-01" />
          </div>
          <div className="mt-3 text-[44px] font-bold leading-none tracking-tight text-[var(--plg-ink)]">
            {brand.vis.toFixed(1)}
            <span className="ml-0.5 text-xl font-semibold text-[var(--plg-accent)]">%</span>
          </div>
          <div className="mt-3 text-[13px] text-[var(--plg-text2)]">
            {META.brand} appears in{" "}
            <b className="text-[var(--plg-ink)]">
              {shown} of {total}
            </b>{" "}
            tracked shopper questions.
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-[3px] bg-[var(--plg-surface-2)]">
            <div
              className="h-full rounded-[3px] bg-gradient-to-r from-[var(--plg-indigo)] to-[var(--plg-accent)] transition-all duration-1000"
              style={{ width: `${brand.vis}%` }}
            />
          </div>
        </div>
        <div className="bg-[var(--plg-bg)] p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[12.5px] font-semibold text-[var(--plg-muted)]">AI rank</div>
            <InfoDot anchor="ai-rank" />
          </div>
          <div className="mt-3 text-[44px] font-bold leading-none tracking-tight text-[var(--plg-ink)]">
            #{rankHi || "—"}
          </div>
          <div className="mt-3 text-[13px] text-[var(--plg-text2)]">
            A single simplification of weighted share of voice and best position — where{" "}
            {META.brand} lands among competitors. Lower is better.
          </div>
          <div className="mt-4 flex gap-1.5">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
              <span
                key={i}
                className="h-1.5 flex-1 rounded-[3px]"
                style={{
                  background:
                    i < rankHi
                      ? "var(--plg-indigo)"
                      : i === rankHi
                      ? "var(--plg-accent)"
                      : "var(--plg-surface-2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <h3 className="mt-11 text-[19px] font-semibold text-[var(--plg-ink)]">Alexa AI top 10</h3>
      <p className="mt-2 max-w-[70ch] text-[14.5px] text-[var(--plg-text2)]">
        Top 10 brands on {META.assistant} across your selected topics, ranked by AI-shelf score —
        computed from the same {META.assistant} reads used above, no extra scrape.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        {LEADERBOARD.map(([name, score], i) => {
          const isYou = i === youIdx;
          return (
            <div
              key={name}
              className={
                isYou
                  ? "flex items-center gap-3.5 rounded-lg border-[1.5px] border-[var(--plg-accent)] bg-[rgba(194,49,255,.05)] px-4.5 py-3 shadow-[0_1px_2px_rgba(33,2,53,.04)]"
                  : "flex items-center gap-3.5 rounded-lg border border-[var(--plg-hair)] px-4.5 py-3"
              }
            >
              <div
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-[13px] font-semibold ${
                  isYou ? "bg-[var(--plg-accent)] text-white" : "bg-[var(--plg-surface-2)] text-[var(--plg-muted)]"
                }`}
              >
                {name.charAt(0)}
              </div>
              <div className="w-[170px] flex-none text-sm font-semibold text-[var(--plg-ink)]">
                {name}
                {isYou && (
                  <span className="ml-1.5 text-[11px] font-normal text-[var(--plg-muted)]">(you)</span>
                )}
              </div>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--plg-surface-2)]">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isYou ? "bg-[var(--plg-accent)]" : "bg-[var(--plg-gap)]"
                  }`}
                  style={{ width: `${(score / maxScore) * 100}%` }}
                />
              </div>
              <div className="w-[42px] flex-none text-right font-mono text-[12.5px] text-[var(--plg-muted)]">
                {score}
              </div>
              <span
                className={`flex-none rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  isYou
                    ? "bg-[rgba(194,49,255,.14)] text-[var(--plg-accent)]"
                    : "bg-[var(--plg-surface)] text-[var(--plg-muted)]"
                }`}
              >
                #{i + 1}
              </span>
            </div>
          );
        })}
        {youIdx === -1 && (
          <div className="rounded-lg border border-[rgba(138,141,255,.32)] bg-[rgba(138,141,255,.08)] p-3.5 text-[13px] text-[var(--plg-indigo)]">
            <b>{META.brand} is not in the top 10</b> for your selected topics.
          </div>
        )}
      </div>

      <div className="mt-5.5 rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-6">
        <h3 className="text-base font-semibold text-[var(--plg-ink)]">How to read the brand numbers</h3>
        <ul className="mt-3.5 list-none p-0">
          <li className="flex gap-3 py-3 text-[14.5px] text-[var(--plg-text2)]">
            <span className="mt-1.5 h-2 w-2 flex-none rounded-full" style={{ background: "var(--plg-indigo)" }} />
            <span>
              <b className="text-[var(--plg-ink)]">Broad presence.</b> {META.brand} appears in{" "}
              {shown} of {total} tracked questions, so {META.assistant} surfaces it for {visX}{" "}
              {META.category} needs shoppers describe.
            </span>
          </li>
          <li className="flex gap-3 border-t border-[var(--plg-hair)] py-3 text-[14.5px] text-[var(--plg-text2)]">
            <span className="mt-1.5 h-2 w-2 flex-none rounded-full" style={{ background: "var(--plg-accent)" }} />
            <span>
              <b className="text-[var(--plg-ink)]">{shareLab} share.</b> A {brand.sov.toFixed(1)}%
              weighted share means that when {META.assistant} answers, {META.brand} is {shareD}.
            </span>
          </li>
          <li className="flex gap-3 border-t border-[var(--plg-hair)] py-3 text-[14.5px] text-[var(--plg-text2)]">
            <span className="mt-1.5 h-2 w-2 flex-none rounded-full" style={{ background: "var(--plg-secondary)" }} />
            <span>
              <b className="text-[var(--plg-ink)]">{posLab} placement.</b> An average best
              position of {brand.rank?.toFixed(2)} means {META.brand} tends to land {posD}.
            </span>
          </li>
        </ul>
        <div className="mt-5.5 border-l-[3px] border-[var(--plg-accent)] py-1 pl-4.5 text-[15.5px] text-[var(--plg-text2)]">
          {takeaway}
        </div>
      </div>
    </div>
  );
}
