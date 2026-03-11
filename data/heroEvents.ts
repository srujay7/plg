export interface HeroEvent {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  pdpFocus:
    | "title"
    | "bullets"
    | "description"
    | "image"
    | "keywords"
    | "richContent";
  pdpContent: {
    before: string;
    after: string;
    badgeText?: string;
  };
}

export interface HeroMetricSnapshot {
  searchRank: number;
  aiVisibility: number;
  conversion: number;
  traffic: number;
}

export interface BasePDP {
  title: string;
  image: string;
  bullets: string[];
  description: string;
  keywords: string[];
  richContent: string;
}

export const basePDP: BasePDP = {
  title: "Ultra-Clean Dishwasher Pods — 72 Count, Enzyme-Based Formula",
  image: "/pdp-hero.png",
  bullets: [
    "Powerful enzyme-based cleaning action dissolves tough grease",
    "72-count value pack for months of sparkling clean dishes",
    "Safe for all dishwasher types including stainless steel interiors",
    "Phosphate-free, septic-safe formula for eco-conscious homes",
    "Pre-measured pods — no mess, no waste, perfect dose every time",
  ],
  description:
    "Ultra-Clean Dishwasher Pods deliver professional-grade cleaning power in a convenient, pre-measured pod. Our advanced enzyme-based formula cuts through baked-on food, grease, and stains in a single wash cycle.",
  keywords: [
    "dishwasher pods",
    "dishwasher detergent",
    "dish pods",
    "dishwasher tablets",
    "eco dish pods",
  ],
  richContent:
    "Discover the Ultra-Clean difference — our proprietary enzyme blend targets proteins, starches, and fats for a complete clean every cycle.",
};

export const heroEvents: HeroEvent[] = [
  {
    id: "valentines",
    label: "Valentine's Day",
    icon: "Heart",
    pdpFocus: "title",
    pdpContent: {
      before: "Ultra-Clean Dishwasher Pods — 72 Count, Enzyme-Based Formula",
      after: "Ultra-Clean Dishwasher Pods — Perfect Valentine's Gift for a Spotless Home",
      badgeText: "Valentine's Pick",
    },
  },
  {
    id: "prime-day",
    label: "Prime Day",
    icon: "Zap",
    pdpFocus: "bullets",
    pdpContent: {
      before:
        "Powerful enzyme-based cleaning action dissolves tough grease",
      after: "PRIME DAY DEAL — Save 40% on our #1 rated enzyme formula that dissolves tough grease",
      badgeText: "Prime Deal",
    },
  },
  {
    id: "new-sku",
    label: "New SKU Launch",
    icon: "Rocket",
    pdpFocus: "description",
    pdpContent: {
      before:
        "Ultra-Clean Dishwasher Pods deliver professional-grade cleaning power in a convenient, pre-measured pod.",
      after: "NEW — Ultra-Clean Pro Pods with 2× enzyme concentration deliver the deepest clean yet. Now in Fresh Citrus scent.",
      badgeText: "New Formula",
    },
  },
  {
    id: "hulu-campaign",
    label: "Hulu TV Campaign",
    icon: "Tv",
    pdpFocus: "image",
    pdpContent: {
      before: "Standard product hero image",
      after: "\"As Seen on TV\" lifestyle creative with campaign branding",
      badgeText: "As Seen on TV",
    },
  },
  {
    id: "black-friday",
    label: "Black Friday",
    icon: "Tag",
    pdpFocus: "keywords",
    pdpContent: {
      before: "dishwasher pods, dishwasher detergent, dish pods",
      after: "black friday dishwasher deals, dishwasher pods sale, best dish pod deals 2026",
      badgeText: "BF Deal",
    },
  },
  {
    id: "holiday",
    label: "Holiday Season",
    icon: "Sparkles",
    pdpFocus: "richContent",
    pdpContent: {
      before:
        "Discover the Ultra-Clean difference — our proprietary enzyme blend targets proteins, starches, and fats.",
      after: "The perfect holiday host gift — give the gift of a spotless kitchen this season with our festive gift-ready packaging.",
      badgeText: "Holiday Gift",
    },
  },
];

export const heroMetricSteps: HeroMetricSnapshot[] = [
  { searchRank: 12, aiVisibility: 18, conversion: 8, traffic: 14 },
  { searchRank: 21, aiVisibility: 29, conversion: 14, traffic: 24 },
  { searchRank: 28, aiVisibility: 38, conversion: 18, traffic: 32 },
  { searchRank: 35, aiVisibility: 47, conversion: 22, traffic: 40 },
  { searchRank: 41, aiVisibility: 55, conversion: 25, traffic: 48 },
  { searchRank: 47, aiVisibility: 62, conversion: 28, traffic: 54 },
];
