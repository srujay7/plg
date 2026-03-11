"use client";

import { motion } from "framer-motion";
import { useHeroEventCycle } from "@/hooks/useHeroEventCycle";
import { heroEvents, heroMetricSteps } from "@/data/heroEvents";
import { heroAnimationData } from "@/data/heroContent";
import { easing } from "@/lib/motion";
import { MomentDial } from "./MomentDial";
import { PDPViewport } from "./PDPViewport";
import { OutcomeMetricRail } from "./OutcomeMetricRail";
import { HeroCopy } from "./HeroCopy";

// Map heroMetricSteps to OutcomeMetric format for the rail
function metricsForRail(step: number) {
  const s = heroMetricSteps[step];
  return [
    { label: "Search Rank", value: `+${s.searchRank}`, change: "%" },
    { label: "AI Visibility", value: `+${s.aiVisibility}`, change: "%" },
    { label: "Conversion", value: `+${s.conversion}`, change: "%" },
    { label: "Traffic", value: `+${s.traffic}`, change: "%" },
  ];
}

// Active event pill for mobile
function ActiveEventPill({ event }: { event: (typeof heroEvents)[number] }) {
  return (
    <motion.div
      className="flex items-center gap-2 rounded-full border border-cyan/30 bg-navy/80 px-3 py-1.5 backdrop-blur-sm"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: easing.outCubic }}
    >
      <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
      <span className="text-xs text-cyan font-medium">{event.label}</span>
      {event.pdpContent.badgeText && (
        <span className="text-[9px] bg-cyan/15 text-cyan/80 px-1.5 py-0.5 rounded-full">
          {event.pdpContent.badgeText}
        </span>
      )}
    </motion.div>
  );
}

export function HeroAnimation() {
  const { activeIndex, activeEvent, phase, hasIntroPlayed, metrics } =
    useHeroEventCycle();

  const railMetrics = metricsForRail(activeIndex);

  return (
    <>
      {/* Integrated HeroCopy with intro state */}
      <HeroCopy hasIntroPlayed={hasIntroPlayed} />

      {/* Desktop animation */}
      <div className="hidden md:flex absolute inset-0 z-10 items-end justify-center pb-8">
        <motion.div
          className="flex flex-col items-center gap-4 w-full max-w-[600px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: hasIntroPlayed ? 1 : 0 }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
        >
          {/* Dial */}
          <MomentDial events={heroEvents} activeIndex={activeIndex} />

          {/* PDP Viewport */}
          <PDPViewport activeEvent={activeEvent} phase={phase} />

          {/* Metric Rail */}
          <OutcomeMetricRail metrics={railMetrics} isActive={hasIntroPlayed} />
        </motion.div>
      </div>

      {/* Mobile: simplified */}
      <div className="flex md:hidden absolute inset-0 z-10 items-end justify-center px-6 pb-6">
        <motion.div
          className="flex flex-col items-center gap-3 w-full max-w-[340px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: hasIntroPlayed ? 1 : 0 }}
          transition={{ duration: 0.6, ease: easing.outExpo }}
        >
          {/* Active event pill */}
          <ActiveEventPill event={activeEvent} />

          {/* Compact PDP */}
          <PDPViewport activeEvent={activeEvent} phase={phase} compact />

          {/* Metrics */}
          <OutcomeMetricRail metrics={railMetrics} isActive={hasIntroPlayed} />
        </motion.div>
      </div>
    </>
  );
}
