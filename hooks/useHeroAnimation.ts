"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

export type HeroStep =
  | "idle"
  | "objective-received"
  | "pim-check"
  | "retailer-compare"
  | "keyword-intelligence"
  | "answer-engine"
  | "governance-learning"
  | "decision-synthesis"
  | "outcome-reveal";

const STEPS: HeroStep[] = [
  "idle",
  "objective-received",
  "pim-check",
  "retailer-compare",
  "keyword-intelligence",
  "answer-engine",
  "governance-learning",
  "decision-synthesis",
  "outcome-reveal",
];

const STEP_DURATIONS: Record<HeroStep, number> = {
  idle: 2000,
  "objective-received": 1000,
  "pim-check": 900,
  "retailer-compare": 900,
  "keyword-intelligence": 900,
  "answer-engine": 900,
  "governance-learning": 900,
  "decision-synthesis": 1500,
  "outcome-reveal": 2000,
};

const STEP_TO_MODULE: Partial<Record<HeroStep, string>> = {
  "pim-check": "pim",
  "retailer-compare": "retailer",
  "keyword-intelligence": "keywords",
  "answer-engine": "answer-engine",
  "governance-learning": "governance",
  "decision-synthesis": "impact",
};

export interface UseHeroAnimationReturn {
  currentStep: HeroStep;
  activeModuleId: string | null;
  isModuleActive: (id: string) => boolean;
  progress: number;
}

export function useHeroAnimation(): UseHeroAnimationReturn {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setStepIndex(STEPS.length - 1);
      setProgress(1);
      return;
    }

    const currentStep = STEPS[stepIndex];
    const duration = STEP_DURATIONS[currentStep];

    // Progress animation within step
    const progressInterval = 50;
    let elapsed = 0;
    const progressTimer = setInterval(() => {
      elapsed += progressInterval;
      setProgress(Math.min(elapsed / duration, 1));
    }, progressInterval);

    const stepTimer = setTimeout(() => {
      clearInterval(progressTimer);
      setProgress(0);
      setStepIndex((prev) => (prev + 1) % STEPS.length);
    }, duration);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
    };
  }, [stepIndex, prefersReducedMotion]);

  const currentStep = STEPS[stepIndex];
  const activeModuleId = STEP_TO_MODULE[currentStep] ?? null;

  // Track which modules have been activated in this cycle
  const activatedModules = useMemo(() => {
    const moduleStepIndices = Object.entries(STEP_TO_MODULE);
    const activated = new Set<string>();
    for (const [step, moduleId] of moduleStepIndices) {
      const idx = STEPS.indexOf(step as HeroStep);
      if (idx <= stepIndex && moduleId) {
        activated.add(moduleId);
      }
    }
    // Reset on idle
    if (currentStep === "idle") {
      activated.clear();
    }
    return activated;
  }, [stepIndex, currentStep]);

  const isModuleActive = useCallback(
    (id: string) => activatedModules.has(id),
    [activatedModules]
  );

  return {
    currentStep,
    activeModuleId,
    isModuleActive,
    progress,
  };
}
