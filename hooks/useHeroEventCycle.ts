"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  initialState,
  purchaseMoments,
  type HeroTimelineState,
} from "@/data/heroEvents";

const LOOP_DURATION = 48000; // 48s loop
const INTRO_DELAY = 500;

// Timeline (ms from loop start):
// 0:     Scene 1  — Baseline PDP (4.5s hold)
// 4500:  Scene 2  — New Year event appears, AI dot activates
// 7500:  Scene 3  — AI → image changes
// 10000: Scene 4  — AI → title morphs
// 12500: Scene 5  — AI → bullets update
// 15000: Scene 6  — Summer Fitness (5s)
// 20000: Scene 7  — Back to School (5s)
// 25000: Scene 8  — Prime Day (5s)
// 30000: Scene 9  — Holiday/Immunity (5s)
// 35000: Scene 10 — World Cup (4.5s)
// 39500: Scene 11 — Final overlay
// 42000: Scene 12 — Metrics count up
// 45500: Fade
// 48000: Loop restart

export function useHeroEventCycle(): HeroTimelineState {
  const [state, setState] = useState<HeroTimelineState>(initialState);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (loopRef.current) {
      clearTimeout(loopRef.current);
      loopRef.current = null;
    }
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timersRef.current.push(t);
    return t;
  }, []);

  // Apply a full moment's content (image, title, bullets, badge) with AI dot sequence
  const applyMoment = useCallback(
    (momentIndex: number, startMs: number, duration: number) => {
      const moment = purchaseMoments[momentIndex];

      // Event appears + AI activates
      schedule(() => {
        setState((p) => ({
          ...p,
          currentMoment: moment.label,
          eventTag: moment.eventTag,
          pulseTarget: "image",
        }));
      }, startMs);

      // Stagger: AI → image, then title, then bullets within duration
      const step = Math.floor(duration / 4);

      // Image change (after brief pause)
      schedule(() => {
        setState((p) => ({
          ...p,
          productImage: moment.imageVariant,
          promoBadge: moment.promoBadge ?? null,
        }));
      }, startMs + step);

      // AI → title
      schedule(() => {
        setState((p) => ({
          ...p,
          pulseTarget: "title",
          title: moment.title,
        }));
      }, startMs + step * 2);

      // AI → bullets
      schedule(() => {
        setState((p) => ({
          ...p,
          pulseTarget: "bullets",
          bullets: moment.bullets,
        }));
      }, startMs + step * 3);
    },
    [schedule]
  );

  // Light version: only changes currentMoment, eventTag, title, bullets — no image or promoBadge
  const applyMomentLight = useCallback(
    (momentIndex: number, startMs: number, duration: number) => {
      const moment = purchaseMoments[momentIndex];

      // Event appears + AI activates (pulse on title first)
      schedule(() => {
        setState((p) => ({
          ...p,
          currentMoment: moment.label,
          eventTag: moment.eventTag,
          pulseTarget: "title",
        }));
      }, startMs);

      const step = Math.floor(duration / 3);

      // AI → title
      schedule(() => {
        setState((p) => ({
          ...p,
          title: moment.title,
        }));
      }, startMs + step);

      // AI → bullets
      schedule(() => {
        setState((p) => ({
          ...p,
          pulseTarget: "bullets",
          bullets: moment.bullets,
        }));
      }, startMs + step * 2);
    },
    [schedule]
  );

  const startLoop = useCallback(() => {
    clearTimers();

    // Scene 1: Reset to baseline PDP
    setState({
      ...initialState,
      hasIntroPlayed: true,
    });

    // Scene 2-5: New Year — full AI treatment with individual element changes
    // Event appears at 4500ms
    const m0 = purchaseMoments[0];
    schedule(() => {
      setState((p) => ({
        ...p,
        currentMoment: m0.label,
        eventTag: m0.eventTag,
        pulseTarget: "image",
      }));
    }, 4500);

    // Scene 3: AI → image (7500ms)
    schedule(() => {
      setState((p) => ({
        ...p,
        productImage: m0.imageVariant,
      }));
    }, 7500);

    // Scene 4: AI → title (10000ms)
    schedule(() => {
      setState((p) => ({
        ...p,
        pulseTarget: "title",
        title: m0.title,
      }));
    }, 10000);

    // Scene 5: AI → bullets (12500ms)
    schedule(() => {
      setState((p) => ({
        ...p,
        pulseTarget: "bullets",
        bullets: m0.bullets,
      }));
    }, 12500);

    // Scene 6: Summer Fitness (15000ms, title+bullets only)
    applyMomentLight(1, 15000, 5000);

    // Scene 7: Back to School (20000ms, title+bullets only)
    applyMomentLight(2, 20000, 5000);

    // Scene 8: Prime Day (25000ms, title+bullets only)
    applyMomentLight(3, 25000, 5000);

    // Scene 9: Holiday/Immunity (30000ms, title+bullets only)
    applyMomentLight(4, 30000, 5000);

    // Scene 10: World Cup (35000ms, title+bullets only)
    applyMomentLight(5, 35000, 4500);

    // Scene 11: Final overlay (39500ms)
    schedule(() => {
      setState((p) => ({
        ...p,
        pulseTarget: null,
        eventTag: null,
        overlay: "Optimized for every moment of purchase",
      }));
    }, 39500);

    // Scene 12: Metrics count up (42000ms)
    schedule(() => {
      setState((p) => ({
        ...p,
        overlay: null,
        metricsAnimate: true,
      }));
    }, 42000);

    // Fade back for loop restart (45500ms)
    schedule(() => {
      setState((p) => ({
        ...p,
        metricsAnimate: false,
        pulseTarget: null,
        currentMoment: null,
        eventTag: null,
        promoBadge: null,
      }));
    }, 45500);

    // Loop restart
    loopRef.current = setTimeout(() => {
      startLoop();
    }, LOOP_DURATION);
  }, [clearTimers, schedule, applyMoment, applyMomentLight]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setState((p) => ({ ...p, hasIntroPlayed: true }));
      return;
    }

    const introTimer = setTimeout(() => {
      setState((p) => ({ ...p, hasIntroPlayed: true }));
      startLoop();
    }, INTRO_DELAY);

    return () => {
      clearTimeout(introTimer);
      clearTimers();
    };
  }, [startLoop, clearTimers]);

  return state;
}
