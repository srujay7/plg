import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
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
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen bg-midnight text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
