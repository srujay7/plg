import type { Metadata } from "next";
import { Suspense } from "react";
import { ReportFlow } from "@/components/plg/ReportFlow/ReportFlow";

export const metadata: Metadata = {
  title: "AI Visibility report | CommerceIQ Content Agent",
};

export default function ReportPage() {
  return (
    <Suspense>
      <ReportFlow />
    </Suspense>
  );
}
