"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/plg/shared/Buttons";

// Mock history of knowledge previously added — illustrative only, there's no backend
// storing this yet. Represents the kind of standing context (brand facts, house style,
// corrections) that would get retrieved and folded into the agent's prompt on future runs.
const PAST_KNOWLEDGE = [
  {
    text: "Always refer to the brand as “Acme Pet Co.” in generated copy — never “Acme” alone.",
    addedOn: "2026-07-02",
  },
  {
    text: "The senior dog food line is grain-free as of this year — don't describe it as containing grain.",
    addedOn: "2026-06-18",
  },
  {
    text: "Don't mention competitor pricing directly in generated titles or bullets.",
    addedOn: "2026-05-30",
  },
];

// "Train your agent" CTA (ASIN Optimization tab, PLG-04): a preview of feeding standing
// knowledge into the agent's context on future runs. Saving is Pro-gated in v1 — this just
// shows the upgrade prompt, nothing is actually persisted.
export function KnowledgeSpaceModal({ onClose }: { onClose: () => void }) {
  const [note, setNote] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  function handleSave() {
    if (!note.trim()) return;
    setShowUpgrade(true);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(4,2,9,.65)]" onClick={onClose}>
      <div
        className="flex max-h-[85vh] w-[520px] flex-col rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] shadow-[0_8px_24px_rgba(33,2,53,.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--plg-hair)] px-6 py-4.5">
          <div>
            <h3 className="text-[17px] font-semibold text-[var(--plg-ink)]">Knowledge Space</h3>
            <p className="mt-0.5 text-[12.5px] text-[var(--plg-muted)]">
              Teach your agent facts, house style, or corrections to factor into future runs.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[16px] text-[var(--plg-muted)] hover:bg-[var(--plg-surface)] hover:text-[var(--plg-ink)]"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-4.5">
          <label className="mb-1.5 block text-[12.5px] font-semibold text-[var(--plg-ink)]">
            Add new knowledge
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Our packaging switched to recyclable plastic in 2026 — mention this when relevant."
            className="min-h-[90px] w-full resize-y rounded-[8px] border border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[var(--plg-ink)] outline-none focus:border-[var(--plg-secondary)]"
          />
          <div className="mt-2.5 flex items-center justify-between gap-3">
            {showUpgrade ? (
              <div className="text-[12.5px] text-[var(--plg-accent)]">
                <b>Upgrade to Pro</b> to save custom knowledge for your agent.
              </div>
            ) : (
              <span />
            )}
            <PrimaryButton className="flex-none !px-4 !py-2 text-[13px]" onClick={handleSave}>
              Save
            </PrimaryButton>
          </div>

          <div className="mt-6 border-t border-[var(--plg-hair)] pt-4.5">
            <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
              Previously added
            </div>
            <div className="flex flex-col gap-2">
              {PAST_KNOWLEDGE.map((k) => (
                <div
                  key={k.text}
                  className="rounded-lg border border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3.5 py-2.5"
                >
                  <div className="text-[13px] leading-relaxed text-[var(--plg-text2)]">{k.text}</div>
                  <div className="mt-1 text-[11px] text-[var(--plg-muted)]">Added {k.addedOn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
