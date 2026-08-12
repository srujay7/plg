// Ambient background glow (fixed, behind everything) + noise texture, shared by every
// (plg) screen. Ported from the ".glowfield" / ".blob" / ".noise" rules in both mockups.
export function GlowBackground() {
  return (
    <>
      <div className="plg-glowfield" aria-hidden="true">
        <div className="plg-blob b1" />
        <div className="plg-blob b2" />
        <div className="plg-blob b3" />
      </div>
      <div className="plg-noise" aria-hidden="true" />
    </>
  );
}
