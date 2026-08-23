"use client";

import { useState } from "react";
import { COMPETITORS, LEADERBOARD, META, STACKUP, TOPIC_COMPETITOR_SCORES } from "@/data/plgReportData";

const LEADERBOARD_MAP = Object.fromEntries(LEADERBOARD);

// "Competitors" tab (PLG-06): pick a named competitor for a head-to-head comparison — same
// overall AI-shelf score used in the leaderboard, a per-topic gap table sorted by biggest
// deficit first, and an auto-generated takeaway — plus the quick 2-topic stack-up below.
// Ported from the mock's renderCompPicker()/renderH2H()/renderCompGapTable().
export function CompetitorsTab() {
  const [selected, setSelected] = useState(COMPETITORS[0]);

  const you = LEADERBOARD_MAP[META.brand] ?? 0;
  const them = LEADERBOARD_MAP[selected] ?? 0;
  const maxScore = Math.max(you, them, 1);
  const gap = you - them;
  const gapLabel = gap === 0 ? "tied with" : gap > 0 ? `+${gap} points ahead of` : `${Math.abs(gap)} points behind`;

  const gapRows = Object.keys(TOPIC_COMPETITOR_SCORES)
    .map((topic) => {
      const scores = TOPIC_COMPETITOR_SCORES[topic];
      const y = scores.You;
      const t = scores[selected];
      return { topic, you: y, them: t, gap: y - t };
    })
    .sort((a, b) => a.gap - b.gap);

  const widest = gapRows[0];
  const best = gapRows[gapRows.length - 1];

  return (
    <div className="mx-auto max-w-[1120px] px-7 py-12">
      <div className="max-w-[64ch]">
        <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
          Named competitor comparison
        </div>
        <h2 className="mt-2 text-[clamp(23px,3vw,30px)] font-semibold tracking-tight text-[var(--plg-ink)]">
          How you compare, competitor by competitor
        </h2>
        <p className="mt-3 text-base text-[var(--plg-text2)]">
          Pick a named competitor to see exactly where {META.brand} is ahead or behind — head-to-head
          on the same AI-shelf score used in the leaderboard, broken out by topic.
        </p>
      </div>

      <div className="mt-5.5 flex flex-wrap gap-2">
        {COMPETITORS.map((name) => (
          <button
            key={name}
            onClick={() => setSelected(name)}
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold ${
              name === selected
                ? "border-[rgba(90,175,254,.4)] bg-[rgba(90,175,254,.14)] text-[var(--plg-ink)]"
                : "border-white/10 bg-white/[0.035] text-[var(--plg-text2)] hover:border-[var(--plg-secondary)]"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="mt-5.5 rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
        <h3 className="text-[17px] font-semibold text-[var(--plg-ink)]">Overall AI-shelf score</h3>
        <p className="mt-1.5 text-[13.5px] text-[var(--plg-text2)]">
          Same composite score used in the leaderboard above — position-weighted presence across
          all your tracked topics.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-[150px] flex-none text-[13px] font-bold text-[var(--plg-ink)]">{META.brand}</div>
          <div className="h-3.5 flex-1 overflow-hidden rounded-md bg-white/[0.09]">
            <div
              className="h-full rounded-md bg-gradient-to-r from-[var(--plg-indigo)] to-[var(--plg-accent)] transition-all duration-700"
              style={{ width: `${(you / maxScore) * 100}%` }}
            />
          </div>
          <div className="w-[34px] text-right font-mono text-[12.5px] font-semibold text-[var(--plg-indigo)]">
            {you}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="w-[150px] flex-none text-[13px] text-[var(--plg-text2)]">{selected}</div>
          <div className="h-3.5 flex-1 overflow-hidden rounded-md bg-white/[0.09]">
            <div
              className="h-full rounded-md bg-[var(--plg-gap)] transition-all duration-700"
              style={{ width: `${(them / maxScore) * 100}%` }}
            />
          </div>
          <div className="w-[34px] text-right font-mono text-[12.5px] text-[var(--plg-muted)]">{them}</div>
        </div>
        <div className="mt-4 border-t border-white/10 pt-3.5 text-[13px] text-[var(--plg-muted)]">
          {META.brand} is <b className="text-[var(--plg-ink)]">{gapLabel}</b> {selected} overall.
        </div>
      </div>

      <div className="mt-9">
        <h3 className="text-[19px] font-semibold text-[var(--plg-ink)]">Gap by topic</h3>
        <p className="mt-2 max-w-[70ch] text-[14.5px] text-[var(--plg-text2)]">
          Where the comparison is widest against this competitor — biggest gaps first.
        </p>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl">
        <table className="w-full border-collapse text-[14.5px]">
          <thead>
            <tr>
              <th className="whitespace-nowrap bg-white/[0.035] px-4.5 py-3 text-left text-[11.5px] font-semibold uppercase tracking-[.07em] text-[var(--plg-muted)]">
                Topic
              </th>
              <th className="whitespace-nowrap bg-white/[0.035] px-4.5 py-3 text-right text-[11.5px] font-semibold uppercase tracking-[.07em] text-[var(--plg-muted)]">
                You
              </th>
              <th className="whitespace-nowrap bg-white/[0.035] px-4.5 py-3 text-right text-[11.5px] font-semibold uppercase tracking-[.07em] text-[var(--plg-muted)]">
                {selected}
              </th>
              <th className="whitespace-nowrap bg-white/[0.035] px-4.5 py-3 text-right text-[11.5px] font-semibold uppercase tracking-[.07em] text-[var(--plg-muted)]">
                Gap
              </th>
            </tr>
          </thead>
          <tbody>
            {gapRows.map((r) => (
              <tr key={r.topic} className="border-t border-white/10">
                <td className="px-4.5 py-3 text-[var(--plg-ink)]">{r.topic}</td>
                <td className="px-4.5 py-3 text-right font-mono text-[13.5px] text-[var(--plg-body)]">{r.you}</td>
                <td className="px-4.5 py-3 text-right font-mono text-[13.5px] text-[var(--plg-body)]">{r.them}</td>
                <td className="px-4.5 py-3 text-right">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-bold ${
                      r.gap >= 0 ? "bg-[rgba(63,224,165,.14)] text-[var(--plg-good)]" : "bg-[rgba(255,107,92,.14)] text-[#FF8FA3]"
                    }`}
                  >
                    {r.gap === 0 ? "Tied" : r.gap > 0 ? `+${r.gap} ahead` : `${r.gap} behind`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5.5 max-w-[820px] rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
        <h3 className="text-base font-semibold text-[var(--plg-ink)]">How you compare</h3>
        <div className="mt-3.5 border-l-[3px] border-[var(--plg-accent)] py-0.5 pl-4.5 text-[15.5px] text-[var(--plg-text2)]">
          Your biggest gap against <b className="text-[var(--plg-ink)]">{selected}</b> is in{" "}
          <b className="text-[var(--plg-ink)]">{widest.topic}</b> ({widest.you} vs {widest.them}, a{" "}
          {Math.abs(widest.gap)}-point gap).{" "}
          {best.gap >= 0 ? (
            <>
              You&rsquo;re strongest in <b className="text-[var(--plg-ink)]">{best.topic}</b>, where you&rsquo;re
              ahead by {best.gap} points.
            </>
          ) : (
            <>
              Even in your closest topic, <b className="text-[var(--plg-ink)]">{best.topic}</b>, you&rsquo;re still{" "}
              {Math.abs(best.gap)} points behind.
            </>
          )}
        </div>
      </div>

      <div className="mt-11">
        <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
          Competitive stack-up
        </div>
        <h3 className="mt-2 text-[19px] font-semibold text-[var(--plg-ink)]">
          Head-to-head on the topics that matter most
        </h3>
        <p className="mt-2 max-w-[70ch] text-[14.5px] text-[var(--plg-text2)]">
          Named competitors differ by topic. Your brand is highlighted so you can see exactly which
          prompts you win and lose.
        </p>
      </div>
      <div className="mt-4">
        {STACKUP.map((t) => {
          const max = Math.max(...t.rows.map((r) => r[1]));
          return (
            <div
              key={t.topic}
              className="mb-6.5 rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl last:mb-0"
            >
              <h4 className="text-[14.5px] font-bold text-[var(--plg-ink)]">{t.topic}</h4>
              <div className="mt-1 text-[12.5px] text-[var(--plg-muted)]">{t.loseNote}</div>
              {t.rows.map(([name, score, isBrand]) => (
                <div key={name} className="mt-3 flex items-center gap-3">
                  <div
                    className={`w-[150px] flex-none text-[13px] ${
                      isBrand ? "font-bold text-[var(--plg-ink)]" : "text-[var(--plg-text2)]"
                    }`}
                  >
                    {name}
                  </div>
                  <div className="h-3.5 flex-1 overflow-hidden rounded-md bg-white/[0.09]">
                    <div
                      className={`h-full rounded-md transition-all duration-700 ${
                        isBrand
                          ? "bg-gradient-to-r from-[var(--plg-indigo)] to-[var(--plg-accent)]"
                          : "bg-[var(--plg-gap)]"
                      }`}
                      style={{ width: `${(score / max) * 100}%` }}
                    />
                  </div>
                  <div
                    className={`w-[34px] text-right font-mono text-[12.5px] ${
                      isBrand ? "font-semibold text-[var(--plg-indigo)]" : "text-[var(--plg-muted)]"
                    }`}
                  >
                    {score}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
