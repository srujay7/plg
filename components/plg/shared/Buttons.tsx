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
        "rounded-md bg-gradient-to-r from-[var(--plg-accent)] to-[var(--plg-secondary)] px-5 py-3 text-sm font-semibold text-[#0B041A] shadow-[0_8px_22px_rgba(90,175,254,.3)] transition hover:brightness-105 active:translate-y-px disabled:cursor-not-allowed disabled:bg-none disabled:bg-[var(--plg-hair)] disabled:text-[var(--plg-muted)] disabled:shadow-none",
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
        "rounded-md border-[1.5px] border-[var(--plg-indigo)] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-[var(--plg-indigo)] transition hover:bg-[rgba(138,141,255,.10)] active:translate-y-px",
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
          : "border-white/10 bg-white/[0.03] text-[var(--plg-text2)] hover:border-[var(--plg-secondary)]",
        className
      )}
    />
  );
}
