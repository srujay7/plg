"use client";

import { cn } from "@/lib/cn";

interface ReportSampleBannerProps {
  className?: string;
}

export function ReportSampleBanner({ className }: ReportSampleBannerProps) {
  return (
    <div
      className={cn(
        "sticky top-16 z-40 border-b border-orange/20 bg-orange/10 backdrop-blur-sm",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-3 text-center sm:flex-row sm:justify-between sm:text-left md:px-8">
        <p className="text-sm font-medium text-orange">
          This is a sample report. Request your custom AI Visibility Report
          below.
        </p>
        <a
          href="#book-demo"
          className="shrink-0 rounded-lg bg-orange px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          Get Your Custom Report
        </a>
      </div>
    </div>
  );
}
