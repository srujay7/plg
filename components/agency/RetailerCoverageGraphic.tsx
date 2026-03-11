"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, easing, timing } from "@/lib/motion";

const retailers = [
  { name: "Amazon", traditional: 90, ai: 100 },
  { name: "Walmart", traditional: 75, ai: 100 },
  { name: "Target", traditional: 40, ai: 100 },
  { name: "Instacart", traditional: 10, ai: 100 },
  { name: "Kroger", traditional: 0, ai: 100 },
  { name: "Regional", traditional: 0, ai: 100 },
];

export function RetailerCoverageGraphic() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-5"
    >
      {/* Legend */}
      <motion.div variants={fadeInUp} className="flex items-center gap-6 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange/60" />
          <span className="text-xs text-text-muted">Traditional agency</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan" />
          <span className="text-xs text-text-muted">AI agency</span>
        </div>
      </motion.div>

      {retailers.map((r, i) => (
        <motion.div key={r.name} variants={fadeInUp} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-primary font-medium">
              {r.name}
            </span>
            <span className="text-xs text-text-muted">
              {r.traditional > 0 ? `${r.traditional}%` : "—"} → {r.ai}%
            </span>
          </div>
          <div className="relative h-5 rounded bg-steel/20 overflow-hidden">
            {/* Traditional bar */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${r.traditional}%` }}
              viewport={{ once: true }}
              transition={{
                duration: timing.slow,
                ease: easing.outExpo,
                delay: 0.2 + i * 0.08,
              }}
              className="absolute inset-y-0 left-0 rounded bg-orange/40"
            />
            {/* AI bar */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${r.ai}%` }}
              viewport={{ once: true }}
              transition={{
                duration: timing.slow,
                ease: easing.outExpo,
                delay: 0.6 + i * 0.08,
              }}
              className="absolute inset-y-0 left-0 rounded bg-gradient-to-r from-cyan/60 to-cyan/30 border border-cyan/20"
              style={{ zIndex: 1 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
