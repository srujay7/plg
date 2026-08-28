"use client";

import { Fragment, useState } from "react";
import { PROMPTS, META, type PromptRow } from "@/data/plgReportData";
import { citationsForPrompt, fmtDate, mockAssistantResponse, pct } from "@/lib/plg";

type SortKey = "q" | "topic" | "vis" | "rank";

// "By prompt" tab: sortable/filterable prompt table + gap/low/win callout cards.
// Ported from renderPrompts() + the prompt-insights IIFE.
export function PromptTab() {
  // Defaults to ascending AI Visibility, which naturally surfaces gaps (0% visibility) at
  // the top.
  const [sortKey, setSortKey] = useState<SortKey>("vis");
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const [showFullResponse, setShowFullResponse] = useState(false);

  function toggleExpanded(q: string) {
    setExpandedQ((prev) => (prev === q ? null : q));
    setShowFullResponse(false);
  }

  const rows = PROMPTS.slice().sort((a, b) => {
    if (sortKey === "q" || sortKey === "topic") {
      return a[sortKey].localeCompare(b[sortKey]) * sortDir;
    }
    if (sortKey === "rank") {
      const va = a.rank ?? 999;
      const vb = b.rank ?? 999;
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
          topic and brand numbers. Sort by any column.
        </p>
      </div>

      <div className="mt-5.5 overflow-x-auto">
        <table className="mt-3.5 w-full min-w-[720px] border-collapse text-[14.5px]">
          <colgroup>
            <col />
            <col className="w-[130px]" />
            <col className="w-[130px]" />
            <col className="w-[90px]" />
          </colgroup>
          <thead>
            <tr>
              {(
                [
                  ["q", "Shopper question"],
                  ["topic", "Topic"],
                  ["vis", "AI Visibility"],
                  ["rank", "AI Rank"],
                ] as [SortKey, string][]
              ).map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => onSort(key)}
                  className="cursor-pointer select-none whitespace-nowrap border-b border-[var(--plg-hair)] px-3.5 py-3 text-left text-[11.5px] font-semibold uppercase tracking-[.07em] text-[var(--plg-muted)]"
                >
                  {label} <span className="text-[10px] text-[var(--plg-accent)]">{arrow(key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const gap = p.vis === 0;
              const expanded = expandedQ === p.q;
              return (
                <Fragment key={p.q}>
                  <tr
                    onClick={() => toggleExpanded(p.q)}
                    className={`cursor-pointer border-b border-[var(--plg-hair)] hover:bg-[var(--plg-surface)] ${
                      expanded ? "bg-[var(--plg-surface)]" : ""
                    }`}
                  >
                    <td className={`max-w-[520px] px-3.5 py-3.5 ${gap ? "text-[var(--plg-muted)]" : "text-[var(--plg-ink)]"}`}>
                      <span className="mr-1.5 inline-block w-3 text-[10px] text-[var(--plg-muted)]">
                        {expanded ? "▾" : "▸"}
                      </span>
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
                        <span className="h-2 w-10 flex-none overflow-hidden rounded-md bg-[var(--plg-surface-2)]">
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
                  </tr>
                  {expanded &&
                    (() => {
                      const citations = citationsForPrompt(p);
                      const response = mockAssistantResponse(p, citations);
                      const truncated = response.length > 160 ? response.slice(0, 160).trimEnd() + "…" : response;
                      return (
                        <tr className="border-b border-[var(--plg-hair)]">
                          <td colSpan={4} className="bg-[var(--plg-surface)] px-3.5 py-3.5">
                            <div className="rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)]">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--plg-hair)] bg-[var(--plg-surface)] px-4.5 py-3">
                                <div className="text-[13px] font-bold text-[var(--plg-ink)]">{META.assistant}</div>
                                <div className="flex flex-none items-center gap-3">
                                  <span className="text-[12px] text-[var(--plg-muted)]">{fmtDate(META.runDate)}</span>
                                  <span className="rounded-md bg-[var(--plg-surface-2)] px-2.5 py-1 text-[11.5px] font-semibold text-[var(--plg-text2)]">
                                    {citations.length} citations
                                  </span>
                                </div>
                              </div>
                              <div className="px-4.5 py-4">
                                <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
                                  Brands mentioned
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {citations.map((c) => (
                                    <span
                                      key={c.rank}
                                      className={
                                        c.isBrand
                                          ? "inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-[var(--plg-accent)] bg-[rgba(194,49,255,.05)] px-2.5 py-1.5 text-[13px] font-semibold text-[var(--plg-accent)]"
                                          : "inline-flex items-center gap-1.5 rounded-full border border-[var(--plg-hair)] px-2.5 py-1.5 text-[13px] text-[var(--plg-text2)]"
                                      }
                                    >
                                      <span
                                        className={
                                          c.isBrand
                                            ? "flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--plg-accent)] text-[10px] font-bold text-white"
                                            : "flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--plg-surface-2)] text-[10px] font-semibold text-[var(--plg-muted)]"
                                        }
                                      >
                                        {c.name.charAt(0)}
                                      </span>
                                      {c.name}
                                      {c.isBrand && <span className="text-[10px] font-bold">· YOU</span>}
                                    </span>
                                  ))}
                                </div>

                                <div className="mb-2.5 mt-4.5 text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
                                  Response
                                </div>
                                <p className="text-[13.5px] leading-relaxed text-[var(--plg-text2)]">
                                  {showFullResponse ? response : truncated}
                                </p>
                                {response.length > 160 && (
                                  <button
                                    onClick={() => setShowFullResponse((v) => !v)}
                                    className="mt-1.5 text-[13px] font-semibold text-[var(--plg-indigo)] hover:underline"
                                  >
                                    {showFullResponse ? "Show less" : "Show more"}
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })()}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-6">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[var(--plg-ink)]">
            <span className="h-2.5 w-2.5 flex-none rounded-full bg-[var(--plg-accent)]" /> Coverage gaps
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
                <li key={p.q} className="border-t border-[var(--plg-hair)] py-2.5 text-sm text-[var(--plg-text2)] first:border-t-0">
                  {p.q}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-6">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[var(--plg-ink)]">
            <span className="h-2.5 w-2.5 flex-none rounded-full bg-[var(--plg-indigo)]" /> Present, but too low
          </h3>
          <p className="mt-1.5 text-sm text-[var(--plg-text2)]">
            Appears in the answer but lands in the back half of the list.
          </p>
          <ul className="mt-3.5 list-none p-0">
            {low.map((p) => (
              <li key={p.q} className="border-t border-[var(--plg-hair)] py-2.5 text-sm text-[var(--plg-text2)] first:border-t-0">
                {p.q}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-[var(--plg-hair)] bg-gradient-to-b from-[rgba(90,175,254,.10)] to-[var(--plg-paper)] p-6">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[var(--plg-ink)]">
            <span className="h-2.5 w-2.5 flex-none rounded-full bg-[var(--plg-secondary)]" /> Wins to protect
          </h3>
          <p className="mt-1.5 text-sm text-[var(--plg-text2)]">Questions where the brand already leads the answer.</p>
          <ul className="mt-3.5 list-none p-0">
            {wins.map((p) => (
              <li key={p.q} className="border-t border-[var(--plg-hair)] py-2.5 text-sm text-[var(--plg-text2)] first:border-t-0">
                {p.q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
