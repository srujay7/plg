import type { Metadata } from "next";
import { ReportFlow } from "@/components/plg/ReportFlow/ReportFlow";

export const metadata: Metadata = {
  title: "AI Visibility report | CommerceIQ Content Agent",
};

export default function ReportPage() {
  return <ReportFlow />;
}
