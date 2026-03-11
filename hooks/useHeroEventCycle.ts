"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { heroEvents, heroMetricSteps } from "@/data/heroEvents";
import type { HeroEvent, HeroMetricSnapshot } from "@/data/heroEvents";

export type HeroPhase = "entering" | "transforming" | "holding";

interface UseHeroEventCycleReturn {
  activeIndex: number;
  activeEvent: HeroEvent;
  phase: HeroPhase;
  hasIntroPlayed: boolean;
  metrics: HeroMetricSnapshot;
}

const EVENT_DURATION = 2000; // 2s per event
const INTRO_DELAY = 2000; // 2s before copy slides up
const INTRO_ANIMATION = 600; // 600ms for slide-up

// Phase timing within each 2s event cycle
const ENTERING_DURATION = 400; // hand + node animation
const TRANSFORMING_DURATION = 600; // content morph
// holding fills the rest

export function useHeroEventCycle(): UseHeroEventCycleReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<HeroPhase>("entering");
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      reducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  // Intro sequence
  useEffect(() => {
    if (reducedMotion.current) {
      setHasIntroPlayed(true);
      return;
    }

    const timer = setTimeout(() => {
      setHasIntroPlayed(true);
    }, INTRO_DELAY + INTRO_ANIMATION);

    return () => clearTimeout(timer);
  }, []);

  // Event cycle
  const advanceEvent = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % heroEvents.length);
    setPhase("entering");
  }, []);

  useEffect(() => {
    if (!hasIntroPlayed) return;
    if (reducedMotion.current) return;

    // Phase transitions within each event
    const enteringTimer = setTimeout(() => {
      setPhase("transforming");
    }, ENTERING_DURATION);

    const transformingTimer = setTimeout(() => {
      setPhase("holding");
    }, ENTERING_DURATION + TRANSFORMING_DURATION);

    // Advance to next event
    timerRef.current = setTimeout(() => {
      advanceEvent();
    }, EVENT_DURATION);

    return () => {
      clearTimeout(enteringTimer);
      clearTimeout(transformingTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasIntroPlayed, activeIndex, advanceEvent]);

  return {
    activeIndex,
    activeEvent: heroEvents[activeIndex],
    phase,
    hasIntroPlayed,
    metrics: heroMetricSteps[activeIndex],
  };
}
