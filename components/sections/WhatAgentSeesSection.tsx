"use client";

import { motion } from "framer-motion";
import {
  Users,
  ShoppingCart,
  Database,
  Radar,
  Store,
  Shield,
  Bot,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { whatAgentSees } from "@/data/siteContent";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  Users,
  ShoppingCart,
  Database,
  Radar,
  Store,
  Shield,
  Bot,
  TrendingUp,
};

export function WhatAgentSeesSection() {
  const { heading, subheading, signals } = whatAgentSees;

  return (
    <SectionShell id="what-agent-sees" dark>
      <ContentContainer size="wide">
        <SectionHeading
          eyebrow="Intelligence"
          heading={heading}
          subheading={subheading}
          align="center"
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {signals.map((signal) => {
            const Icon = iconMap[signal.icon];
            return (
              <motion.div
                key={signal.title}
                variants={fadeInUp}
                className={cn(
                  "rounded-xl border border-border bg-midnight-light p-6",
                  "transition-all duration-300 hover:border-cyan/30 group"
                )}
              >
                {Icon && (
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-cyan" />
                  </div>
                )}
                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {signal.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {signal.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </ContentContainer>
    </SectionShell>
  );
}
