"use client";

import { useReportModal } from "./ReportModalProvider";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

interface ReportButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

export function ReportButton({
  variant = "primary",
  size = "lg",
  className,
  children,
}: ReportButtonProps) {
  const { open } = useReportModal();

  return (
    <Button variant={variant} size={size} className={className} onClick={open}>
      {children}
    </Button>
  );
}
