import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerSize = "narrow" | "standard" | "wide" | "full";

interface ContentContainerProps {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
}

const sizeClasses: Record<ContainerSize, string> = {
  narrow: "max-w-3xl",
  standard: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-full",
};

export function ContentContainer({
  size = "standard",
  className,
  children,
}: ContentContainerProps) {
  return (
    <div className={cn("mx-auto px-6 md:px-8", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
