"use client";

import { motion } from "framer-motion";
import { easing } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { BrandScore } from "@/data/sampleReportData";

interface CompetitorRankingChartProps {
  scores: BrandScore[];
  className?: string;
}

export function CompetitorRankingChart({
  scores,
  className,
}: CompetitorRankingChartProps) {
  const maxScore = Math.max(...scores.map((s) => s.score));
  const sorted = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className={cn("space-y-4", className)}>
      {sorted.map((item, i) => (
        <div key={item.brand} className="flex items-center gap-4">
          <span
            className={cn(
              "w-28 shrink-0 text-sm text-right",
              item.isYourBrand
                ? "font-semibold"
                : "text-text-secondary"
            )}
          >
            {item.isYourBrand ? (
              <span className="inline-flex items-center rounded-md border border-dashed border-cyan/40 bg-cyan/10 px-2 py-0.5 text-cyan">
                {item.brand}
              </span>
            ) : (
              item.brand
            )}
          </span>
          <div className="flex-1">
            <motion.div
              className={cn(
                "h-8 rounded-md",
                item.isYourBrand
                  ? "bg-gradient-to-r from-orange/80 to-orange/40"
                  : "bg-gradient-to-r from-cyan/60 to-cyan/20"
              )}
              initial={{ width: 0 }}
              whileInView={{
                width: `${(item.score / maxScore) * 100}%`,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: easing.outExpo,
                delay: i * 0.1,
              }}
            />
          </div>
          <span
            className={cn(
              "w-10 text-sm font-semibold",
              item.isYourBrand ? "text-orange" : "text-text-primary"
            )}
          >
            {item.score}
          </span>
        </div>
      ))}
    </div>
  );
}
