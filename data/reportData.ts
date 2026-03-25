// ─── Rufus AI Visibility Report Data Types & Store ───

export interface ReportBrand {
  name: string;
  slug: string;
  category: string;
  region: string;
  score: number;
  rank: number;
  totalBrands: number;
  verdict: string;
  insightText: string;
  leaderboard: LeaderboardEntry[];
  prompts: PromptEntry[];
  topics: TopicEntry[];
  skuOptimization: SkuOptData;
  catalogReadiness: CatalogReadiness;
}

export interface LeaderboardEntry {
  rank: number;
  brand: string;
  score: number;
  isYou?: boolean;
}

export interface PromptEntry {
  prompt: string;
  visibility: number;
  aiRank: string;
  status: "critical" | "minimal" | "risk";
}

export interface TopicEntry {
  topic: string;
  visibility: number;
  aiRank: string;
  winnerName: string;
  winnerInitials: string;
  winnerColor: string;
}

export interface ContentCard {
  type: "title" | "bullets" | "description";
  label: string;
  current: string;
  recommended: string;
  reasons: ContentReason[];
}

export interface ContentReason {
  type: "add" | "keep" | "remove";
  text: string;
}

export interface SkuOptData {
  productName: string;
  asin: string;
  rating: number;
  reviewCount: number;
  asinUrl: string;
  cards: ContentCard[];
}

export interface CatalogReadiness {
  percent: number;
  headline: string;
  description: string;
}

// ─── Summer's Eve Report ───

const summersEve: ReportBrand = {
  name: "Summer's Eve",
  slug: "summers-eve",
  category: "Health & Household",
  region: "Amazon US",
  score: 91,
  rank: 1,
  totalBrands: 10,
  verdict: "Category Leader",
  insightText:
    "Summer's Eve is visible in only 91% of shopper prompts relevant to high-traffic categories like Natural and Soothing Intimate Products, Odor Control and Feminine Deodorants, Everyday Intimate Cleansing Needs, missing the vast majority of purchase-intent moments where competitors like The Honey Pot Company and vH essentials are actively being recommended.",
  leaderboard: [
    { rank: 1, brand: "Summer's Eve", score: 90, isYou: true },
    { rank: 2, brand: "The Honey Pot Company", score: 63 },
    { rank: 3, brand: "vH essentials", score: 54 },
    { rank: 4, brand: "Love Wellness", score: 45 },
    { rank: 5, brand: "Monistat", score: 36 },
    { rank: 6, brand: "Organyc", score: 33 },
    { rank: 7, brand: "Rael", score: 32 },
    { rank: 8, brand: "Vagisil", score: 29 },
    { rank: 9, brand: "Dove", score: 27 },
    { rank: 10, brand: "The Honest Company", score: 18 },
  ],
  prompts: [
    {
      prompt:
        "What is the best feminine wash to maintain freshness throughout the day without irritation?",
      visibility: 33,
      aiRank: "#2.6",
      status: "critical",
    },
    {
      prompt:
        "Looking for a gentle daily intimate wash suitable for sensitive skin and regular use?",
      visibility: 29,
      aiRank: "#2.8",
      status: "critical",
    },
    {
      prompt:
        "Which pH balanced intimate wash is best for daily use on sensitive skin?",
      visibility: 29,
      aiRank: "#2.9",
      status: "critical",
    },
    {
      prompt:
        "What are the best feminine deodorant sprays for long-lasting odor control?",
      visibility: 25,
      aiRank: "#5.1",
      status: "critical",
    },
    {
      prompt:
        "Where can I find flushable feminine wipes that are gentle for sensitive skin?",
      visibility: 17,
      aiRank: "#6.4",
      status: "critical",
    },
    {
      prompt:
        "Looking for a soothing feminine wash with natural ingredients and no harsh chemicals",
      visibility: 0,
      aiRank: "\u2014",
      status: "critical",
    },
    {
      prompt:
        "Looking for a gentle feminine deodorant spray suitable for sensitive skin daily use",
      visibility: 50,
      aiRank: "#1.2",
      status: "minimal",
    },
    {
      prompt:
        "Which natural intimate wash is best for sensitive skin and daily use?",
      visibility: 20,
      aiRank: "#1.1",
      status: "minimal",
    },
    {
      prompt:
        "Looking for a gentle sensitive skin feminine wash without harsh chemicals or fragrances.",
      visibility: 17,
      aiRank: "#1.3",
      status: "minimal",
    },
    {
      prompt:
        "Need a fragrance free intimate wash to use every day for basic feminine hygiene needs.",
      visibility: 17,
      aiRank: "#1.3",
      status: "minimal",
    },
    {
      prompt:
        "Looking for portable feminine wipes for on-the-go freshness and easy disposal.",
      visibility: 13,
      aiRank: "#1.7",
      status: "minimal",
    },
  ],
  topics: [
    {
      topic: "Odor Control and Feminine Deodorants",
      visibility: 100,
      aiRank: "#1.1",
      winnerName: "Summer's Eve",
      winnerInitials: "SE",
      winnerColor: "hsl(73,55%,45%)",
    },
    {
      topic: "Everyday Intimate Cleansing Needs",
      visibility: 100,
      aiRank: "#1.3",
      winnerName: "Summer's Eve",
      winnerInitials: "SE",
      winnerColor: "hsl(73,55%,45%)",
    },
    {
      topic: "Sensitive Skin and pH-Balanced Care",
      visibility: 100,
      aiRank: "#1.5",
      winnerName: "Summer's Eve",
      winnerInitials: "SE",
      winnerColor: "hsl(73,55%,45%)",
    },
    {
      topic: "Feminine Hygiene Wipes and On-the-Go Solutions",
      visibility: 100,
      aiRank: "#1.8",
      winnerName: "Summer's Eve",
      winnerInitials: "SE",
      winnerColor: "hsl(73,55%,45%)",
    },
    {
      topic: "Natural and Soothing Intimate Products",
      visibility: 50,
      aiRank: "#4.6",
      winnerName: "The Honey Pot Company",
      winnerInitials: "THP",
      winnerColor: "hsl(290,55%,45%)",
    },
  ],
  skuOptimization: {
    productName:
      "Summer's Eve Spa Daily Intimate Wash, Renewing Cleansing All Over Feminine Body Wash, Jasmine Scented pH-Balanced Feminine Wash, 12oz Bottle",
    asin: "B0BRXCJV1R",
    rating: 4.5,
    reviewCount: 639,
    asinUrl: "https://www.amazon.com/dp/B0BRXCJV1R",
    cards: [
      {
        type: "title",
        label: "Title",
        current:
          "Summer's Eve Spa Daily Intimate Wash, Renewing Cleansing All Over Feminine Body Wash, Jasmine Scented pH-Balanced Feminine Wash, 12oz Bottle",
        recommended:
          "Summer's Eve Spa Daily Intimate Wash, Renewing Jasmine Scent, pH-Balanced Creamy Feminine and All Over Body Wash, 12oz Bottle",
        reasons: [
          {
            type: "add",
            text: 'Add "Jasmine Scent" as a standalone signal \u2014 The current title buries jasmine inside "Jasmine Scented pH-Balanced Feminine Wash," making it harder for Rufus to surface the product on scent-driven queries like "jasmine feminine wash" or "scented intimate wash." Isolating "Jasmine Scent" earlier in the title gives it stronger keyword weight.',
          },
          {
            type: "add",
            text: 'Add "Creamy" to the body wash descriptor \u2014 The current title uses "Renewing Cleansing All Over Feminine Body Wash" with no texture signal. Adding "Creamy" directly matches shopper queries for "creamy body wash" and "rich lather wash," a dimension the current title misses entirely.',
          },
          {
            type: "remove",
            text: 'Remove redundant "Jasmine Scented pH-Balanced Feminine Wash" phrase \u2014 The current title repeats "Feminine Wash" and "Jasmine Scented" twice across its length, consuming title real estate without adding new query signals. Consolidating these into the recommended structure eliminates the redundancy and makes room for more distinct terms.',
          },
          {
            type: "keep",
            text: 'Keep "Summer\'s Eve Spa Daily Intimate Wash" \u2014 This is the core brand and product anchor in the current title and must be preserved. It ensures Rufus matches direct brand searches and "intimate wash" category queries without disruption.',
          },
        ],
      },
      {
        type: "bullets",
        label: "Bullets",
        current:
          "1. Summer's Eve Spa Renewing Jasmine Feminine Wash gently cleanses and leaves your intimate skin feeling pampered, soft, and refreshed\n2. Indulge in a sense of renewal and elevate your intimate skin care routine with renewing jasmine fragrance blended with essential oils\n3. Summer's Eve Spa renewing luxurious cleansing feminine body wash offers an indulgent, gentle clean experience for under your arms, breasts, and even in your intimate area\n4. This luxurious wash is designed for women's delicate, intimate skin and gynecologist and dermatologist tested, safe for sensitive skin, hypoallergenic, pH-balanced, and free from dyes, parabens, and alcohol",
        recommended:
          "1. LUXURIOUS CREAMY TEXTURE: Indulge your skin with a rich, creamy wash that pampers while cleansing, leaving you feeling soft and refreshed after every use.\n2. ALL OVER USE BODY WASH: Gentle enough for daily intimate care yet suitable for your underarms, breasts, and the whole body for a spa-like experience each time you shower.\n3. RENEWING JASMINE FRAGRANCE: Features a delicate jasmine scent, blended with essential oils, that uplifts and elevates your intimate care routine with a touch of luxury.\n4. SKIN-FRIENDLY, PH-BALANCED FORMULA: Safe for sensitive skin and pH balanced, dermatologically and gynecologist tested, hypoallergenic, and formulated without dyes, parabens, or alcohol for peace of mind.",
        reasons: [
          {
            type: "add",
            text: 'Lead with "LUXURIOUS CREAMY TEXTURE" as a named benefit \u2014 The current bullet 1 describes the product as cleansing and refreshing but never names the texture. The recommended version leads with "creamy" as a scannable keyword, directly matching Rufus queries for "creamy body wash" or "rich lather feminine wash" that the current bullets cannot surface.',
          },
          {
            type: "add",
            text: 'Introduce "ALL OVER USE BODY WASH" as a dedicated bullet \u2014 The current bullet 3 mentions underarms, breasts, and intimate area inline within a prose sentence, making it easy for Rufus to overlook. The recommended version promotes this into a bold, standalone header, unlocking visibility for "full body wash," "all over feminine wash," and "versatile body wash" queries.',
          },
          {
            type: "add",
            text: 'Elevate "RENEWING JASMINE FRAGRANCE" into a dedicated benefit bullet \u2014 The current listing splits jasmine fragrance across bullets 1 and 2 without ever making it a scannable, labeled feature. The recommended version consolidates this into a single, prominent bullet with a clear kicker.',
          },
          {
            type: "remove",
            text: "Remove unstructured safety claim stacking in bullet 4 \u2014 The current bullet 4 lists gynecologist tested, dermatologist tested, sensitive skin safe, hypoallergenic, pH-balanced, dye-free, paraben-free, and alcohol-free all in a single run-on sentence. The recommended version restructures these under a clear kicker, making each claim scannable.",
          },
        ],
      },
      {
        type: "description",
        label: "Description",
        current:
          "Experience Daily Intimate Beauty with Summer's Eve Spa Renewing Jasmine Feminine Wash. Summer's Eve Spa Renewing Feminine Wash has a jasmine fragrance blended with essential oils. The creamy feminine body wash is gynecologist tested, safe and gentle enough to use every day. Free from dyes and parabens, the intimate wash cleanses and leaves your intimate skin feeling soft, refreshed, and pampered. Summer's Eve Spa Renewing Creamy Cleansing Wash is safe for sensitive skin, hypoallergenic and balanced to a woman's natural pH. Elevate your intimate care routine and indulge in relaxation with our luxurious Spa cleansing wash. This luxurious, creamy wash provides a sense of refreshment and renewal. All Summer's Eve feminine hygiene products are gynecologist tested to ensure they are safe, even for sensitive skin. Whether you're at home or on the go, elevate your feminine care routine with Summer's Eve Spa silky, rich cleaning wash. Summer's Eve Feminine Cleansing Wash and Cleansing Wipes are available in a variety of different fragrances and sizes. Sunburn Alert: This product contains an alpha hydroxy acid (AHA) that may increase your skin's sensitivity to the sun and particularly the possibility of sunburn. Use a sunscreen, wear protective clothing, and limit sun exposure while using this product and for a week afterwards.",
        recommended:
          "Elevate your daily intimate care routine with Summer's Eve Spa Renewing Jasmine Intimate Wash. This luxurious, creamy body wash is crafted for delicate skin, enveloping you in a rich lather that gently cleanses and helps your skin feel soft, fresh, and pampered. The renewing jasmine fragrance, blended with essential oils, creates an uplifting sensory experience while its pH-balanced, hypoallergenic formula is free from dyes, parabens, and alcohol making it a mindful choice even for sensitive skin. Suitable for all-over use, including underarms, breasts, and intimate areas, it's dermatologist and gynecologist tested for added confidence. Whether starting your day or transitioning from home to on-the-go, trust in a gentle yet indulgent clean that brings a spa-like touch to your everyday routine. (Note: Some customers may experience sensitivity, so patch test before full use.) As with any product containing alpha hydroxy acid (AHA), use sunscreen and protective clothing due to increased sun sensitivity.",
        reasons: [
          {
            type: "add",
            text: "Consolidate fragmented claims into a single, coherent narrative \u2014 The current description repeats \"gynecologist tested\" twice, uses \"luxurious\" and \"creamy\" in disconnected sentences, and restates the same cleansing benefit across multiple paragraphs. The recommended version weaves all key attributes into one flowing paragraph.",
          },
          {
            type: "add",
            text: "Add occasion-based language for lifestyle and routine queries \u2014 The current description ends with a generic \"at home or on the go\" mention buried after a catalog cross-sell line. The recommended version leads with routine-anchored language, positioning the product for Rufus queries around \"morning wash routine\" and \"daily feminine care.\"",
          },
          {
            type: "remove",
            text: "Remove the catalog cross-sell line \u2014 \"Summer's Eve Feminine Cleansing Wash and Cleansing Wipes are available in a variety of different fragrances and sizes.\" This sentence adds no purchase-relevant context for this specific SKU and dilutes the description's keyword focus.",
          },
          {
            type: "add",
            text: "Replace absolute safety claims with a patch-test advisory \u2014 The current description states the product is \"safe and gentle enough to use every day\" as unqualified absolutes. The recommended version replaces this with a patch-test note, which is more accurate given real-world review variance.",
          },
        ],
      },
    ],
  },
  catalogReadiness: {
    percent: 72,
    headline:
      "72% of Summer's Eve SKUs Are Missing AI Visibility Signals",
    description:
      "Most Summer's Eve product listings lack the language that drives Rufus recommendations. Optimizing these SKUs could significantly expand total catalog visibility.",
  },
};

// ─── Report Store ───

const reports: Record<string, ReportBrand> = {
  "summers-eve": summersEve,
};

export function getReport(slug: string): ReportBrand | undefined {
  return reports[slug];
}

export function getAllReportSlugs(): string[] {
  return Object.keys(reports);
}
