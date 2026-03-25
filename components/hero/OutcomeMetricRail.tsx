"use client";

import { motion } from "framer-motion";
import { easing } from "@/lib/motion";
import type { OutcomeMetric } from "@/data/heroContent";

interface OutcomeMetricRailProps {
  metrics: OutcomeMetric[];
  isActive: boolean;
}

export function OutcomeMetricRail({
  metrics,
}: OutcomeMetricRailProps) {
  return (
    <motion.div
      className="flex items-center justify-evenly rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easing.outCubic }}
    >
      {metrics.map((metric, i) => (
        <div
          key={metric.label}
          className="flex flex-col items-center"
        >
          <span className="text-xl font-bold font-mono text-emerald-600">
            {metric.value}{metric.change ?? ""}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
            {metric.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
