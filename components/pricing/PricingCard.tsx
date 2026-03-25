"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeInUp, easing, timing } from "@/lib/motion";
import { Check, X } from "lucide-react";
import { ReportButton } from "@/components/report/ReportButton";
import type { PricingTier } from "@/data/pricingContent";

interface PricingCardProps {
  tier: PricingTier;
  delay?: number;
}

export function PricingCard({ tier, delay = 0 }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: timing.normal, ease: easing.outExpo, delay }}
      className={cn(
        "rounded-xl border p-8 flex flex-col relative",
        tier.highlighted
          ? "border-cyan/40 bg-cyan/[0.03] glow-cyan"
          : "border-border bg-midnight-light"
      )}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan text-midnight text-xs font-semibold rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-text-primary">{tier.name}</h3>

      <div className="mt-4 mb-2">
        <span className="text-3xl font-bold text-text-primary">
          {tier.price}
        </span>
        {tier.priceDetail && (
          <span className="text-sm text-text-muted ml-1">
            {tier.priceDetail}
          </span>
        )}
      </div>

      <p className="text-sm text-text-secondary mb-6">{tier.description}</p>

      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((feature) => (
          <li key={feature.name} className="flex items-start gap-2.5 text-sm">
            {feature.included ? (
              <Check className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
            ) : (
              <X className="w-4 h-4 text-text-muted/40 mt-0.5 shrink-0" />
            )}
            <span
              className={cn(
                feature.included ? "text-text-primary" : "text-text-muted/40"
              )}
            >
              {feature.name}
              {feature.detail && (
                <span className="text-text-secondary ml-1">
                  ({feature.detail})
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <ReportButton
        variant={tier.highlighted ? "primary" : "secondary"}
        size="lg"
        className="w-full justify-center"
      >
        {tier.cta.label}
      </ReportButton>
    </motion.div>
  );
}
