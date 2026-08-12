"use client";

import { PrimaryButton } from "@/components/plg/shared/Buttons";

// Every pilot/upgrade CTA in v1 is sales-assisted (PLG-02b / PLG-07) — clicking any of them
// opens this same "talk to sales" capture, never a self-serve flow.
export function TalkToSalesModal({
  title,
  body,
  onClose,
}: {
  title: string;
  body: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(4,2,9,.65)]"
      onClick={onClose}
    >
      <div
        className="w-[380px] rounded-2xl border border-white/10 bg-[#120B1E] p-[30px] shadow-[0_24px_70px_rgba(0,0,0,.55)] backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-[17px] font-semibold text-[var(--plg-ink)]">{title}</h3>
        <p className="mb-5 text-[13.5px] leading-relaxed text-[var(--plg-text2)]">{body}</p>
        <PrimaryButton className="mb-2.5 w-full" onClick={onClose}>
          Submit request
        </PrimaryButton>
        <button
          className="w-full text-center text-[13px] text-[var(--plg-muted)]"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
