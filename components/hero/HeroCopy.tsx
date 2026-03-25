"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/data/heroContent";
import { purchaseMoments } from "@/data/heroEvents";
import { easing } from "@/lib/motion";

interface HeroCopyProps {
  hasIntroPlayed?: boolean;
  currentMoment?: string | null;
}

export function HeroCopy({
  hasIntroPlayed = true,
  currentMoment = null,
}: HeroCopyProps) {
  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.3 },
          },
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
          className="text-xs uppercase tracking-[0.2em] font-medium text-text-secondary mb-4"
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.05] mb-5"
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
          className="text-sm md:text-base text-text-secondary leading-relaxed mb-6 max-w-md"
        >
          {heroContent.subheadline}
        </motion.p>

        {/* Purchase moment pills */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: easing.outExpo },
            },
          }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {purchaseMoments.map((moment) => {
            const isActive = moment.label === currentMoment;
            return (
              <span
                key={moment.label}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-400 ${
                  isActive
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {moment.label}
              </span>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: easing.outExpo },
            },
          }}
          className="flex flex-wrap gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            href={heroContent.primaryCta.href}
          >
            {heroContent.primaryCta.label}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href={heroContent.secondaryCta.href}
          >
            {heroContent.secondaryCta.label}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
