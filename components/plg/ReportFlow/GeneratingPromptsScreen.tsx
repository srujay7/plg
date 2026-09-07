"use client";

import { useEffect, useMemo, useState } from "react";

const STEP_MS = 1800;

// Brief transition between Topics and Prompts (PLG-03, Step 5): once topics are finalized,
// curated prompts are fetched and prompts for any uncovered/custom topics are generated live
// — a few LLM calls, so not instant. Streams a single status line + progress bar instead of
// jumping straight to the Prompts screen. Auto-advances via onDone once the bar fills.
export function GeneratingPromptsScreen({ onDone }: { onDone: () => void }) {
  const phrases = useMemo(
    () => ["Fetching curated prompts for your topics…", "Generating your prompts…", "Almost there…"],
    []
  );
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (phraseIdx >= phrases.length - 1) {
      const t = setTimeout(onDone, STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhraseIdx((i) => i + 1), STEP_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phraseIdx, phrases.length]);

  return (
    <div className="flex justify-center px-6 py-24">
      <div className="w-[420px] max-w-full rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-10 text-center shadow-[0_1px_2px_rgba(33,2,53,.04)]">
        <p key={phraseIdx} className="plg-fade-in text-[17px] font-semibold text-[var(--plg-ink)]">
          {phrases[phraseIdx]}
        </p>
        <p className="mx-auto mb-7 mt-2.5 text-[13px] leading-relaxed text-[var(--plg-muted)]">
          This can take up to 30 seconds — please don&rsquo;t close this window.
        </p>
        <div className="plg-bar h-1.5 w-full overflow-hidden rounded-full bg-[var(--plg-surface-2)]">
          <i
            style={{
              width: filled ? "100%" : "0%",
              background: "var(--plg-accent)",
              transitionDuration: `${phrases.length * STEP_MS}ms`,
              transitionTimingFunction: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
