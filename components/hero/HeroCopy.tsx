"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/data/heroContent";
import { easing } from "@/lib/motion";

interface HeroCopyProps {
  hasIntroPlayed?: boolean;
}

export function HeroCopy({ hasIntroPlayed = true }: HeroCopyProps) {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex pointer-events-none"
      initial={{ justifyContent: "center", alignItems: "center" }}
      animate={
        hasIntroPlayed
          ? { justifyContent: "flex-start", alignItems: "flex-start" }
          : { justifyContent: "center", alignItems: "center" }
      }
      transition={{ duration: 0.6, ease: easing.outExpo }}
    >
      <div
        className={
          hasIntroPlayed
            ? "w-full max-w-7xl mx-auto px-6 pt-24 md:pt-28 lg:pt-32"
            : "w-full max-w-7xl mx-auto px-6"
        }
      >
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
          }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: easing.outExpo },
              },
            }}
            className="text-xs uppercase tracking-[0.2em] font-medium text-cyan mb-4"
          >
            {heroContent.eyebrow}
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: easing.outExpo },
              },
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] mb-5"
          >
            {heroContent.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: easing.outExpo },
              },
            }}
            className="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-lg"
          >
            {heroContent.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: easing.outExpo },
              },
            }}
            className="flex flex-wrap gap-4 pointer-events-auto"
          >
            <Button variant="primary" size="lg" href={heroContent.primaryCta.href}>
              {heroContent.primaryCta.label}
            </Button>
            <Button variant="secondary" size="lg" href={heroContent.secondaryCta.href}>
              {heroContent.secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
