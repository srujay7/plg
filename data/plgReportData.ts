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

export const OB_PROMPT_BANK: Record<string, string[]> = {
  "Dry dog food": [
    "what's a good dry dog food for a medium sized adult dog",
    "best dry dog food that keeps my dog's coat healthy and shiny",
    "affordable dry dog food that doesn't skimp on protein",
    "show me highly rated dry kibble for dogs with allergies",
  ],
  "Senior dog food": [
    "best dry dog food for senior dogs with joint support",
    "what dog food helps aging dogs with mobility and joint pain",
    "gentle dog food for older dogs with sensitive digestion",
  ],
  "Grain-free dog food": [
    "grain free dog food for dogs with food sensitivities",
    "best grain free kibble for dogs with skin allergies",
    "healthy grain free dog food options for adult dogs",
  ],
  "Puppy food": [
    "best puppy food for large breed puppies",
    "what puppy food helps with healthy brain and eye development",
    "affordable puppy food for small breed puppies",
  ],
  "Sensitive stomach dog food": [
    "dog food for dogs with sensitive stomachs and frequent vomiting",
    "best limited ingredient dog food for food allergies",
    "gentle dog food that won't upset my dog's stomach",
  ],
};

// ---------- SKU teardown (PLG-04) sample content ----------

export const TEARDOWN = {
  asin: "B08XJQZ41P",
  product: "Acme Pet Co. Dry Dog Food, 30 lb Bag",
  seoScore: 58,
  aeoScore: 41,
  rows: [
    {
      field: "Title",
      disposition: "amend" as const,
      pdp: "Acme Pet Co. Dry Dog Food, 30 lb Bag",
      aiHtml:
        "Acme Pet Co. <ins>Senior</ins> Dry Dog Food, <ins>Grain-Free, Chicken &amp; Rice,</ins> 30 lb",
      why:
        "\"Senior dog food\" and \"Grain-free dog food\" are 2 of the 4 topics scored above, and this ASIN doesn't currently surface either term — that's a likely driver of the 0% visibility on 2 of the grain-free prompts.",
      tags: ["Chip: Life Stage — Adult/Senior", "Chip: Special Diet — Grain Free"],
    },
    {
      field: "Description",
      disposition: "amend" as const,
      pdp: "Acme Pet Co. Dry Dog Food is made with real chicken as the #1 ingredient and delivers complete, balanced nutrition for adult dogs. Proudly made in the USA.",
      aiHtml:
        "Acme Pet Co. <ins>Senior</ins> Dry Dog Food is a <ins>grain-free</ins> recipe made with real chicken as the #1 ingredient, <ins>vet-formulated with glucosamine and probiotics for joint and digestive support</ins>, and delivers complete, balanced nutrition for adult dogs<ins> 7 and up</ins>. Proudly made in the USA.",
      why: "Same gap as the title, plus \"joint support\" language pulled directly from the senior-food prompts scored above — this ASIN currently has no answer-engine presence on any of them.",
      tags: [] as string[],
    },
    {
      field: "Bullet 1",
      disposition: "amend" as const,
      pdp: "Real chicken is the #1 ingredient",
      aiHtml: "<ins>Grain-free</ins> — real chicken is <ins>still</ins> the #1 ingredient",
      why: "Preserves the existing, verified claim and layers in the grain-free attribute rather than replacing it.",
      tags: ["Chip: Special Diet — Grain Free"],
    },
    {
      field: "Bullet 2",
      disposition: "amend" as const,
      pdp: "Complete and balanced nutrition",
      aiHtml: "<ins>Vet-formulated, </ins>complete and balanced nutrition for adult dogs<ins> 7+</ins>",
      why: "\"Senior dog food\" is the strongest-performing scored topic (up to 41% share of voice) — this ASIN doesn't mention \"senior\" anywhere today.",
      tags: ["Chip: Life Stage — Adult/Senior"],
    },
    {
      field: "Bullet 3 · new",
      disposition: "new" as const,
      pdp: null,
      aiHtml: "Supports joint &amp; digestive health with added glucosamine and probiotics",
      why: "Directly answers the \"joint support\" and \"mobility\" language in the senior-food prompts scored above, where this ASIN currently has no answer-engine presence. Sourced from the category prompts, not an existing PDP chip.",
      tags: [] as string[],
    },
    {
      field: "Bullet candidate",
      disposition: "deferred" as const,
      pdp: "Made in the USA",
      aiHtml: "<del>Made in the USA in a human-grade certified facility</del>",
      why: null,
      legalFlag:
        "\"Human-grade\" is an FDA-scrutinized claim in pet food. The on-page Q&A references a \"human-grade certified facility,\" but Content Agent won't surface regulator-sensitive claims without a compliance sign-off — flagging this for your team to review separately instead of auto-proposing it.",
      tags: [] as string[],
    },
  ],
  qa: [
    {
      question: "Is this good for senior dogs?",
      answer: "\"Yes — appropriate for adult and senior maintenance.\"",
      status: "closed" as const,
      note: "added to title, description & bullet 2",
    },
    {
      question: "Does this contain grains?",
      answer: "\"No — this is a grain-free formula.\"",
      status: "closed" as const,
      note: "added to title, description & bullet 1",
    },
    {
      question: "Does this help with joint mobility?",
      answer: "\"Contains glucosamine and probiotics for joint and digestive support.\"",
      status: "closed" as const,
      note: "added as net-new bullet 3",
    },
    {
      question: "Is this suitable for dogs with chicken allergies?",
      answer: "\"Not recommended — chicken is the primary protein.\"",
      status: "notadded" as const,
      note: "would contradict the existing chicken-first claim",
    },
    {
      question: "Is this made with human-grade ingredients?",
      answer: "\"Manufactured in a human-grade certified facility.\"",
      status: "deferred" as const,
      note: "regulator-sensitive claim, held for legal review",
    },
  ],
  rules: [
    "Preserve substantiated claims — never remove what's already verified on the PDP.",
    "Only add attributes backed by an on-page chip, customer Q&A, or spec — no fabrication.",
    "Match language to how shoppers actually ask, using the category prompts scored above — not generic marketing copy.",
    "Flag anything regulator-sensitive (health, medical, or \"human-grade\"-style claims) for legal review instead of publishing it automatically.",
  ],
};

// ---------- sign-up flow: testimonial carousel ----------

export const TCAR_TESTIMONIALS = [
  {
    quote:
      "We had no idea how invisible we were to Alexa AI until we ran this report. Fixing our top 10 SKUs alone moved us from page 3 to being cited by name.",
    name: "Priya Natarajan",
    role: "VP Ecommerce, Nourra Foods",
    initials: "PN",
  },
  {
    quote:
      "Content Agent found the exact shopper questions we were losing on — stuff our team never would have thought to test for. It paid for itself in the first month.",
    name: "Marcus Whitfield",
    role: "Director of Digital Shelf, Kindred Home",
    initials: "MW",
  },
  {
    quote:
      "Our AI Visibility Score went from 31 to 68 in a quarter. That's not a vanity metric anymore — it's real search volume shifting to AI answers.",
    name: "Elena Kowalski",
    role: "Head of Growth, Solstice Outdoor",
    initials: "EK",
  },
  {
    quote:
      "The one-SKU teardown was the moment it clicked for our whole team. Seeing exactly what Alexa AI would rewrite made the opportunity obvious.",
    name: "Devon Osei",
    role: "Sr. Manager, Amazon Strategy, Brightleaf Pet Co.",
    initials: "DO",
  },
];
