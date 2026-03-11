"use client";

export function AmbientGridLayer() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100,120,160,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial fade from center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, var(--color-midnight) 100%)",
        }}
      />
      {/* Subtle top vignette */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-midnight), transparent)",
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-60"
        style={{
          background:
            "linear-gradient(to top, var(--color-midnight), transparent)",
        }}
      />
    </div>
  );
}
