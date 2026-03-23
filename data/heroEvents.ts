// Timeline-based data for the Nourra hero animation — multi-moment continuous optimization

export type PulseTarget =
  | "image"
  | "title"
  | "bullets"
  | null;

export type ImageVariant =
  | "baseline"
  | "fitness"
  | "outdoor"
  | "study"
  | "wellness"
  | "sports";

export interface HeroTimelineState {
  productImage: ImageVariant;
  title: string;
  bullets: string[];
  currentMoment: string | null;
  eventTag: string | null;
  promoBadge: string | null;
  overlay: string | null;
  metricsAnimate: boolean;
  pulseTarget: PulseTarget;
  microTag: string | null;
  hasIntroPlayed: boolean;
}

export interface PurchaseMoment {
  label: string;
  eventTag: string;
  title: string;
  bullets: string[];
  imageVariant: ImageVariant;
  promoBadge?: string;
}

export const purchaseMoments: PurchaseMoment[] = [
  {
    label: "New Year",
    eventTag: "New Year fitness demand rising",
    title: "Nourra Superfood Shake\nfor Daily Fitness & Nutrition",
    bullets: [
      "Clean Plant-Based Energy",
      "Supports Daily Nutrition Goals",
      "20g protein per serving",
      "No artificial sweeteners",
    ],
    imageVariant: "fitness",
  },
  {
    label: "Summer Fitness",
    eventTag: "Workout demand increasing",
    title: "Nourra Superfood Shake\nfor Summer Workouts & Recovery",
    bullets: [
      "Post-workout recovery",
      "Lightweight daily nutrition",
      "Hydration-friendly formula",
      "Low-calorie, high-protein",
    ],
    imageVariant: "outdoor",
  },
  {
    label: "Back to School",
    eventTag: "Convenience & daily nutrition demand",
    title: "Nourra Superfood Shake\nEasy Nutrition for Busy Days",
    bullets: [
      "Quick grab-and-go nutrition",
      "Focus fuel for long study days",
      "Easy to prep in seconds",
      "Campus-friendly packaging",
    ],
    imageVariant: "study",
  },
  {
    label: "Prime Day",
    eventTag: "High purchase intent spike",
    title: "Nourra Superfood Shake\nBest Value Nutrition Pack",
    bullets: [
      "Best value 24-pack bundle",
      "Premium plant-based protein",
      "Subscribe & Save eligible",
      "Free same-day delivery",
    ],
    imageVariant: "fitness",
    promoBadge: "Prime Day Deal",
  },
  {
    label: "Holiday Season",
    eventTag: "Wellness & immunity focus",
    title: "Nourra Superfood Shake\nDaily Wellness & Immunity Support",
    bullets: [
      "Immunity-supporting superfoods",
      "Daily wellness made simple",
      "Vitamin C & Zinc enriched",
      "Gift-worthy wellness pack",
    ],
    imageVariant: "wellness",
  },
  {
    label: "World Cup",
    eventTag: "Game-day energy demand",
    title: "Nourra Superfood Shake\nFuel for Game Day Energy",
    bullets: [
      "Sustained energy for game day",
      "Share the fuel with friends",
      "Quick halftime nutrition",
      "Fan-favorite flavor lineup",
    ],
    imageVariant: "sports",
  },
];

export const initialState: HeroTimelineState = {
  productImage: "baseline",
  title: "Nourra Shake\nBanana Blueberry",
  bullets: ["Plant protein", "Organic shake", "Dairy-free formula", "No added sugar"],
  currentMoment: null,
  eventTag: null,
  promoBadge: null,
  overlay: null,
  metricsAnimate: false,
  pulseTarget: null,
  microTag: null,
  hasIntroPlayed: false,
};

export const finalMetrics = [
  { label: "AI Visibility", value: "+47", change: "%" },
  { label: "Conversion", value: "+22", change: "%" },
  { label: "Traffic", value: "+40", change: "%" },
];
