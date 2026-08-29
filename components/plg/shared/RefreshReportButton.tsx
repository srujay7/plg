"use client";

import { useEffect, useRef, useState } from "react";
import { META } from "@/data/plgReportData";
import { fmtDate } from "@/lib/plg";

// "Refresh report" CTA shown on the Brand/Topic/Prompt tabs — refreshing on demand is
// Pro-gated in v1 (Free reports are a one-time snapshot), so this only ever shows the
// upgrade prompt rather than actually re-running anything.
export function RefreshReportButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex-none text-right">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--plg-hair)] px-3.5 py-2 text-[13px] font-semibold text-[var(--plg-text2)] hover:border-[var(--plg-secondary)] hover:text-[var(--plg-ink)]"
      >
        <span aria-hidden>↻</span> Refresh report
      </button>
      <div className="mt-1.5 text-[11.5px] text-[var(--plg-muted)]">Last refreshed {fmtDate(META.runDate)}</div>
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-[240px] rounded-lg border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-3.5 text-left text-[12.5px] leading-relaxed text-[var(--plg-text2)] shadow-[0_14px_34px_rgba(33,2,53,.14)]">
          <b className="text-[var(--plg-ink)]">Upgrade to Pro</b> for weekly data refreshes — Free reports
          are a one-time snapshot.
        </div>
      )}
    </div>
  );
}
