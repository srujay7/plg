import { Eye, LineChart, Layers, MessageSquare, PenLine, TrendingDown } from "lucide-react";

const FEATURES = [
  {
    Icon: Eye,
    title: "AI Visibility Score",
    body: "See exactly how often your brand gets recommended when shoppers ask AI agents to choose for them.",
  },
  {
    Icon: LineChart,
    title: "Beat the Competition",
    body: "Know your rank against the top 10 brands AI agents actually surface — and close the gap.",
  },
  {
    Icon: Layers,
    title: "Every Category, Covered",
    body: "Track your visibility across every shopper intent you compete in, not just your best-known SKUs.",
  },
  {
    Icon: MessageSquare,
    title: "Analyze What Shoppers Ask",
    body: "See the real questions driving AI purchase decisions — and whether your brand makes the cut.",
  },
  {
    Icon: PenLine,
    title: "Content Written to Win",
    body: "AI-generated listing fixes engineered to win over both AI agents and real shoppers.",
  },
  {
    Icon: TrendingDown,
    title: "The Cost of Losing",
    body: "Put a dollar figure on the sales walking out the door every time an AI agent skips you.",
  },
];

// Right half of the sign-up split layout: a static statement of what Content Agent does,
// shown while the visitor fills in the form on the left. Deliberately dark against the
// light form side so the two halves read as one composed screen.
export function BenefitsBanner() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[var(--plg-ink)] px-8 py-12 md:px-12 lg:px-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-20%] bottom-[-55%] h-[85%] rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(194,49,255,.42), rgba(90,175,254,.14) 48%, transparent 70%)",
        }}
      />
      <div className="relative z-10 w-full max-w-[560px]">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2.5 w-2.5 rounded-[3px]"
            style={{
              background:
                "conic-gradient(from 210deg,var(--plg-accent),var(--plg-indigo),var(--plg-secondary),var(--plg-accent))",
            }}
          />
          <span className="text-[13px] font-bold tracking-tight text-white">CommerceIQ</span>
        </div>

        <h2 className="mt-5 text-[clamp(30px,3.4vw,44px)] font-bold leading-[1.06] tracking-tight text-white">
          Win agentic commerce.
        </h2>
        <p className="mt-3 max-w-[46ch] text-[clamp(14px,1.4vw,16.5px)] leading-relaxed text-[rgba(255,255,255,.7)]">
          Shoppers don&rsquo;t browse anymore — they ask. Be the answer, on every AI agent and
          assistant.
        </p>

        <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {FEATURES.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-[10px] border border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.05)] px-4 py-3.5"
            >
              <div className="flex items-center gap-2">
                <Icon aria-hidden className="h-3.5 w-3.5 flex-none text-[var(--plg-accent)]" strokeWidth={2.25} />
                <div className="text-[13px] font-bold leading-snug text-white">{title}</div>
              </div>
              <div className="mt-1.5 text-[12.5px] leading-snug text-[rgba(255,255,255,.62)]">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
