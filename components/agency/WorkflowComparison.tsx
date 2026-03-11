"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { staggerContainer, fadeInUp, easing, timing } from "@/lib/motion";
import { Clock, Zap } from "lucide-react";

const traditionalSteps = [
  "Report on content score",
  "Identify content gaps",
  "Route to local/channel teams",
  "Update PIM",
  "Syndicate to retailer",
  "Wait for confirmation",
];

export function WorkflowComparison() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Traditional */}
      <motion.div
        variants={fadeInUp}
        className="rounded-xl border border-border bg-midnight-light p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-text-muted" />
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-muted">
            Traditional Agency
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {traditionalSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-text-muted w-5 shrink-0">
                {i + 1}.
              </span>
              <div className="flex-1 h-8 rounded bg-steel/20 flex items-center px-3">
                <span className="text-xs text-text-secondary truncate">
                  {step}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm text-text-muted">Time to action</span>
          <span className="text-lg font-semibold text-orange">4-6 weeks</span>
        </div>
      </motion.div>

      {/* AI Agency */}
      <motion.div
        variants={fadeInUp}
        className="rounded-xl border border-cyan/30 bg-cyan/[0.03] p-8 shadow-[0_0_40px_-12px_rgba(0,212,255,0.1)]"
      >
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-4 h-4 text-cyan" />
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-cyan">
            AI Content Agency
          </p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs text-text-muted w-5 shrink-0">1.</span>
          <div className="flex-1 relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{
                duration: timing.slow,
                ease: easing.outExpo,
                delay: 0.5,
              }}
              className="h-8 rounded bg-cyan/15 flex items-center px-3"
            >
              <span className="text-xs text-cyan truncate">
                AI analyzes, optimizes, and publishes
              </span>
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-8">
          Content Agent compresses the entire workflow into a single automated
          step. Teams review and approve — the system handles the rest.
        </p>

        <div className="flex items-center justify-between border-t border-cyan/20 pt-4">
          <span className="text-sm text-text-muted">Time to action</span>
          <span className="text-lg font-semibold text-cyan">Minutes</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
