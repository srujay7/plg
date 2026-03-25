"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { pricingContent } from "@/data/pricingContent";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ReportButton } from "@/components/report/ReportButton";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function PricingSection() {
  const { heading, subheading, tiers, freeOfferings } = pricingContent;

  return (
    <SectionShell id="pricing">
      <ContentContainer size="wide">
        <SectionHeading
          eyebrow="Pricing"
          heading={heading}
          subheading={subheading}
          align="center"
          className="mb-16"
        />

        {/* Pricing Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={fadeInUp}
              className={cn(
                "rounded-xl border p-6 flex flex-col transition-all duration-300",
                tier.highlighted
                  ? "border-cyan/50 bg-cyan/[0.03] shadow-[0_0_40px_-12px_rgba(16,185,129,0.15)]"
                  : "border-border bg-midnight-light hover:border-cyan/30"
              )}
            >
              {/* Header */}
              <div className="mb-6">
                {tier.highlighted && (
                  <span className="inline-block text-xs uppercase tracking-[0.2em] font-medium text-cyan mb-2">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-text-primary">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-text-primary">
                    {tier.price}
                  </span>
                  {tier.priceDetail && (
                    <span className="text-sm text-text-muted">
                      {tier.priceDetail}
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mt-3">
                  {tier.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-cyan mt-0.5 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-text-muted/40 mt-0.5 flex-shrink-0" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        feature.included
                          ? "text-text-secondary"
                          : "text-text-muted/40"
                      )}
                    >
                      {feature.name}
                      {feature.detail && (
                        <span className="text-text-muted ml-1">
                          ({feature.detail})
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                href={tier.cta.href}
                variant={tier.highlighted ? "primary" : "secondary"}
                size="md"
                className="w-full justify-center"
              >
                {tier.cta.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Free AI Visibility Report CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-xl border border-cyan/20 bg-cyan/[0.03] p-8 text-center"
        >
          <h3 className="text-xl font-bold text-text-primary mb-2">
            {freeOfferings[0].name}
          </h3>
          <p className="text-sm text-text-secondary mb-4 max-w-lg mx-auto">
            {freeOfferings[0].description}
          </p>
          <ul className="flex flex-wrap justify-center gap-4 mb-6">
            {freeOfferings[0].features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-xs text-text-secondary"
              >
                <Check className="w-3.5 h-3.5 text-cyan" />
                {feature}
              </li>
            ))}
          </ul>
          <ReportButton size="lg">
            {freeOfferings[0].cta.label}
            <ArrowRight className="w-4 h-4 ml-2" />
          </ReportButton>
        </motion.div>
      </ContentContainer>
    </SectionShell>
  );
}
