"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { PrimaryButton } from "@/components/plg/shared/Buttons";
import { OB_PREFILLED_TOPICS, OB_MORE_TOPICS, META } from "@/data/plgReportData";

const TOPIC_CAP = 10;

// Screen 1 of 2 inside the product (PLG-03, Step 4): pre-filled + candidate topics, custom
// add, rename-in-place, capped at 10. Ported from renderTopicsScreen()/wireTopicsEvents()
// in the report mock.
export function TopicsScreen({
  selectedTopics,
  customTopics,
  onChangeSelected,
  onAddCustomTopic,
  onContinue,
}: {
  selectedTopics: string[];
  customTopics: string[];
  onChangeSelected: (next: string[]) => void;
  onAddCustomTopic: (topic: string) => void;
  onContinue: () => void;
}) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [customInput, setCustomInput] = useState("");

  const allTopics = [...OB_PREFILLED_TOPICS, ...OB_MORE_TOPICS, ...customTopics].filter(
    (t, i, arr) => arr.indexOf(t) === i
  );
  const candidates = allTopics.filter((t) => !selectedTopics.includes(t));
  const count = selectedTopics.length;
  const atCap = count >= TOPIC_CAP;

  function removeAt(idx: number) {
    onChangeSelected(selectedTopics.filter((_, i) => i !== idx));
  }
  function startEdit(idx: number) {
    setEditingIdx(idx);
    setEditValue(selectedTopics[idx]);
  }
  function commitEdit() {
    if (editingIdx === null) return;
    const val = editValue.trim();
    if (val) {
      const next = [...selectedTopics];
      next[editingIdx] = val;
      onChangeSelected(next);
    }
    setEditingIdx(null);
  }
  function addCandidate(t: string) {
    if (selectedTopics.length < TOPIC_CAP) onChangeSelected([...selectedTopics, t]);
  }
  function addCustom() {
    const val = customInput.trim();
    if (val && selectedTopics.length < TOPIC_CAP) {
      onAddCustomTopic(val);
      setCustomInput("");
    }
  }

  return (
    <div className="flex justify-center px-6 py-14">
      <div className="w-full max-w-[640px] rounded-2xl border border-white/10 bg-white/[0.045] p-11 shadow-[0_30px_80px_rgba(0,0,0,.6)] backdrop-blur-xl">
        <div className="mb-2.5 text-xs font-semibold uppercase tracking-[.1em] text-[var(--plg-accent)]">
          Setting up your report &middot; Step 1 of 2
        </div>
        <h1 className="mb-2.5 text-[25px] font-bold text-[var(--plg-ink)]">Confirm your topics</h1>
        <p className="mb-5.5 max-w-[64ch] text-[14.5px] leading-relaxed text-[var(--plg-text2)]">
          These are the shopper categories we&rsquo;ll measure <b className="text-[var(--plg-ink)]">{META.brand}</b>{" "}
          against on Alexa AI. We pre-filled the 5 most relevant.
        </p>

        <div className="mb-5.5 flex gap-3 rounded-[10px] border border-[rgba(90,175,254,.22)] bg-[rgba(90,175,254,.08)] p-3.5">
          <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--plg-accent)] text-[12px] font-bold italic text-[#0B041A]">
            i
          </div>
          <div className="text-[13px] leading-relaxed text-[var(--plg-text2)] [&_b]:text-[var(--plg-ink)]">
            <b>Precision pays off.</b> The closer these topics match how shoppers actually search
            — not just broad category names — the more accurate your AI Visibility score. Rename
            any topic to match your business exactly, or add ones we missed.
          </div>
        </div>

        <div className="mb-2.5 flex items-center justify-between text-[12.5px] text-[var(--plg-muted)]">
          <span>
            <b className="text-[var(--plg-ink)]">{count}</b> of {TOPIC_CAP} selected
          </span>
          {atCap && <span className="text-[var(--plg-error)]">Limit reached</span>}
        </div>

        <div className="mb-4.5 flex flex-wrap gap-2">
          {selectedTopics.length === 0 && (
            <span className="text-[13px] text-[var(--plg-muted)]">
              No topics selected yet — add at least one below.
            </span>
          )}
          {selectedTopics.map((t, idx) =>
            editingIdx === idx ? (
              <span key={idx} className="inline-flex items-center gap-1.5">
                <input
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitEdit();
                    if (e.key === "Escape") setEditingIdx(null);
                  }}
                  className="min-w-[150px] rounded-full border border-[var(--plg-secondary)] bg-[var(--plg-bg)] px-3 py-1.5 text-[13px] font-medium text-[var(--plg-ink)] outline-none"
                />
              </span>
            ) : (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(90,175,254,.4)] bg-[rgba(90,175,254,.14)] px-3 py-2 text-[13px] font-medium text-[var(--plg-ink)]"
              >
                {t}
                <button
                  onClick={() => startEdit(idx)}
                  title="Rename this topic"
                  className="text-[12px] text-[var(--plg-muted)] hover:text-[var(--plg-indigo)]"
                >
                  ✎
                </button>
                <button
                  onClick={() => removeAt(idx)}
                  className="text-[12px] font-bold text-[var(--plg-indigo)] hover:text-[var(--plg-error)]"
                >
                  ✕
                </button>
              </span>
            )
          )}
        </div>

        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
          Add more{" "}
          <span className="font-normal normal-case tracking-normal text-[var(--plg-muted)]">
            (click a topic to select it, or edit any selected topic above)
          </span>
        </div>
        <div className="mb-4.5 flex flex-wrap gap-2">
          {candidates.map((t) => (
            <button
              key={t}
              onClick={() => addCandidate(t)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[13px] font-medium text-[var(--plg-text2)] hover:border-[var(--plg-secondary)]"
            >
              {t}
              <span className="font-bold text-[var(--plg-muted)]">+</span>
            </button>
          ))}
        </div>

        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
          Add a custom topic
        </div>
        <div className="mb-1 flex gap-2">
          <input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustom()}
            placeholder="e.g. limited ingredient dog treats"
            className="flex-1 rounded-[10px] border border-white/10 bg-white/[0.035] px-3.5 py-2.5 text-[13.5px] text-[var(--plg-ink)] outline-none focus:border-[var(--plg-secondary)]"
          />
          <button
            onClick={addCustom}
            className="rounded-[10px] border border-white/10 bg-white/[0.045] px-4.5 py-2.5 text-[13.5px] font-semibold text-[var(--plg-ink)] hover:border-[var(--plg-indigo)] hover:text-[var(--plg-indigo)]"
          >
            Add
          </button>
        </div>

        <PrimaryButton
          className={cn("mt-2.5 w-full !py-3")}
          disabled={selectedTopics.length === 0}
          onClick={onContinue}
        >
          Continue
        </PrimaryButton>
        <div className="mt-4.5 text-xs leading-relaxed text-[var(--plg-muted)]">
          Next, we&rsquo;ll show you the shopper prompts behind each topic before generating your
          report.
        </div>
      </div>
    </div>
  );
}
