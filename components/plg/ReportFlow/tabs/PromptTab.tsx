"use client";

import { useState } from "react";
import { META, type PromptRow } from "@/data/plgReportData";
import { citationsForPrompt, fmtDate, mockAssistantResponse, pct } from "@/lib/plg";
import { RefreshReportButton } from "@/components/plg/shared/RefreshReportButton";
import { useReportData } from "@/components/plg/ReportFlow/ReportDataContext";

type SortKey = "q" | "topic" | "vis" | "rank";

// Prompt drill-down (PLG-03 tab): the assistant's citations + raw response for one shopper
// question. A modal rather than an inline expanding row — with up to 10 ASINs plus a full
// response, an inline row grew tall enough to push the rest of the table around; a fixed-size
// modal with its own scroll region for the ASIN list keeps it compact regardless of prompt.
function PromptDetailModal({ prompt, onClose }: { prompt: PromptRow; onClose: () => void }) {
  const citations = citationsForPrompt(prompt);
  const response = mockAssistantResponse(prompt, citations);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(4,2,9,.65)] p-4" onClick={onClose}>
      <div
        className="flex max-h-[85vh] w-[440px] flex-col rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] shadow-[0_8px_24px_rgba(33,2,53,.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-[var(--plg-hair)] px-5 py-4">
          <div className="min-w-0">
            <div className="text-[14.5px] font-bold text-[var(--plg-ink)]">{META.assistant}</div>
            <div className="mt-0.5 truncate text-[12px] text-[var(--plg-muted)]">{prompt.q}</div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[16px] text-[var(--plg-muted)] hover:bg-[var(--plg-surface)] hover:text-[var(--plg-ink)]"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
              ASINs surfaced
            </div>
            <span className="text-[11.5px] text-[var(--plg-muted)]">{fmtDate(META.runDate)}</span>
          </div>
          <div className="mt-2.5 max-h-[240px] space-y-1.5 overflow-y-auto pr-1">
            {citations.map((c) => (
              <a
                key={c.rank}
                href={`https://www.amazon.com/dp/${c.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  c.isBrand
                    ? "flex items-center gap-2.5 rounded-lg border-[1.5px] border-[var(--plg-accent)] bg-[rgba(194,49,255,.05)] px-3 py-2 transition hover:bg-[rgba(194,49,255,.09)]"
                    : "flex items-center gap-2.5 rounded-lg border border-[var(--plg-hair)] px-3 py-2 transition hover:border-[var(--plg-secondary)]"
                }
              >
                <span className="w-4 flex-none text-right font-mono text-[11.5px] font-semibold text-[var(--plg-muted)]">
                  {c.rank}
                </span>
                <span
                  className={
                    c.isBrand
                      ? "flex h-5.5 w-5.5 flex-none items-center justify-center rounded-full bg-[var(--plg-accent)] text-[10.5px] font-bold text-white"
                      : "flex h-5.5 w-5.5 flex-none items-center justify-center rounded-full bg-[var(--plg-surface-2)] text-[10.5px] font-semibold text-[var(--plg-muted)]"
                  }
                >
                  {c.name.charAt(0)}
                </span>
                <span
                  className={`truncate text-[13px] ${
                    c.isBrand ? "font-semibold text-[var(--plg-accent)]" : "text-[var(--plg-text2)]"
                  }`}
                >
                  {c.name}
                </span>
                {c.isBrand && <span className="flex-none text-[10.5px] font-bold text-[var(--plg-accent)]">· YOU</span>}
                <span className="ml-auto flex-none font-mono text-[11.5px] text-[var(--plg-muted)]">{c.asin} ↗</span>
              </a>
            ))}
          </div>

          <div className="mb-2 mt-4.5 text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
            Raw response
          </div>
          <p className="text-[13.5px] leading-relaxed text-[var(--plg-text2)]">{response}</p>
        </div>
      </div>
    </div>
  );
}

// "By prompt" tab: sortable/filterable prompt table + gap/low/win callout cards.
// Ported from renderPrompts() + the prompt-insights IIFE.
export function PromptTab() {
  // Defaults to ascending AI Visibility, which naturally surfaces gaps (0% visibility) at
  // the top.
  const [sortKey, setSortKey] = useState<SortKey>("vis");
  const [sortDir, setSortDir] = useState<1 | -1>(1);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptRow | null>(null);

  const { prompts: PROMPTS } = useReportData();
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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-[64ch]">
          <h2 className="text-[clamp(23px,3vw,30px)] font-semibold tracking-tight text-[var(--plg-ink)]">
            Every question {META.assistant} was asked
          </h2>
          <p className="mt-3 text-base text-[var(--plg-text2)]">
            The exact, natural-language questions shoppers use — the raw material behind the
            topic and brand numbers. Sort by any column.
          </p>
        </div>
        <RefreshReportButton />
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
              return (
                <tr
                  key={p.q}
                  onClick={() => setSelectedPrompt(p)}
                  className="cursor-pointer border-b border-[var(--plg-hair)] hover:bg-[var(--plg-surface)]"
                >
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
            {low.length === 0 ? (
              <li className="py-2.5 text-sm text-[var(--plg-text2)]">
                Nothing to show — the brand doesn&rsquo;t appear anywhere it could rank low.
              </li>
            ) : (
              low.map((p) => (
                <li key={p.q} className="border-t border-[var(--plg-hair)] py-2.5 text-sm text-[var(--plg-text2)] first:border-t-0">
                  {p.q}
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="rounded-xl border border-[var(--plg-hair)] bg-gradient-to-b from-[rgba(90,175,254,.10)] to-[var(--plg-paper)] p-6">
          <h3 className="flex items-center gap-2.5 text-[17px] font-semibold text-[var(--plg-ink)]">
            <span className="h-2.5 w-2.5 flex-none rounded-full bg-[var(--plg-secondary)]" /> Wins to protect
          </h3>
          <p className="mt-1.5 text-sm text-[var(--plg-text2)]">Questions where the brand already leads the answer.</p>
          <ul className="mt-3.5 list-none p-0">
            {wins.length === 0 ? (
              <li className="py-2.5 text-sm text-[var(--plg-text2)]">
                No wins yet — the brand isn&rsquo;t leading the answer on any tracked question.
              </li>
            ) : (
              wins.map((p) => (
                <li key={p.q} className="border-t border-[var(--plg-hair)] py-2.5 text-sm text-[var(--plg-text2)] first:border-t-0">
                  {p.q}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {selectedPrompt && <PromptDetailModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />}
    </div>
  );
}
