import type { Metadata } from "next";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ReportButton } from "@/components/report/ReportButton";
import { MetricCard } from "@/components/ui/MetricCard";
import { caseStudies } from "@/data/caseStudies";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Customers — Content Agent",
  description:
    "See how brands like Newell transformed content operations with AI-driven optimization.",
};

export default function CustomersPage() {
  const study = caseStudies[0];

  return (
    <>
      {/* Hero */}
      <SectionShell className="pt-32 md:pt-40">
        <ContentContainer size="standard">
          <SectionHeading
            eyebrow={study.company}
            heading={study.headline}
            subheading="How Newell used AI agents to automate product content optimization and dramatically improve operational efficiency."
            align="center"
          />
        </ContentContainer>
      </SectionShell>

      {/* Metrics */}
      <SectionShell>
        <ContentContainer size="wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {study.metrics.map((metric, i) => (
              <MetricCard
                key={metric.label}
                value={metric.value}
                label={metric.label}
                suffix={metric.suffix}
                delay={i * 0.1}
              />
            ))}
          </div>
        </ContentContainer>
      </SectionShell>

      {/* Challenge */}
      <SectionShell dark>
        <ContentContainer>
          <SectionHeading
            eyebrow="The Challenge"
            heading="Manual operations couldn't scale"
          />
          <ul className="mt-8 space-y-4 max-w-3xl">
            {study.challenge.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </ContentContainer>
      </SectionShell>

      {/* Solution */}
      <SectionShell>
        <ContentContainer>
          <SectionHeading
            eyebrow="The Solution"
            heading="AI-powered content operations"
          />
          <ul className="mt-8 space-y-4 max-w-3xl">
            {study.solution.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </ContentContainer>
      </SectionShell>

      {/* Quotes */}
      <SectionShell dark>
        <ContentContainer>
          <SectionHeading
            eyebrow="What the Team Says"
            heading="Customer Perspective"
            className="mb-12"
          />
          <div className="space-y-8 max-w-3xl">
            {study.quotes.map((quote) => (
              <div
                key={quote.author}
                className="rounded-xl border border-border bg-midnight-light p-8"
              >
                <Quote className="w-6 h-6 text-cyan/40 mb-4" />
                <blockquote className="text-lg text-text-primary italic leading-relaxed mb-4">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {quote.author}
                  </p>
                  <p className="text-sm text-text-secondary">{quote.title}</p>
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </SectionShell>

      {/* Result */}
      <SectionShell>
        <ContentContainer size="narrow">
          <div className="text-center">
            <SectionHeading
              heading="Faster execution. Higher quality. Better performance."
              subheading="Newell transformed product content management from a manual operational burden into an automated, AI-driven system capable of scaling across the catalog."
              align="center"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <ReportButton size="lg">
                See Content Agent in action
              </ReportButton>
              <Button variant="secondary" href="https://www.commerceiq.ai/demo" size="lg">
                Talk to our team
              </Button>
            </div>
          </div>
        </ContentContainer>
      </SectionShell>
    </>
  );
}
