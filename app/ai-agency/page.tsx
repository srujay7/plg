import type { Metadata } from "next";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { AgencyComparisonGraphic } from "@/components/agency/AgencyComparisonGraphic";
import { WorkflowComparison } from "@/components/agency/WorkflowComparison";
import { RetailerCoverageGraphic } from "@/components/agency/RetailerCoverageGraphic";
import { agencyContent } from "@/data/agencyContent";

export const metadata: Metadata = {
  title: "AI Agency — Content Agent",
  description:
    "Replace manual content agencies with an AI-powered content team that continuously optimizes your entire catalog.",
};

export default function AIAgencyPage() {
  const { comparisonRows, benchmarkScenario, measurableOutcomes } =
    agencyContent;

  return (
    <>
      {/* Hero */}
      <SectionShell className="pt-32 md:pt-40">
        <ContentContainer size="standard">
          <SectionHeading
            eyebrow="AI Content Agency"
            heading="Replace Manual Agencies with an AI Content Team"
            subheading="Content Agent combines human expertise with AI agents that continuously analyze, optimize, and execute product content across retailers."
            align="center"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button href="#book-demo" size="lg">
              See Content Agent in action
            </Button>
            <Button variant="secondary" href="#book-demo" size="lg">
              Talk to our team
            </Button>
          </div>
        </ContentContainer>
      </SectionShell>

      {/* Why Traditional Agencies Break */}
      <SectionShell dark>
        <ContentContainer>
          <SectionHeading
            eyebrow="The Problem"
            heading="Why Traditional Agencies Break at Scale"
            subheading="Retail content complexity has grown beyond what manual analyst teams can handle."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: "10,000+",
                desc: "SKUs to manage across multiple retailers",
              },
              {
                stat: "8+",
                desc: "Retailers with different content requirements",
              },
              {
                stat: "3",
                desc: "Analysts trying to cover the entire catalog",
              },
            ].map((item) => (
              <div
                key={item.stat}
                className="rounded-xl border border-border bg-midnight-light p-6"
              >
                <p className="text-3xl font-bold text-text-primary mb-2">
                  {item.stat}
                </p>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </ContentContainer>
      </SectionShell>

      {/* Comparison Table */}
      <SectionShell>
        <ContentContainer>
          <SectionHeading
            eyebrow="Comparison"
            heading="Traditional Agency vs. AI Agency"
            subheading="See how an AI-powered content team compares across every dimension."
          />
          <div className="mt-12">
            <ComparisonTable
              rows={comparisonRows.map((r) => ({
                dimension: r.dimension,
                traditional: r.traditional,
                modern: r.aiAgency,
              }))}
              traditionalLabel="Traditional Agency"
              modernLabel="AI Content Agency"
            />
          </div>
        </ContentContainer>
      </SectionShell>

      {/* Coverage Graphic */}
      <SectionShell dark>
        <ContentContainer>
          <SectionHeading
            eyebrow="Coverage"
            heading="How Much Coverage Are You Actually Getting?"
            subheading={`Example: ${benchmarkScenario.skuCount.toLocaleString()} SKUs, ${benchmarkScenario.retailerCount} retailers, ${benchmarkScenario.analystCount} analysts, ${benchmarkScenario.annualSpend} annual spend.`}
          />
          <div className="mt-12">
            <AgencyComparisonGraphic />
          </div>
        </ContentContainer>
      </SectionShell>

      {/* Workflow Speed */}
      <SectionShell>
        <ContentContainer>
          <SectionHeading
            eyebrow="Speed"
            heading="Weeks to Minutes"
            subheading="Content Agent compresses the entire content operations workflow into a single automated step."
          />
          <div className="mt-12">
            <WorkflowComparison />
          </div>
        </ContentContainer>
      </SectionShell>

      {/* Retailer Coverage */}
      <SectionShell dark>
        <ContentContainer>
          <SectionHeading
            eyebrow="Retailers"
            heading="Full Retailer Coverage"
            subheading="Traditional agencies optimize for 1-3 top retailers. AI agents cover your entire retailer network."
          />
          <div className="mt-12 max-w-2xl">
            <RetailerCoverageGraphic />
          </div>
        </ContentContainer>
      </SectionShell>

      {/* Measurable Outcomes */}
      <SectionShell>
        <ContentContainer>
          <SectionHeading
            eyebrow="Results"
            heading="Measurable Outcomes"
            subheading="Brands using Content Agent see measurable improvements across compliance, traffic, and sales."
            align="center"
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {measurableOutcomes.map((outcome, i) => (
              <MetricCard
                key={outcome.label}
                value={outcome.value}
                label={outcome.label}
                delay={i * 0.1}
              />
            ))}
          </div>
        </ContentContainer>
      </SectionShell>

      {/* CTA */}
      <SectionShell dark>
        <ContentContainer size="narrow">
          <div className="text-center">
            <SectionHeading
              heading="Build Your AI Content Team"
              subheading="Manual agency workflows cannot keep up. Content Agent combines human expertise with AI agents to continuously optimize your entire catalog."
              align="center"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button href="#book-demo" size="lg">
                See Content Agent in action
              </Button>
              <Button variant="secondary" href="#book-demo" size="lg">
                Talk to our team
              </Button>
            </div>
          </div>
        </ContentContainer>
      </SectionShell>
    </>
  );
}
