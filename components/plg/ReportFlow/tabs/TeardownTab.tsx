"use client";

import { useState } from "react";
import { TEARDOWN } from "@/data/plgReportData";
import { KnowledgeSpaceModal } from "@/components/plg/shared/KnowledgeSpaceModal";

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
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11.5px] font-semibold"
      style={{ border: `1.5px solid ${tone.border}`, background: tone.bg, color: tone.text }}
    >
      <span aria-hidden>{icon}</span>
      {label}
      <b className="text-[12.5px] font-extrabold">{score}%</b>
      <InfoTip>{tooltip}</InfoTip>
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

type BadgeTone = "cap" | "new" | "amend";

const BADGE_STYLE: Record<BadgeTone, string> = {
  cap: "bg-[rgba(192,57,43,.1)] text-[var(--plg-error)]",
  new: "bg-[rgba(63,224,165,.16)] text-[var(--plg-good)]",
  amend: "bg-[rgba(31,34,178,.12)] text-[var(--plg-indigo)]",
};

function Badge({ tone, children }: { tone: BadgeTone; children: React.ReactNode }) {
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-bold ${BADGE_STYLE[tone]}`}>
      {children}
    </span>
  );
}

function FieldShell({
  icon,
  title,
  badge,
  checked,
  onToggle,
  disabled,
  children,
}: {
  icon: string;
  title: string;
  badge?: React.ReactNode;
  checked?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-5.5 w-5.5 flex-none items-center justify-center rounded-[5px] bg-[var(--plg-surface)] text-[11px] font-bold text-[var(--plg-muted)]">
          {icon}
        </span>
        <span className="text-[13.5px] font-bold text-[var(--plg-ink)]">{title}</span>
        {badge}
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onToggle}
          className="ml-auto h-4 w-4 flex-none accent-[var(--plg-indigo)]"
        />
      </div>
      {children}
    </div>
  );
}

function Cols({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {left}
      {right}
    </div>
  );
}

function ColLabel({ children, corner }: { children: React.ReactNode; corner?: React.ReactNode }) {
  return (
    <div className="mb-1.5 flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[.05em] text-[var(--plg-muted)]">
      <span>{children}</span>
      {corner}
    </div>
  );
}

function ColBox({
  children,
  variant = "live",
}: {
  children?: React.ReactNode;
  variant?: "live" | "rec" | "empty";
}) {
  if (variant === "empty") {
    return (
      <div className="rounded-lg border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-3.5 text-[12.5px] italic leading-relaxed text-[var(--plg-muted)]">
        — not present —
      </div>
    );
  }
  const cls =
    variant === "rec"
      ? "border-[rgba(63,224,165,.4)] bg-[rgba(63,224,165,.06)] text-[var(--plg-ink)]"
      : "border-[var(--plg-hair)] bg-[var(--plg-paper)] text-[var(--plg-ink)]";
  return <div className={`rounded-lg border p-3.5 text-[12.5px] leading-relaxed ${cls}`}>{children}</div>;
}

function Why({ html }: { html: string }) {
  return (
    <div
      className="mt-3 border-t border-[var(--plg-hair)] pt-3 text-[11.5px] leading-relaxed text-[var(--plg-text2)] [&_b]:text-[var(--plg-ink)]"
      dangerouslySetInnerHTML={{ __html: `<b>Why:</b> ${html}` }}
    />
  );
}

// SKU teardown tab (PLG-04): SKU list + selected-ASIN detail — content-health scores,
// PDP-vs-AI-recommendation field cards, and the answer-engine Q&A disposition table.
// Advisory only — nothing here is published. Ported field-for-field from the ASIN
// Optimization screen in the Pro dashboard mock (pro_dashboard_mock_v3), with only 1
// SKU slot filled in (Free plan).
export function TeardownTab() {
  const [showAddAsinNote, setShowAddAsinNote] = useState(false);
  const [acceptAll, setAcceptAll] = useState(true);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);

  const { title, highlights, bullets, description } = TEARDOWN;

  return (
    <div className="border-b border-[var(--plg-hair)]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-7 py-4">
        <div>
          <div className="text-[17px] font-bold text-[var(--plg-ink)]">ASIN Optimization</div>
          <div className="mt-0.5 text-[12.5px] text-[var(--plg-muted)]">
            SEO and AEO ready content
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-0 md:grid-cols-[300px_1fr]">
        {/* LEFT: SKU LIST */}
        <div className="border-t border-[var(--plg-hair)] p-4 md:h-fit md:self-start md:border-r md:border-t-0">
          <div className="relative mb-3 flex items-start justify-between gap-2">
            <div>
              <div className="text-[13.5px] font-bold text-[var(--plg-ink)]">SKU list</div>
              <div className="mt-0.5 text-[11px] text-[var(--plg-muted)]">
                {TEARDOWN.slotsUsed} of {TEARDOWN.slotsTotal} slots used
              </div>
            </div>
            <button
              onClick={() => setShowAddAsinNote((v) => !v)}
              className="flex-none rounded-lg border border-dashed border-[var(--plg-accent)] px-2.5 py-1.5 text-[11px] font-semibold text-[var(--plg-accent)]"
            >
              + Add ASIN
            </button>
            {showAddAsinNote && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[240px] rounded-lg border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-3.5 text-[12px] leading-relaxed text-[var(--plg-text2)] shadow-[0_14px_34px_rgba(33,2,53,.14)]">
                You&rsquo;re on Free (1 ASIN). <b className="text-[var(--plg-ink)]">Upgrade to Pro</b> to add up to
                10 ASINs and get recommendations refreshed monthly.
              </div>
            )}
          </div>

          <div className="rounded-[10px] border-[1.5px] border-[var(--plg-accent)] bg-[rgba(194,49,255,.05)] p-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-mono text-[10.5px] text-[var(--plg-muted)]">{TEARDOWN.asin}</span>
            </div>
            <div className="mb-2.5 text-[12.5px] font-medium leading-snug text-[var(--plg-ink)]">
              {TEARDOWN.product}
            </div>
            <div className="flex gap-3 text-[11.5px] text-[var(--plg-muted)]">
              <span>
                SEO <b className="text-[var(--plg-error)]">{TEARDOWN.seoScore}%</b>
              </span>
              <span>
                AEO <b className="text-[var(--plg-error)]">{TEARDOWN.aeoScore}%</b>
              </span>
            </div>
            <div className="mt-2 text-[10.5px] font-medium text-[var(--plg-accent)]">
              {TEARDOWN.changesProposed} changes proposed
            </div>
          </div>

          <div className="mt-3 rounded-[10px] border border-dashed border-[var(--plg-hair)] p-4 text-center text-[11.5px] text-[var(--plg-muted)]">
            Upgrade to use {TEARDOWN.slotsTotal - TEARDOWN.slotsUsed} more slots
          </div>
        </div>

        {/* RIGHT: DETAIL */}
        <div className="border-t border-[var(--plg-hair)] px-5 py-5 md:px-6">
          <div className="flex flex-wrap items-start gap-4 rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-4">
            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-[var(--plg-surface)] text-2xl">
              📦
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11.5px] text-[var(--plg-muted)]">
                {TEARDOWN.asin} · {TEARDOWN.brand} · {TEARDOWN.category}
              </div>
              <div className="my-1 text-[16px] font-bold leading-snug text-[var(--plg-ink)]">{TEARDOWN.product}</div>
              <div className="flex flex-wrap gap-2">
                <ScoreChip
                  icon="🔍"
                  label="SEO readiness"
                  score={TEARDOWN.seoScore}
                  tooltip={
                    <>
                      <b>How it&rsquo;s calculated:</b> Title keyword coverage, bullet &amp; description
                      completeness, backend search terms, and image/A+ content presence — scored against Amazon
                      SEO best practices for this category.
                    </>
                  }
                />
                <ScoreChip
                  icon="✨"
                  label="AEO readiness"
                  score={TEARDOWN.aeoScore}
                  tooltip={
                    <>
                      <b>How it&rsquo;s calculated:</b> Coverage of the attributes and phrasing from the shopper
                      prompts and on-page Q&amp;A scored above — how well this ASIN&rsquo;s content gives Alexa AI
                      what it needs to cite this product by name.
                    </>
                  }
                />
              </div>
              <div className="mt-1.5 text-[11.5px] text-[var(--plg-muted)]">Scraped {TEARDOWN.scrapedOn}</div>
            </div>
            <div className="flex flex-none flex-col items-end gap-1.5">
              <div className="flex flex-none items-center gap-2">
                <button
                  onClick={() => setKnowledgeOpen(true)}
                  className="flex flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border-[1.5px] border-[var(--plg-indigo)] px-3.5 py-2 text-[12.5px] font-semibold text-[var(--plg-indigo)] transition hover:bg-[rgba(31,34,178,.06)]"
                >
                  + Add knowledge
                </button>
                <button
                  disabled
                  title="Publishing isn't available yet"
                  className="flex flex-none cursor-not-allowed items-center gap-1.5 whitespace-nowrap rounded-lg bg-[var(--plg-surface)] px-3.5 py-2 text-[12.5px] font-semibold text-[var(--plg-muted)]"
                >
                  <span aria-hidden>🔒</span> Publish to PDP
                </button>
              </div>
              <label className="flex cursor-pointer items-center gap-1.5 text-[12px] font-semibold text-[var(--plg-ink)]">
                <input
                  type="checkbox"
                  checked={acceptAll}
                  onChange={() => setAcceptAll((v) => !v)}
                  className="h-4 w-4 accent-[var(--plg-indigo)]"
                />
                Accept all
              </label>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {/* TITLE */}
            <FieldShell
              icon="T"
              title="Title"
              badge={<Badge tone="cap">{title.currentChars} / {title.cap} chars — over Amazon&rsquo;s cap</Badge>}
              checked
            >
              <Cols
                left={
                  <div>
                    <ColLabel>PDP — live now</ColLabel>
                    <ColBox>{title.current}</ColBox>
                  </div>
                }
                right={
                  <div>
                    <ColLabel corner={<span className="rounded-full bg-[rgba(90,175,254,.14)] px-2 py-0.5 text-[9.5px] font-bold text-[var(--plg-secondary)]">Advisory — not published</span>}>
                      AI recommended
                    </ColLabel>
                    <div className="relative">
                      <ColBox variant="rec">{title.recommended}</ColBox>
                      <span className="absolute bottom-2 right-3 text-[10px] font-bold text-[var(--plg-good)]">
                        {title.recommendedChars} / {title.cap}
                      </span>
                    </div>
                  </div>
                }
              />
              <Why html={title.why} />
            </FieldShell>

            {/* ITEM HIGHLIGHTS */}
            <FieldShell
              icon="＋"
              title="Item Highlights"
              badge={<Badge tone="new">Net-new · {highlights.recommendedChars}/{highlights.cap}</Badge>}
              checked
            >
              <Cols
                left={
                  <div>
                    <ColLabel>PDP — live now</ColLabel>
                    <ColBox variant="empty" />
                  </div>
                }
                right={
                  <div>
                    <ColLabel>AI recommended</ColLabel>
                    <ColBox variant="rec">{highlights.recommended}</ColBox>
                  </div>
                }
              />
              <Why html={highlights.why} />
            </FieldShell>

            {/* BULLETS */}
            {bullets.map((bullet, i) => (
              <FieldShell key={i} icon="•" title={`Bullet ${i + 1}`} badge={<Badge tone="amend">Amend</Badge>} checked>
                <Cols
                  left={
                    <div>
                      <ColLabel>PDP — live now</ColLabel>
                      <ColBox>{bullet.current}</ColBox>
                    </div>
                  }
                  right={
                    <div>
                      <ColLabel>AI recommended</ColLabel>
                      <div className="rounded-lg border border-[rgba(63,224,165,.4)] bg-[rgba(63,224,165,.06)] p-3.5 text-[12.5px] leading-relaxed text-[var(--plg-ink)] [&_b]:rounded-[3px] [&_b]:bg-[rgba(63,224,165,.18)] [&_b]:px-1 [&_b]:font-semibold [&_b]:text-[var(--plg-good)]">
                        <span dangerouslySetInnerHTML={{ __html: bullet.recommendedHtml }} />
                      </div>
                    </div>
                  }
                />
                <Why html={bullet.why} />
              </FieldShell>
            ))}

            {/* DESCRIPTION */}
            <FieldShell icon="≡" title="Description" badge={<Badge tone="amend">Amend</Badge>} checked>
              <Cols
                left={
                  <div>
                    <ColLabel>PDP — live now</ColLabel>
                    <ColBox>{description.current}</ColBox>
                  </div>
                }
                right={
                  <div>
                    <ColLabel>AI recommended</ColLabel>
                    <div className="rounded-lg border border-[rgba(63,224,165,.4)] bg-[rgba(63,224,165,.06)] p-3.5 text-[12.5px] leading-relaxed text-[var(--plg-ink)] [&_b]:rounded-[3px] [&_b]:bg-[rgba(63,224,165,.18)] [&_b]:px-1 [&_b]:font-semibold [&_b]:text-[var(--plg-good)]">
                      <span dangerouslySetInnerHTML={{ __html: description.recommendedHtml }} />
                    </div>
                  </div>
                }
              />
              <Why html={description.why} />
            </FieldShell>

            {/* ANSWER ENGINE Q&A */}
            <div className="rounded-xl border border-[var(--plg-hair)] bg-[var(--plg-paper)] p-4">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-5.5 w-5.5 flex-none items-center justify-center rounded-[5px] bg-[var(--plg-surface)] text-[11px] font-bold text-[var(--plg-muted)]">
                  ?
                </span>
                <span className="text-[13.5px] font-bold text-[var(--plg-ink)]">
                  How each answer-engine question was handled
                </span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-[var(--plg-hair)]">
                <table className="w-full min-w-[520px] border-collapse text-[12.5px]">
                  <thead>
                    <tr className="bg-[var(--plg-surface)]">
                      <th className="px-3 py-2 text-left text-[10.5px] uppercase tracking-[.05em] text-[var(--plg-ink)]">
                        Customer Q&amp;A on the PDP
                      </th>
                      <th className="px-3 py-2 text-left text-[10.5px] uppercase tracking-[.05em] text-[var(--plg-ink)]">
                        Existing answer
                      </th>
                      <th className="px-3 py-2 text-left text-[10.5px] uppercase tracking-[.05em] text-[var(--plg-ink)]">
                        Disposition
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEARDOWN.qa.map((row) => (
                      <tr key={row.question} className="border-t border-[var(--plg-hair)] align-top">
                        <td className="px-3 py-2 text-[var(--plg-text2)]">{row.question}</td>
                        <td className="px-3 py-2 text-[var(--plg-text2)]">{row.answer}</td>
                        <td className="px-3 py-2 text-[var(--plg-text2)]">
                          <span
                            className={`mr-1.5 inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[10.5px] font-bold ${QA_STATUS_STYLE[row.status]}`}
                          >
                            {QA_STATUS_LABEL[row.status]}
                          </span>
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* LINKED PROMPTS */}
            <div
              className="rounded-r-lg border-l-[3px] border-[var(--plg-accent)] p-4 text-[12.5px] leading-relaxed text-[var(--plg-text2)] [&_b]:text-[var(--plg-ink)]"
              style={{ background: "rgba(194,49,255,.05)" }}
              dangerouslySetInnerHTML={{
                __html: `<b>Linked to your tracked prompts.</b> ${TEARDOWN.linkedPrompts.text}`,
              }}
            />
          </div>
        </div>
      </div>

      {knowledgeOpen && <KnowledgeSpaceModal onClose={() => setKnowledgeOpen(false)} />}
    </div>
  );
}
