"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { PrimaryButton } from "@/components/plg/shared/Buttons";
import { CurationMasthead } from "@/components/plg/ReportFlow/CurationMasthead";
import { OB_PREFILLED_TOPICS, OB_MORE_TOPICS } from "@/data/plgReportData";

const TOPIC_CAP = 5;
const VISIBLE_CANDIDATES = 5;

// Screen 1 of 2 inside the product (PLG-03, Step 4): pre-filled + candidate topics, custom
// add, rename-in-place, capped at 10. Ported from renderTopicsScreen()/wireTopicsEvents()
// in the report mock.
export function TopicsScreen({
  brand,
  selectedTopics,
  onChangeSelected,
  onContinue,
}: {
  brand: string;
  selectedTopics: string[];
  onChangeSelected: (next: string[]) => void;
  onContinue: () => void;
}) {
  const [showAllCandidates, setShowAllCandidates] = useState(false);

  const allTopics = [...OB_PREFILLED_TOPICS, ...OB_MORE_TOPICS].filter(
    (t, i, arr) => arr.indexOf(t) === i
  );
  const candidates = allTopics.filter((t) => !selectedTopics.includes(t));
  const visibleCandidates = showAllCandidates ? candidates : candidates.slice(0, VISIBLE_CANDIDATES);
  const hiddenCandidateCount = candidates.length - visibleCandidates.length;
  const count = selectedTopics.length;
  const atCap = count >= TOPIC_CAP;

  function removeAt(idx: number) {
    onChangeSelected(selectedTopics.filter((_, i) => i !== idx));
  }
  function addCandidate(t: string) {
    if (selectedTopics.length < TOPIC_CAP) onChangeSelected([...selectedTopics, t]);
  }

  return (
    <div>
      <CurationMasthead brand={brand} />
      <div className="flex justify-center px-6 py-8">
      <div className="w-full max-w-[860px] rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-11 shadow-[0_1px_2px_rgba(33,2,53,.04)]">
        <div className="mb-2.5 text-xs font-semibold uppercase tracking-[.1em] text-[var(--plg-accent)]">
          Setting up your report &middot; Step 1 of 2
        </div>
        <h1 className="mb-2.5 text-[25px] font-bold text-[var(--plg-ink)]">Confirm your topics</h1>
        <p className="mb-5.5 max-w-[64ch] text-[14.5px] leading-relaxed text-[var(--plg-text2)]">
          These are the shopper categories we&rsquo;ll measure <b className="text-[var(--plg-ink)]">{brand}</b>{" "}
          against on Alexa AI. We pre-filled the 5 most relevant.
        </p>

        <div className="mb-5.5 flex gap-3 rounded-[10px] border border-[rgba(90,175,254,.22)] bg-[rgba(90,175,254,.08)] p-3.5">
          <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--plg-accent)] text-[12px] font-bold italic text-[#0B041A]">
            i
          </div>
          <div className="text-[13px] leading-relaxed text-[var(--plg-text2)] [&_b]:text-[var(--plg-ink)]">
            <b>Precision pays off.</b> The closer these topics match how shoppers actually search
            — not just broad category names — the more accurate your AI Visibility score.
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
          {selectedTopics.map((t, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(90,175,254,.4)] bg-[rgba(90,175,254,.14)] px-3 py-2 text-[13px] font-medium text-[var(--plg-ink)]"
            >
              {t}
              <button
                onClick={() => removeAt(idx)}
                className="text-[12px] font-bold text-[var(--plg-indigo)] hover:text-[var(--plg-error)]"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
          Add more{" "}
          <span className="font-normal normal-case tracking-normal text-[var(--plg-muted)]">
            (click a topic to select it)
          </span>
        </div>
        <div className="mb-2 flex flex-wrap gap-2">
          {visibleCandidates.map((t) => (
            <button
              key={t}
              onClick={() => addCandidate(t)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3 py-2 text-[13px] font-medium text-[var(--plg-text2)] hover:border-[var(--plg-secondary)]"
            >
              {t}
              <span className="font-bold text-[var(--plg-muted)]">+</span>
            </button>
          ))}
        </div>
        <div className="mb-4.5">
          {!showAllCandidates && hiddenCandidateCount > 0 && (
            <button
              onClick={() => setShowAllCandidates(true)}
              className="text-[12.5px] font-semibold text-[var(--plg-indigo)] hover:underline"
            >
              More suggested topics ({hiddenCandidateCount})
            </button>
          )}
          {showAllCandidates && candidates.length > VISIBLE_CANDIDATES && (
            <button
              onClick={() => setShowAllCandidates(false)}
              className="text-[12.5px] font-semibold text-[var(--plg-indigo)] hover:underline"
            >
              Show fewer topics
            </button>
          )}
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
    </div>
  );
}
