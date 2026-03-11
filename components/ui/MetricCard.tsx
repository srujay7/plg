"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { easing, timing } from "@/lib/motion";

interface MetricCardProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
  className?: string;
}

export function MetricCard({
  value,
  label,
  suffix,
  delay = 0,
  className,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: timing.normal,
        ease: easing.outExpo,
        delay,
      }}
      className={cn(
        "rounded-xl border border-border bg-midnight-light p-6 transition-all duration-300 hover:border-cyan/30 hover:glow-cyan",
        className
      )}
    >
      <p className="text-4xl md:text-5xl font-bold text-gradient-cyan">
        {value}
        {suffix && <span className="text-2xl md:text-3xl">{suffix}</span>}
      </p>
      <p className="text-text-secondary mt-2 text-sm">{label}</p>
    </motion.div>
  );
}
