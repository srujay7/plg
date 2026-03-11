"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { easing } from "@/lib/motion";
import { Target } from "lucide-react";

interface ObjectiveCommandBarProps {
  isActive: boolean;
  text: string;
}

export function ObjectiveCommandBar({
  isActive,
  text,
}: ObjectiveCommandBarProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !hasTyped) {
      setDisplayedText("");
      let index = 0;
      intervalRef.current = setInterval(() => {
        index++;
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setHasTyped(true);
        }
      }, 25);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
    if (!isActive) {
      setHasTyped(false);
      setDisplayedText("");
    }
  }, [isActive, text, hasTyped]);

  return (
    <motion.div
      className={cn(
        "relative rounded-full border px-5 py-2.5 max-w-[480px] w-full",
        "flex items-center gap-3",
        "transition-all duration-500",
        isActive
          ? "border-cyan/30 bg-navy-light glow-cyan"
          : "border-border bg-navy/50"
      )}
      animate={{
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ duration: 0.4, ease: easing.outCubic }}
    >
      <Target
        className={cn(
          "w-4 h-4 shrink-0 transition-colors duration-500",
          isActive ? "text-cyan" : "text-text-muted"
        )}
      />
      <span className="text-xs text-text-secondary truncate min-h-[1.2em]">
        {isActive ? displayedText : text}
        {isActive && !hasTyped && (
          <motion.span
            className="inline-block w-px h-3 bg-cyan ml-0.5 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </span>
    </motion.div>
  );
}
