"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { PrimaryButton } from "@/components/plg/shared/Buttons";
import { CurationMasthead } from "@/components/plg/ReportFlow/CurationMasthead";
import type { CuratedPrompt } from "@/lib/plg";

const PROMPT_CAP_PER_TOPIC = 25;

function SourceBadge({ prompt }: { prompt: CuratedPrompt }) {
  if (prompt.source === "custom")
    return (
      <span className="whitespace-nowrap rounded-full bg-white/[0.07] px-2.5 py-1 text-[10.5px] font-bold text-[var(--plg-muted)]">
        Custom
      </span>
    );
  if (prompt.edited)
    return (
      <span className="whitespace-nowrap rounded-full bg-white/[0.07] px-2.5 py-1 text-[10.5px] font-bold text-[var(--plg-muted)]">
        Edited
      </span>
    );
  if (prompt.source === "curated")
    return (
      <span className="whitespace-nowrap rounded-full border border-[rgba(90,175,254,.3)] bg-[rgba(90,175,254,.14)] px-2.5 py-1 text-[10.5px] font-bold text-[var(--plg-indigo)]">
        Curated
      </span>
    );
  return (
    <span className="whitespace-nowrap rounded-full border border-[rgba(90,175,254,.25)] bg-[rgba(90,175,254,.10)] px-2.5 py-1 text-[10.5px] font-bold text-[var(--plg-accent)]">
      Generated
    </span>
  );
}

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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [addInput, setAddInput] = useState("");

  const totalSelected = prompts.filter((p) => p.checked).length;
  const unassignedCount = prompts.filter((p) => !p.topic).length;

  const perTopicCounts = prompts.reduce<Record<string, number>>((acc, p) => {
    if (p.topic) acc[p.topic] = (acc[p.topic] || 0) + 1;
    return acc;
  }, {});

  function toggleChecked(id: number) {
    onChangePrompts(prompts.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)));
  }
  function startEdit(p: CuratedPrompt) {
    setEditingId(p.id);
    setEditValue(p.text);
  }
  function commitEdit() {
    if (editingId === null) return;
    const val = editValue.trim();
    onChangePrompts(
      prompts.map((p) =>
        p.id === editingId && val && val !== p.text
          ? { ...p, text: val, edited: p.source !== "custom" }
          : p
      )
    );
    setEditingId(null);
  }
  function removePrompt(id: number) {
    onChangePrompts(prompts.filter((p) => p.id !== id));
  }
  function addPrompt() {
    const val = addInput.trim();
    if (!val) return;
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
      <div className="w-full max-w-[860px] rounded-2xl border border-white/10 bg-white/[0.045] p-11 shadow-[0_30px_80px_rgba(0,0,0,.6)] backdrop-blur-xl">
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
          topics — add a new prompt any time, even before it has a topic.
        </p>

        <div className="mb-5.5 flex gap-3 rounded-[10px] border border-[rgba(90,175,254,.22)] bg-[rgba(90,175,254,.08)] p-3.5">
          <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--plg-accent)] text-[12px] font-bold italic text-[#0B041A]">
            i
          </div>
          <div className="text-[13px] leading-relaxed text-[var(--plg-text2)] [&_b]:text-[var(--plg-ink)]">
            <b>Precision pays off, here too.</b> Edit any prompt to match the exact words your
            shoppers use — the closer the wording, the more accurately Content Agent can judge
            (and improve) how you show up in AI answers. Add prompts as they come to mind; a
            blank Topic is fine, we&rsquo;ll still ask it.
          </div>
        </div>

        <div className="mb-2.5 flex justify-between text-[12.5px] text-[var(--plg-muted)]">
          <span>
            <b className="text-[var(--plg-ink)]">{totalSelected}</b> of {prompts.length} prompts
            selected
            {unassignedCount > 0 && (
              <>
                {" "}
                &middot; <b className="text-[var(--plg-ink)]">{unassignedCount}</b> without a topic
              </>
            )}
          </span>
          <span>~10&ndash;15 min once generated</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="w-7 border-b border-white/10 pb-2"></th>
                <th className="border-b border-white/10 pb-2 text-left text-[10.5px] font-bold uppercase tracking-[.05em] text-[var(--plg-muted)]">
                  Shopper prompt
                </th>
                <th className="border-b border-white/10 pb-2 text-left text-[10.5px] font-bold uppercase tracking-[.05em] text-[var(--plg-muted)]">
                  Topic
                </th>
                <th className="border-b border-white/10 pb-2 text-left text-[10.5px] font-bold uppercase tracking-[.05em] text-[var(--plg-muted)]">
                  Source
                </th>
                <th className="w-11 border-b border-white/10 pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((p) => (
                <tr
                  key={p.id}
                  className={cn("border-t border-white/10 hover:bg-white/[0.035]", !p.checked && "opacity-50")}
                >
                  <td className="py-2.5">
                    <input
                      type="checkbox"
                      checked={p.checked}
                      onChange={() => toggleChecked(p.id)}
                      className="h-[15px] w-[15px] cursor-pointer accent-[var(--plg-indigo)]"
                    />
                  </td>
                  <td className="py-2.5 pr-2 leading-snug text-[var(--plg-ink)]">
                    {editingId === p.id ? (
                      <input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={commitEdit}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitEdit();
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        className="w-full rounded-md border border-[var(--plg-secondary)] bg-[var(--plg-bg)] px-2 py-1.5 text-[13px] text-[var(--plg-ink)] outline-none"
                      />
                    ) : (
                      p.text
                    )}
                  </td>
                  <td className="whitespace-nowrap py-2.5 pr-2 text-xs text-[var(--plg-muted)]">
                    {p.topic ? (
                      p.topic
                    ) : (
                      <span className="italic text-[var(--plg-gap)]">— no topic —</span>
                    )}
                    {p.topic && perTopicCounts[p.topic] >= PROMPT_CAP_PER_TOPIC && (
                      <span className="ml-1 text-[var(--plg-error)]">(cap)</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap py-2.5 pr-2">
                    <SourceBadge prompt={p} />
                  </td>
                  <td className="py-2.5">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => startEdit(p)}
                        title="Edit wording"
                        className="text-[12px] text-[var(--plg-muted)] hover:text-[var(--plg-indigo)]"
                      >
                        ✎
                      </button>
                      {p.source === "custom" && (
                        <button
                          onClick={() => removePrompt(p.id)}
                          title="Remove"
                          className="text-[12px] text-[var(--plg-muted)] hover:text-[var(--plg-error)]"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3.5 flex gap-2">
          <input
            value={addInput}
            onChange={(e) => setAddInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addPrompt()}
            placeholder="+ Add a prompt of your own — a topic isn't required"
            className="flex-1 rounded-[10px] border border-white/10 bg-white/[0.035] px-3.5 py-2.5 text-[13.5px] text-[var(--plg-ink)] outline-none focus:border-[var(--plg-secondary)]"
          />
          <button
            onClick={addPrompt}
            className="rounded-[10px] border border-white/10 bg-white/[0.045] px-4.5 py-2.5 text-[13.5px] font-semibold text-[var(--plg-ink)] hover:border-[var(--plg-indigo)] hover:text-[var(--plg-indigo)]"
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
