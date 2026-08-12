"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Plus, Undo2, X as XIcon, ExternalLink, Star } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { staggerContainer, fadeInUp, easing, timing } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { getReport } from "@/data/reportData";
import type { ContentReason, PromptEntry } from "@/data/reportData";

/* ── Helpers ── */

function visColor(v: number) {
  if (v >= 80) return "text-green";
  if (v >= 30) return "text-orange";
  if (v > 0) return "text-orange";
  return "text-red-400";
}

function statusBadge(status: PromptEntry["status"]) {
  const map = {
    critical: { bg: "bg-red-500/10 border-red-500/20", text: "text-red-400", label: "Critical" },
    minimal: { bg: "bg-green/10 border-green/20", text: "text-green", label: "Minimal" },
    risk: { bg: "bg-orange/10 border-orange/20", text: "text-orange", label: "At Risk" },
  };
  const s = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider", s.bg, s.text)}>
      <span className={cn("h-1.5 w-1.5 rounded-full bg-current")} />
      {s.label}
    </span>
  );
}

function reasonIcon(type: ContentReason["type"]) {
  if (type === "add") return <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/15 text-green text-[10px] font-bold"><Plus className="h-3 w-3" /></span>;
  if (type === "remove") return <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-400/15 text-red-400 text-[10px] font-bold"><XIcon className="h-3 w-3" /></span>;
  return <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan text-[10px] font-bold"><Undo2 className="h-3 w-3" /></span>;
}

/* ── Score Ring ── */

function ScoreRing({ score, size = 150 }: { score: number; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        <defs>
          <linearGradient id="reportGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={10} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="url(#reportGaugeGrad)" strokeWidth={10} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - progress }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: easing.outExpo }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold text-text-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: timing.normal, delay: 0.4 }}
        >
          {score}
        </motion.span>
        <span className="text-sm text-text-muted">% visibility</span>
      </div>
    </div>
  );
}

/* ── Catalog Readiness Ring ── */

function CatalogRing({ percent }: { percent: number }) {
  const size = 100;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = (percent / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        <circle cx={50} cy={50} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={9} />
        <motion.circle
          cx={50} cy={50} r={radius} fill="none"
          stroke="#f87171" strokeWidth={9} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - progress }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easing.outExpo }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-red-400">{percent}%</span>
        <span className="text-[10px] text-text-muted">of SKUs</span>
      </div>
    </div>
  );
}

/* ── Section Header ── */

function SectionHeader({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <motion.div variants={fadeInUp} className="mb-6">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="font-serif text-2xl text-cyan/60">{num}</span>
        <h2 className="text-lg font-semibold text-text-primary tracking-tight">{title}</h2>
      </div>
      <p className="ml-9 text-sm text-text-secondary">{desc}</p>
    </motion.div>
  );
}

/* ── Main Page ── */

export default function RufusVisibilityReportPage() {
  const params = useParams();
  const slug = params.brand as string;
  const report = getReport(slug);

  if (!report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-midnight">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary">Report Not Found</h1>
          <p className="mt-2 text-text-secondary">No report found for this brand.</p>
          <a href="/sample-report" className="mt-6 inline-block rounded-lg bg-cyan px-6 py-2.5 text-sm font-semibold text-white">
            Back to Sample Report
          </a>
        </div>
      </div>
    );
  }

  const maxScore = report.leaderboard[0].score;

  return (
    <div className="min-h-screen bg-midnight">
      {/* ── Hero ── */}
      <SectionShell>
        <ContentContainer size="standard">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan mb-4">
              AI Visibility Report
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl font-bold text-text-primary md:text-5xl tracking-tight">
              {report.name}
            </motion.h1>
            <motion.p variants={fadeInUp} className="mt-3 text-text-secondary">
              Amazon Rufus AI Visibility Report &middot; {report.category} &middot; {report.region}
            </motion.p>
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* ── Score Hero ── */}
      <SectionShell dark>
        <ContentContainer size="standard">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeInUp} className="flex flex-col items-stretch overflow-hidden rounded-xl border border-border lg:flex-row">
              {/* Score panel */}
              <div className="flex flex-1 flex-col items-center justify-center border-b border-border bg-midnight-light p-10 lg:border-b-0 lg:border-r">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">AI Visibility Score</p>
                <ScoreRing score={report.score} />
                <p className="mt-4 max-w-[280px] text-center text-sm text-text-secondary leading-relaxed">
                  {report.name} leads with <strong className="text-text-primary">{report.score}% AI visibility</strong> across tracked categories.
                </p>
              </div>
              {/* Rank panel */}
              <div className="flex w-full flex-col items-center justify-center p-10 lg:w-[260px]" style={{ background: "linear-gradient(180deg, rgba(16,185,129,0.03) 0%, rgba(16,185,129,0.08) 100%)" }}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Category Rank</p>
                <span className="text-6xl font-bold text-cyan">#{report.rank}</span>
                <span className="mt-1 text-sm text-text-muted">of {report.totalBrands} brands tracked</span>
                <span className="mt-4 inline-block rounded-full border border-cyan/20 bg-cyan/10 px-4 py-1 text-xs font-semibold text-cyan">
                  {report.verdict}
                </span>
              </div>
            </motion.div>

            {/* Insight strip */}
            <motion.div variants={fadeInUp} className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-midnight-light p-4">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
              <p className="text-sm text-text-secondary leading-relaxed">{report.insightText}</p>
            </motion.div>
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* ── 01: Category Leaderboard ── */}
      <SectionShell>
        <ContentContainer size="standard">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeader num="01" title="Category Leaderboard" desc={`AI Visibility scores for the top ${report.totalBrands} brands tracked across ${report.name}'s ${report.category} categories on Rufus.`} />
            <motion.div variants={fadeInUp} className="overflow-hidden rounded-xl border border-border bg-midnight-light">
              {/* Header */}
              <div className="grid grid-cols-[44px_1fr_200px_80px] gap-2 border-b border-border bg-slate-50 px-5 py-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">#</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Brand</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">AI Visibility</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted text-right">Score</span>
              </div>
              {/* Rows */}
              {report.leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={cn(
                    "grid grid-cols-[44px_1fr_200px_80px] gap-2 items-center px-5 py-3 border-b border-border/40 last:border-b-0 transition-colors",
                    entry.isYou ? "bg-cyan/[0.06] border-l-2 border-l-cyan pl-[18px]" : "hover:bg-slate-50"
                  )}
                >
                  <span className={cn("font-serif text-lg", entry.isYou ? "text-cyan" : "text-text-muted")}>{entry.rank}</span>
                  <span className={cn("text-sm font-medium", entry.isYou ? "font-bold text-cyan" : "text-text-primary")}>
                    {entry.brand}
                    {entry.isYou && <span className="ml-2 inline-block rounded bg-cyan px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">You</span>}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <motion.div
                        className={cn("h-full rounded-full", entry.isYou ? "bg-gradient-to-r from-cyan to-cyan/60" : "bg-slate-300")}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(entry.score / maxScore) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: easing.outExpo, delay: entry.rank * 0.05 }}
                      />
                    </div>
                  </div>
                  <span className={cn("text-right text-sm font-semibold", entry.isYou ? "text-cyan" : "text-text-secondary")}>{entry.score}%</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* ── 02: Prompt-Level Performance ── */}
      <SectionShell dark>
        <ContentContainer size="standard">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeader num="02" title="Prompt-Level Performance" desc={`${report.name} visibility and average rank position across the highest-traffic Rufus prompts in tracked categories.`} />
            <motion.div variants={fadeInUp} className="overflow-x-auto rounded-xl border border-border bg-midnight-light">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-slate-50">
                    <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Shopper Prompt</th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">AI Visibility</th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">AI Rank</th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">Revenue Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {report.prompts.map((p, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-b-0 hover:bg-slate-50">
                      <td className="px-5 py-3 text-sm text-text-primary leading-snug max-w-[380px]">&ldquo;{p.prompt}&rdquo;</td>
                      <td className={cn("px-4 py-3 text-right font-serif text-base font-bold", visColor(p.visibility))}>{p.visibility}%</td>
                      <td className={cn("px-4 py-3 text-right font-serif text-base", p.aiRank === "\u2014" ? "text-text-muted" : "text-text-secondary font-bold")}>{p.aiRank}</td>
                      <td className="px-4 py-3 text-right">{statusBadge(p.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* ── 03: Topic-Level Competition ── */}
      <SectionShell>
        <ContentContainer size="standard">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeader num="03" title="Topic-Level Competition" desc={`${report.name} AI visibility and rank per product category vs. the Rufus category leader.`} />
            <motion.div variants={fadeInUp} className="overflow-x-auto rounded-xl border border-border bg-midnight-light">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-slate-50">
                    <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Topic</th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">AI Visibility</th>
                    <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted">AI Rank</th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted">Category Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {report.topics.map((t, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-b-0 hover:bg-slate-50">
                      <td className="px-5 py-3 text-sm font-semibold text-cyan">{t.topic}</td>
                      <td className={cn("px-4 py-3 text-right font-serif text-base font-bold", visColor(t.visibility))}>{t.visibility}%</td>
                      <td className="px-4 py-3 text-right font-serif text-base font-bold text-text-secondary">{t.aiRank}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
                            style={{ background: t.winnerColor }}
                          >
                            {t.winnerInitials}
                          </span>
                          <span className="text-sm font-medium text-text-primary">{t.winnerName}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* ── 04: SKU Optimization ── */}
      <SectionShell dark>
        <ContentContainer size="standard">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeader num="04" title={`Rufus Optimized Content`} desc="Rufus-optimized content for your top SKU \u2014 title, bullets, and description shown below." />

            {/* SKU Identity */}
            <motion.div variants={fadeInUp} className="mb-4 rounded-xl border border-border bg-midnight-light p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted mb-1">Product Being Optimized</p>
              <p className="text-sm font-bold text-text-primary leading-snug mb-3">{report.skuOptimization.productName}</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href={report.skuOptimization.asinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded border border-cyan/20 bg-cyan/10 px-2 py-0.5 font-mono text-xs font-bold text-cyan hover:bg-cyan/15 transition-colors">
                  {report.skuOptimization.asin} <ExternalLink className="h-3 w-3" />
                </a>
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Star className="h-3 w-3 fill-orange text-orange" /> {report.skuOptimization.rating} &middot; {report.skuOptimization.reviewCount} reviews
                </span>
              </div>
            </motion.div>

            {/* Content Cards */}
            {report.skuOptimization.cards.map((card) => (
              <motion.div key={card.type} variants={fadeInUp} className="mb-4 overflow-hidden rounded-xl border border-border bg-midnight-light">
                {/* Card header */}
                <div className="grid grid-cols-2 border-b border-border">
                  <div className="flex items-center gap-2 border-r border-border bg-slate-50 px-5 py-2.5">
                    <span className="h-3 w-3 rounded-full border-2 border-text-muted" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">Current {card.label}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-cyan/[0.04] px-5 py-2.5">
                    <span className="h-3 w-3 rounded-full border-2 border-cyan bg-cyan/30" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-cyan">Recommended {card.label}</span>
                  </div>
                </div>

                {/* Content panels */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="border-b border-border bg-slate-50 p-5 lg:border-b-0 lg:border-r">
                    {card.current.split("\n").map((line, i) => (
                      <p key={i} className={cn("text-xs leading-relaxed text-text-muted", i > 0 && "mt-2")}>{line}</p>
                    ))}
                  </div>
                  <div className="bg-cyan/[0.02] p-5">
                    {card.recommended.split("\n").map((line, i) => (
                      <p key={i} className={cn("text-xs leading-relaxed text-text-primary", i > 0 && "mt-2")}>{line}</p>
                    ))}
                  </div>
                </div>

                {/* Reasons */}
                <div className="border-t border-border bg-slate-50 p-5">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {card.reasons.map((reason, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        {reasonIcon(reason.type)}
                        <p className="text-xs text-text-secondary leading-relaxed">{reason.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* ── 05: Catalog-Wide Readiness ── */}
      <SectionShell>
        <ContentContainer size="standard">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeader num="05" title="Catalog-Wide Rufus Readiness" desc={`We scanned your full ${report.name} ${report.category} catalog against Rufus optimization signals.`} />
            <motion.div variants={fadeInUp} className="overflow-hidden rounded-xl border border-border bg-midnight-light">
              <div className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:items-start">
                <CatalogRing percent={report.catalogReadiness.percent} />
                <div>
                  <h3 className="text-lg font-bold text-text-primary">{report.catalogReadiness.headline}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{report.catalogReadiness.description}</p>
                </div>
              </div>
              {/* Ghost cards */}
              <div className="grid grid-cols-3 gap-3 border-t border-border bg-slate-50 p-6">
                {[90, 80, 85].map((w, i) => (
                  <div key={i} className="rounded-lg bg-slate-100 p-4">
                    <div className="mb-1.5 h-2 rounded bg-slate-200" style={{ width: `${w}%` }} />
                    <div className="h-2 rounded bg-slate-100" style={{ width: `${w - 30}%` }} />
                    <div className="mt-3 h-5 w-12 rounded bg-red-400/10" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 border-t border-border p-6">
                <a
                  href="https://www.commerceiq.ai/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  See All SKU Fixes <ArrowRight className="h-4 w-4" />
                </a>
                <span className="text-xs text-text-muted">Full catalog audit with prioritized action plan</span>
              </div>
            </motion.div>
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* ── Final CTA ── */}
      <SectionShell dark>
        <ContentContainer size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-14 text-center"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan/[0.08] blur-[80px]" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.15em] text-cyan/60 mb-3">What Comes Next</p>
            <h2 className="relative text-3xl font-bold text-text-primary md:text-4xl">
              Your competitors are already<br />optimizing for Rufus.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-sm text-text-muted leading-relaxed">
              This report covers {report.prompts.length} prompts and 1 SKU. A full engagement covers your entire catalog, every competitor prompt, and a prioritized action plan your team can execute this quarter.
            </p>
            <a
              href="https://www.commerceiq.ai/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Book a Strategy Session with a Rufus Expert <ArrowRight className="h-4 w-4" />
            </a>
            <p className="relative mt-3 text-xs text-text-muted/50">30 minutes &middot; Your real catalog data, live on the call</p>
          </motion.div>
        </ContentContainer>
      </SectionShell>

      {/* Footer */}
      <div className="border-t border-border py-8 text-center text-xs text-text-muted">
        &copy; 2026 Rufus AI Visibility Report. Data reflects Amazon Rufus AI responses.<br />
        Data refreshed weekly &middot; Full methodology available on request
      </div>
    </div>
  );
}
