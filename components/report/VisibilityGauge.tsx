"use client";

import { motion } from "framer-motion";
import { easing, timing } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface VisibilityGaugeProps {
  score: number;
  maxScore?: number;
  className?: string;
}

export function VisibilityGauge({
  score,
  maxScore = 100,
  className,
}: VisibilityGaugeProps) {
  const radius = 70;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / maxScore) * circumference;
  const size = (radius + stroke) * 2;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(100, 120, 160, 0.15)"
          strokeWidth={stroke}
        />
        {/* Animated progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - progress }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easing.outExpo }}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>
      </svg>
      {/* Score text overlay */}
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold text-text-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: timing.normal, delay: 0.4 }}
        >
          {score}
        </motion.span>
        <span className="text-sm text-text-muted">/ {maxScore}</span>
      </div>
    </div>
  );
}
