// The report's section tabs — shared between Topbar (which now renders them, once the
// report is showing) and ReportView (which renders the section content for whichever tab
// is active). Plain single-word labels to match the rest of the top header's nav style —
// no "By " prefix.
export type TabKey = "brand" | "topic" | "competitors" | "prompt" | "teardown" | "pricing";

export const REPORT_TABS: { key: TabKey; label: string }[] = [
  { key: "brand", label: "Brand" },
  { key: "topic", label: "Topic" },
  { key: "prompt", label: "Prompts" },
  { key: "competitors", label: "Competitors" },
  { key: "teardown", label: "SKU teardown" },
  { key: "pricing", label: "Pricing" },
];
