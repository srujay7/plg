"use client";

const TIERS = [
  {
    key: "basic",
    name: "Basic",
    price: "Free",
    cadence: "this report",
    tagline: "What you're looking at right now.",
    highlight: false,
    ctaLabel: "You're on this plan",
    ctaDisabled: true,
  },
  {
    key: "pro",
    name: "Pro",
    price: "$2,000",
    cadence: "/mo",
    tagline: "Ongoing tracking across more topics and SKUs.",
    highlight: true,
    ctaLabel: "Talk to sales about Pro",
    ctaDisabled: false,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "scoped to your catalog",
    tagline: "The full Content Agent — acting, not just measuring.",
    highlight: false,
    ctaLabel: "Talk to sales",
    ctaDisabled: false,
  },
] as const;

const FEATURES: { label: string; basic: string; pro: string; enterprise: string }[] = [
  { label: "Metrics", basic: "AI Visibility + AI Rank", pro: "+ trend over time", enterprise: "+ closed-loop lift" },
  { label: "Topics", basic: "5 pre-filled, up to 10", pro: "up to 10+", enterprise: "Scoped to catalog" },
  { label: "Prompts", basic: "Editable, ≤25/topic", pro: "≤25+/topic", enterprise: "Scoped to catalog" },
  {
    label: "Topic/prompt source",
    basic: "Curated bank + live generation",
    pro: "Same bank",
    enterprise: "Bank + full generation",
  },
  { label: "Metrics refresh", basic: "Point-in-time snapshot", pro: "Weekly", enterprise: "Continuous" },
  { label: "ASIN Optimization", basic: "1 ASIN", pro: "Up to 10 SKUs, monthly", enterprise: "Full catalog" },
  { label: "Act / publish / measure", basic: "No", pro: "No", enterprise: "Yes — full Content Agent" },
  { label: "Free 45-day pilot", basic: "Always offered", pro: "Always offered", enterprise: "The on-ramp" },
];

// Pricing tab: the three-tier breakdown (Basic/Pro/Enterprise) and what upgrading actually
// changes, so a champion can size the ask without leaving the report.
export function PricingTab({
  onPilotClick,
  onUpgradeClick,
}: {
  onPilotClick: () => void;
  onUpgradeClick: () => void;
}) {
  function ctaFor(tierKey: (typeof TIERS)[number]["key"]) {
    if (tierKey === "enterprise") return onPilotClick;
    return onUpgradeClick;
  }

  return (
    <div className="mx-auto max-w-[1120px] px-7 py-12">
      <div className="max-w-[64ch]">
        <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
          Pricing
        </div>
        <h2 className="mt-2 text-[clamp(23px,3vw,30px)] font-semibold tracking-tight text-[var(--plg-ink)]">
          One funnel, three tiers
        </h2>
        <p className="mt-3 text-base text-[var(--plg-text2)]">
          Every tier includes a free 45-day Content Agent pilot — the on-ramp to Enterprise.
        </p>
      </div>

      <div className="mt-6.5 grid grid-cols-1 gap-5.5 md:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.key}
            className={`relative rounded-xl border p-6 ${
              t.highlight
                ? "border-[rgba(90,175,254,.4)] bg-gradient-to-b from-[rgba(90,175,254,.12)] to-[var(--plg-paper)]"
                : "border-[var(--plg-hair)] bg-[var(--plg-paper)]"
            }`}
          >
            {t.highlight && (
              <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[var(--plg-accent)] to-[var(--plg-secondary)] px-3 py-1 text-[10.5px] font-bold uppercase tracking-[.05em] text-[#0B041A]">
                Most popular
              </div>
            )}
            <h3 className="text-[17px] font-semibold text-[var(--plg-ink)]">{t.name}</h3>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-[32px] font-bold leading-none tracking-tight text-[var(--plg-ink)]">
                {t.price}
              </span>
              <span className="text-[13px] text-[var(--plg-muted)]">{t.cadence}</span>
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--plg-text2)]">{t.tagline}</p>
            <ul className="mt-4.5 flex flex-col gap-2.5 border-t border-[var(--plg-hair)] pt-4.5">
              {FEATURES.map((f) => (
                <li key={f.label} className="flex items-start gap-2 text-[13px] text-[var(--plg-text2)]">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--plg-indigo)]" />
                  <span>
                    <b className="text-[var(--plg-ink)]">{f.label}:</b>{" "}
                    {t.key === "basic" ? f.basic : t.key === "pro" ? f.pro : f.enterprise}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={ctaFor(t.key)}
              disabled={t.ctaDisabled}
              className={
                t.ctaDisabled
                  ? "mt-6 w-full cursor-not-allowed rounded-[10px] border-[1.5px] border-[var(--plg-hair)] bg-[var(--plg-surface)] px-5 py-3 text-sm font-bold text-[var(--plg-muted)]"
                  : t.highlight
                  ? "mt-6 w-full rounded-[10px] bg-gradient-to-r from-[var(--plg-accent)] to-[var(--plg-secondary)] px-5 py-3 text-sm font-bold text-[#0B041A] shadow-[0_6px_20px_rgba(90,175,254,.35)]"
                  : "mt-6 w-full rounded-[10px] border-[1.5px] border-[var(--plg-hair)] bg-[var(--plg-paper)] px-5 py-3 text-sm font-bold text-[var(--plg-ink)]"
              }
            >
              {t.ctaLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
