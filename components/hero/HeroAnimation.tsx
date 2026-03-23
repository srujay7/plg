"use client";

import { motion } from "framer-motion";
import { useHeroEventCycle } from "@/hooks/useHeroEventCycle";
import { finalMetrics } from "@/data/heroEvents";
import { easing } from "@/lib/motion";
import { PDPViewport } from "./PDPViewport";
import { OutcomeMetricRail } from "./OutcomeMetricRail";
import { HeroCopy } from "./HeroCopy";

const railMetrics = finalMetrics.map((m) => ({
  label: m.label,
  value: m.value,
  change: m.change,
}));

export function HeroAnimation() {
  const state = useHeroEventCycle();

  return (
    <>
      {/* Desktop: Split layout — left copy, right PDP */}
      <div className="hidden md:flex relative min-h-screen items-center z-10">
        {/* Left: Messaging */}
        <div className="w-[42%] pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] pr-8">
          <HeroCopy
            hasIntroPlayed={state.hasIntroPlayed}
            currentMoment={state.currentMoment}
          />
        </div>

        {/* Right: Animated PDP + Metrics */}
        <div className="w-[58%] flex flex-col items-center gap-5 pr-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]">
          <motion.div
            className="w-full max-w-[780px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: state.hasIntroPlayed ? 1 : 0,
              y: state.hasIntroPlayed ? 0 : 20,
            }}
            transition={{ duration: 0.7, ease: easing.outExpo, delay: 0.3 }}
          >
            <PDPViewport state={state} />
          </motion.div>

          {/* Metric rail */}
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: state.hasIntroPlayed ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <OutcomeMetricRail
              metrics={railMetrics}
              isActive={state.metricsAnimate}
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile: Single column */}
      <div className="flex md:hidden absolute inset-0 z-10 flex-col justify-center px-6 py-20">
        <div className="mb-8">
          <HeroCopy
            hasIntroPlayed={state.hasIntroPlayed}
            currentMoment={state.currentMoment}
          />
        </div>

        <motion.div
          className="flex flex-col items-center gap-4 w-full max-w-[360px] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: state.hasIntroPlayed ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <PDPViewport state={state} compact />

          <OutcomeMetricRail
            metrics={railMetrics}
            isActive={state.metricsAnimate}
          />
        </motion.div>
      </div>
    </>
  );
}
