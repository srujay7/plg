"use client";

import { useState } from "react";
import { PROMPTS, META, BRAND_RISK, type PromptRow } from "@/data/plgReportData";
import { pct, rnk, fmtMoneyShort, distributeRisk } from "@/lib/plg";

type SortKey = "q" | "topic" | "vis" | "rank" | "risk";

// "By prompt" tab: sortable/filterable prompt table + gap/low/win callout cards.
// Ported from renderPrompts() + the prompt-insights IIFE.
export function PromptTab() {
  // Defaults to descending revenue-at-risk, which — since risk is weighted toward the
  // weakest share of voice — naturally surfaces gaps (0% visibility) at the top.
  const [sortKey, setSortKey] = useState<SortKey>("risk");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [gapsOnly, setGapsOnly] = useState(false);

  const risks = distributeRisk(PROMPTS, (p) => 100 - (p.sov || 0), BRAND_RISK);
  const riskByQ = new Map(PROMPTS.map((p, i) => [p.q, risks[i]]));

  let rows = gapsOnly ? PROMPTS.filter((p) => p.vis === 0) : PROMPTS.slice();
  rows = rows.sort((a, b) => {
    if (sortKey === "q" || sortKey === "topic") {
      return a[sortKey].localeCompare(b[sortKey]) * sortDir;
    }
    if (sortKey === "rank") {
      const va = a.rank ?? 999;
      const vb = b.rank ?? 999;
      return (va - vb) * sortDir;
    }
    if (sortKey === "risk") {
      const va = riskByQ.get(a.q)?.high ?? 0;
      const vb = riskByQ.get(b.q)?.high ?? 0;
      return (va - vb) * sortDir;
    }
    const va = a[sortKey] ?? -1;
    const vb = b[sortKey] ?? -1;
    return (va - vb) * sortDir;
  });

  function onSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(key);
      setSortDir(key === "q" || key === "topic" ? 1 : -1);
    }
  }
  const arrow = (key: SortKey) => (sortKey === key ? (sortDir < 0 ? "▾" : "▴") : "");

  const gaps = PROMPTS.filter((p) => p.vis === 0);
  const appearing = PROMPTS.filter((p) => p.vis > 0);
  const byWeak = (a: PromptRow, b: PromptRow) => (b.rank ?? 0) - (a.rank ?? 0) || a.sov - b.sov;
  let low = appearing.filter((p) => (p.rank ?? 0) >= 5).sort(byWeak);
  if (low.length === 0) low = appearing.slice().sort(byWeak).slice(0, 3);
  low = low.slice(0, 6);
  const wins = PROMPTS.filter((p) => p.rank === 1)
    .sort((a, b) => b.sov - a.sov)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-[1120px] px-7 py-12">
      <div className="max-w-[64ch]">
        <h2 className="text-[clamp(23px,3vw,30px)] font-semibold tracking-tight text-[var(--plg-ink)]">
          Every question {META.assistant} was asked
        </h2>
        <p className="mt-3 text-base text-[var(--plg-text2)]">
          The exact, natural-language questions shoppers use — the raw material behind the
          topic and brand numbers. Sort by any column, or show only the questions where{" "}
          {META.brand} is missing today.
        </p>
      </div>

      <div className="mt-5.5 flex flex-wrap items-center justify-between gap-4">
        <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm font-medium text-[var(--plg-ink)]">
          <input
            type="checkbox"
            checked={gapsOnly}
            onChange={(e) => setGapsOnly(e.target.checked)}
            className="plg-toggle"
          />
          <span>
            Show only gaps ({META.brand} not shown)
          </span>
        </label>
        <span className="text-[13.5px] text-[var(--plg-muted)]">
          {rows.length} of {PROMPTS.length} questions shown
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="mt-3.5 w-full min-w-[720px] border-collapse text-[14.5px]">
          <colgroup>
            <col />
            <col className="w-[130px]" />
            <col className="w-[130px]" />
            <col className="w-[90px]" />
            <col className="w-[120px]" />
          </colgroup>
          <thead>
            <tr>
              {(
                [
                  ["q", "Shopper question"],
                  ["topic", "Topic"],
                  ["vis", "AI Visibility"],
                  ["rank", "AI Rank"],
                  ["risk", "Revenue at Risk"],
                ] as [SortKey, string][]
              ).map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => onSort(key)}
                  className="cursor-pointer select-none whitespace-nowrap border-b border-white/10 px-3.5 py-3 text-left text-[11.5px] font-semibold uppercase tracking-[.07em] text-[var(--plg-muted)]"
                >
                  {label} <span className="text-[10px] text-[var(--plg-accent)]">{arrow(key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const gap = p.vis === 0;
              const risk = riskByQ.get(p.q);
              return (
                <tr key={p.q} className="border-b border-white/10 hover:bg-white/[0.035]">
                  <td className={`max-w-[520px] px-3.5 py-3.5 ${gap ? "text-[var(--plg-muted)]" : "text-[var(--plg-ink)]"}`}>
                    {p.q}{" "}
                    {gap && (
                      <span className="ml-1 inline-block rounded-full border border-[rgba(90,175,254,.32)] bg-[rgba(90,175,254,.12)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--plg-accent)]">
                        gap
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3.5 py-3.5 text-[12.5px] text-[var(--plg-muted)]">{p.topic}</td>
                  <td className="whitespace-nowrap px-3.5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-10 flex-none overflow-hidden rounded-md bg-white/[0.09]">
                        <span
                          className="block h-full rounded-md bg-gradient-to-r from-[var(--plg-secondary)] to-[var(--plg-indigo)]"
                          style={{ width: `${p.vis}%` }}
                        />
                      </span>
                      <span className="font-mono text-[12.5px] text-[var(--plg-ink)]">{pct(p.vis)}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3.5 py-3.5 font-mono text-[13.5px]">
                    {gap ? (
                      <span className="text-[var(--plg-gap)]">—</span>
                    ) : (
                      <span className={p.rank === 1 ? "font-semibold text-[var(--plg-indigo)]" : "text-[var(--plg-body)]"}>
                        {p.rank == null ? "—" : p.rank.toFixed(1)}
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3.5 py-3.5 font-mono text-[13px] font-semibold text-[#FF8A65]">
                    {risk ? `${fmtMoneyShort(risk.low)}–${fmtMoneyShort(risk.high)}` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[var(--plg-ink)]">
            <span className="h-2.5 w-2.5 flex-none rounded-[3px] bg-[var(--plg-accent)]" /> Coverage gaps
          </h3>
          <p className="mt-1.5 text-sm text-[var(--plg-text2)]">
            Questions that return no brand product at all — pure whitespace.
          </p>
          <ul className="mt-3.5 list-none p-0">
            {gaps.length === 0 ? (
              <li className="py-2.5 text-sm text-[var(--plg-text2)]">
                No gaps — the brand appears in every tracked question.
              </li>
            ) : (
              gaps.map((p) => (
                <li key={p.q} className="border-t border-white/10 py-2.5 text-sm text-[var(--plg-text2)] first:border-t-0">
                  {p.q}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[var(--plg-ink)]">
            <span className="h-2.5 w-2.5 flex-none rounded-[3px] bg-[var(--plg-indigo)]" /> Present, but too low
          </h3>
          <p className="mt-1.5 text-sm text-[var(--plg-text2)]">
            Appears in the answer but lands in the back half of the list.
          </p>
          <ul className="mt-3.5 list-none p-0">
            {low.map((p) => (
              <li
                key={p.q}
                className="flex justify-between gap-3.5 border-t border-white/10 py-2.5 text-sm text-[var(--plg-text2)] first:border-t-0"
              >
                <span>{p.q}</span>
                <span className="whitespace-nowrap font-mono text-xs text-[var(--plg-muted)]">
                  SOV {pct(p.sov)} &middot; pos {rnk(p.rank)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[rgba(90,175,254,.10)] to-white/[0.02] p-6 backdrop-blur-xl">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[var(--plg-ink)]">
            <span className="h-2.5 w-2.5 flex-none rounded-[3px] bg-[var(--plg-secondary)]" /> Wins to protect
          </h3>
          <p className="mt-1.5 text-sm text-[var(--plg-text2)]">Questions where the brand already leads the answer.</p>
          <ul className="mt-3.5 list-none p-0">
            {wins.map((p) => (
              <li
                key={p.q}
                className="flex justify-between gap-3.5 border-t border-white/10 py-2.5 text-sm text-[var(--plg-text2)] first:border-t-0"
              >
                <span>{p.q}</span>
                <span className="whitespace-nowrap font-mono text-xs text-[var(--plg-muted)]">
                  SOV {pct(p.sov)} &middot; pos 1
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
