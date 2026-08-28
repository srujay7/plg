"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

// Shared CTA button styles used across sign-up and the report (btn-primary / btn-secondary /
// abtn / ctabtns in the mocks all resolve to the same two visual treatments).

export function PrimaryButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-lg bg-[var(--plg-accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(33,2,53,.1)] transition hover:brightness-105 active:translate-y-px disabled:cursor-not-allowed disabled:bg-[var(--plg-hair)] disabled:text-[var(--plg-muted)] disabled:shadow-none",
        className
      )}
    />
  );
}

export function SecondaryButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-lg border-[1.5px] border-[var(--plg-indigo)] bg-white px-5 py-3 text-sm font-semibold text-[var(--plg-indigo)] transition hover:bg-[rgba(31,34,178,.06)] active:translate-y-px",
        className
      )}
    />
  );
}

export function PillButton({
  className,
  active,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-full border px-3.5 py-2 text-[13px] font-semibold transition",
        active
          ? "border-[var(--plg-indigo-btn)] bg-[var(--plg-indigo-btn)] text-white"
          : "border-[var(--plg-hair)] bg-[var(--plg-surface)] text-[var(--plg-text2)] hover:border-[var(--plg-secondary)]",
        className
      )}
    />
  );
}
