"use client";

import { cn } from "@/lib/cn";
import { Check, Circle, X } from "lucide-react";
import type { CitationStatus, RufusPhrase } from "@/data/sampleReportData";

interface RufusPhraseMatrixProps {
  phrases: RufusPhrase[];
  brands: readonly string[];
  className?: string;
}

function StatusIcon({ status }: { status: CitationStatus }) {
  switch (status) {
    case "cited":
      return <Check className="h-4 w-4 text-green" />;
    case "mentioned":
      return <Circle className="h-4 w-4 text-orange" />;
    case "not-cited":
      return <X className="h-4 w-4 text-red-400" />;
  }
}

export function RufusPhraseMatrix({
  phrases,
  brands,
  className,
}: RufusPhraseMatrixProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Rufus Prompt
            </th>
            {brands.map((brand) => (
              <th
                key={brand}
                className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-text-muted"
              >
                {brand === "Your Brand" ? (
                  <span className="inline-flex items-center rounded-md border border-dashed border-cyan/40 bg-cyan/10 px-2 py-0.5 text-cyan normal-case text-xs">
                    {brand}
                  </span>
                ) : (
                  brand
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {phrases.map((phrase, i) => (
            <tr
              key={i}
              className={cn(
                "border-b border-border/50 transition-colors hover:bg-midnight-lighter/50",
                i % 2 === 0 && "bg-midnight-light/30"
              )}
            >
              <td className="px-4 py-3 text-text-secondary max-w-xs">
                {phrase.prompt}
              </td>
              {brands.map((brand) => (
                <td key={brand} className="px-3 py-3 text-center">
                  <span className="inline-flex items-center justify-center">
                    <StatusIcon status={phrase.brands[brand]} />
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 text-green" /> Cited in Top 3
        </span>
        <span className="flex items-center gap-1.5">
          <Circle className="h-3.5 w-3.5 text-orange" /> Mentioned
        </span>
        <span className="flex items-center gap-1.5">
          <X className="h-3.5 w-3.5 text-red-400" /> Not Cited
        </span>
      </div>
    </div>
  );
}
