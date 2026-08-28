"use client";

import { useEffect, useState } from "react";
import { TCAR_TESTIMONIALS } from "@/data/plgReportData";

// Auto-advancing testimonial rail shown alongside the sign-up form (right half of the
// full-bleed split layout). Ported from the mock's tcarAdvance()/setInterval logic,
// rewritten as a React useEffect/useState instead of direct DOM manipulation.
export function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % TCAR_TESTIMONIALS.length);
        setVisible(true);
      }, 300);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const n = TCAR_TESTIMONIALS.length;
  const current = TCAR_TESTIMONIALS[idx % n];
  const peek = TCAR_TESTIMONIALS[(idx + 1) % n];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden border-l border-[var(--plg-hair)] bg-[var(--plg-surface)] p-14">
      <div className="plg-dotfield" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[440px]">
        <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--plg-accent)]">
          What customers are saying
        </div>
        <div className="relative flex gap-3.5 overflow-hidden">
          <div
            className="plg-glass w-full max-w-[360px] flex-none rounded-xl px-[22px] pb-5 pt-6 shadow-[0_1px_2px_rgba(33,2,53,.04)] transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <p className="mb-5 min-h-[108px] text-[14.5px] leading-relaxed text-[var(--plg-ink)]">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2.5">
              <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--plg-accent)] to-[var(--plg-secondary)] text-[12.5px] font-bold text-[#0B041A]">
                {current.initials}
              </div>
              <div>
                <div className="text-[13px] font-bold text-[var(--plg-ink)]">{current.name}</div>
                <div className="mt-px text-[11.5px] text-[var(--plg-muted)]">{current.role}</div>
              </div>
            </div>
          </div>
          <div className="plg-glass hidden max-w-[360px] flex-none rounded-xl px-[22px] pb-5 pt-6 opacity-30 sm:block">
            <p className="min-h-[108px] text-[14.5px] leading-relaxed text-[var(--plg-ink)]">
              &ldquo;{peek.quote}&rdquo;
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-1.5">
          {TCAR_TESTIMONIALS.map((t, i) => (
            <i
              key={t.name}
              className="block h-1.5 rounded-full transition-all"
              style={{
                width: i === idx % n ? 18 : 6,
                background: i === idx % n ? "var(--plg-accent)" : "var(--plg-gap)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
