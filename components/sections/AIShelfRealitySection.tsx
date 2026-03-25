"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { aiShelfReality } from "@/data/siteContent";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function AIShelfRealitySection() {
  const { heading, subheading, narrative, stats } = aiShelfReality;

  return (
    <SectionShell id="ai-shelf" dark>
      <ContentContainer size="wide">
        <SectionHeading
          eyebrow="The Shift"
          heading={heading}
          subheading={subheading}
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Narrative */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.p
              variants={fadeInUp}
              className="text-lg text-text-secondary leading-relaxed"
            >
              {narrative}
            </motion.p>

            {/* Old vs New Model */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="rounded-xl border border-border bg-midnight-light p-5">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-muted mb-3">
                  Old Model
                </p>
                <div className="flex items-center gap-3 text-text-secondary">
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
                    Search
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
                    Click
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600">
                    Purchase
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-cyan/30 bg-midnight-light p-5">
                <p className="text-xs uppercase tracking-[0.2em] font-medium text-cyan mb-3">
                  New Model
                </p>
                <div className="flex items-center gap-3 text-text-primary">
                  <span className="rounded-lg bg-cyan/10 px-3 py-1.5 text-sm font-medium text-cyan">
                    Ask
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan flex-shrink-0" />
                  <span className="rounded-lg bg-cyan/10 px-3 py-1.5 text-sm font-medium text-cyan">
                    Answer
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan flex-shrink-0" />
                  <span className="rounded-lg bg-cyan/10 px-3 py-1.5 text-sm font-medium text-cyan">
                    Purchase
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Stat Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className={cn(
                  "rounded-xl border border-border bg-midnight-light p-8 transition-all duration-300 hover:border-cyan/30",
                  i === 0 && "lg:mt-8"
                )}
              >
                <p className="text-5xl md:text-6xl font-bold text-gradient-cyan mb-3">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-base">{stat.label}</p>
                {stat.source && (
                  <p className="text-text-muted text-xs mt-2">{stat.source}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ContentContainer>
    </SectionShell>
  );
}
