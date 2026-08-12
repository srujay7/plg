import type { Metadata } from "next";
import { SignupFlow } from "@/components/plg/SignupFlow/SignupFlow";

export const metadata: Metadata = {
  title: "Sign up — AI Visibility report | CommerceIQ Content Agent",
};

export default function SignupPage() {
  return <SignupFlow />;
}
