"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { easing } from "@/lib/motion";

interface ConnectorPulseProps {
  isActive: boolean;
  from: "left" | "right" | "bottom";
  delay?: number;
  className?: string;
}

export function ConnectorPulse({
  isActive,
  from,
  delay = 0,
  className,
}: ConnectorPulseProps) {
  const isHorizontal = from === "left" || from === "right";

  return (
    <div
      className={cn(
        "relative",
        isHorizontal ? "h-px w-full" : "w-px h-full",
        className
      )}
    >
      {/* Static line */}
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-500",
          isActive ? "bg-cyan/20" : "bg-border"
        )}
      />

      {/* Traveling pulse */}
      {isActive && (
        <motion.div
          className={cn(
            "absolute rounded-full bg-cyan",
            isHorizontal ? "h-px w-8" : "w-px h-8"
          )}
          style={{
            boxShadow: "0 0 8px rgba(16,185,129,0.6), 0 0 16px rgba(16,185,129,0.3)",
          }}
          initial={
            isHorizontal
              ? { left: from === "left" ? "0%" : "100%", top: 0 }
              : { top: "100%", left: 0 }
          }
          animate={
            isHorizontal
              ? {
                  left: from === "left" ? ["0%", "100%"] : ["100%", "0%"],
                }
              : { top: ["100%", "0%"] }
          }
          transition={{
            duration: 0.6,
            delay,
            ease: easing.outCubic,
          }}
        />
      )}
    </div>
  );
}
