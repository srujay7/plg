"use client";

import { AmbientGridLayer } from "./AmbientGridLayer";
import { HeroAnimation } from "./HeroAnimation";

export function HeroSection() {
  return (
    <section className="relative min-h-screen">
      {/* z-0: Background grid */}
      <AmbientGridLayer />
      {/* z-10: Animation layer */}
      <HeroAnimation />
    </section>
  );
}
