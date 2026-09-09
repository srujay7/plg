"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { PROMPTS, LEADERBOARD, META, type PromptRow } from "@/data/plgReportData";
import { applyScenario, type Scenario } from "@/lib/plg";

// Backs the dev-only scenario toggle (DevScenarioToggle) so the report's tabs can preview
// the "brand isn't in the top 10 / doesn't rank at all" state without a second hand-authored
// dataset — see applyScenario() in lib/plg.ts.
const ReportDataContext = createContext<{
  prompts: PromptRow[];
  leaderboard: [string, number][];
  scenario: Scenario;
  setScenario: (s: Scenario) => void;
} | null>(null);

export function ReportDataProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<Scenario>("in-top-10");
  const { prompts, leaderboard } = useMemo(
    () => applyScenario(PROMPTS, LEADERBOARD, META.brand, scenario),
    [scenario]
  );

  return (
    <ReportDataContext.Provider value={{ prompts, leaderboard, scenario, setScenario }}>
      {children}
    </ReportDataContext.Provider>
  );
}

export function useReportData() {
  const ctx = useContext(ReportDataContext);
  if (!ctx) throw new Error("useReportData must be used within a ReportDataProvider");
  return ctx;
}
