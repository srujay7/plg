"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Check, X } from "lucide-react";
import { pricingContent } from "@/data/pricingContent";

export function PricingTable() {
  const { tiers } = pricingContent;
  // Gather all unique feature names from the first tier (they're all the same list)
  const featureNames = tiers[0].features.map((f) => f.name);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full overflow-x-auto"
    >
      <motion.table variants={fadeInUp} className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-border-bright">
            <th className="py-4 px-4 text-left text-sm font-medium text-text-muted w-1/4">
              Feature
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.id}
                className={cn(
                  "py-4 px-4 text-left text-sm font-medium w-1/4",
                  tier.highlighted ? "text-cyan" : "text-text-primary"
                )}
              >
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureNames.map((featureName, i) => (
            <tr
              key={featureName}
              className={cn(
                "border-b border-border",
                i % 2 === 0 ? "bg-midnight-light" : "bg-midnight"
              )}
            >
              <td className="py-3 px-4 text-sm text-text-primary">
                {featureName}
              </td>
              {tiers.map((tier) => {
                const feature = tier.features.find(
                  (f) => f.name === featureName
                );
                return (
                  <td
                    key={tier.id}
                    className={cn(
                      "py-3 px-4 text-sm",
                      tier.highlighted && "bg-cyan/[0.02]"
                    )}
                  >
                    {feature?.included ? (
                      feature.detail ? (
                        <span className="text-text-primary">
                          {feature.detail}
                        </span>
                      ) : (
                        <Check className="w-4 h-4 text-cyan" />
                      )
                    ) : (
                      <X className="w-4 h-4 text-text-muted/30" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
