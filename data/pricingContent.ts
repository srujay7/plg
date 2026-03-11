// ─── Pricing Tiers ───

export interface PricingFeature {
  name: string;
  included: boolean;
  detail?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  priceDetail?: string;
  description: string;
  highlighted?: boolean;
  features: PricingFeature[];
  cta: {
    label: string;
    href: string;
  };
}

export interface FreeOffering {
  id: string;
  name: string;
  description: string;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
}

export interface PricingContent {
  heading: string;
  subheading: string;
  tiers: PricingTier[];
  freeOfferings: FreeOffering[];
  guarantee: {
    heading: string;
    description: string;
    value: string;
  };
}

export const pricingContent: PricingContent = {
  heading: "Pricing",
  subheading: "Choose the plan that fits your brand's needs.",
  tiers: [
    {
      id: "visibility-audit",
      name: "AI Visibility Audit",
      price: "$1,000",
      priceDetail: "/month/retailer",
      description:
        "Continuous monitoring and actionable insights to understand your AI shelf position.",
      features: [
        { name: "Keywords tracked", included: true, detail: "100 keywords" },
        { name: "AI prompts monitored", included: true, detail: "100 prompts" },
        { name: "SEO insights", included: true },
        { name: "AEO insights", included: true },
        { name: "Continuous monitoring", included: true },
        { name: "Optimization level", included: true, detail: "Insights only" },
        { name: "PIM integration", included: false },
        { name: "Brand & retailer governance", included: false },
        { name: "Performance monitoring", included: false },
        { name: "Automated optimization", included: false },
        { name: "Human specialists", included: false },
        { name: "Content strategy & prioritization", included: false },
      ],
      cta: {
        label: "Get Started",
        href: "#book-demo",
      },
    },
    {
      id: "content-agent",
      name: "Content Agent",
      price: "Talk to us",
      description:
        "Full AI-powered content optimization with automated workflows, governance, and publishing.",
      highlighted: true,
      features: [
        { name: "Keywords tracked", included: true, detail: "Custom" },
        { name: "AI prompts monitored", included: true, detail: "Custom" },
        { name: "SEO insights", included: true },
        { name: "AEO insights", included: true },
        { name: "Continuous monitoring", included: true },
        { name: "Optimization level", included: true, detail: "Automated" },
        { name: "PIM integration", included: true },
        { name: "Brand & retailer governance", included: true },
        { name: "Performance monitoring", included: true },
        { name: "Automated optimization", included: true },
        { name: "Human specialists", included: false },
        { name: "Content strategy & prioritization", included: false },
      ],
      cta: {
        label: "Talk to Us",
        href: "#book-demo",
      },
    },
    {
      id: "ai-content-agency",
      name: "AI Content Agency",
      price: "Talk to us",
      description:
        "Everything in Content Agent plus dedicated human specialists for strategy, prioritization, and hands-on content execution.",
      features: [
        { name: "Keywords tracked", included: true, detail: "Custom" },
        { name: "AI prompts monitored", included: true, detail: "Custom" },
        { name: "SEO insights", included: true },
        { name: "AEO insights", included: true },
        { name: "Continuous monitoring", included: true },
        { name: "Optimization level", included: true, detail: "Automated" },
        { name: "PIM integration", included: true },
        { name: "Brand & retailer governance", included: true },
        { name: "Performance monitoring", included: true },
        { name: "Automated optimization", included: true },
        { name: "Human specialists", included: true },
        { name: "Content strategy & prioritization", included: true },
      ],
      cta: {
        label: "Talk to Us",
        href: "#book-demo",
      },
    },
  ],
  freeOfferings: [
    {
      id: "ai-visibility-report",
      name: "AI Visibility Report",
      description: "See where your brand stands on the AI shelf — completely free.",
      features: [
        "AI visibility score",
        "Competitor ranking analysis",
        "Prompt performance breakdown",
        "Opportunity analysis",
        "SKU optimization example",
      ],
      cta: {
        label: "Get Free Report",
        href: "/sample-report",
      },
    },
    {
      id: "free-trial",
      name: "Free Trial",
      description: "Try Content Agent on a sample of your catalog.",
      features: ["10 SKUs optimized", "Full platform access", "See results before you commit"],
      cta: {
        label: "Start Free Trial",
        href: "#book-demo",
      },
    },
  ],
  guarantee: {
    heading: "Performance Guarantee",
    description:
      "We guarantee a minimum 25% improvement in your AI shelf metrics within the first 90 days — or your money back.",
    value: "25%",
  },
};
