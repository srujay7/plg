"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { RETAILER_OPTIONS } from "@/data/retailers";

// Retailer switcher shown in the report's top header — always Amazon (US) in v1, with every
// other retailer visible but locked. Not a real switcher yet (there's nothing to switch to),
// it's a preview of what unlocks on Pro/Enterprise (PLG-09/PLG-14: Walmart, UK, EU).
export function RetailerDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = RETAILER_OPTIONS[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[13px] font-semibold text-[var(--plg-ink)] hover:border-[var(--plg-secondary)]"
      >
        {current.label}
        <span className={cn("text-[10px] text-[var(--plg-muted)] transition-transform", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-40 w-56 rounded-xl border border-white/10 bg-[#0B0714] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,.55)]">
          {RETAILER_OPTIONS.map((r) => (
            <div
              key={r.value}
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[13px]",
                r.enabled
                  ? "cursor-pointer font-semibold text-[var(--plg-ink)] hover:bg-white/[0.05]"
                  : "cursor-not-allowed text-[var(--plg-muted)]"
              )}
              onClick={r.enabled ? () => setOpen(false) : undefined}
            >
              <span className="flex items-center gap-2">
                {r.enabled && <span className="h-1.5 w-1.5 flex-none rounded-full bg-[var(--plg-good)]" />}
                {r.label}
              </span>
              {!r.enabled && (
                <span className="flex flex-none items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.04em] text-[var(--plg-muted)]">
                  🔒 Upgrade
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
