// ─── Sample AI Visibility Report Data ───

export interface ReportMetadata {
  brand: string;
  category: string;
  retailer: string;
  date: string;
}

export interface BrandScore {
  brand: string;
  score: number;
  isYourBrand?: boolean;
}

export interface KeywordRow {
  keyword: string;
  searchVolume: string;
  yourRank: number | "N/A";
  aiVisibility: number;
  topBrand: string;
}

export type CitationStatus = "cited" | "mentioned" | "not-cited";

export interface RufusPhrase {
  prompt: string;
  brands: Record<string, CitationStatus>;
}

export interface SkuOptimization {
  type: string;
  label: string;
  before: string;
  after: string;
  improvements: string[];
}

// ─── Report Metadata ───

export const reportMetadata: ReportMetadata = {
  brand: "Your Brand",
  category: "Athletic Footwear / Running Shoes",
  retailer: "Amazon",
  date: "March 2026",
};

// ─── AI Visibility Scores ───

export const brandScores: BrandScore[] = [
  { brand: "Nike", score: 78 },
  { brand: "Hoka", score: 71 },
  { brand: "Brooks", score: 65 },
  { brand: "New Balance", score: 58 },
  { brand: "Your Brand", score: 42, isYourBrand: true },
];

// ─── Top Keywords ───

export const keywordData: KeywordRow[] = [
  { keyword: "best running shoes", searchVolume: "823K", yourRank: 14, aiVisibility: 32, topBrand: "Nike" },
  { keyword: "marathon running shoes", searchVolume: "201K", yourRank: 8, aiVisibility: 45, topBrand: "Hoka" },
  { keyword: "cushioned running shoes", searchVolume: "165K", yourRank: 11, aiVisibility: 38, topBrand: "Brooks" },
  { keyword: "running shoes for beginners", searchVolume: "148K", yourRank: "N/A", aiVisibility: 18, topBrand: "New Balance" },
  { keyword: "lightweight running shoes", searchVolume: "134K", yourRank: 9, aiVisibility: 41, topBrand: "Nike" },
  { keyword: "trail running shoes", searchVolume: "118K", yourRank: 12, aiVisibility: 29, topBrand: "Hoka" },
  { keyword: "stability running shoes", searchVolume: "97K", yourRank: 7, aiVisibility: 52, topBrand: "Brooks" },
  { keyword: "running shoes under $150", searchVolume: "89K", yourRank: 6, aiVisibility: 55, topBrand: "New Balance" },
  { keyword: "carbon plate running shoes", searchVolume: "76K", yourRank: "N/A", aiVisibility: 12, topBrand: "Nike" },
  { keyword: "daily training shoes", searchVolume: "62K", yourRank: 10, aiVisibility: 35, topBrand: "Hoka" },
];

// ─── Rufus Phrases ───

export const brandNames = ["Nike", "Hoka", "Brooks", "New Balance", "Your Brand"] as const;

export const rufusPhrases: RufusPhrase[] = [
  {
    prompt: "What are the best running shoes for marathon training?",
    brands: { Nike: "cited", Hoka: "cited", Brooks: "mentioned", "New Balance": "mentioned", "Your Brand": "not-cited" },
  },
  {
    prompt: "Best running shoes under $150",
    brands: { Nike: "mentioned", Hoka: "cited", Brooks: "cited", "New Balance": "cited", "Your Brand": "not-cited" },
  },
  {
    prompt: "What running shoes have the best cushioning?",
    brands: { Nike: "cited", Hoka: "cited", Brooks: "cited", "New Balance": "mentioned", "Your Brand": "mentioned" },
  },
  {
    prompt: "Are carbon plate shoes worth it for recreational runners?",
    brands: { Nike: "cited", Hoka: "mentioned", Brooks: "not-cited", "New Balance": "not-cited", "Your Brand": "not-cited" },
  },
  {
    prompt: "Best stability running shoes for overpronation",
    brands: { Nike: "mentioned", Hoka: "mentioned", Brooks: "cited", "New Balance": "cited", "Your Brand": "not-cited" },
  },
  {
    prompt: "What shoes do marathon runners actually wear?",
    brands: { Nike: "cited", Hoka: "cited", Brooks: "mentioned", "New Balance": "not-cited", "Your Brand": "not-cited" },
  },
  {
    prompt: "Lightweight running shoes for speed workouts",
    brands: { Nike: "cited", Hoka: "cited", Brooks: "mentioned", "New Balance": "mentioned", "Your Brand": "mentioned" },
  },
  {
    prompt: "Best trail running shoes for rocky terrain",
    brands: { Nike: "mentioned", Hoka: "cited", Brooks: "cited", "New Balance": "not-cited", "Your Brand": "not-cited" },
  },
];

// ─── SKU Optimization Example ───

export const skuOptimization: SkuOptimization[] = [
  {
    type: "title",
    label: "Title Rewrite",
    before:
      "Your Brand Running Shoes Men, Lightweight Sneakers",
    after:
      "Your Brand Ultra-Light Running Shoes for Men — Breathable Marathon Training Sneakers with Responsive Cushioning, Ideal for Daily Runs & Race Day",
    improvements: [
      "Added high-volume keyword 'marathon training sneakers'",
      "Included 'responsive cushioning' for Rufus citation triggers",
      "Added benefit-driven language 'daily runs & race day'",
      "Optimized to 156 of 200 character limit",
    ],
  },
  {
    type: "bullets",
    label: "Bullet Optimization",
    before:
      "Lightweight design. Comfortable fit. Good for running. Breathable mesh. Available in multiple colors.",
    after:
      "ULTRA-LIGHTWEIGHT CONSTRUCTION: Engineered mesh upper weighs just 7.8 oz, reducing fatigue during long-distance marathon training and daily runs.\nRESPONSIVE CUSHIONING SYSTEM: Dual-density foam midsole provides energy return on every stride — trusted by marathon runners for 26.2-mile comfort.\nBREATHABLE PERFORMANCE MESH: 360° ventilated knit upper keeps feet cool and dry during intense speed workouts and summer training sessions.\nSUPERIOR TRACTION OUTSOLE: Multi-directional rubber lugs grip pavement and light trails, making these versatile running shoes for any terrain.\nATHLETIC FIT FOR RUNNERS: Anatomical toe box and secure heel counter designed specifically for neutral to mild overpronation running gaits.",
    improvements: [
      "Added benefit-first formatting with caps headers",
      "Included specific metrics (7.8 oz, 26.2-mile) for credibility",
      "Targeted Rufus-trigger phrases like 'marathon training' and 'speed workouts'",
      "Expanded with technical language for AI answer engine citations",
    ],
  },
  {
    type: "keywords",
    label: "Keyword Expansion",
    before:
      "running shoes, mens sneakers, lightweight shoes",
    after:
      "running shoes men, marathon training shoes, lightweight running sneakers, cushioned running shoes, breathable running shoes, daily training shoes, race day running shoes, neutral running shoes, road running shoes men, best running shoes for men",
    improvements: [
      "Expanded from 3 to 10 backend keywords",
      "Added long-tail variants matching Rufus question patterns",
      "Included category-specific terms for AI answer matching",
      "Covered both feature-based and use-case search patterns",
    ],
  },
];
