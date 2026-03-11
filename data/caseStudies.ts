export interface CaseStudyMetric {
  value: string;
  label: string;
  suffix?: string;
}

export interface CaseStudyQuote {
  text: string;
  author: string;
  title: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  logo?: string;
  headline: string;
  challenge: string[];
  solution: string[];
  metrics: CaseStudyMetric[];
  quotes: CaseStudyQuote[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "newell-brands",
    company: "Newell Brands",
    headline: "From Manual Content Operations to AI-Driven Content Execution",
    challenge: [
      "Managing content across thousands of SKUs and multiple retailers was entirely manual, consuming weeks of team effort per update cycle.",
      "Inconsistent PIM compliance led to content suppression and lost visibility on key retailer platforms.",
      "No visibility into how AI answer engines were citing or recommending Newell products versus competitors.",
      "Content updates were reactive and slow — seasonal and trend-driven opportunities were missed entirely.",
    ],
    solution: [
      "Content Agent automated end-to-end content optimization from PIM data ingestion through retailer publishing.",
      "Brand governance rules and retailer-specific formatting requirements were enforced automatically on every content change.",
      "AI visibility monitoring provided real-time tracking of answer engine citations and competitive positioning.",
      "Continuous optimization replaced quarterly manual audits, enabling the team to respond to market shifts in real time.",
    ],
    metrics: [
      { value: "40x", label: "Faster content updates" },
      { value: "100%", label: "PIM compliance" },
      { value: "<1min", label: "Time to action" },
      { value: "80", label: "Days to deploy", suffix: "days" },
    ],
    quotes: [
      {
        text: "Content Agent transformed how we think about retail content. What used to take our team weeks now happens in minutes — and the quality is better than what we were producing manually. This isn't just automation; it's a fundamental shift in how brands should operate on the digital shelf.",
        author: "Nick Hammitt",
        title: "CMO, Newell Brands",
      },
      {
        text: "We went from managing spreadsheets and chasing retailer spec changes to having an intelligent system that handles it all. The PIM compliance alone saved us from countless content suppressions. Our team can finally focus on strategy instead of data entry.",
        author: "Robert Ibarguen",
        title: "Sr Manager, Newell Brands",
      },
      {
        text: "As a content analyst, I used to spend my entire week just auditing PDPs for compliance issues. Now Content Agent flags problems before they happen and fixes them automatically. I've gone from firefighting to actually driving content strategy — it's completely changed my role.",
        author: "Nicole",
        title: "Content Analyst, Newell Brands",
      },
    ],
  },
];
