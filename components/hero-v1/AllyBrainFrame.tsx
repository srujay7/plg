"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { easing } from "@/lib/motion";
import type { HeroStep } from "@/hooks/useHeroAnimation";
import type { BrainStatus } from "@/data/heroContent";

interface AllyBrainFrameProps {
  currentStep: HeroStep;
  brainStatuses: BrainStatus[];
}

const STEP_TO_STATUS_INDEX: Partial<Record<HeroStep, number>> = {
  "pim-check": 0,
  "retailer-compare": 0,
  "keyword-intelligence": 1,
  "answer-engine": 1,
  "governance-learning": 3,
  "decision-synthesis": 2,
  "outcome-reveal": 4,
};

export function AllyBrainFrame({
  currentStep,
  brainStatuses,
}: AllyBrainFrameProps) {
  const isSynthesis = currentStep === "decision-synthesis";
  const isOutcome = currentStep === "outcome-reveal";
  const isIdle = currentStep === "idle";
  const isProcessing =
    !isIdle && currentStep !== "objective-received";

  const statusIndex = STEP_TO_STATUS_INDEX[currentStep] ?? -1;
  const currentStatus =
    statusIndex >= 0 ? brainStatuses[statusIndex] : null;

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border bg-navy p-4 w-[220px]",
        "flex flex-col items-center gap-3 text-center",
        "transition-shadow duration-700",
        isSynthesis || isOutcome
          ? "border-cyan/50 glow-cyan-strong"
          : isProcessing
            ? "border-cyan/30 glow-cyan"
            : "border-border"
      )}
      animate={{
        scale: isSynthesis ? 1.03 : 1,
      }}
      transition={{ duration: 0.5, ease: easing.outCubic }}
    >
      {/* Inner glow overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none",
          isSynthesis || isOutcome ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-2 relative z-10">
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-colors duration-500",
            isProcessing || isOutcome ? "bg-cyan" : "bg-steel-light"
          )}
        >
          {(isProcessing || isOutcome) && (
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>
        <span className="text-sm font-semibold text-text-primary">
          Content Agent
        </span>
      </div>

      {/* Status text */}
      <div className="h-10 flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {currentStatus ? (
            <motion.p
              key={currentStatus.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: easing.outCubic }}
              className="text-xs text-text-secondary leading-relaxed"
            >
              {currentStatus.label}
            </motion.p>
          ) : (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-text-muted"
            >
              Awaiting objective...
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Processing bar */}
      <div className="w-full h-0.5 bg-steel/30 rounded-full overflow-hidden relative z-10">
        <motion.div
          className="h-full bg-cyan rounded-full"
          animate={{
            width: isProcessing || isOutcome ? "100%" : "0%",
          }}
          transition={{
            duration: isProcessing ? 0.8 : 0.3,
            ease: easing.outCubic,
          }}
        />
      </div>
    </motion.div>
  );
}
