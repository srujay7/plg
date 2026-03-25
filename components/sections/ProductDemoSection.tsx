"use client";

import { motion } from "framer-motion";
import { productDemo } from "@/data/siteContent";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function ProductDemoSection() {
  const { heading, subheading, examples } = productDemo;

  return (
    <SectionShell id="product-demo" dark>
      <ContentContainer size="wide">
        <SectionHeading
          eyebrow="Before & After"
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
          className="space-y-12"
        >
          {examples.map((example) => (
            <motion.div
              key={example.type}
              variants={fadeInUp}
              className="rounded-xl border border-border bg-midnight-light overflow-hidden"
            >
              {/* Label bar */}
              <div className="px-6 py-3 border-b border-border flex items-center gap-3">
                <Tag variant="cyan">{example.label}</Tag>
              </div>

              {/* Before / After panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Before */}
                <div className="p-6 lg:border-r border-border">
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-text-muted mb-4">
                    Before
                  </p>
                  <div className="rounded-lg bg-slate-50 p-4">
                    {example.before.split("\n").map((line, i) => (
                      <p
                        key={i}
                        className={cn(
                          "text-sm text-text-secondary leading-relaxed",
                          i > 0 && "mt-2"
                        )}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* After */}
                <div className="p-6 border-t lg:border-t-0 border-border bg-cyan/[0.02]">
                  <p className="text-xs uppercase tracking-[0.2em] font-medium text-cyan mb-4">
                    After
                  </p>
                  <div className="rounded-lg bg-slate-50 border border-cyan/20 p-4">
                    {example.after.split("\n").map((line, i) => (
                      <p
                        key={i}
                        className={cn(
                          "text-sm text-text-primary leading-relaxed",
                          i > 0 && "mt-2"
                        )}
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Improvements */}
                  <ul className="mt-4 space-y-2">
                    {example.improvements.map((improvement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-text-secondary"
                      >
                        <span className="text-cyan mt-0.5">+</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ContentContainer>
    </SectionShell>
  );
}
