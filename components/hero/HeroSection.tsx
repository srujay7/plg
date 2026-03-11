"use client";

import { AmbientGridLayer } from "./AmbientGridLayer";
import { HeroAnimation } from "./HeroAnimation";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* z-0: Background grid */}
      <AmbientGridLayer />
      {/* z-10: Animation layer (includes HeroCopy with intro animation) */}
      <HeroAnimation />
    </section>
  );
}
