import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Content Agent — Win the AI Shelf",
  description:
    "AI that continuously adapts retail content across search, answer engines, and retailer PDPs to capture demand and drive conversion.",
  openGraph: {
    title: "Content Agent — Win the AI Shelf",
    description:
      "AI agents that continuously optimize product content across retailers and AI shopping assistants.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-midnight text-text-primary font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
