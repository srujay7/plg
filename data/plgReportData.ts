// Sample data for the AEO PLG AI Visibility report (PLG-03 through PLG-07).
// Ported from the aeo-plg-visibility-report-dark_3.html prototype's PROMPTS / LEADERBOARD /
// META arrays — same illustrative numbers for "Acme Pet Co." (fictional).

export type PromptRow = {
  q: string;
  topic: string;
  vis: number; // 0-100, visibility %
  sov: number; // 0-100, weighted share of voice
  rank: number | null; // best position, null when brand doesn't appear
};

export const PROMPTS: PromptRow[] = [
  { q: "what's a good dry dog food for a medium sized adult dog", topic: "Dry dog food", vis: 100, sov: 22, rank: 3 },
  { q: "show me highly rated dry kibble for dogs with allergies", topic: "Dry dog food", vis: 0, sov: 0, rank: null },
  { q: "best dry dog food that keeps my dog's coat healthy and shiny", topic: "Dry dog food", vis: 100, sov: 15, rank: 4 },
  { q: "affordable dry dog food that doesn't skimp on protein", topic: "Dry dog food", vis: 100, sov: 28, rank: 2 },

  { q: "best dry dog food for senior dogs with joint support", topic: "Senior dog food", vis: 100, sov: 34, rank: 2 },
  { q: "what dog food helps aging dogs with mobility and joint pain", topic: "Senior dog food", vis: 100, sov: 41, rank: 1 },
  { q: "gentle dog food for older dogs with sensitive digestion", topic: "Senior dog food", vis: 100, sov: 19, rank: 3 },

  { q: "grain free dog food for dogs with food sensitivities", topic: "Grain-free dog food", vis: 0, sov: 0, rank: null },
  { q: "best grain free kibble for dogs with skin allergies", topic: "Grain-free dog food", vis: 100, sov: 4, rank: 9 },
  { q: "healthy grain free dog food options for adult dogs", topic: "Grain-free dog food", vis: 0, sov: 0, rank: null },
  { q: "grain free puppy food that supports healthy growth", topic: "Grain-free dog food", vis: 100, sov: 6, rank: 8 },

  { q: "best puppy food for large breed puppies", topic: "Puppy food", vis: 100, sov: 12, rank: 5 },
  { q: "what puppy food helps with healthy brain and eye development", topic: "Puppy food", vis: 100, sov: 16, rank: 4 },
  { q: "affordable puppy food for small breed puppies", topic: "Puppy food", vis: 100, sov: 9, rank: 6 },

  { q: "dog food for dogs with sensitive stomachs and frequent vomiting", topic: "Sensitive stomach dog food", vis: 100, sov: 14, rank: 5 },
  { q: "best limited ingredient dog food for food allergies", topic: "Sensitive stomach dog food", vis: 100, sov: 8, rank: 7 },
  { q: "gentle dog food that won't upset my dog's stomach", topic: "Sensitive stomach dog food", vis: 100, sov: 11, rank: 6 },
  { q: "dog food recommendations for dogs with chronic diarrhea", topic: "Sensitive stomach dog food", vis: 0, sov: 0, rank: null },
];

export const LEADERBOARD: [string, number][] = [
  ["Purina Pro Plan", 100], ["Blue Buffalo", 91], ["Hill's Science Diet", 87],
  ["Acme Pet Co.", 79], ["Royal Canin", 74], ["Iams", 68], ["Wellness Core", 61],
  ["Nutro", 55], ["Merrick", 49], ["Rachael Ray Nutrish", 44],
];

// Mock ASIN per leaderboard/citation name (Prompt tab drill-down "ASINs surfaced" list) —
// illustrative only, there's no real per-SKU scrape backing these. Covers every name that
// can appear in a citations list, including "Diamond Naturals" (the outside-top-10 scenario's
// stand-in for the tracked brand).
export const BRAND_ASIN: Record<string, string> = {
  "Purina Pro Plan": "B00CPKD5NM",
  "Blue Buffalo": "B00CQ7SFN0",
  "Hill's Science Diet": "B01ATP1FIY",
  "Acme Pet Co.": "B08XJQZ41P",
  "Royal Canin": "B00JW8DUB6",
  Iams: "B000WFRUOC",
  "Wellness Core": "B0018CIN2S",
  Nutro: "B00SN9BSKQ",
  Merrick: "B00PHV3P9Q",
  "Rachael Ray Nutrish": "B01AF1TVFC",
  "Diamond Naturals": "B00164EJUC",
};

// Named head-to-head competitor comparison (Competitors tab): reuses the same AI-shelf
// score scale as the leaderboard above (0-100, position-weighted composite) —
// intentionally not a separate vis%/SOV%/rank breakdown per competitor, since that
// granularity only exists for the brand itself (derived from PROMPTS). Ported from the
// mock's COMPETITORS / TOPIC_COMPETITOR_SCORES.
export const COMPETITORS = [
  "Purina Pro Plan",
  "Blue Buffalo",
  "Hill's Science Diet",
  "Royal Canin",
  "Iams",
  "Wellness Core",
];

export const TOPIC_COMPETITOR_SCORES: Record<string, Record<string, number>> = {
  "Dry dog food": {
    "Purina Pro Plan": 93,
    "Blue Buffalo": 80,
    "Hill's Science Diet": 58,
    "Royal Canin": 62,
    Iams: 51,
    "Wellness Core": 44,
    You: 71,
  },
  "Senior dog food": {
    "Purina Pro Plan": 90,
    "Blue Buffalo": 88,
    "Hill's Science Diet": 69,
    "Royal Canin": 60,
    Iams: 55,
    "Wellness Core": 48,
    You: 74,
  },
  "Grain-free dog food": {
    "Purina Pro Plan": 70,
    "Blue Buffalo": 66,
    "Hill's Science Diet": 52,
    "Royal Canin": 65,
    Iams: 40,
    "Wellness Core": 81,
    You: 29,
  },
  "Puppy food": {
    "Purina Pro Plan": 91,
    "Blue Buffalo": 85,
    "Hill's Science Diet": 60,
    "Royal Canin": 62,
    Iams: 57,
    "Wellness Core": 39,
    You: 53,
  },
  "Sensitive stomach dog food": {
    "Purina Pro Plan": 84,
    "Blue Buffalo": 71,
    "Hill's Science Diet": 79,
    "Royal Canin": 58,
    Iams: 52,
    "Wellness Core": 60,
    You: 66,
  },
};

export const META = {
  brand: "Acme Pet Co.",
  company: "Acme Pet Co.",
  retailerLabel: "Amazon (Alexa AI)",
  assistant: "Alexa AI",
  category: "dog food",
  runDate: "2026-08-10",
  reportId: "8f3k2x9a",
};

// ---------- topic + prompt curation bank (Topics / Prompts screens) ----------

export const OB_PREFILLED_TOPICS = [
  "Dry dog food",
  "Senior dog food",
  "Grain-free dog food",
  "Puppy food",
  "Sensitive stomach dog food",
];

export const OB_MORE_TOPICS = [
  "Wet dog food",
  "Small breed dog food",
  "Large breed dog food",
  "Weight management dog food",
  "Limited ingredient dog food",
  "Grain-inclusive dog food",
  "High protein dog food",
  "Freeze-dried dog food",
  "Dog food toppers",
  "Hypoallergenic dog food",
  "Organic dog food",
  "Dog dental chews",
];

// Bank miss -> prompts generated live, not curated (PLG-03a coverage limit).
export const OB_UNCOVERED_TOPICS = ["Grain-free dog food"];

// Best-effort tag set standing in for the PRD's "COSMO intent angle" (PLG-03a: cluster ×
// intent -> topic, e.g. "dry dog food" x WHO = "senior dog food") until the real bank
// taxonomy ships — Comparison / Occasion / Specification / Money / Outcome, shown as a
// per-prompt tag so the user can see what shopper angle each prompt represents.
export type CosmoIntent = "Comparison" | "Occasion" | "Specification" | "Money" | "Outcome";

export const OB_PROMPT_BANK: Record<string, { text: string; intent: CosmoIntent }[]> = {
  "Dry dog food": [
    { text: "what's a good dry dog food for a medium sized adult dog", intent: "Specification" },
    { text: "best dry dog food that keeps my dog's coat healthy and shiny", intent: "Outcome" },
    { text: "affordable dry dog food that doesn't skimp on protein", intent: "Money" },
    { text: "show me highly rated dry kibble for dogs with allergies", intent: "Comparison" },
    { text: "dry dog food for everyday feeding at home", intent: "Occasion" },
    { text: "top rated dry dog food brands this year", intent: "Comparison" },
  ],
  "Senior dog food": [
    { text: "best dry dog food for senior dogs with joint support", intent: "Outcome" },
    { text: "what dog food helps aging dogs with mobility and joint pain", intent: "Outcome" },
    { text: "gentle dog food for older dogs with sensitive digestion", intent: "Specification" },
    { text: "affordable senior dog food that's still high quality", intent: "Money" },
    { text: "dog food for senior dogs transitioning off puppy food", intent: "Occasion" },
  ],
  "Grain-free dog food": [
    { text: "grain free dog food for dogs with food sensitivities", intent: "Specification" },
    { text: "best grain free kibble for dogs with skin allergies", intent: "Outcome" },
    { text: "healthy grain free dog food options for adult dogs", intent: "Specification" },
    { text: "affordable grain free dog food that won't break the bank", intent: "Money" },
    { text: "grain free dog food for a dog switching diets", intent: "Occasion" },
  ],
  "Puppy food": [
    { text: "best puppy food for large breed puppies", intent: "Specification" },
    { text: "what puppy food helps with healthy brain and eye development", intent: "Outcome" },
    { text: "affordable puppy food for small breed puppies", intent: "Money" },
    { text: "puppy food for a new puppy's first few months", intent: "Occasion" },
    { text: "top rated puppy food brands recommended by vets", intent: "Comparison" },
  ],
  "Sensitive stomach dog food": [
    { text: "dog food for dogs with sensitive stomachs and frequent vomiting", intent: "Outcome" },
    { text: "best limited ingredient dog food for food allergies", intent: "Comparison" },
    { text: "gentle dog food that won't upset my dog's stomach", intent: "Outcome" },
    { text: "affordable sensitive stomach dog food options", intent: "Money" },
    { text: "dog food to try after a stomach upset or vet visit", intent: "Occasion" },
  ],
};

// ---------- SKU teardown (PLG-04) sample content ----------

export const TEARDOWN = {
  asin: "B08XJQZ41P",
  brand: "Acme Pet Co.",
  category: "Dry dog food",
  product: "Acme Pet Co. Adult Dry Dog Food, Chicken & Rice Recipe, Real Chicken is the #1 Ingredient, 30 lb Bag",
  seoScore: 24,
  aeoScore: 41,
  scrapedOn: "5 Sep 2026",
  slotsUsed: 1,
  slotsTotal: 10,
  changesProposed: 8,

  title: {
    current: "Acme Pet Co. Adult Dry Dog Food, Chicken & Rice Recipe, Real Chicken is the #1 Ingredient, 30 lb Bag",
    currentChars: 100,
    recommended: "Acme Pet Co. Senior Dry Dog Food, Grain-Free, Chicken & Rice, 30 lb",
    recommendedChars: 67,
    cap: 75,
    why:
      "over the 75-character cap (Amazon, 27 Jul 2026), so this ASIN risks an automatic Amazon rewrite <b>and cannot show Item Highlights at all</b>. At 67 it keeps brand, product type and the pack size, pulls <b>Senior</b> and <b>Grain-Free</b> forward as the lead differentiators — 2 of the 4 topics scored above where this ASIN has 0% visibility — and hands the ingredient claim down to Item Highlights.",
  },

  highlights: {
    recommended:
      "Grain-free recipe, real chicken still the #1 ingredient · glucosamine and probiotics for joint and digestive support",
    recommendedChars: 116,
    cap: 125,
    why:
      "new 125-character searchable field launched 27 Jul 2026, displayed only when the title is within cap. Carries the ingredient claim dropped from the title, and answers the \"joint support\" and \"senior\" prompts you're tracking.",
  },

  bullets: [
    {
      current: "Real chicken is the #1 ingredient",
      recommendedHtml: "Real chicken is <b>still</b> the #1 ingredient — now in a <b>grain-free</b> recipe",
      why: "Preserves the existing, verified claim and layers in the grain-free attribute rather than replacing it.",
    },
    {
      current: "Complete and balanced nutrition",
      recommendedHtml: "<b>Vet-formulated,</b> complete and balanced nutrition for adult dogs <b>7 and up</b>",
      why:
        "\"senior dog food\" is the strongest-performing scored topic (up to 41% share of voice) — this ASIN doesn't mention \"senior\" anywhere today.",
    },
    {
      current: "No artificial preservatives",
      recommendedHtml: "No artificial preservatives, colors, or flavors — <b>just real ingredients dogs recognize</b>",
      why: "Reinforces an existing verified claim with the phrasing shoppers actually search for.",
    },
    {
      current: "Supports healthy skin and coat",
      recommendedHtml:
        "Supports healthy skin and coat with omega fatty acids, plus <b>glucosamine and probiotics for joint and digestive support</b>",
      why:
        "Directly answers the \"joint support\" and \"mobility\" language in the senior-food prompts scored above, where this ASIN currently has no answer-engine presence.",
    },
    {
      current: "Proudly made in the USA",
      recommendedHtml: "Proudly made in the USA in a <b>quality-checked facility</b>",
      why: "Keeps the existing, verified claim and tightens the phrasing — no new attribute added here.",
    },
  ],

  description: {
    current:
      "Acme Pet Co. Dry Dog Food is made with real chicken as the #1 ingredient and delivers complete, balanced nutrition for adult dogs. Proudly made in the USA.",
    recommendedHtml:
      "Acme Pet Co. <b>Senior</b> Dry Dog Food is a <b>grain-free</b> recipe made with real chicken as the #1 ingredient, <b>vet-formulated with glucosamine and probiotics for joint and digestive support</b>, and delivers complete, balanced nutrition for adult dogs<b> 7 and up</b>. Proudly made in the USA.",
    why:
      "integrates the same senior, grain-free, and joint-support attributes added above so the description doesn't contradict the title and bullets — this ASIN currently has no answer-engine presence on the senior-food or grain-free prompts scored above.",
  },

  qa: [
    {
      question: "Is this good for senior dogs?",
      answer: "\"Yes — appropriate for adult and senior maintenance.\"",
      status: "closed" as const,
      note: "added to title, highlights & bullet 2",
    },
    {
      question: "Does this contain grains?",
      answer: "\"No — this is a grain-free formula.\"",
      status: "closed" as const,
      note: "added to title & highlights",
    },
    {
      question: "Does this help with joint mobility?",
      answer: "\"Contains glucosamine and probiotics for joint and digestive support.\"",
      status: "closed" as const,
      note: "added to Item Highlights",
    },
    {
      question: "Is this suitable for dogs with chicken allergies?",
      answer: "\"Not recommended — chicken is the primary protein.\"",
      status: "notadded" as const,
      note: "would contradict on-page answer",
    },
  ],

  linkedPrompts: {
    text:
      "This SKU has no presence on 3 prompts in <b>senior dog food</b> and <b>grain-free dog food</b> — both topics scored above. The changes above target exactly that language.",
  },
};

