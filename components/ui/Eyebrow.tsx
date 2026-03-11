"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import type { LucideIcon } from "lucide-react";

interface EyebrowProps {
  children: string;
  icon?: LucideIcon;
  className?: string;
}

export function Eyebrow({ children, icon: Icon, className }: EyebrowProps) {
  return (
    <motion.p
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={cn(
        "text-xs uppercase tracking-[0.2em] font-medium text-cyan inline-flex items-center gap-2",
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.p>
  );
}
