"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { MetricCard } from "@/components/ui/MetricCard";
import { ReportSampleBanner } from "@/components/report/ReportSampleBanner";
import { VisibilityGauge } from "@/components/report/VisibilityGauge";
import { CompetitorRankingChart } from "@/components/report/CompetitorRankingChart";
import { RufusPhraseMatrix } from "@/components/report/RufusPhraseMatrix";
import { ReportRequestModal } from "@/components/report/ReportRequestModal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/cn";
import {
  reportMetadata,
  brandScores,
  keywordData,
  rufusPhrases,
  brandNames,
  skuOptimization,
} from "@/data/sampleReportData";

function YourBrandPill() {
  return (
    <span className="inline-flex items-center rounded-md border border-dashed border-cyan/40 bg-cyan/10 px-2 py-0.5 text-cyan">
      Your Brand
    </span>
  );
}

const yourBrandScore = brandScores.find((b) => b.isYourBrand)!;

export default function SampleReportPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-midnight">
      {/* ── Section 1: Sample Banner ── */}
      <ReportSampleBanner onRequestReport={() => setModalOpen(true)} />

      {/* ── Section 2: Report Header ── */}
      <SectionShell className="py-12 md:py-16">
        <ContentContainer size="wide">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-midnight-light p-8 md:p-12"
          >
            <motion.div variants={fadeInUp}>
              <Tag variant="cyan">AI Visibility Report</Tag>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-3xl font-bold text-text-primary md:text-4xl"
            >
              AI Visibility Report for <YourBrandPill />
            </motion.h1>
            <motion.div
              variants={fadeInUp}
              className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-secondary"
            >
              <span>
                <span className="text-text-muted">Category:</span>{" "}
                {reportMetadata.category}
              </span>
              <span>
                <span className="text-text-muted">Retailer:</span>{" "}
                {reportMetadata.retailer}
              </span>
              <span>
                <span className="text-text-muted">Date:</span>{" "}
                {reportMetadata.date}
              </span>
            </motion.div>
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* ── Section 3: AI Visibility Score ── */}
      <SectionShell dark className="py-12 md:py-16">
        <ContentContainer size="wide">
          <SectionHeading
            eyebrow="AI Visibility Score"
            heading="How visible is your brand to AI?"
            subheading="Your overall AI Visibility Score measures how often AI answer engines cite, mention, and recommend your products."
            align="center"
            className="mb-10"
          />

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Gauge */}
            <div className="relative flex items-center justify-center">
              <VisibilityGauge score={yourBrandScore.score} />
            </div>

            {/* Competitor chart */}
            <CompetitorRankingChart scores={brandScores} />
          </div>

          {/* Summary metrics */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            <MetricCard value="42" label="AI Visibility Score" delay={0} />
            <MetricCard value="#5" label="Category Ranking" delay={0.1} />
            <MetricCard value="2/8" label="Rufus Citations" delay={0.2} />
            <MetricCard value="36" label="Points Below Leader" delay={0.3} />
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* ── Section 4: Top Keywords ── */}
      <SectionShell className="py-12 md:py-16">
        <ContentContainer size="wide">
          <SectionHeading
            eyebrow="Keyword Analysis"
            heading="Top Keywords in Your Category"
            subheading="How your brand ranks for the highest-volume keywords in Athletic Footwear."
            align="center"
            className="mb-12"
          />

          <div className="overflow-x-auto rounded-xl border border-border bg-midnight-light">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Keyword
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
                    Search Volume
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
                    Your Rank
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
                    AI Visibility
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                    Top Brand
                  </th>
                </tr>
              </thead>
              <tbody>
                {keywordData.map((row, i) => (
                  <tr
                    key={row.keyword}
                    className={cn(
                      "border-b border-border/50 transition-colors hover:bg-midnight-lighter/50",
                      i % 2 === 0 && "bg-midnight-light/30"
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-text-primary">
                      {row.keyword}
                    </td>
                    <td className="px-4 py-3 text-right text-text-secondary">
                      {row.searchVolume}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                          row.yourRank === "N/A"
                            ? "border border-dashed border-cyan/40 bg-cyan/10 text-cyan"
                            : "text-text-secondary"
                        )}
                      >
                        {row.yourRank === "N/A" ? "N/A" : `#${row.yourRank}`}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          row.aiVisibility >= 50
                            ? "text-green"
                            : row.aiVisibility >= 30
                            ? "text-orange"
                            : "text-red-400"
                        )}
                      >
                        {row.aiVisibility}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {row.topBrand}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentContainer>
      </SectionShell>

      {/* ── Section 5: Rufus Phrases ── */}
      <SectionShell dark className="py-12 md:py-16">
        <ContentContainer size="wide">
          <SectionHeading
            eyebrow="Answer Engine Analysis"
            heading="Rufus Citation Performance"
            subheading="How brands appear when shoppers ask Amazon Rufus questions about running shoes."
            align="center"
            className="mb-12"
          />

          <div className="rounded-xl border border-border bg-midnight-light p-4 md:p-6">
            <RufusPhraseMatrix phrases={rufusPhrases} brands={brandNames} />
          </div>
        </ContentContainer>
      </SectionShell>

      {/* ── Section 6: SKU Optimization ── */}
      <SectionShell className="py-12 md:py-16">
        <ContentContainer size="wide">
          <SectionHeading
            eyebrow="Optimization Preview"
            heading="How We'd Optimize Your Top SKU"
            subheading="See how Content Agent would rewrite your product listing to improve AI visibility and Rufus citations."
            align="center"
            className="mb-10"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-6"
          >
            {skuOptimization.map((example) => (
              <motion.div
                key={example.type}
                variants={fadeInUp}
                className="overflow-hidden rounded-xl border border-border bg-midnight-light"
              >
                {/* Label bar */}
                <div className="flex items-center gap-3 border-b border-border px-6 py-3">
                  <Tag variant="cyan">{example.label}</Tag>
                </div>

                {/* Before / After panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Before */}
                  <div className="border-border p-6 lg:border-r">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
                      Before
                    </p>
                    <div className="rounded-lg bg-slate-50 p-4">
                      {example.before.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className={cn(
                            "text-sm leading-relaxed text-text-secondary",
                            i > 0 && "mt-2"
                          )}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* After */}
                  <div className="border-t border-border bg-cyan/[0.02] p-6 lg:border-t-0">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-cyan">
                      After
                    </p>
                    <div className="rounded-lg border border-cyan/20 bg-slate-50 p-4">
                      {example.after.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className={cn(
                            "text-sm leading-relaxed text-text-primary",
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
                          <span className="mt-0.5 text-cyan">+</span>
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

      {/* ── Section 7: Bottom CTA ── */}
      <SectionShell dark className="py-12 md:py-16">
        <ContentContainer size="narrow">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl"
            >
              <h2 className="text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                Get Your Custom Report
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
                We&apos;ll analyze your actual keywords, Rufus phrases, and
                competitor landscape to show exactly where your brand stands on
                the AI shelf.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center rounded-lg bg-[#10B981] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Request Custom Report
                </button>
                <a
                  href="https://www.commerceiq.ai/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-border px-8 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  Book a Demo
                </a>
              </div>
            </motion.div>
          </div>
        </ContentContainer>
      </SectionShell>

      {/* ── Report Request Modal ── */}
      <ReportRequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
