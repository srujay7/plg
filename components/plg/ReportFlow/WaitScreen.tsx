"use client";

import { useEffect, useState } from "react";

// Async generation wait-state (PLG-03, Step 7): "up to 10-15 min, we'll email you" — the
// step list animates through automatically here purely for review purposes (in the real
// product this reflects actual backend progress). Auto-advances to the report after a
// short demo delay via the onDone callback.
const STEPS = [
  "Resolved brand → topics",
  "Scoring AI Visibility & AI Rank on Alexa AI",
  "Running competitive stack-up",
  "Tearing down your SKU (SEO + AEO readiness)",
  "Assembling your report",
];

export function WaitScreen({ onDone }: { onDone: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (activeIdx >= STEPS.length) {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveIdx((i) => i + 1), 1100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  const pct = Math.min(100, Math.round((activeIdx / STEPS.length) * 100));

  return (
    <div className="flex justify-center px-6 py-20">
      <div className="w-[520px] max-w-full rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-11 text-center shadow-[0_1px_2px_rgba(33,2,53,.04)]">
        <div className="plg-spinner mx-auto mb-5.5" />
        <h1 className="text-[21px] font-semibold text-[var(--plg-ink)]">
          Generating your AI Visibility audit
        </h1>
        <p className="mx-auto mb-6.5 mt-2.5 text-sm leading-relaxed text-[var(--plg-muted)]">
          This can take up to <b className="text-[var(--plg-ink)]">10&ndash;15 minutes</b>.
          We&rsquo;ll email you when it&rsquo;s ready — or check back here.
        </p>
        <div className="mb-2 h-2 overflow-hidden rounded-full bg-[var(--plg-surface-2)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--plg-indigo)] to-[var(--plg-accent)] transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mb-6.5 flex justify-between text-xs text-[var(--plg-muted)]">
          <span>{pct}% complete</span>
          <span>{activeIdx >= STEPS.length ? "almost there" : "~7 min remaining"}</span>
        </div>
        <div className="mb-6.5 flex flex-col gap-3.5 text-left">
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
        <div className="border-t border-[var(--plg-hair)] pt-4.5 text-xs text-[var(--plg-muted)]">
          Feel free to close this tab — nothing is lost. Your report will be waiting at its
          permanent link.
        </div>
      </div>
    </div>
  );
}
