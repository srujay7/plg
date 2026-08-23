import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./plg.css";
import { GlowBackground } from "@/components/plg/shared/GlowBackground";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "AI Visibility on Alexa AI — CommerceIQ Content Agent",
  description:
    "See your brand's AI-shelf visibility on Alexa AI, get a dollar-anchored business case, and start a free Content Agent pilot.",
};

// This layout intentionally overrides the root layout's light theme + Manrope font for
// everything under (plg) — the AEO PLG product is a separate, dark-themed product surface
// and does not use the marketing site's SiteHeader/SiteFooter.
export default function PlgLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`plg-root ${dmSans.variable}`}>
      <GlowBackground />
      {children}
    </div>
  );
}
