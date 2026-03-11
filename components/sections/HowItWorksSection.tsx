"use client";

import { motion } from "framer-motion";
import {
  ListOrdered,
  FileSearch,
  ClipboardCheck,
  Sparkles,
  CheckCircle,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { howItWorks } from "@/data/siteContent";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  ListOrdered,
  FileSearch,
  ClipboardCheck,
  Sparkles,
  CheckCircle,
  Rocket,
};

export function HowItWorksSection() {
  const { heading, subheading, steps } = howItWorks;

  return (
    <SectionShell id="how-it-works">
      <ContentContainer size="wide">
        <SectionHeading
          eyebrow="Process"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className="relative rounded-xl border border-border bg-midnight-light p-6 transition-all duration-300 hover:border-cyan/30 group"
              >
                {/* Step number */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-cyan/30 bg-cyan/10 text-cyan text-sm font-bold">
                    {step.step}
                  </span>
                  {Icon && (
                    <Icon className="w-5 h-5 text-cyan opacity-60 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line for visual timeline effect */}
                {step.step < steps.length && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-px bg-border" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </ContentContainer>
    </SectionShell>
  );
}
