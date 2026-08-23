"use client";

import { TEARDOWN } from "@/data/plgReportData";

function InfoTip({ children }: { children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex flex-none">
      <span className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[var(--plg-gap)] text-[10px] font-bold text-[var(--plg-muted)] group-hover:border-[var(--plg-secondary)] group-hover:text-[var(--plg-secondary)]">
        i
      </span>
      <span className="pointer-events-none absolute right-0 top-[calc(100%+10px)] z-[45] w-[250px] rounded-[10px] border border-white/10 bg-[#1B0F2C] p-3.5 text-xs font-normal leading-relaxed text-white opacity-0 shadow-[0_14px_34px_rgba(0,0,0,.5)] transition group-hover:opacity-100 [&_b]:text-white">
        {children}
      </span>
    </span>
  );
}

const DISP_STYLE: Record<string, string> = {
  amend: "bg-[rgba(138,141,255,.16)] text-[var(--plg-indigo)]",
  append: "bg-[rgba(90,175,254,.16)] text-[var(--plg-accent)]",
  new: "bg-[rgba(63,224,165,.16)] text-[#4FEAB0]",
  deferred: "bg-[rgba(255,184,64,.16)] text-[#FFC15E]",
};
const DISP_LABEL: Record<string, string> = {
  amend: "Amend",
  append: "Append",
  new: "Net-new",
  deferred: "Deferred",
};

function Disposition({ kind }: { kind: string }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.05em] ${DISP_STYLE[kind]}`}>
      {DISP_LABEL[kind]}
    </span>
  );
}

const QA_STATUS_STYLE: Record<string, string> = {
  closed: "bg-[rgba(63,224,165,.16)] text-[#4FEAB0]",
  deferred: "bg-[rgba(255,184,64,.16)] text-[#FFC15E]",
  notadded: "bg-white/[0.07] text-[var(--plg-muted)]",
};
const QA_STATUS_LABEL: Record<string, string> = {
  closed: "Closed",
  deferred: "Deferred",
  notadded: "Not added",
};

// SKU teardown tab (PLG-04): SEO + AEO readiness score cards, revenue-at-risk card,
// PDP-vs-AI-recommendation diff rows, Q&A disposition table, and the rewrite rules list.
// Advisory only — nothing here is published. Ported from the .scorepair/.teardowncompare/
// .qatable/.ruleslist markup + inline <ins>/<del> diff HTML in the mock.
export function TeardownTab() {
  return (
    <div className="mx-auto max-w-[1120px] px-7 py-12">
      <div className="max-w-[64ch]">
        <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
          1 ASIN on Basic
        </div>
        <h2 className="mt-2 text-[clamp(23px,3vw,30px)] font-semibold tracking-tight text-[var(--plg-ink)]">
          SKU teardown — content-health scores + advisory rewrite
        </h2>
        <p className="mt-3 text-base text-[var(--plg-text2)]">
          Scraped current PDP content, diagnosed, and rewritten for both classic SEO and
          answer-engine readiness. Advisory only — nothing is published from this report.
        </p>
      </div>

      <div className="mt-5.5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.045] p-5.5 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-2.5">
            <div className="text-[12.5px] font-semibold text-[var(--plg-muted)]">SEO readiness</div>
            <InfoTip>
              <b>How it&rsquo;s calculated:</b> Title keyword coverage, bullet &amp; description
              completeness, backend search terms, and image/A+ content presence — scored against
              Amazon SEO best practices for this category.
            </InfoTip>
          </div>
          <div className="mt-2.5 min-h-[34px] text-[12.5px] leading-snug text-[var(--plg-text2)]">
            How complete and keyword-optimized this listing is for classic Amazon search.
          </div>
          <div className="my-3.5 h-2.5 overflow-hidden rounded-md bg-white/[0.09]">
            <div className="h-full rounded-md bg-[var(--plg-indigo)]" style={{ width: `${TEARDOWN.seoScore}%` }} />
          </div>
          <div className="font-mono text-2xl font-medium text-[var(--plg-ink)]">
            {TEARDOWN.seoScore}
            <span className="text-sm text-[var(--plg-muted)]"> / 100</span>
          </div>
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.045] p-5.5 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-2.5">
            <div className="text-[12.5px] font-semibold text-[var(--plg-muted)]">AEO readiness</div>
            <InfoTip>
              <b>How it&rsquo;s calculated:</b> Coverage of the attributes and phrasing from the
              shopper prompts and on-page Q&amp;A scored above — how well this ASIN&rsquo;s
              content gives Alexa AI what it needs to cite this product by name.
            </InfoTip>
          </div>
          <div className="mt-2.5 min-h-[34px] text-[12.5px] leading-snug text-[var(--plg-text2)]">
            How ready this listing&rsquo;s content is to be cited in Alexa AI&rsquo;s answers.
          </div>
          <div className="my-3.5 h-2.5 overflow-hidden rounded-md bg-white/[0.09]">
            <div className="h-full rounded-md bg-[var(--plg-accent)]" style={{ width: `${TEARDOWN.aeoScore}%` }} />
          </div>
          <div className="font-mono text-2xl font-medium text-[var(--plg-ink)]">
            {TEARDOWN.aeoScore}
            <span className="text-sm text-[var(--plg-muted)]"> / 100</span>
          </div>
        </div>

        <div className="relative rounded-2xl border border-[rgba(255,122,80,.4)] bg-gradient-to-b from-[rgba(255,122,80,.14)] to-[rgba(255,122,80,.03)] p-5.5 shadow-[0_10px_30px_rgba(255,90,50,.2)]">
          <div className="absolute -top-2.5 left-4.5 rounded-full bg-gradient-to-r from-[#FFA36B] to-[#FF5C4D] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.05em] text-[#2B0A02] shadow-[0_6px_16px_rgba(255,90,50,.45)]">
            ⚠ Highest priority
          </div>
          <div className="flex items-center justify-between gap-2.5">
            <div className="text-[12.5px] font-semibold text-[#FFB08C]">Revenue at risk</div>
            <InfoTip>
              <b>How it&rsquo;s calculated:</b> Same AI Visibility/Rank gap × query volume (SQP) ×
              conversion × AOV model as the brand-level estimate above, scoped to Alexa
              AI (AEO/chatbot) traffic on this ASIN&rsquo;s 2 weakest topics — not overall revenue.
              Directional, not measured.
            </InfoTip>
          </div>
          <div className="mt-2.5 min-h-[34px] text-[12.5px] leading-snug text-[var(--plg-text2)]">
            Annual revenue lost to competitors that get cited instead — on AEO/chatbot traffic
            alone.
          </div>
          <div className="my-3.5 h-2.5 overflow-hidden rounded-md bg-white/[0.09]">
            <div className="h-full rounded-md bg-gradient-to-r from-[#FFA36B] to-[#FF5C4D]" style={{ width: "88%" }} />
          </div>
          <div className="font-mono text-[26px] font-medium text-[#FF8A65]">
            ${(TEARDOWN.riskLow / 1000).toFixed(0)}K–${(TEARDOWN.riskHigh / 1000).toFixed(0)}K
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-6 border-t border-white/10 pt-4 text-[12.5px] text-[var(--plg-muted)]">
        <span>
          <b className="text-[var(--plg-ink)]">ASIN</b> &nbsp;{TEARDOWN.asin}
        </span>
        <span>
          <b className="text-[var(--plg-ink)]">Product</b> &nbsp;{TEARDOWN.product}
        </span>
        <span>
          <b className="text-[var(--plg-ink)]">Inputs used</b> &nbsp;current PDP content &middot;
          on-page chips &middot; customer Q&amp;A &middot; the 18 category prompts scored above
        </span>
      </div>

      <div className="mt-7 text-[11.5px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
        PDP vs AI recommendations
      </div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
        <div className="hidden grid-cols-[150px_1fr_1fr] gap-5 pb-3.5 md:grid">
          <div />
          <div className="text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
            PDP — live now
          </div>
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-bold uppercase tracking-[.06em] text-[var(--plg-indigo)]">
            AI recommendations — proposed{" "}
            <span className="inline-block rounded-full border border-[rgba(90,175,254,.32)] bg-[rgba(90,175,254,.12)] px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[.04em] text-[var(--plg-accent)]">
              Advisory — not published
            </span>
          </div>
        </div>
        {TEARDOWN.rows.map((row) => (
          <div
            key={row.field}
            className="grid grid-cols-1 gap-1.5 border-t border-white/10 py-4.5 first:border-t-0 md:grid-cols-[150px_1fr_1fr] md:items-start md:gap-5"
          >
            <div className="pt-0.5 text-[12.5px] font-bold text-[var(--plg-ink)]">{row.field}</div>
            <div className={`text-[13.5px] leading-relaxed ${row.pdp ? "text-[var(--plg-text2)]" : "italic text-[var(--plg-gap)]"}`}>
              {row.pdp ?? "— not present —"}
            </div>
            <div className="text-[13.5px] leading-relaxed text-[var(--plg-text2)]">
              <span className="mb-2 inline-block">
                <Disposition kind={row.disposition} />
              </span>
              <div
                className="[&_del]:rounded-[3px] [&_del]:bg-[rgba(255,90,110,.14)] [&_del]:px-0.5 [&_del]:text-[#FF8FA3] [&_del]:line-through [&_ins]:rounded-[3px] [&_ins]:bg-[rgba(63,224,165,.14)] [&_ins]:px-0.5 [&_ins]:font-semibold [&_ins]:text-[#4FEAB0] [&_ins]:no-underline"
                dangerouslySetInnerHTML={{ __html: row.aiHtml }}
              />
              {row.why && (
                <div className="mt-2.5 text-[12.5px] text-[var(--plg-muted)]">
                  <b className="text-[var(--plg-ink)]">Why:</b> {row.why}
                </div>
              )}
              {"legalFlag" in row && row.legalFlag && (
                <div className="mt-3 rounded-md border-l-[3px] border-[#FF6B81] bg-[rgba(255,90,110,.10)] p-3 text-[12.5px] leading-relaxed text-[#FFC7D1]">
                  <b className="mb-1 block text-[#FF8FA3]">⚠ Held for legal review — not included in this proposal</b>
                  {row.legalFlag}
                </div>
              )}
              {row.tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {row.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[rgba(90,175,254,.14)] px-2.5 py-1 text-[11px] text-[var(--plg-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 text-[11.5px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
        How each answer-engine question was handled
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-[13px] backdrop-blur-xl">
          <thead>
            <tr className="bg-white/[0.035]">
              <th className="px-3 py-2.5 text-left text-[10.5px] uppercase tracking-[.05em] text-[var(--plg-ink)]">
                Customer Q&amp;A on the PDP
              </th>
              <th className="px-3 py-2.5 text-left text-[10.5px] uppercase tracking-[.05em] text-[var(--plg-ink)]">
                Existing answer
              </th>
              <th className="px-3 py-2.5 text-left text-[10.5px] uppercase tracking-[.05em] text-[var(--plg-ink)]">
                Disposition
              </th>
            </tr>
          </thead>
          <tbody>
            {TEARDOWN.qa.map((row) => (
              <tr key={row.question} className="border-t border-white/10 align-top">
                <td className="px-3 py-2.5 text-[var(--plg-text2)]">{row.question}</td>
                <td className="px-3 py-2.5 text-[var(--plg-text2)]">{row.answer}</td>
                <td className="px-3 py-2.5 text-[var(--plg-text2)]">
                  <span className={`mr-1.5 inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-bold ${QA_STATUS_STYLE[row.status]}`}>
                    {QA_STATUS_LABEL[row.status]}
                  </span>
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5.5 rounded-2xl border border-white/10 bg-white/[0.035] p-5.5">
        <h4 className="mb-2.5 text-[13px] font-bold text-[var(--plg-ink)]">The rules this rewrite follows</h4>
        <ol className="list-decimal pl-5 text-[13px] leading-relaxed text-[var(--plg-text2)]">
          {TEARDOWN.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </div>

      <p className="mt-4.5 text-[12.5px] text-[var(--plg-muted)]">
        Diagnosis reuses the same category shopper prompts scored above, plus the ASIN&rsquo;s
        on-page chips and customer Q&amp;A. Basic covers 1 ASIN; Pro covers up to 10, refreshed
        monthly.
      </p>
    </div>
  );
}
