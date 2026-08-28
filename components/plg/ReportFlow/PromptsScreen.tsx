"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { PrimaryButton } from "@/components/plg/shared/Buttons";
import { CurationMasthead } from "@/components/plg/ReportFlow/CurationMasthead";
import { MAX_CUSTOM_PROMPTS, TOTAL_PROMPT_CAP, type CuratedPrompt } from "@/lib/plg";

const PROMPT_CAP_PER_TOPIC = 25;

// Screen 2 of 2 (PLG-03, Step 6): one flat, editable prompt table across all topics —
// keep/drop, inline edit, add-your-own (no topic required), capped ≤25/topic. Optional /
// skippable — "start audit" accepts the smart defaults. Ported from renderPromptsScreen().
export function PromptsScreen({
  brand,
  prompts,
  onChangePrompts,
  onBack,
  onGenerate,
}: {
  brand: string;
  prompts: CuratedPrompt[];
  onChangePrompts: (next: CuratedPrompt[]) => void;
  onBack: () => void;
  onGenerate: () => void;
}) {
  const [addInput, setAddInput] = useState("");

  const totalSelected = prompts.filter((p) => p.checked).length;
  const customPromptCount = prompts.filter((p) => p.source === "custom").length;
  const canAddCustom = customPromptCount < MAX_CUSTOM_PROMPTS && prompts.length < TOTAL_PROMPT_CAP;

  const perTopicCounts = prompts.reduce<Record<string, number>>((acc, p) => {
    if (p.topic) acc[p.topic] = (acc[p.topic] || 0) + 1;
    return acc;
  }, {});

  function toggleChecked(id: number) {
    onChangePrompts(prompts.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)));
  }
  function removePrompt(id: number) {
    onChangePrompts(prompts.filter((p) => p.id !== id));
  }
  function addPrompt() {
    const val = addInput.trim();
    if (!val || !canAddCustom) return;
    const nextId = Math.max(0, ...prompts.map((p) => p.id)) + 1;
    onChangePrompts([
      ...prompts,
      { id: nextId, topic: null, text: val, checked: true, source: "custom", edited: false },
    ]);
    setAddInput("");
  }

  return (
    <div>
      <CurationMasthead brand={brand} />
      <div className="flex justify-center px-6 py-8">
      <div className="w-full max-w-[860px] rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-11 shadow-[0_1px_2px_rgba(33,2,53,.04)]">
        <button
          onClick={onBack}
          className="mb-4 text-[13px] text-[var(--plg-muted)] hover:text-[var(--plg-indigo)]"
        >
          &larr; Back to topics
        </button>
        <div className="mb-2.5 text-xs font-semibold uppercase tracking-[.1em] text-[var(--plg-accent)]">
          Setting up your report &middot; Step 2 of 2
        </div>
        <h1 className="mb-2.5 text-[25px] font-bold text-[var(--plg-ink)]">Review your prompts</h1>
        <p className="mb-5.5 max-w-[64ch] text-[14.5px] leading-relaxed text-[var(--plg-text2)]">
          These are the shopper questions we&rsquo;ll ask Alexa AI. One list, across all your
          topics, capped at {TOTAL_PROMPT_CAP} — you can add one prompt of your own, even before
          it has a topic.
        </p>

        <div className="mb-2.5 flex justify-between text-[12.5px] text-[var(--plg-muted)]">
          <span>
            <b className="text-[var(--plg-ink)]">{totalSelected}</b> of {prompts.length} prompts
            selected
          </span>
          <span>~10&ndash;15 min once generated</span>
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-surface)]">
          <div className="flex items-center gap-3 border-b border-[var(--plg-hair)] bg-[var(--plg-surface-2)] px-4 py-2.5">
            <span className="w-[15px] flex-none" />
            <span className="flex-1 text-[10.5px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
              Shopper prompt
            </span>
            <span className="w-[150px] flex-none text-[10.5px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
              Topic
            </span>
            <span className="w-6 flex-none" />
          </div>

          <div className="max-h-[420px] divide-y divide-[var(--plg-hair)] overflow-y-auto">
            {prompts.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "group flex items-start gap-3 px-4 py-3 transition hover:bg-[var(--plg-surface-2)]",
                  !p.checked && "opacity-45",
                  p.source === "custom" && "border-l-2 border-[var(--plg-accent)] bg-[rgba(90,175,254,.06)]"
                )}
              >
                <input
                  type="checkbox"
                  checked={p.checked}
                  onChange={() => toggleChecked(p.id)}
                  className="mt-0.5 h-[15px] w-[15px] flex-none cursor-pointer accent-[var(--plg-indigo)]"
                />
                <div className="flex-1 text-[13.5px] leading-relaxed text-[var(--plg-ink)]">{p.text}</div>
                <div className="flex w-[150px] flex-none flex-wrap items-center gap-1">
                  {p.topic ? (
                    <span className="inline-flex items-center rounded-full border border-[var(--plg-hair)] bg-[var(--plg-paper)] px-2.5 py-1 text-[11px] font-medium text-[var(--plg-text2)]">
                      {p.topic}
                    </span>
                  ) : (
                    <span className="text-[11px] italic text-[var(--plg-gap)]">no topic</span>
                  )}
                  {p.topic && perTopicCounts[p.topic] >= PROMPT_CAP_PER_TOPIC && (
                    <span className="text-[11px] font-semibold text-[var(--plg-error)]">cap</span>
                  )}
                </div>
                <div className="w-6 flex-none text-right">
                  {p.source === "custom" && (
                    <button
                      onClick={() => removePrompt(p.id)}
                      title="Remove"
                      className="text-[13px] text-[var(--plg-muted)] opacity-0 transition hover:text-[var(--plg-error)] group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3.5 text-[12.5px] text-[var(--plg-muted)]">
          {canAddCustom ? (
            <>You get <b className="text-[var(--plg-ink)]">1 free prompt</b> to add your own.</>
          ) : customPromptCount >= MAX_CUSTOM_PROMPTS ? (
            "You've used your free prompt — delete it below to add a different one."
          ) : (
            `You've reached the ${TOTAL_PROMPT_CAP}-prompt limit.`
          )}
        </div>
        <div className="mt-1.5 flex gap-2">
          <input
            value={addInput}
            onChange={(e) => setAddInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPrompt()}
            disabled={!canAddCustom}
            placeholder="+ Add a prompt of your own — a topic isn't required"
            title={!canAddCustom ? "Delete your added prompt below to add a new one" : undefined}
            className="flex-1 rounded-[10px] border border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3.5 py-2.5 text-[13.5px] text-[var(--plg-ink)] outline-none focus:border-[var(--plg-secondary)] disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            onClick={addPrompt}
            disabled={!canAddCustom}
            title={!canAddCustom ? "Delete your added prompt below to add a new one" : undefined}
            className="rounded-[10px] border border-[var(--plg-hair)] bg-[var(--plg-surface)] px-4.5 py-2.5 text-[13.5px] font-semibold text-[var(--plg-ink)] hover:border-[var(--plg-indigo)] hover:text-[var(--plg-indigo)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--plg-hair)] disabled:hover:text-[var(--plg-ink)]"
          >
            Add
          </button>
        </div>

        <PrimaryButton className="mt-4.5 w-full !py-3" onClick={onGenerate}>
          Generate my report
        </PrimaryButton>
      </div>
      </div>
    </div>
  );
}
