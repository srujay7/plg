"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { staggerContainer, fadeInUp, easing, timing } from "@/lib/motion";

const catalogDots = {
  traditional: 8,
  ai: 40,
};

export function AgencyComparisonGraphic() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Traditional Side */}
      <motion.div
        variants={fadeInUp}
        className="rounded-xl border border-border bg-midnight-light p-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-muted mb-6">
          Traditional Agency
        </p>

        {/* Analyst icons */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex -space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-steel border-2 border-midnight-light flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-text-muted"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 10-16 0" />
                </svg>
              </div>
            ))}
          </div>
          <span className="text-sm text-text-secondary">3 analysts</span>
        </div>

        {/* SKU coverage dots */}
        <p className="text-xs text-text-muted mb-3">SKU coverage</p>
        <div className="grid grid-cols-10 gap-1.5 mb-6">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full",
                i < catalogDots.traditional
                  ? "bg-orange/60"
                  : "bg-steel/30"
              )}
            />
          ))}
        </div>

        {/* Coverage bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Catalog coverage</span>
            <span className="text-orange">~10%</span>
          </div>
          <div className="h-2 rounded-full bg-steel/30 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "10%" }}
              viewport={{ once: true }}
              transition={{ duration: timing.slow, ease: easing.outExpo, delay: 0.3 }}
              className="h-full rounded-full bg-orange/60"
            />
          </div>
        </div>
      </motion.div>

      {/* AI Agency Side */}
      <motion.div
        variants={fadeInUp}
        className="rounded-xl border border-cyan/30 bg-cyan/[0.03] p-8 shadow-[0_0_40px_-12px_rgba(0,212,255,0.1)]"
      >
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-cyan mb-6">
          AI Content Agency
        </p>

        {/* Human + AI icons */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-steel border-2 border-midnight-light flex items-center justify-center z-10">
              <svg
                className="w-4 h-4 text-text-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 10-16 0" />
              </svg>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-cyan/20 border-2 border-cyan/30 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-cyan"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <circle cx="9" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
            ))}
          </div>
          <span className="text-sm text-text-secondary">
            1 human + AI agents
          </span>
        </div>

        {/* SKU coverage dots */}
        <p className="text-xs text-text-muted mb-3">SKU coverage</p>
        <div className="grid grid-cols-10 gap-1.5 mb-6">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.4 + i * 0.02,
                ease: easing.outExpo,
              }}
              className="w-3 h-3 rounded-full bg-cyan/60"
            />
          ))}
        </div>

        {/* Coverage bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Catalog coverage</span>
            <span className="text-cyan">100%</span>
          </div>
          <div className="h-2 rounded-full bg-steel/30 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: timing.slow, ease: easing.outExpo, delay: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan to-blue-400"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
