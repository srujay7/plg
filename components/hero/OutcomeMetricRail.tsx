"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { easing } from "@/lib/motion";
import type { OutcomeMetric } from "@/data/heroContent";

interface OutcomeMetricRailProps {
  metrics: OutcomeMetric[];
  isActive: boolean;
}

function AnimatedNumber({ value, isActive }: { value: string; isActive: boolean }) {
  const numericPart = value.replace(/[^0-9.]/g, "");
  const prefix = value.replace(/[0-9.]/g, "").trim();
  const numericValue = parseFloat(numericPart) || 0;
  const [displayed, setDisplayed] = useState(0);
  const prevValueRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayed(0);
      prevValueRef.current = 0;
      return;
    }

    const startValue = prevValueRef.current;
    const duration = 800;
    const steps = 20;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(startValue + (numericValue - startValue) * eased));

      if (step >= steps) {
        clearInterval(timer);
        setDisplayed(numericValue);
        prevValueRef.current = numericValue;
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isActive, numericValue]);

  return (
    <span>
      {prefix}{isActive ? displayed : 0}
    </span>
  );
}

export function OutcomeMetricRail({
  metrics,
  isActive,
}: OutcomeMetricRailProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-4 rounded-xl border p-3",
        "transition-all duration-500",
        isActive
          ? "border-white/20 bg-navy/80 opacity-100 shadow-lg shadow-white/5"
          : "border-border bg-navy/40 opacity-40"
      )}
      animate={{ scale: isActive ? 1 : 0.97 }}
      transition={{ duration: 0.4, ease: easing.outCubic }}
    >
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          className="flex flex-col items-center min-w-[60px]"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0.4,
            y: isActive ? 0 : 4,
          }}
          transition={{
            duration: 0.4,
            delay: isActive ? i * 0.1 : 0,
            ease: easing.outCubic,
          }}
        >
          <span
            className={cn(
              "text-lg font-bold font-mono transition-colors duration-500",
              isActive ? "text-white" : "text-text-muted"
            )}
          >
            <AnimatedNumber value={metric.value} isActive={isActive} />
            {metric.change && (
              <span className="text-xs ml-0.5">{metric.change}</span>
            )}
          </span>
          <span className="text-[9px] text-text-muted uppercase tracking-wider mt-0.5">
            {metric.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
