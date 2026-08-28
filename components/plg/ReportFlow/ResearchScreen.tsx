"use client";

import { useEffect, useMemo, useState } from "react";

// The discovery step between sign-up and Topics (PLG-03, Steps 1-3): resolving the brand
// to categories (Alexa scraper ∪ Claude call), semantic-matching those into the topic bank,
// then the relevance judge ranking the top topics to pre-fill. Not instant in the real
// product, so this is the "engaging progress / streaming state" the PRD calls for instead
// of a blank spinner — auto-advances to Topics via onDone after a short demo delay.
export function ResearchScreen({ brand, onDone }: { brand: string; onDone: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const steps = useMemo(
    () => [
      `Finding the categories ${brand} sells on Amazon…`,
      "Matching to our topic library…",
      "Ranking the topics that fit your brand…",
    ],
    [brand]
  );

  useEffect(() => {
    if (activeIdx >= steps.length) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveIdx((i) => i + 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, steps.length]);

  return (
    <div className="flex justify-center px-6 py-20">
      <div className="w-[480px] max-w-full rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-11 text-center shadow-[0_1px_2px_rgba(33,2,53,.04)]">
        <div className="plg-spinner mx-auto mb-5.5" />
        <h1 className="text-[21px] font-semibold text-[var(--plg-ink)]">Researching {brand}</h1>
        <p className="mx-auto mb-6.5 mt-2.5 text-sm leading-relaxed text-[var(--plg-muted)]">
          Finding the shopper topics we&rsquo;ll measure your AI-shelf visibility against.
        </p>
        <div className="flex flex-col gap-3.5 text-left">
          {steps.map((label, i) => {
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
