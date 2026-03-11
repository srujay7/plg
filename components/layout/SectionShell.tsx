"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { sectionReveal } from "@/lib/motion";

interface SectionShellProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Use a slightly lighter background for alternating sections */
  dark?: boolean;
}

export function SectionShell({
  id,
  className,
  children,
  dark = false,
}: SectionShellProps) {
  return (
    <motion.section
      id={id}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "py-24 md:py-32",
        dark ? "bg-[#080c16]" : "bg-transparent",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
