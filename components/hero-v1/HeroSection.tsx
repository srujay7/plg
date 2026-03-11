"use client";

import { AmbientGridLayer } from "./AmbientGridLayer";
import { HeroAnimation } from "./HeroAnimation";
import { HeroCopy } from "./HeroCopy";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* z-0: Background grid */}
      <AmbientGridLayer />
      {/* z-10: Animation layer */}
      <HeroAnimation />
      {/* z-20: Text overlay */}
      <HeroCopy />
    </section>
  );
}
