import type { Variants, Transition } from "framer-motion";

// Timing tokens
export const timing = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  loop: 12,
} as const;

// Shared easing
export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outCubic: [0.33, 1, 0.68, 1] as const,
  inOutCubic: [0.65, 0, 0.35, 1] as const,
};

// Section reveal on scroll
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: timing.normal, ease: easing.outExpo },
  },
};

// Stagger children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Fade in item
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: timing.normal, ease: easing.outExpo },
  },
};

// Scale in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: timing.normal, ease: easing.outExpo },
  },
};

// Hero module activation
export const moduleActivate: Variants = {
  inactive: {
    opacity: 0.4,
    scale: 0.98,
    borderColor: "rgba(100, 120, 160, 0.15)",
  },
  active: {
    opacity: 1,
    scale: 1,
    borderColor: "rgba(0, 212, 255, 0.4)",
    transition: { duration: 0.5, ease: easing.outCubic },
  },
};

// Connector pulse
export const pulseTravel: Transition = {
  duration: 0.6,
  ease: easing.outCubic,
};

// Metric count-up spring
export const metricSpring: Transition = {
  type: "spring",
  stiffness: 50,
  damping: 15,
};
