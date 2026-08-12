"use client";

import { cn } from "@/lib/cn";
import { META } from "@/data/plgReportData";

export type ProductScreen = "topics" | "prompts" | "wait" | "report";

const NAV_MAP: Record<string, ProductScreen> = { home: "report", topics: "topics", prompts: "prompts" };

// Persistent Home / Topics / Prompts nav so users can jump back into topic or prompt
// curation any time, not just as a one-time setup gate — per the report mock's refinement
// note. Report actions (copy link / export / share / request pilot) + the permalink bar
// only show once the report itself is showing.
export function Topbar({
  screen,
  onNavigate,
  onCopyLink,
  onExport,
  onShare,
  onPilotClick,
}: {
  screen: ProductScreen;
  onNavigate: (screen: ProductScreen) => void;
  onCopyLink: () => void;
  onExport: () => void;
  onShare: () => void;
  onPilotClick: () => void;
}) {
  const showActions = screen === "report";
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(7,4,13,.72)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1120px] flex-wrap items-center justify-between gap-4 px-7 py-2">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2.5 font-bold tracking-tight text-[var(--plg-ink)]">
            <span
              className="h-2.5 w-2.5 rounded-[3px] shadow-[0_0_12px_rgba(90,175,254,.5)]"
              style={{
                background:
                  "conic-gradient(from 210deg,var(--plg-accent),var(--plg-indigo),var(--plg-secondary),var(--plg-accent))",
              }}
            />
            CommerceIQ
          </div>
          <nav className="flex items-center gap-1">
            {(["home", "topics", "prompts"] as const).map((key) => (
              <button
                key={key}
                onClick={() => onNavigate(NAV_MAP[key])}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-[13.5px] font-semibold capitalize text-[var(--plg-muted)] hover:bg-white/[0.035] hover:text-[var(--plg-ink)]",
                  NAV_MAP[key] === screen && "bg-[rgba(90,175,254,.14)] text-[var(--plg-ink)]"
                )}
              >
                {key}
              </button>
            ))}
          </nav>
        </div>
        {showActions && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onCopyLink}
              className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[13px] font-semibold text-[var(--plg-ink)] hover:border-[var(--plg-indigo)] hover:text-[var(--plg-indigo)]"
            >
              Copy link
            </button>
            <button
              onClick={onExport}
              className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[13px] font-semibold text-[var(--plg-ink)] hover:border-[var(--plg-indigo)] hover:text-[var(--plg-indigo)]"
            >
              Export PDF
            </button>
            <button
              onClick={onShare}
              className="rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-[13px] font-semibold text-[var(--plg-ink)] hover:border-[var(--plg-indigo)] hover:text-[var(--plg-indigo)]"
            >
              Share via email
            </button>
            <button
              onClick={onPilotClick}
              className="rounded-full bg-gradient-to-r from-[var(--plg-accent)] to-[var(--plg-secondary)] px-3.5 py-2 text-[13px] font-semibold text-[#0B041A] shadow-[0_6px_20px_rgba(90,175,254,.35)] hover:brightness-105"
            >
              Request a pilot
            </button>
          </div>
        )}
      </div>
      {showActions && (
        <div className="mx-auto max-w-[1120px] px-7 pb-1.5 text-[11.5px] text-[var(--plg-gap)]">
          Live at{" "}
          <code className="rounded-md bg-white/[0.035] px-1.5 py-0.5 text-[var(--plg-muted)]">
            content.commerceiq.ai/r/{META.reportId}
          </code>{" "}
          — anyone with this link can view, no login required.
        </div>
      )}
    </div>
  );
}
