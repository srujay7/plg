"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { finalCta } from "@/data/siteContent";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function FinalCTASection() {
  const { headline, subheadline, cta } = finalCta;

  return (
    <SectionShell id="book-demo" className="relative overflow-hidden">
      {/* Radial gradient glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-cyan/[0.06] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-cyan/[0.10] blur-[80px]" />
      </div>

      <ContentContainer size="narrow" className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary"
          >
            {headline}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-text-secondary mt-6 max-w-2xl mx-auto"
          >
            {subheadline}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <Button href={cta.href} size="lg">
              {cta.label}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="#book-demo" variant="secondary" size="lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Talk to our team
            </Button>
          </motion.div>
        </motion.div>
      </ContentContainer>
    </SectionShell>
  );
}
