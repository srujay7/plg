"use client";

import { useEffect, useMemo, useState } from "react";

const STEP_MS = 1800;

// The discovery step between sign-up and Topics (PLG-03, Steps 1-3): resolving the brand
// to categories (Alexa scraper ∪ Claude call), semantic-matching those into the topic bank,
// then the relevance judge ranking the top topics to pre-fill. Not instant in the real
// product, so this streams a single status line + progress bar instead of a blank spinner —
// auto-advances to Topics via onDone once the bar fills.
export function ResearchScreen({ brand, onDone }: { brand: string; onDone: () => void }) {
  const phrases = useMemo(
    () => [`Researching ${brand} on Amazon…`, "Curating your topics…", "Almost there…"],
    [brand]
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
