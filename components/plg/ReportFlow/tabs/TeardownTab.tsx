"use client";

import { TEARDOWN } from "@/data/plgReportData";

function InfoTip({ children }: { children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex flex-none">
      <span className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-[var(--plg-gap)] text-[10px] font-bold text-[var(--plg-muted)] group-hover:border-[var(--plg-secondary)] group-hover:text-[var(--plg-secondary)]">
        i
      </span>
      <span className="pointer-events-none absolute right-0 top-[calc(100%+10px)] z-[45] w-[250px] rounded-[10px] border border-[var(--plg-hair)] bg-[var(--plg-ink)] p-3.5 text-xs font-normal leading-relaxed text-[var(--plg-paper)] opacity-0 shadow-[0_14px_34px_rgba(33,2,53,.18)] transition group-hover:opacity-100 [&_b]:text-[var(--plg-paper)]">
        {children}
      </span>
    </span>
  );
}

const DISP_STYLE: Record<string, string> = {
  amend: "bg-[rgba(138,141,255,.16)] text-[var(--plg-indigo)]",
  append: "bg-[rgba(90,175,254,.16)] text-[var(--plg-accent)]",
  new: "bg-[rgba(63,224,165,.16)] text-[var(--plg-good)]",
  deferred: "bg-[rgba(255,184,64,.16)] text-[#92400E]",
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
  closed: "bg-[rgba(63,224,165,.16)] text-[var(--plg-good)]",
  deferred: "bg-[rgba(255,184,64,.16)] text-[#92400E]",
  notadded: "bg-[var(--plg-surface)] text-[var(--plg-muted)]",
};
const QA_STATUS_LABEL: Record<string, string> = {
  closed: "Closed",
  deferred: "Deferred",
  notadded: "Not added",
};

// Color the score chips by how healthy the score is — green/amber/red — so the two
// numbers read at a glance instead of blending into flat gray text.
function scoreTone(score: number) {
  if (score >= 75) {
    return { border: "rgba(20,122,82,.35)", bg: "rgba(20,122,82,.1)", text: "var(--plg-good)" };
  }
  if (score >= 50) {
    return { border: "rgba(255,184,64,.5)", bg: "rgba(255,184,64,.14)", text: "#92400E" };
  }
  return { border: "rgba(192,57,43,.35)", bg: "rgba(192,57,43,.1)", text: "var(--plg-error)" };
}

function ScoreChip({ icon, label, score, tooltip }: { icon: string; label: string; score: number; tooltip: React.ReactNode }) {
  const tone = scoreTone(score);
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold"
      style={{ border: `1.5px solid ${tone.border}`, background: tone.bg, color: tone.text }}
    >
      <span aria-hidden>{icon}</span>
      {label}
      <b className="text-[15px] font-extrabold">{score}%</b>
      <InfoTip>{tooltip}</InfoTip>
    </span>
  );
}

// SKU teardown tab (PLG-04): SEO + AEO readiness score cards, revenue-at-risk card,
// PDP-vs-AI-recommendation diff rows, Q&A disposition table, and the rewrite rules list.
// Advisory only — nothing here is published. Ported from the .scorepair/.teardowncompare/
// .qatable/.ruleslist markup + inline <ins>/<del> diff HTML in the mock.
export function TeardownTab() {
  return (
    <div className="mx-auto max-w-[1120px] px-7 py-12">
      <div className="max-w-[64ch]">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--plg-accent)]">
            1 ASIN on Basic
          </div>
          <button
            disabled
            title="Adding more ASINs isn't available on Basic — Pro covers up to 10, refreshed monthly"
            className="flex flex-none cursor-not-allowed items-center gap-1 rounded-full border border-[var(--plg-hair)] px-2.5 py-1 text-[11px] font-semibold text-[var(--plg-muted)]"
          >
            <span aria-hidden>🔒</span> + Add ASIN
          </button>
        </div>
        <h2 className="mt-2 text-[clamp(23px,3vw,30px)] font-semibold tracking-tight text-[var(--plg-ink)]">
          ASIN Optimization — content-health scores + advisory rewrite
        </h2>
        <p className="mt-3 text-base text-[var(--plg-text2)]">
          Scraped current PDP content, diagnosed, and rewritten for both classic SEO and
          answer-engine readiness. Advisory only — nothing is published from this report.
        </p>
      </div>

      <div className="mt-5.5 flex items-center gap-1.5 text-[12px] text-[var(--plg-muted)]">
        <span aria-hidden>📦</span> {TEARDOWN.asin}
      </div>
      <div className="mt-1 text-[16px] font-semibold text-[var(--plg-ink)]">{TEARDOWN.product}</div>

      <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
        <ScoreChip
          icon="🔍"
          label="SEO readiness"
          score={TEARDOWN.seoScore}
          tooltip={
            <>
              <b>How it&rsquo;s calculated:</b> Title keyword coverage, bullet &amp; description
              completeness, backend search terms, and image/A+ content presence — scored against
              Amazon SEO best practices for this category.
            </>
          }
        />
        <ScoreChip
          icon="✨"
          label="AEO readiness"
          score={TEARDOWN.aeoScore}
          tooltip={
            <>
              <b>How it&rsquo;s calculated:</b> Coverage of the attributes and phrasing from the
              shopper prompts and on-page Q&amp;A scored above — how well this ASIN&rsquo;s content
              gives Alexa AI what it needs to cite this product by name.
            </>
          }
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        <div className="text-[11.5px] font-bold uppercase tracking-[.06em] text-[var(--plg-muted)]">
          PDP vs AI recommendations
        </div>
        <button
          disabled
          title="Publishing isn't available yet — this report is advisory only in v1"
          className="flex flex-none cursor-not-allowed items-center gap-1.5 rounded-lg bg-[var(--plg-hair)] px-4 py-2 text-[13px] font-semibold text-[var(--plg-muted)]"
        >
          <span aria-hidden>🔒</span> Publish to PDP
        </button>
      </div>
      <div className="mt-3 rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-6">
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
            className="grid grid-cols-1 gap-1.5 border-t border-[var(--plg-hair)] py-4.5 first:border-t-0 md:grid-cols-[150px_1fr_1fr] md:items-start md:gap-5"
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
                className="[&_del]:rounded-[3px] [&_del]:bg-[rgba(255,90,110,.14)] [&_del]:px-0.5 [&_del]:text-[var(--plg-error)] [&_del]:line-through [&_ins]:rounded-[3px] [&_ins]:bg-[rgba(63,224,165,.14)] [&_ins]:px-0.5 [&_ins]:font-semibold [&_ins]:text-[var(--plg-good)] [&_ins]:no-underline"
                dangerouslySetInnerHTML={{ __html: row.aiHtml }}
              />
              {row.why && (
                <div className="mt-2.5 text-[12.5px] text-[var(--plg-muted)]">
                  <b className="text-[var(--plg-ink)]">Why:</b> {row.why}
                </div>
              )}
              {"legalFlag" in row && row.legalFlag && (
                <div className="mt-3 rounded-md border-l-[3px] border-[var(--plg-error)] bg-[rgba(192,57,43,.08)] p-3 text-[12.5px] leading-relaxed text-[var(--plg-error)]">
                  <b className="mb-1 block text-[var(--plg-error)]">⚠ Held for legal review — not included in this proposal</b>
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
        <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] text-[13px]">
          <thead>
            <tr className="bg-[var(--plg-surface)]">
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
              <tr key={row.question} className="border-t border-[var(--plg-hair)] align-top">
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

      <div className="mt-5.5 rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-surface)] p-5.5">
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
