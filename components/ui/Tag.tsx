import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

const variantStyles = {
  cyan: "bg-cyan-dim text-cyan",
  orange: "bg-orange-dim text-orange",
  violet: "bg-violet-dim text-violet",
  green: "bg-green-dim text-green",
} as const;

type TagVariant = keyof typeof variantStyles;

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

export function Tag({ children, variant = "cyan", className }: TagProps) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium inline-block",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
