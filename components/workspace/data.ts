export const SKU = {
  name: 'Yankee Candle® Lemon Lavender Scented Candle, 22oz',
  id: 'B0F3FHFWT',
  sapId: 'SAP_265427IW',
  rev: '$109.12K',
  scores: { C: 60, S: 95, A: 76 },
};

export const CONTENT = {
  title: {
    pdp: 'Yankee Candle® Lemon Lavender Scented Candle, 22oz Large Jar with up to 150 Hour Burn Time, Giftable, Birthdays',
    pim: 'Yankee Candle® Lemon Lavender Scented Candle, 22oz Jar, 150 Hour Burn, Gift',
    compliance: {
      score: 58,
      issue: 'Title mismatch between PIM and PDP (58% match — need 95%)',
      reco: 'Yankee Candle® Lemon Lavender Scented Candle, 22oz Large Jar with up to 150 Hour Burn Time, Giftable, Birthdays',
      action: 'Update PIM to match live PDP',
      why: 'PDP was updated by brand team Apr 18 with the full descriptive title. PIM is stale. Syncing keeps Salsify as the system of record.',
    },
    seo: {
      reco: 'Yankee Candle Lemon Lavender Home Decor Scented Candles, Original Large Jar 22oz, Up to 150 Hour Burn Time, Giftable for Birthdays',
      why: 'Adds 3 trending keywords (home decor #396, candles #657, giftable for birthdays long-tail) while preserving Brand + Type + Scent + Size structure.',
      impact: { before: 95, after: 99, reach: '+24%' },
    },
    aeo: {
      reco: 'Yankee Candle® Lemon Lavender 22oz Candle — Relaxing Aromatherapy Scent for Bedroom, Living Room & Gifting, 150-Hour Burn',
      why: 'Rewrites to answer "what candle helps me relax?" and "best scented candle for bedroom?"',
      impact: { before: 76, after: 88, rufusVisibility: '3 → 8 queries' },
    },
  },
  bullets: {
    pdp: [
      'LEMON LAVENDER SCENT: The uplifting, zesty scent of fresh lemon combines with soothing lavender aromas to create a refreshing blend that brings a touch of serenity to your favorite space.',
      'PREMIUM INGREDIENTS: Made with a premium plant-based wax blend and natural-fiber wick, designed to deliver optimal fragrance performance and a clean, even burn from first light to last.',
      'LONG-LASTING FRAGRANCE: Consistent, long-lasting fragrance from first to last burn ensures every light delivers the same rich, room-filling scent you expect from Yankee Candle.',
      'UP TO 150 HOURS: This long-burning 22oz Original Large Jar candle provides up to 150 hours of consistent, room-filling fragrance — built for daily use over weeks, not hours.',
      'MORE FRAGRANCE IN EVERY BURN: Engineered scent throw fills larger rooms quickly and evenly, so the aroma is noticeable the moment you walk in — not just right above the jar.',
      'QUALITY YOU CAN TRUST: Every Yankee Candle is made with finest quality ingredients; no added parabens, phthalates, formaldehyde, or sulfates in the candle wax.',
      'MADE IN THE USA: Crafted in the USA with globally sourced materials at our Green Lab certified facility, backed by 50+ years of fragrance expertise.',
    ],
    pim: [
      'LEMON LAVENDER SCENT: The uplifting, zesty scent of fresh lemon combines with soothing lavender aromas to create a refreshing blend that brings a touch of serenity to your favorite space.',
      'Made with premium plant wax blend and natural-fiber wick for optimal fragrance performance.',
      'LONG-LASTING FRAGRANCE: Consistent, long-lasting fragrance from first to last burn ensures every light delivers the same rich, room-filling scent you expect from Yankee Candle.',
      'Long burning candle — up to 150 hours.',
      'More fragrance in every burn.',
    ],
    seo: {
      reco: [
        'LEMON LAVENDER SCENT: The uplifting, zesty scent of fresh lemon combines with soothing lavender aromas — a refreshing home fragrance that brings serenity to any bedroom, bathroom or living space.',
        'PREMIUM PLANT-WAX BLEND: Crafted with a premium plant-based scented candle wax and natural-fiber wick for a cleaner burn, less soot, less tunneling, and optimal fragrance performance.',
        'LONG-LASTING FRAGRANCE: Consistent, long-lasting home fragrance from first to last burn — a scented candle built to deliver the same rich, room-filling aroma across 22 ounces of wax.',
        'UP TO 150 HOURS BURN: This long-burning large jar candle provides up to 150 hours of consistent, room-filling fragrance — lasts roughly 3× longer than a standard 7oz scented candle.',
        'COZY HOME DECOR: The iconic Original Large Jar silhouette doubles as cozy home decor for shelves, mantels and nightstands — a scented candle that looks as good as it smells.',
        'QUALITY INGREDIENTS: Made with finest quality ingredients, no added parabens, phthalates, formaldehyde, or sulfates in the candle wax — safer for daily use around family and pets.',
        "GIFTABLE FOR BIRTHDAYS: A giftable scented candle for birthdays, housewarmings, Mother's Day, and any candle lover — arrives gift-ready in signature Yankee Candle packaging.",
      ],
    },
    aeo: {
      reco: [
        'RELAXING AROMATHERAPY SCENT: Lemon and lavender aromas work together to help ease stress — ideal for bedrooms, reading nooks, yoga rooms, and winding down after a long day at work.',
        "WHO IT'S FOR: Shoppers looking for a calming home fragrance, gift-givers buying for candle enthusiasts, and anyone seeking a long-burning scented candle for daily or nightly use.",
        'HOW TO USE: Trim the wick to ¼" before each burn. On first use, burn 2–4 hours so wax melts fully edge-to-edge. Expect up to 150 hours of fragrance across the full 22oz jar.',
        "WHAT'S DIFFERENT: A plant-wax blend (not pure paraffin) produces less soot and maintains scent throw; the 22oz large jar lasts roughly 3× longer than a standard 7oz scented candle.",
        'WHEN TO BURN: Evenings to unwind, during yoga or meditation sessions, as ambient fragrance for dinner parties, or as a calming bedroom scent 30 minutes before you sleep.',
        'SAFETY & CARE: Burn on a heat-resistant surface, away from drafts and flammable items. Never leave unattended. Stop burning when ½" of wax remains at the bottom of the jar.',
        'ABOUT YANKEE CANDLE: 50+ years making scented candles in the USA at our Green Lab certified facility. Independently tested for ingredient safety. Trusted by candle enthusiasts.',
      ],
    },
    perBullet: [
      {
        title: 'Scent description',
        delta: '+room applications',
        skills: ['C', 'S', 'A'] as const,
        answersQueries: ['"what does lemon lavender candle smell like?"', '"calming candle for bedroom"'],
        keywordsAdded: ['home fragrance', 'bedroom', 'bathroom'],
        reason: 'Live copy is already strong. Adds explicit room applications so Rufus can surface this SKU on "candle for [room]" queries without changing brand voice.',
      },
      {
        title: 'Ingredients & burn quality',
        delta: 'expand short PIM, +wax keyword',
        skills: ['C', 'S'] as const,
        answersQueries: ['"clean burning candle"', '"best scented candle wax"'],
        keywordsAdded: ['scented candle wax', 'less soot', 'less tunneling'],
        reason: 'PIM is a 1-line shorthand — blocks compliance. Rewrite restores the full burn-quality story AND folds in "scented candle wax" (ranked #892/mo).',
      },
      {
        title: 'Longevity promise',
        delta: '+home fragrance keyword',
        skills: ['S', 'A'] as const,
        answersQueries: ['"long lasting scented candle"', '"how long do yankee candles last?"'],
        keywordsAdded: ['home fragrance', '22 ounces'],
        reason: 'Reinforces the 150hr claim with a weight callout so Rufus has a quantitative anchor when answering "how long does this candle last?".',
      },
      {
        title: '150-hour burn',
        delta: '+comparison to 7oz',
        skills: ['C', 'A'] as const,
        answersQueries: ['"is a 22oz candle worth it?"', '"large candle vs small candle"'],
        keywordsAdded: ['large jar candle', '3× longer'],
        reason: 'PIM said "up to 150 hours" — a thin fragment. Adds a concrete comparison ("3× longer than 7oz") that is the exact answer Rufus cites for value questions.',
      },
      {
        title: 'Scent throw (MISSING in PIM)',
        delta: 'rewrite + home decor angle',
        skills: ['C', 'S'] as const,
        answersQueries: ['"candle that fills a large room"', '"home decor candle"'],
        keywordsAdded: ['home decor', 'cozy', 'shelf decor'],
        reason: 'PIM bullet was a 4-word fragment. Reframe around the "cozy home decor" angle — a trending query cluster that this SKU does not currently surface for.',
      },
      {
        title: 'Quality & safety (MISSING in PIM)',
        delta: 'new bullet — not in PIM',
        skills: ['C', 'A'] as const,
        answersQueries: ['"non-toxic scented candles"', '"paraben-free candle"'],
        keywordsAdded: ['non-toxic', 'paraben-free', 'family-safe'],
        reason: 'Safety claims are the #3 Rufus query cluster for candles. PIM is missing this bullet entirely — adding it unlocks 12+ high-intent queries.',
      },
      {
        title: 'Made in USA (MISSING in PIM)',
        delta: 'new bullet — not in PIM',
        skills: ['C', 'A'] as const,
        answersQueries: ['"american made candles"', '"where is yankee candle made?"'],
        keywordsAdded: ['made in USA', 'Green Lab certified'],
        reason: 'Provenance bullet — Rufus answers "where is X made?" by retrieving this attribute directly. Live PDP has it; PIM does not. Gap resolved.',
      },
    ],
  },
  description: {
    pdp: 'Yankee Candle Lemon Lavender is a refreshing blend of uplifting lemon and soothing lavender. Made with a premium plant wax and natural-fiber wick for consistent, long-lasting fragrance. The 22oz Original Large Jar provides up to 150 hours of room-filling scent.',
    pim: '',
    compliance: {
      score: 55,
      issue: 'Description is empty in PIM. PDP has a 3-paragraph description.',
      action: 'Copy live PDP description into PIM',
    },
    seo: {
      reco: "Escape into serenity with Yankee Candle Lemon Lavender — a home fragrance that blends uplifting zesty lemon with soothing lavender aromas to transform any room into a calming retreat. This 22oz Original Large Jar scented candle delivers up to 150 hours of consistent, room-filling fragrance, crafted with a premium plant wax blend and natural-fiber wick for a cleaner, longer-lasting burn.\n\nWhether you're creating a cozy bedroom atmosphere, elevating your living room home decor, or searching for the perfect giftable candle for birthdays, Lemon Lavender brings a refreshing balance of invigoration and relaxation.",
    },
  },
  images: {
    pdp: [
      { label: 'Primary · jar shot', note: 'Clean white bg · 1500×1500' },
      { label: 'Lifestyle · lavender field', note: 'Hero scene' },
      { label: 'Infographic · 150hr burn', note: 'Feature callout' },
    ],
    pim: [
      { label: 'Primary · jar shot (older)', note: 'From Feb 14' },
      { label: 'Lifestyle · jar + lemon slice', note: 'Older creative' },
      { label: 'Infographic · more fragrance', note: 'Old variant' },
    ],
  },
  aplus: {
    pdp: [
      { kind: 'Banner', label: 'Brand header banner', note: 'Current Apr 18 · 970×300' },
      { kind: 'Comparison', label: 'Scent family comparison', note: '3 candles side-by-side' },
      { kind: 'Story', label: 'Made in USA brand story', note: 'Text + image module' },
    ],
    pim: [
      { kind: 'Banner', label: 'Brand header banner (stale)', note: 'From Jan 12 · 970×300' },
      { kind: 'Story', label: 'Made in USA brand story', note: 'In sync' },
    ],
  },
};

export const SEO_INTEL = {
  title: {
    missingKeywords: [
      { term: 'home decor', volume: '396K/mo', rank: 'unranked', opportunity: 'high', note: "Top-5 candle category query · we don't rank" },
      { term: 'candles', volume: '1.2M/mo', rank: '#42,118', opportunity: 'medium', note: 'Generic head term · we barely rank' },
      { term: 'giftable for birthdays', volume: '82K/mo', rank: 'unranked', opportunity: 'high', note: 'Long-tail gift intent · not captured' },
    ],
    trendingKeywords: [
      { term: 'home decor candle', growth: '+12% WoW', volume: '87K/mo', category: 'home category' },
      { term: 'giftable for birthdays', growth: '+24% WoW', volume: '82K/mo', category: 'seasonal · Apr-May' },
    ],
    coveredKeywords: [
      { term: 'lemon lavender candle', rank: '#12', volume: '2.1K/mo' },
      { term: '150 hour burn candle', rank: '#8', volume: '892/mo' },
      { term: 'yankee candle 22oz', rank: '#3', volume: '3.4K/mo' },
    ],
  },
  bullets: {
    missingKeywords: [
      { term: 'scented candle wax', volume: '12K/mo', rank: 'unranked', opportunity: 'medium', note: "Ingredient query · we don't appear" },
      { term: 'clean burning candle', volume: '38K/mo', rank: '#18,402', opportunity: 'high', note: 'Safety-minded shoppers · barely rank' },
      { term: 'non-toxic candle', volume: '94K/mo', rank: 'unranked', opportunity: 'high', note: 'Top health query for candles' },
      { term: 'large jar candle', volume: '22K/mo', rank: '#112', opportunity: 'medium', note: 'Close — 1 bullet rewrite away from top 10' },
    ],
    trendingKeywords: [
      { term: 'non-toxic scented candles', growth: '+32% WoW', volume: '94K/mo', category: 'clean-living' },
      { term: 'cozy home fragrance', growth: '+9% WoW', volume: '28K/mo', category: 'seasonal' },
    ],
  },
  description: {
    missingKeywords: [
      { term: 'home fragrance', volume: '184K/mo', rank: '#8,211', opportunity: 'high', note: 'High-volume head term' },
      { term: 'cozy bedroom atmosphere', volume: '28K/mo', rank: 'unranked', opportunity: 'medium', note: 'Emerging long-tail' },
      { term: 'living room home decor', volume: '72K/mo', rank: 'unranked', opportunity: 'medium', note: 'Cross-category reach' },
    ],
    trendingKeywords: [
      { term: 'cozy home fragrance', growth: '+9% WoW', volume: '28K/mo', category: 'seasonal' },
      { term: 'home decor candle', growth: '+12% WoW', volume: '87K/mo', category: 'home category' },
    ],
    coveredKeywords: [
      { term: 'lemon lavender', rank: '#12', volume: '2.1K/mo' },
      { term: 'plant wax candle', rank: '#44', volume: '4.8K/mo' },
    ],
  },
  images: {
    missingKeywords: [
      { term: 'alt-text "home decor"', volume: '', rank: '', opportunity: 'high', note: 'Alt-text indexed by A9 · missing on all 3' },
      { term: 'alt-text "scented candle"', volume: '', rank: '', opportunity: 'high', note: 'Missing on all 3' },
    ],
    trendingKeywords: [] as Array<{ term: string; growth: string; volume: string; category: string }>,
    categoryBenchmark: {
      avgImageCount: 7.2,
      weCurrentlyHave: 3,
      topSKUBreakdown: [
        { kind: 'Primary hero (white bg)', coverage: '100%', weHaveIt: true },
        { kind: 'Lifestyle (in-room scene)', coverage: '100%', weHaveIt: true },
        { kind: 'Infographic (feature callout)', coverage: '90%', weHaveIt: true },
        { kind: 'Comparison chart / size', coverage: '70%', weHaveIt: false },
        { kind: 'Ingredients / safety callout', coverage: '65%', weHaveIt: false },
        { kind: 'How-to / instructional', coverage: '45%', weHaveIt: false },
        { kind: 'Gift-packaging shot', coverage: '38%', weHaveIt: false },
      ],
    },
  },
  aplus: {
    missingKeywords: [] as Array<{ term: string; volume: string; rank: string; opportunity: string; note: string }>,
    trendingKeywords: [] as Array<{ term: string; growth: string; volume: string; category: string }>,
    categoryBenchmark: {
      avgModuleCount: 6.4,
      weCurrentlyHave: 3,
      topSKUBreakdown: [
        { kind: 'Hero banner (brand)', coverage: '100%', weHaveIt: true, note: 'Stale — Jan 12, brand refreshed Apr 18' },
        { kind: 'Brand story module', coverage: '95%', weHaveIt: true, note: 'In sync' },
        { kind: 'Scent family comparison chart', coverage: '75%', weHaveIt: false, note: 'On PDP but not in PIM' },
        { kind: 'Product video (15–30s demo)', coverage: '68%', weHaveIt: false, note: 'Top SKUs have burn-time + scent demo videos' },
        { kind: 'Ingredient callout (non-toxic)', coverage: '52%', weHaveIt: false, note: 'High-converting in "clean" shoppers' },
        { kind: 'Gift-use banner (seasonal)', coverage: '44%', weHaveIt: false, note: 'Drives Q2 seasonal spike' },
      ],
    },
  },
};

export const COMPLIANCE_INTEL = {
  title: {
    rows: [
      { field: 'Title text', type: 'mismatch' as const, lastSynced: 'PIM Feb 14', note: '58% match · PDP has descriptive long-form, PIM has shorthand' },
      { field: 'Char count', type: 'mismatch' as const, lastSynced: 'PIM Feb 14', note: 'PDP 144 chars · PIM 76 chars · 47% delta' },
      { field: 'Brand prefix', type: 'synced' as const, lastSynced: 'both Apr 18', note: '"Yankee Candle®" present in both' },
      { field: 'Size descriptor', type: 'mismatch' as const, lastSynced: 'PIM Feb 14', note: 'PDP "Large Jar with up to 150 Hour Burn Time" · PIM "Jar, 150 Hour Burn"' },
      { field: 'Trademark symbol', type: 'synced' as const, lastSynced: 'both Apr 18', note: '® preserved in both surfaces' },
    ],
  },
  description: {
    rows: [
      { field: 'Description body', type: 'missing' as const, lastSynced: 'PIM never set', note: 'PIM description field is empty · PDP has 342-char paragraph' },
      { field: 'Brand-voice tone', type: 'missing' as const, lastSynced: 'PIM never set', note: 'No brand-voice copy on file in Salsify for this SKU' },
      { field: 'Ingredient mention', type: 'missing' as const, lastSynced: 'PIM never set', note: '"plant wax" · "natural-fiber wick" · regulatory-relevant claims absent' },
      { field: 'Burn-time claim', type: 'missing' as const, lastSynced: 'PIM never set', note: '"150 hours" claim is on PDP but not anchored in PIM' },
    ],
  },
  images: {
    rows: [
      { field: 'Primary image', type: 'stale' as const, lastSynced: 'PIM Feb 14', note: 'PDP refreshed Apr 18 with brand-approved hero · PIM still has Feb creative' },
      { field: 'Lifestyle image', type: 'stale' as const, lastSynced: 'PIM Feb 14', note: 'PDP "lavender field" · PIM "jar + lemon slice" (older creative)' },
      { field: 'Infographic', type: 'outdated' as const, lastSynced: 'PIM Feb 14', note: 'PDP "150hr burn callout" · PIM "more fragrance" (deprecated message)' },
      { field: 'Alt-text', type: 'missing' as const, lastSynced: 'PIM never set', note: 'No alt-text on any of the 3 PIM images · accessibility + SEO gap' },
    ],
  },
  aplus: {
    rows: [
      { field: 'Brand header banner', type: 'stale' as const, lastSynced: 'PIM Jan 12', note: 'PDP refreshed Apr 18 with Q2 brand banner · PIM still on Jan creative' },
      { field: 'Comparison module', type: 'missing' as const, lastSynced: 'PIM never set', note: '"Scent family comparison" present on PDP, not authored in Salsify' },
      { field: 'Brand story', type: 'synced' as const, lastSynced: 'both Apr 18', note: '"Made in USA" module matches across both surfaces' },
      { field: 'Product video', type: 'missing' as const, lastSynced: 'never created', note: 'No video asset on PDP or in PIM · category best-practice gap' },
    ],
  },
};

export const INBOX_ITEMS = [
  { sku: 'B0F2X4LMQK', title: 'Yankee Candle Sage & Citrus · 22oz Original Large Jar', brand: 'Yankee Candle', score: 88, alerts: [] as string[] },
  { sku: 'B0F3FHFWT', title: 'Yankee Candle Lemon Lavender · 22oz Original Large Jar', brand: 'Yankee Candle', score: 77, current: true, alerts: ['#475569', '#2563eb', '#1e3a8a'] },
  { sku: 'B0F4MNQ8X', title: 'Yankee Candle Vanilla Cupcake · 22oz Original Large Jar', brand: 'Yankee Candle', score: 65, alerts: ['#475569', '#2563eb'] },
  { sku: 'B0F5JK7DR', title: 'Yankee Candle Balsam & Cedar · 22oz Original Large Jar', brand: 'Yankee Candle', score: 92, alerts: [] as string[] },
  { sku: 'B0F6PQ2VW', title: 'Yankee Candle Clean Cotton · 22oz Original Large Jar', brand: 'Yankee Candle', score: 71, alerts: ['#2563eb'] },
  { sku: 'B0F7TR3XY', title: 'Yankee Candle Pink Sands · 22oz Original Large Jar', brand: 'Yankee Candle', score: 84, alerts: [] as string[] },
  { sku: 'B0F8KL9MN', title: 'Yankee Candle Black Cherry · 22oz Original Large Jar', brand: 'Yankee Candle', score: 79, alerts: ['#1e3a8a'] },
  { sku: 'B0F9QW3ZA', title: 'Yankee Candle Autumn Wreath · 22oz Original Large Jar', brand: 'Yankee Candle', score: 83, alerts: [] as string[] },
];
