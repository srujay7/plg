"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { Shield } from "lucide-react";
import { pricingContent } from "@/data/pricingContent";

export function GuaranteeSection() {
  const { guarantee } = pricingContent;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="rounded-xl border border-cyan/30 bg-cyan/[0.03] p-8 md:p-12 flex flex-col md:flex-row items-start gap-6"
    >
      <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
        <Shield className="w-6 h-6 text-cyan" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-2">
          {guarantee.heading}
        </h3>
        <p className="text-text-secondary max-w-2xl">{guarantee.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {["AI visibility", "Search ranking", "Content compliance", "PDP performance"].map(
            (metric) => (
              <span
                key={metric}
                className="px-3 py-1 rounded-full bg-cyan/10 text-cyan text-xs font-medium"
              >
                {metric}
              </span>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}
