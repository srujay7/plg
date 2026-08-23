// Aggregation + formatting helpers for the AEO PLG AI Visibility report.
// Ported from the aeo-plg-visibility-report-dark_3.html prototype's <script> block
// (aggregate(), pct(), num1(), rnk(), nameList(), fmtDate()).

import type { PromptRow } from "@/data/plgReportData";

export type Aggregate = {
  vis: number;
  sov: number;
  rank: number | null;
  total: number;
  shown: number;
};

export function aggregate(rows: PromptRow[]): Aggregate {
  const total = rows.length;
  const present = rows.filter((p) => p.vis > 0);
  const vis = total ? (present.length / total) * 100 : 0;
  const sov = total ? rows.reduce((s, p) => s + (p.sov || 0), 0) / total : 0;
  const rank = present.length
    ? present.reduce((s, p) => s + (p.rank ?? 0), 0) / present.length
    : null;
  return { vis, sov, rank, total, shown: present.length };
}

export type TopicAggregate = Aggregate & { label: string };

export function topicsFromPrompts(rows: PromptRow[]): TopicAggregate[] {
  const names = [...new Set(rows.map((p) => p.topic))];
  return names.map((label) => ({ label, ...aggregate(rows.filter((p) => p.topic === label)) }));
}

export const pct = (v: number | null | undefined) =>
  v == null ? "—" : v.toFixed(v % 1 === 0 ? 0 : 1) + "%";

export const num1 = (v: number | null | undefined) => (v == null ? "—" : v.toFixed(2));

export const rnk = (v: number | null | undefined) =>
  v == null ? "—" : v % 1 === 0 ? v.toFixed(0) : v.toFixed(2);

export const nameList = (a: string[]) =>
  a.length <= 1 ? a[0] || "" : a.slice(0, -1).join(", ") + " and " + a.slice(-1);

export const fmtMoneyShort = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}K`;

/**
 * Distributes a brand-level revenue-at-risk range across a list of items (topics or
 * prompts), weighted toward the weakest performers — directional, same figure just
 * apportioned. Used by the Topic and Prompt tabs to derive a per-row estimate.
 */
export function distributeRisk<T>(
  items: T[],
  weightOf: (item: T) => number,
  total: { low: number; high: number }
): { low: number; high: number }[] {
  const weights = items.map((item) => Math.max(1, weightOf(item)));
  const totalWeight = weights.reduce((s, w) => s + w, 0);
  return weights.map((w) => ({
    low: (total.low * w) / totalWeight,
    high: (total.high * w) / totalWeight,
  }));
}

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

// ---------- topic + prompt curation state helpers ----------

export type CuratedPrompt = {
  id: number;
  topic: string | null;
  text: string;
  checked: boolean;
  source: "curated" | "generated" | "custom";
  edited: boolean;
};

let promptIdCounter = 1;
export function nextPromptId() {
  return promptIdCounter++;
}

/**
 * Rebuilds the prompt list for the currently-selected topics: keeps custom prompts and
 * prompts belonging to still-selected topics, drops prompts for removed topics, and adds
 * prompts (from the curated bank, or a generic generated fallback) for newly-added topics.
 * Mirrors obSyncPrompts() in the prototype.
 */
export function syncPromptsForTopics(
  existing: CuratedPrompt[],
  selectedTopics: string[],
  bank: Record<string, string[]>,
  uncoveredTopics: string[]
): CuratedPrompt[] {
  let prompts = existing.filter(
    (p) => p.source === "custom" || (p.topic && selectedTopics.includes(p.topic))
  );
  selectedTopics.forEach((topic) => {
    const already = prompts.some((p) => p.topic === topic && p.source !== "custom");
    if (already) return;
    const bankPrompts = bank[topic];
    const isUncovered = uncoveredTopics.includes(topic) || !bankPrompts;
    const texts = bankPrompts
      ? bankPrompts.slice()
      : [
          `what's a good ${topic.toLowerCase()} option for my dog`,
          `best rated ${topic.toLowerCase()} on amazon`,
        ];
    texts.forEach((t) => {
      prompts = [
        ...prompts,
        {
          id: nextPromptId(),
          topic,
          text: t,
          checked: true,
          source: isUncovered ? "generated" : "curated",
          edited: false,
        },
      ];
    });
  });
  return prompts;
}
