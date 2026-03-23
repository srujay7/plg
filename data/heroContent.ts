export interface CtaButton {
  label: string;
  href: string;
}

export interface BrainStatus {
  label: string;
  status: "active" | "processing" | "complete";
}

export interface ContextModuleItem {
  label: string;
  value?: string;
}

export interface ContextModuleRow {
  label: string;
  status?: "pass" | "fail" | "warning";
  value?: string;
}

export interface ContextModule {
  id: string;
  title: string;
  icon: string;
  items?: ContextModuleItem[];
  rows?: ContextModuleRow[];
}

export interface OutcomeMetric {
  label: string;
  value: string;
  change: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: CtaButton;
  secondaryCta: CtaButton;
}

export interface HeroAnimationData {
  objectiveText: string;
  brainStatuses: BrainStatus[];
  contextModules: ContextModule[];
  outcomeMetrics: OutcomeMetric[];
}

export const heroContent: HeroContent = {
  eyebrow: "AI Shelf Optimization",
  headline: "Win the AI Shelf",
  subheadline:
    "Continuously adapt your product content to match shopper intent, retail moments, and AI discovery.",
  primaryCta: {
    label: "Get your AI Visibility Report",
    href: "/sample-report",
  },
  secondaryCta: {
    label: "See Content Agent in action",
    href: "#product-demo",
  },
};

export const heroAnimationData: HeroAnimationData = {
  objectiveText: "Optimize PDP content to maximize AI shelf visibility and conversion",
  brainStatuses: [
    { label: "Analyzing context signals", status: "complete" },
    { label: "Evaluating content gaps", status: "complete" },
    { label: "Generating optimized content", status: "processing" },
    { label: "Applying brand governance", status: "active" },
    { label: "Publishing to retailers", status: "active" },
  ],
  contextModules: [
    {
      id: "pim",
      title: "PIM",
      icon: "Database",
      items: [
        { label: "Product Title", value: "Ultra-Clean Dishwasher Pods" },
        { label: "Brand", value: "CleanPro" },
        { label: "Category", value: "Household Cleaning" },
        { label: "Key Ingredients", value: "Enzyme-based formula" },
        { label: "Pack Size", value: "72 count" },
        { label: "UPC", value: "012345678901" },
      ],
    },
    {
      id: "retailer",
      title: "Retailer",
      icon: "Store",
      items: [
        { label: "Platform", value: "Amazon" },
        { label: "Title Limit", value: "200 chars" },
        { label: "Bullet Points", value: "5 max" },
        { label: "A+ Content", value: "Enabled" },
        { label: "Category Node", value: "Health & Household" },
        { label: "Suppression Rules", value: "Active" },
      ],
    },
    {
      id: "keywords",
      title: "Keywords",
      icon: "Search",
      items: [
        { label: "dishwasher pods", value: "Vol: 165K" },
        { label: "dishwasher detergent", value: "Vol: 110K" },
        { label: "dish pods", value: "Vol: 74K" },
        { label: "dishwasher tablets", value: "Vol: 49K" },
        { label: "eco dish pods", value: "Vol: 22K" },
        { label: "enzyme dishwasher", value: "Vol: 8K" },
      ],
    },
    {
      id: "answer-engine",
      title: "Answer Engine",
      icon: "Bot",
      items: [
        { label: "Best dishwasher pods?", value: "Not cited" },
        { label: "Eco-friendly dish detergent?", value: "Ranked #4" },
        { label: "Pods vs liquid detergent?", value: "Not cited" },
        { label: "Best for hard water?", value: "Ranked #7" },
        { label: "Dishwasher pod ingredients?", value: "Not cited" },
        { label: "Most effective dish pods?", value: "Ranked #12" },
      ],
    },
    {
      id: "governance",
      title: "Governance",
      icon: "Shield",
      rows: [
        { label: "Brand voice compliance", status: "pass", value: "98%" },
        { label: "Claim validation", status: "pass", value: "All verified" },
        { label: "Trademark usage", status: "pass", value: "Correct" },
        { label: "Prohibited terms", status: "pass", value: "None found" },
        { label: "Competitor mentions", status: "pass", value: "None" },
        { label: "Regulatory compliance", status: "warning", value: "Review EPA claim" },
      ],
    },
    {
      id: "impact",
      title: "Impact",
      icon: "TrendingUp",
      rows: [
        { label: "Search rank improvement", status: "pass", value: "+12 positions" },
        { label: "AI citation rate", status: "pass", value: "+34%" },
        { label: "Click-through rate", status: "pass", value: "+18%" },
        { label: "Conversion rate", status: "pass", value: "+9.2%" },
        { label: "Content score", status: "pass", value: "94/100" },
        { label: "Compliance score", status: "pass", value: "98/100" },
      ],
    },
  ],
  outcomeMetrics: [
    { label: "Search Rank", value: "+47", change: "%" },
    { label: "AI Visibility", value: "+62", change: "%" },
    { label: "Conversion", value: "+28", change: "%" },
    { label: "Traffic", value: "+54", change: "%" },
  ],
};
