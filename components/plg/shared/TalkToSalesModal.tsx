"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { PrimaryButton, PillButton } from "@/components/plg/shared/Buttons";

const ORG_SIZE_OPTIONS = ["<100", "100–1,000", "1,000–10,000", "10,000+"] as const;

const inputClass =
  "w-full rounded-[6px] border-[1.5px] border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3.5 py-2.5 text-sm text-[var(--plg-body)] outline-none focus:border-[var(--plg-secondary)] focus:shadow-[0_0_0_3px_rgba(90,175,254,0.25)]";
const labelClass = "mb-1.5 block text-[13px] font-semibold text-[var(--plg-ink)]";

// Every pilot/upgrade CTA in v1 is sales-assisted (PLG-02b / PLG-07) — clicking any of them
// opens this same "register interest" capture, never a self-serve flow.
export function TalkToSalesModal({
  title,
  body,
  onClose,
}: {
  title: string;
  body: string;
  onClose: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orgSize, setOrgSize] = useState<(typeof ORG_SIZE_OPTIONS)[number] | "">("");
  const [lookingFor, setLookingFor] = useState("");

  const canSubmit = firstName.trim() !== "" && lastName.trim() !== "";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(4,2,9,.65)]"
      onClick={onClose}
    >
      <div
        className="relative w-[420px] max-w-full rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-[30px] shadow-[0_8px_24px_rgba(33,2,53,.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-[var(--plg-muted)] transition hover:bg-[var(--plg-surface-2)] hover:text-[var(--plg-ink)]"
        >
          <X size={16} />
        </button>

        <h3 className="mb-2 pr-8 text-[17px] font-semibold text-[var(--plg-ink)]">{title}</h3>
        <p className="mb-5 text-[13.5px] leading-relaxed text-[var(--plg-text2)]">{body}</p>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>First name</label>
            <input
              className={inputClass}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jane"
            />
          </div>
          <div>
            <label className={labelClass}>Last name</label>
            <input
              className={inputClass}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>Org size</label>
          <div className="flex flex-wrap gap-2">
            {ORG_SIZE_OPTIONS.map((option) => (
              <PillButton
                key={option}
                type="button"
                active={orgSize === option}
                onClick={() => setOrgSize(option)}
              >
                {option}
              </PillButton>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className={labelClass}>Tell us more about your business</label>
          <textarea
            className={`${inputClass} min-h-[80px] resize-none`}
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            placeholder="What are you hoping to get out of Content Agent?"
          />
        </div>

        <PrimaryButton className="w-full" disabled={!canSubmit} onClick={onClose}>
          Register interest
        </PrimaryButton>
      </div>
    </div>
  );
}
