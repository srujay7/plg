import { HeroSection } from "@/components/hero/HeroSection";
import { HeroSection as HeroSectionV1 } from "@/components/hero-v1/HeroSection";
import { AIShelfRealitySection } from "@/components/sections/AIShelfRealitySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhatAgentSeesSection } from "@/components/sections/WhatAgentSeesSection";
import { ProductDemoSection } from "@/components/sections/ProductDemoSection";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { AIAgencySection } from "@/components/sections/AIAgencySection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const heroVersion = params.hero;

  return (
    <>
      {heroVersion === "v1" ? <HeroSectionV1 /> : <HeroSection />}
      <AIShelfRealitySection />
      <HowItWorksSection />
      <WhatAgentSeesSection />
      <ProductDemoSection />
      <CaseStudySection />
      <AIAgencySection />
      <PricingSection />
      <FinalCTASection />
    </>
  );
}
