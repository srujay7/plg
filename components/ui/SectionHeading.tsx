"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(isCenter && "text-center", className)}
    >
      {eyebrow && (
        <motion.p
          variants={fadeInUp}
          className="text-xs uppercase tracking-[0.2em] font-medium text-cyan mb-4"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary"
      >
        {heading}
      </motion.h2>

      {subheading && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            "text-lg text-text-secondary mt-4 max-w-2xl",
            isCenter && "mx-auto"
          )}
        >
          {subheading}
        </motion.p>
      )}
    </motion.div>
  );
}
