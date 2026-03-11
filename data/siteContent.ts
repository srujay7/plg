// ─── AI Shelf Reality Section ───

export interface Stat {
  value: string;
  label: string;
  source?: string;
}

export interface AiShelfReality {
  heading: string;
  subheading: string;
  narrative: string;
  stats: Stat[];
}

export const aiShelfReality: AiShelfReality = {
  heading: "The AI Shelf Is the New Battleground",
  subheading: "Search is evolving. Answer engines are reshaping how shoppers discover and choose products.",
  narrative:
    "The shift from traditional search to AI-powered answer engines is fundamentally changing how consumers discover products. Shoppers no longer scroll through pages of results — they ask questions and trust AI-generated answers. Brands that fail to optimize for this new paradigm are losing visibility, traffic, and sales. The AI shelf is where purchase decisions are now being made, and most brands aren't even on it.",
  stats: [
    {
      value: "$12B",
      label: "Amazon Rufus-influenced sales annually",
      source: "Amazon internal data",
    },
    {
      value: "60%",
      label: "More conversion from AI-optimized content",
      source: "Industry benchmark",
    },
  ],
};

// ─── How It Works Section ───

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface HowItWorks {
  heading: string;
  subheading: string;
  steps: HowItWorksStep[];
}

export const howItWorks: HowItWorks = {
  heading: "How Content Agent Works",
  subheading: "Six steps from insight to optimized content, powered by AI.",
  steps: [
    {
      step: 1,
      title: "Prioritize",
      description:
        "AI analyzes your entire catalog to identify the highest-impact SKUs based on search volume, competitive gaps, and revenue potential. Focus resources where they matter most.",
      icon: "ListOrdered",
    },
    {
      step: 2,
      title: "Review",
      description:
        "Content Agent pulls current PDP content, PIM data, keyword performance, and AI visibility signals into a unified view. See exactly where your content stands today.",
      icon: "FileSearch",
    },
    {
      step: 3,
      title: "Evaluate",
      description:
        "Every piece of content is scored against search algorithms, answer engine citation criteria, retailer requirements, and brand governance rules to identify specific gaps.",
      icon: "ClipboardCheck",
    },
    {
      step: 4,
      title: "Optimize",
      description:
        "AI generates optimized titles, bullets, descriptions, and backend keywords — incorporating high-value search terms, answer engine triggers, and brand-compliant language.",
      icon: "Sparkles",
    },
    {
      step: 5,
      title: "Approve",
      description:
        "Human-in-the-loop review ensures every content change meets brand standards. Approve, edit, or reject recommendations with full audit trail and compliance tracking.",
      icon: "CheckCircle",
    },
    {
      step: 6,
      title: "Publish",
      description:
        "Approved content is automatically synced to retailer platforms via PIM integration. Monitor performance post-publish with continuous feedback loops.",
      icon: "Rocket",
    },
  ],
};

// ─── What the Agent Sees Section ───

export interface SignalCard {
  title: string;
  description: string;
  icon: string;
}

export interface WhatAgentSees {
  heading: string;
  subheading: string;
  signals: SignalCard[];
}

export const whatAgentSees: WhatAgentSees = {
  heading: "What the Agent Sees",
  subheading: "Content Agent synthesizes 8 critical signal sources to make intelligent content decisions.",
  signals: [
    {
      title: "Shopper Intent",
      description:
        "Understands what shoppers are searching for, how they phrase queries, and what drives purchase decisions in your category.",
      icon: "Users",
    },
    {
      title: "Retail PDP Content",
      description:
        "Analyzes your current product detail pages across every retailer — titles, bullets, descriptions, images, and A+ content.",
      icon: "ShoppingCart",
    },
    {
      title: "PIM Data",
      description:
        "Connects to your product information management system to ensure content accuracy and attribute completeness.",
      icon: "Database",
    },
    {
      title: "Competitor Signals",
      description:
        "Monitors competitor content strategies, keyword targeting, and ranking positions to identify opportunities and threats.",
      icon: "Radar",
    },
    {
      title: "Retailer Rules",
      description:
        "Enforces character limits, formatting requirements, prohibited terms, and category-specific content guidelines for each retailer.",
      icon: "Store",
    },
    {
      title: "Brand Guardrails",
      description:
        "Applies brand voice, approved claims, trademark usage, and compliance requirements to every piece of generated content.",
      icon: "Shield",
    },
    {
      title: "AI Answer Visibility",
      description:
        "Tracks how AI answer engines like Rufus, ChatGPT, and Perplexity cite and recommend your products vs. competitors.",
      icon: "Bot",
    },
    {
      title: "Search Trends",
      description:
        "Monitors real-time search volume shifts, seasonal trends, and emerging keywords to keep content ahead of demand curves.",
      icon: "TrendingUp",
    },
  ],
};

// ─── Moments of Purchase Section ───

export interface SeasonalEvent {
  name: string;
  description: string;
  icon?: string;
}

export interface MomentsOfPurchase {
  heading: string;
  subheading: string;
  events: SeasonalEvent[];
}

export const momentsOfPurchase: MomentsOfPurchase = {
  heading: "Content That Adapts to Every Moment",
  subheading: "Seasonal events shift shopper intent overnight. Content Agent adapts your PDPs to match.",
  events: [
    {
      name: "Valentine's Day",
      description:
        "Gift-oriented keywords surge. Content Agent rewrites titles and bullets to emphasize gifting occasions, romantic themes, and bundle opportunities.",
    },
    {
      name: "Prime Day",
      description:
        "Deal-seeking shoppers flood the platform. Content shifts to highlight value propositions, savings messaging, and urgency-driven language.",
    },
    {
      name: "Back to School",
      description:
        "Parents search for essentials and supplies. Content adapts to feature durability, kid-friendly attributes, and school-ready messaging.",
    },
    {
      name: "Holiday",
      description:
        "Peak gifting season demands content that emphasizes premium quality, gift-worthiness, and holiday-specific use cases across all categories.",
    },
    {
      name: "Super Bowl",
      description:
        "Entertaining and party-related searches spike. Content pivots to highlight crowd-pleasing features, party-size options, and game-day relevance.",
    },
    {
      name: "Black Friday",
      description:
        "Maximum deal sensitivity. Content Agent optimizes for comparison shopping, emphasizing competitive advantages and value-driven messaging.",
    },
  ],
};

// ─── Product Demo Section ───

export interface DemoExample {
  type: string;
  label: string;
  before: string;
  after: string;
  improvements: string[];
}

export interface ProductDemo {
  heading: string;
  subheading: string;
  examples: DemoExample[];
}

export const productDemo: ProductDemo = {
  heading: "See the Difference",
  subheading: "Real before-and-after examples of Content Agent optimization.",
  examples: [
    {
      type: "title",
      label: "Title Rewrite",
      before:
        "CleanPro Dishwasher Pods, Fresh Scent, 72 Count",
      after:
        "CleanPro Ultra-Clean Dishwasher Pods - Enzyme-Powered Dish Detergent Tablets, Fresh Scent, 72 Count Pack for Sparkling Clean Dishes",
      improvements: [
        "Added high-volume keyword 'dish detergent tablets'",
        "Included 'enzyme-powered' for AI answer engine triggers",
        "Added benefit-driven language 'sparkling clean'",
        "Optimized to 148 of 200 character limit",
      ],
    },
    {
      type: "bullets",
      label: "Bullet Optimization",
      before:
        "Powerful cleaning formula. Works in all dishwashers. Fresh scent. Easy to use. 72 pods per pack.",
      after:
        "ENZYME-POWERED DEEP CLEAN: Our triple-enzyme formula dissolves baked-on food, grease, and stains in a single wash cycle — no pre-rinsing needed.\nUNIVERSAL DISHWASHER COMPATIBLE: Works in all standard and compact dishwashers including Bosch, KitchenAid, and Samsung models.\nLONG-LASTING FRESH SCENT: Ocean breeze fragrance keeps dishes smelling fresh for up to 24 hours after washing.\nCONVENIENT PRE-MEASURED PODS: No mess, no measuring — just toss one pod in and run. Water-soluble film dissolves completely.\nBULK 72-COUNT VALUE PACK: Stock up and save with our largest pod count. Each pod handles a full dishwasher load of dishes, pots, and pans.",
      improvements: [
        "Added benefit-first formatting with caps headers",
        "Included specific claims and ingredients",
        "Added brand compatibility for search matching",
        "Expanded with sensory and value language for AI citations",
      ],
    },
    {
      type: "keywords",
      label: "Keyword Highlighting",
      before:
        "dishwasher pods, cleaning pods, dish soap",
      after:
        "dishwasher pods, dishwasher detergent, dish pods, dishwasher tablets, eco dish pods, enzyme dishwasher, dishwasher cleaner pods, dish detergent pods, automatic dishwasher detergent, best dishwasher pods",
      improvements: [
        "Expanded from 3 to 10 backend keywords",
        "Added high-volume terms from keyword research",
        "Included long-tail variants for AI answer matching",
        "Covered question-based search patterns",
      ],
    },
  ],
};

// ─── Final CTA Section ───

export interface FinalCta {
  headline: string;
  subheadline: string;
  cta: {
    label: string;
    href: string;
  };
}

export const finalCta: FinalCta = {
  headline: "Start winning the AI shelf",
  subheadline:
    "Get your free AI Visibility Report and see exactly where your brand stands — and where Content Agent can take it.",
  cta: {
    label: "Get your AI Visibility Report",
    href: "/sample-report",
  },
};
