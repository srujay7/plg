import type { Metadata } from "next";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/pricing/PricingCard";
import { PricingTable } from "@/components/pricing/PricingTable";
import { GuaranteeSection } from "@/components/pricing/GuaranteeSection";
import { pricingContent } from "@/data/pricingContent";

export const metadata: Metadata = {
  title: "Pricing — Content Agent",
  description:
    "Choose the plan that fits your brand. From AI visibility audits to full AI-powered content operations.",
};

export default function PricingPage() {
  const { tiers, freeOfferings } = pricingContent;

  return (
    <>
      {/* Hero */}
      <SectionShell className="pt-32 md:pt-40">
        <ContentContainer size="standard">
          <SectionHeading
            eyebrow="Pricing"
            heading="Win the AI Shelf"
            subheading="AI agents that monitor, optimize, and manage product content across retailers. Choose the plan that fits your brand."
            align="center"
          />
        </ContentContainer>
      </SectionShell>

      {/* Pricing Cards */}
      <SectionShell>
        <ContentContainer size="wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.id} tier={tier} delay={i * 0.1} />
            ))}
          </div>
        </ContentContainer>
      </SectionShell>

      {/* Full Feature Table */}
      <SectionShell dark>
        <ContentContainer size="wide">
          <SectionHeading
            eyebrow="Features"
            heading="Full Feature Comparison"
            subheading="See exactly what's included in each plan."
            align="center"
            className="mb-12"
          />
          <PricingTable />
        </ContentContainer>
      </SectionShell>

      {/* Guarantee */}
      <SectionShell>
        <ContentContainer>
          <GuaranteeSection />
        </ContentContainer>
      </SectionShell>

      {/* Free Offerings */}
      <SectionShell dark>
        <ContentContainer>
          <SectionHeading
            eyebrow="Get Started Free"
            heading="Try Before You Buy"
            subheading="Start with a free AI visibility report or a trial on 10 SKUs."
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {freeOfferings.map((offering) => (
              <div
                key={offering.id}
                className="rounded-xl border border-border bg-midnight-light p-8"
              >
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {offering.name}
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  {offering.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {offering.features.map((f) => (
                    <li
                      key={f}
                      className="text-sm text-text-primary flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href={offering.cta.href} variant="secondary" size="md">
                  {offering.cta.label}
                </Button>
              </div>
            ))}
          </div>
        </ContentContainer>
      </SectionShell>

      {/* CTA */}
      <SectionShell>
        <ContentContainer size="narrow">
          <div className="text-center">
            <SectionHeading
              heading="Start by seeing your AI visibility"
              subheading="Get a free AI visibility report and see where your brand stands on the AI shelf."
              align="center"
            />
            <div className="mt-10">
              <Button href="#book-demo" size="lg">
                Get your free report
              </Button>
            </div>
          </div>
        </ContentContainer>
      </SectionShell>
    </>
  );
}
