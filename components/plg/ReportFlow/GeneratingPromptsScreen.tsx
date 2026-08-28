"use client";

import { useEffect, useState } from "react";

// Brief transition between Topics and Prompts (PLG-03, Step 5): once topics are finalized,
// curated prompts are fetched and prompts for any uncovered/custom topics are generated live
// — a few LLM calls, so not instant. Shown as a short "drafting your prompts…" state instead
// of jumping straight to the Prompts screen. Auto-advances via onDone after a short delay.
const STEPS = [
  "Fetching curated prompts for your topics…",
  "Generating prompts for any new topics…",
];

export function GeneratingPromptsScreen({ onDone }: { onDone: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (activeIdx >= STEPS.length) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveIdx((i) => i + 1), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  return (
    <div className="flex justify-center px-6 py-20">
      <div className="w-[480px] max-w-full rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-11 text-center shadow-[0_1px_2px_rgba(33,2,53,.04)]">
        <div className="plg-spinner mx-auto mb-5.5" />
        <h1 className="text-[21px] font-semibold text-[var(--plg-ink)]">Drafting your prompts</h1>
        <p className="mx-auto mb-6.5 mt-2.5 text-sm leading-relaxed text-[var(--plg-muted)]">
          Preparing the shopper questions we&rsquo;ll ask for each of your topics.
        </p>
        <div className="flex flex-col gap-3.5 text-left">
          {STEPS.map((label, i) => {
            const done = i < activeIdx;
            const active = i === activeIdx;
            return (
              <div key={label} className="flex items-start gap-2.5 text-[13.5px]">
                <div
                  className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] font-bold"
                  style={{
                    background: done
                      ? "var(--plg-good)"
                      : active
                      ? "var(--plg-indigo)"
                      : "var(--plg-surface-2)",
                    color: done ? "#08281c" : active ? "#fff" : "var(--plg-gap)",
                    border: !done && !active ? "1px solid var(--plg-hair)" : undefined,
                  }}
                >
                  {done ? "✓" : i + 1}
                </div>
                <span
                  className={
                    done
                      ? "text-[var(--plg-muted)] line-through"
                      : active
                      ? "font-semibold text-[var(--plg-ink)]"
                      : "text-[var(--plg-gap)]"
                  }
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
