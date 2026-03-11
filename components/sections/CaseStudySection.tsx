"use client";

import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MetricCard } from "@/components/ui/MetricCard";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function CaseStudySection() {
  const study = caseStudies[0];
  const primaryQuote = study.quotes[0];

  return (
    <SectionShell id="case-study">
      <ContentContainer size="wide">
        <SectionHeading
          eyebrow={study.company}
          heading={study.headline}
          align="center"
          className="mb-16"
        />

        {/* Metric Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {study.metrics.map((metric, i) => (
            <MetricCard
              key={metric.label}
              value={metric.value}
              label={metric.label}
              suffix={metric.suffix}
              delay={i * 0.1}
            />
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          {/* Large quote mark */}
          <Quote className="w-10 h-10 text-cyan/20 mx-auto mb-6" />

          <p className="text-xl md:text-2xl text-text-primary italic leading-relaxed font-light">
            &ldquo;{primaryQuote.text}&rdquo;
          </p>

          <footer className="mt-6">
            <p className="text-sm font-semibold text-text-primary">
              {primaryQuote.author}
            </p>
            <p className="text-xs text-text-muted mt-1">
              {primaryQuote.title}
            </p>
          </footer>
        </motion.blockquote>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Button href="#book-demo" size="lg">
            See how Content Agent can work for you
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </ContentContainer>
    </SectionShell>
  );
}
