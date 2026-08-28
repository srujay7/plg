// Aggregation + formatting helpers for the AEO PLG AI Visibility report.
// Ported from the aeo-plg-visibility-report-dark_3.html prototype's <script> block
// (aggregate(), pct(), num1(), rnk(), nameList(), fmtDate()).

import { LEADERBOARD, META, type PromptRow } from "@/data/plgReportData";

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

export type Citation = { rank: number; name: string; isBrand: boolean };

/**
 * The top-10 Alexa AI answers/SKUs for a single shopper prompt (PLG-03 tab drill-down):
 * the brand-tracking leaderboard's other 9 brands, with the tracked brand slotted in at
 * its own best position for that prompt — or omitted entirely when the brand doesn't
 * appear (a gap prompt). Directional/illustrative, same as the rest of the leaderboard —
 * there's no per-prompt SKU-level scrape yet.
 */
export function citationsForPrompt(p: PromptRow): Citation[] {
  const others = LEADERBOARD.map(([name]) => name).filter((name) => name !== META.brand);
  if (p.rank == null) {
    return others.slice(0, 10).map((name, i) => ({ rank: i + 1, name, isBrand: false }));
  }
  const brandPos = Math.min(Math.max(Math.round(p.rank), 1), 10);
  const citations: Citation[] = [];
  let oi = 0;
  for (let i = 1; i <= 10; i++) {
    if (i === brandPos) citations.push({ rank: i, name: META.brand, isBrand: true });
    else citations.push({ rank: i, name: others[oi++], isBrand: false });
  }
  return citations;
}

/**
 * A short, directional mock of the assistant's actual answer text for a prompt — there's
 * no real per-prompt response stored yet, so this is generated from the same citations
 * list shown alongside it, purely for illustrating the "full response" drill-down.
 */
export function mockAssistantResponse(p: PromptRow, citations: Citation[]): string {
  const names = citations.map((c) => c.name);
  const top3 = names.slice(0, 3).join(", ");
  const rest = names.slice(3, 8).join(", ");
  const brandNote = p.rank
    ? `${META.brand} shows up around position #${Math.round(p.rank)} among these picks.`
    : `${META.brand} doesn't currently surface in this answer.`;
  return (
    `Here's a rundown of options for "${p.q}": ${top3}` +
    (rest ? `, along with ${rest},` : "") +
    ` are the names ${META.assistant} leans on most for this category, based on ingredient quality, ` +
    `customer ratings, and how closely each product matches the request. ${brandNote} As with any AI ` +
    `assistant, the exact list can shift between sessions — this is a snapshot, not a guarantee, and is ` +
    `illustrative only for this report.`
  );
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

const DEFAULT_CHECKED_PROMPTS = 5;
export const TOTAL_PROMPT_CAP = 15;
export const MAX_CUSTOM_PROMPTS = 1;
// Curated/generated prompts stop short of the total cap so there's always room left for the
// user's own custom prompt(s) without pushing the list past TOTAL_PROMPT_CAP.
const CURATED_PROMPT_CAP = TOTAL_PROMPT_CAP - MAX_CUSTOM_PROMPTS;

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
  let checkedCount = prompts.filter((p) => p.checked).length;
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
      if (prompts.length >= CURATED_PROMPT_CAP) return;
      const checked = checkedCount < DEFAULT_CHECKED_PROMPTS;
      if (checked) checkedCount++;
      prompts = [
        ...prompts,
        {
          id: nextPromptId(),
          topic,
          text: t,
          checked,
          source: isUncovered ? "generated" : "curated",
          edited: false,
        },
      ];
    });
  });
  return prompts;
}
