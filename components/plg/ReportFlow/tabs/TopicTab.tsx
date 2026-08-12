"use client";

import { useState } from "react";
import { PROMPTS, STACKUP, META } from "@/data/plgReportData";
import { pct, rnk, topicsFromPrompts, nameList, type TopicAggregate } from "@/lib/plg";

type SortKey = "label" | "vis" | "sov" | "rank";

// "By topic" tab: sortable topic table + headline callouts + PLG-06 competitive stack-up.
// Ported from renderTopics()/renderStackup() + the topic-narrative IIFE.
export function TopicTab() {
  const [sortKey, setSortKey] = useState<SortKey>("sov");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);

  const topics = topicsFromPrompts(PROMPTS);
  const maxSov = Math.max(...topics.map((t) => t.sov));

  const rows = [...topics].sort((a, b) => {
    const va = a[sortKey];
    const vb = b[sortKey];
    if (typeof va === "string" || typeof vb === "string") {
      return String(va).localeCompare(String(vb)) * sortDir;
    }
    return ((va ?? -1) - (vb ?? -1)) * sortDir;
  });

  function onSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(key);
      setSortDir(key === "label" ? 1 : -1);
    }
  }
  const arrow = (key: SortKey) => (sortKey === key ? (sortDir < 0 ? " ▾" : " ▴") : "");

  const appear = topics.filter((t) => t.vis > 0);
  const miss = topics.filter((t) => t.vis === 0);
  const best = [...appear].sort((a, b) => b.sov - a.sov)[0] as TopicAggregate | undefined;
  const broadest = [...topics].sort((a, b) => b.vis - a.vis)[0];
  const weak = [...appear].sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0)).pop();
  const second = best ? [...appear].filter((t) => t !== best).sort((a, b) => b.sov - a.sov)[0] : undefined;

  const strongNote =
    best && (best.rank ?? 99) <= 1.6
      ? `right at the top of ${META.assistant}'s list`
      : "the largest share of any topic";
  const secondTxt = second ? `, and stays strong on ${second.label}` : "";
  const missTxt = miss.length
    ? ` It doesn't surface at all for ${nameList(miss.map((m) => m.label))} — ${
        miss.length > 1 ? "whole topics" : "a whole topic"
      } of whitespace.`
    : "";

  const takeaway =
    best && weak
      ? `${META.brand} owns the answer on ${best.label} — ${best.sov.toFixed(
          1
        )}% share, ${strongNote}${secondTxt}. Its softest appearing theme is ${weak.label} (${weak.sov.toFixed(
          1
        )}% share, position ${rnk(weak.rank)}).${missTxt} Those are where content optimized for ${META.assistant} moves the most share.`
      : "";

  return (
    <div className="mx-auto max-w-[1120px] px-7 py-12">
      <div className="max-w-[64ch]">
        <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
          By topic
        </div>
        <h2 className="mt-2 text-[clamp(23px,3vw,30px)] font-semibold tracking-tight text-[var(--plg-ink)]">
          Where the brand is strong, and where there&rsquo;s room to climb
        </h2>
        <p className="mt-3 text-base text-[var(--plg-text2)]">
          Each topic groups the shopper questions that share an intent. Visibility shows breadth
          of presence; weighted share of voice shows how much of the answer the brand actually
          owns. Click a column heading to sort.
        </p>
      </div>

      <div className="mt-5.5 overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl">
        <div className="grid grid-cols-1 gap-4.5 bg-white/[0.035] px-5.5 py-3.5 md:grid-cols-[1.4fr_2.2fr_1fr_1fr]">
          {(
            [
              ["label", "Topic"],
              ["vis", "Visibility · share of voice"],
              ["sov", "Weighted SOV"],
              ["rank", "Best position"],
            ] as [SortKey, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => onSort(key)}
              className="cursor-pointer select-none text-left text-[11.5px] font-semibold uppercase tracking-[.08em] text-[var(--plg-muted)]"
            >
              {label}
              {arrow(key)}
            </button>
          ))}
        </div>
        {rows.map((t) => {
          const sovW = maxSov > 0 ? (t.sov / maxSov) * 100 : 0;
          return (
            <div
              key={t.label}
              className="grid grid-cols-1 gap-4.5 border-t border-white/10 px-5.5 py-4.5 md:grid-cols-[1.4fr_2.2fr_1fr_1fr] md:items-center"
            >
              <div className="text-[15px] font-semibold text-[var(--plg-ink)]">{t.label}</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 flex-none text-[10.5px] uppercase tracking-[.06em] text-[var(--plg-muted)]">
                    Vis
                  </span>
                  <span className="h-3 flex-1 overflow-hidden rounded-md bg-white/[0.09]">
                    <span
                      className="block h-full rounded-md bg-gradient-to-r from-[var(--plg-secondary)] to-[var(--plg-indigo)] transition-all duration-700"
                      style={{ width: `${t.vis}%` }}
                    />
                  </span>
                  <span className="w-[52px] flex-none text-right font-mono text-[12.5px] text-[var(--plg-ink)]">
                    {pct(t.vis)}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-6 flex-none text-[10.5px] uppercase tracking-[.06em] text-[var(--plg-muted)]">
                    SOV
                  </span>
                  <span className="h-3 flex-1 overflow-hidden rounded-md bg-white/[0.09]">
                    <span
                      className="block h-full rounded-md bg-gradient-to-r from-[var(--plg-indigo)] to-[var(--plg-accent)] transition-all duration-700"
                      style={{ width: `${sovW}%` }}
                    />
                  </span>
                  <span className="w-[52px] flex-none text-right font-mono text-[12.5px] text-[var(--plg-ink)]">
                    {pct(t.sov)}
                  </span>
                </div>
              </div>
              <div className="text-right md:text-right">
                <div className="font-mono text-[22px] font-medium text-[var(--plg-ink)]">
                  {t.sov.toFixed(1)}
                  <span className="text-[13px]">%</span>
                </div>
                <div className="text-[11px] text-[var(--plg-muted)]">of {META.assistant} attention</div>
              </div>
              <div className="text-right md:text-right">
                <span className="font-mono text-[20px] font-medium text-[var(--plg-ink)]">{rnk(t.rank)}</span>
                <div className="text-[11px] text-[var(--plg-muted)]">avg &middot; lower better</div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3.5 text-[12.5px] text-[var(--plg-muted)]">
        Share-of-voice bars are scaled to the highest topic value for easy comparison; the
        number beside each bar is the true percentage.
      </p>

      <div className="mt-6.5 grid grid-cols-1 gap-5.5 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[var(--plg-ink)]">
            <span className="h-2.5 w-2.5 flex-none rounded-[3px] bg-[var(--plg-ink)]" /> Topic headlines
          </h3>
          <p className="mt-1.5 text-sm text-[var(--plg-text2)]">The extremes across the themes in this run.</p>
          <ul className="mt-3.5 list-none p-0">
            {best && (
              <li className="flex items-center justify-between gap-3.5 border-t border-white/10 py-2.5 text-sm text-[var(--plg-text2)] first:border-t-0">
                <span>Strongest share of voice</span>
                <span className="whitespace-nowrap font-mono text-xs text-[var(--plg-muted)]">
                  {best.label} &middot; {pct(best.sov)}
                </span>
              </li>
            )}
            <li className="flex items-center justify-between gap-3.5 border-t border-white/10 py-2.5 text-sm text-[var(--plg-text2)]">
              <span>Broadest presence</span>
              <span className="whitespace-nowrap font-mono text-xs text-[var(--plg-muted)]">
                {broadest.label} &middot; {pct(broadest.vis)}
              </span>
            </li>
            {weak && (
              <li className="flex items-center justify-between gap-3.5 border-t border-white/10 py-2.5 text-sm text-[var(--plg-text2)]">
                <span>Weakest position</span>
                <span className="whitespace-nowrap font-mono text-xs text-[var(--plg-muted)]">
                  {weak.label} &middot; pos {rnk(weak.rank)}
                </span>
              </li>
            )}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[rgba(90,175,254,.10)] to-white/[0.02] p-6 backdrop-blur-xl">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[var(--plg-ink)]">
            <span className="h-2.5 w-2.5 flex-none rounded-[3px] bg-[var(--plg-accent)]" /> The read
          </h3>
          <div className="mt-3.5 border-l-[3px] border-[var(--plg-accent)] py-0.5 pl-4.5 text-[15.5px] text-[var(--plg-text2)]">
            {takeaway}
          </div>
        </div>
      </div>

      <div className="mt-11">
        <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
          PLG-06 &middot; Competitive stack-up
        </div>
        <h3 className="mt-2 text-[19px] font-semibold text-[var(--plg-ink)]">
          Head-to-head on the topics that matter most
        </h3>
        <p className="mt-2 max-w-[70ch] text-[14.5px] text-[var(--plg-text2)]">
          Named competitors differ by topic. Your brand is highlighted so you can see exactly
          which prompts you win and lose.
        </p>
      </div>
      <div className="mt-4">
        {STACKUP.map((t) => {
          const max = Math.max(...t.rows.map((r) => r[1]));
          return (
            <div key={t.topic} className="mb-6.5 last:mb-0">
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
                        isBrand ? "bg-gradient-to-r from-[var(--plg-indigo)] to-[var(--plg-accent)]" : "bg-[var(--plg-gap)]"
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
