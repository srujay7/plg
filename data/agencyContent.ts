// ─── Traditional vs AI Agency Comparison ───

export interface ComparisonRow {
  dimension: string;
  traditional: string;
  aiAgency: string;
}

export interface BenchmarkScenario {
  skuCount: number;
  retailerCount: number;
  analystCount: number;
  annualSpend: string;
}

export interface MeasurableOutcome {
  value: string;
  label: string;
}

export interface AgencyContent {
  heading: string;
  subheading: string;
  comparisonRows: ComparisonRow[];
  benchmarkScenario: BenchmarkScenario;
  measurableOutcomes: MeasurableOutcome[];
}

export const agencyContent: AgencyContent = {
  heading: "AI Agency vs. Traditional Agency",
  subheading:
    "See how an AI-powered content agency compares to the traditional model — at scale, speed, and cost.",
  comparisonRows: [
    {
      dimension: "Team",
      traditional: "3 analysts",
      aiAgency: "1 human + AI agents",
    },
    {
      dimension: "Coverage",
      traditional: "~800 SKUs",
      aiAgency: "Entire catalog",
    },
    {
      dimension: "Retailer coverage",
      traditional: "Top 1-3 retailers",
      aiAgency: "All retailers including long-tail",
    },
    {
      dimension: "Frequency",
      traditional: "Once every 3-6 months",
      aiAgency: "Weekly/continuous",
    },
    {
      dimension: "Monitoring",
      traditional: "Manual audits",
      aiAgency: "Automated detection",
    },
    {
      dimension: "AI discovery",
      traditional: "Not supported",
      aiAgency: "Built-in",
    },
  ],
  benchmarkScenario: {
    skuCount: 10000,
    retailerCount: 8,
    analystCount: 3,
    annualSpend: "$750K",
  },
  measurableOutcomes: [
    { value: "90%+", label: "Content compliance" },
    { value: "+10 point", label: "Content score improvement" },
    { value: "54%", label: "Traffic increase" },
    { value: "4.57%", label: "Conversion increase" },
    { value: "168%", label: "Sales increase" },
  ],
};
