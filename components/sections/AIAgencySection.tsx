"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { agencyContent } from "@/data/agencyContent";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function AIAgencySection() {
  const { heading, subheading, comparisonRows, measurableOutcomes } =
    agencyContent;

  // Map agencyContent rows to the ComparisonTable's expected shape (modern instead of aiAgency)
  const tableRows = comparisonRows.map((row) => ({
    dimension: row.dimension,
    traditional: row.traditional,
    modern: row.aiAgency,
  }));

  return (
    <SectionShell id="ai-agency-compare" dark>
      <ContentContainer size="wide">
        <SectionHeading
          eyebrow="Comparison"
          heading={heading}
          subheading={subheading}
          align="center"
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-12"
        >
          {/* Comparison Table */}
          <ComparisonTable
            rows={tableRows}
            traditionalLabel="Traditional Agency"
            modernLabel="AI Content Agency"
          />

          {/* Measurable Outcomes */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-cyan text-center mb-6">
              Measurable Outcomes
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {measurableOutcomes.map((outcome) => (
                <div
                  key={outcome.label}
                  className="rounded-xl border border-border bg-midnight-light p-4 text-center transition-all duration-300 hover:border-cyan/30"
                >
                  <p className="text-2xl font-bold text-gradient-cyan">
                    {outcome.value}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {outcome.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center pt-4"
          >
            <Button href="/ai-agency" variant="secondary" size="lg">
              Learn more about AI Content Agency
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </ContentContainer>
    </SectionShell>
  );
}
