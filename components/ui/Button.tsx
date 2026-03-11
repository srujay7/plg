"use client";

import { cn } from "@/lib/cn";
import { type ReactNode, type MouseEventHandler } from "react";

const variantStyles = {
  primary:
    "bg-cyan text-midnight font-semibold hover:glow-cyan-strong hover:scale-[1.03] active:scale-[0.98]",
  secondary:
    "border border-border-bright text-text-primary hover:border-cyan hover:glow-cyan hover:scale-[1.03] active:scale-[0.98]",
  ghost:
    "text-text-secondary hover:text-text-primary hover:scale-[1.03] active:scale-[0.98]",
} as const;

const sizeStyles = {
  sm: "px-4 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-6 py-2.5 text-sm rounded-lg gap-2",
  lg: "px-8 py-3.5 text-base rounded-xl gap-2.5",
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out-expo cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
