"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Zap,
  GraduationCap,
  Gift,
  Trophy,
  Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { momentsOfPurchase } from "@/data/siteContent";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

const eventIcons: Record<string, LucideIcon> = {
  "Valentine's Day": Heart,
  "Prime Day": Zap,
  "Back to School": GraduationCap,
  Holiday: Gift,
  "Super Bowl": Trophy,
  "Black Friday": Tag,
};

const eventEmojis: Record<string, string> = {
  "Valentine's Day": "\u2764\uFE0F",
  "Prime Day": "\u26A1",
  "Back to School": "\uD83C\uDF92",
  Holiday: "\uD83C\uDF81",
  "Super Bowl": "\uD83C\uDFC8",
  "Black Friday": "\uD83C\uDFF7\uFE0F",
};

export function MomentsOfPurchaseSection() {
  const { heading, subheading, events } = momentsOfPurchase;

  return (
    <SectionShell id="moments">
      <ContentContainer size="wide">
        <SectionHeading
          eyebrow="Adaptive Content"
          heading={heading}
          subheading={subheading}
          align="center"
          className="mb-16"
        />

        {/* Horizontal scrollable timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-[60px] left-0 right-0 h-px bg-border" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible"
          >
            {events.map((event) => {
              const Icon = eventIcons[event.name];
              const emoji = eventEmojis[event.name];

              return (
                <motion.div
                  key={event.name}
                  variants={fadeInUp}
                  className={cn(
                    "min-w-[260px] md:min-w-0 snap-start",
                    "rounded-xl border border-border bg-midnight-light p-5",
                    "transition-all duration-300 hover:border-cyan/30 group flex flex-col"
                  )}
                >
                  {/* Icon / Emoji */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{emoji}</span>
                    {Icon && (
                      <Icon className="w-5 h-5 text-cyan opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-cyan/40 border-2 border-cyan group-hover:bg-cyan transition-colors" />
                  </div>

                  <h3 className="text-sm font-semibold text-text-primary mb-2">
                    {event.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed flex-1">
                    {event.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </ContentContainer>
    </SectionShell>
  );
}
