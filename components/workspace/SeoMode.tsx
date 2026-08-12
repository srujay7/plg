'use client';

import React from 'react';
import { HF, FONT_SANS, FONT_MONO } from './tokens';
import { Btn, Chip, Diff, PlaceholderImg, MonoLabel } from './primitives';
import { CONTENT, SEO_INTEL } from './data';

// ── Keyword list ──────────────────────────────────────────────────────
type KwType = 'missing' | 'ranking' | 'trending' | 'competitor';
interface KwRow { term: string; type: KwType; volume?: string; rank?: string; note?: string }

const KW_DOT: Record<KwType, string> = {
  missing:    HF.skillC,
  ranking:    HF.greenInk,
  trending:   HF.skillS,
  competitor: HF.accentHi,
};

function KeywordList({ rows }: { rows: KwRow[] }) {
  return (
    <div>
      {rows.map((k, i) => {
        const dot = KW_DOT[k.type] || HF.ink3;
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 64px 56px', gap: 10, alignItems: 'center', padding: '5px 0', borderTop: i === 0 ? 'none' : `1px dashed ${HF.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: dot, flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, color: HF.ink, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: FONT_SANS }}>{k.term}</span>
              <span style={{ fontSize: 8.5, fontFamily: FONT_MONO, color: dot, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, flexShrink: 0 }}>{k.type}</span>
            </div>
            <div style={{ fontSize: 10.5, color: HF.ink3, fontFamily: FONT_MONO, textAlign: 'right' as const }}>{k.volume || '—'}</div>
            <div style={{ fontSize: 10.5, fontFamily: FONT_MONO, textAlign: 'right' as const, color: k.rank === 'unranked' ? HF.skillC : HF.ink3, fontWeight: k.rank === 'unranked' ? 700 : 500 }}>{k.rank || '—'}</div>
          </div>
        );
      })}
    </div>
  );
}

function buildKwRows(intel: { missingKeywords?: Array<{ term: string; volume?: string; rank?: string }>; trendingKeywords?: Array<{ term: string; volume?: string; growth?: string }>; coveredKeywords?: Array<{ term: string; volume?: string; rank?: string }> }): KwRow[] {
  const rows: KwRow[] = [];
  (intel.missingKeywords || []).forEach(k => rows.push({ term: k.term, type: 'missing', volume: k.volume, rank: k.rank }));
  (intel.trendingKeywords || []).forEach(k => rows.push({ term: k.term, type: 'trending', volume: k.volume, rank: k.growth }));
  (intel.coveredKeywords || []).forEach(k => rows.push({ term: k.term, type: 'ranking', volume: k.volume, rank: k.rank }));
  return rows;
}

// ── Accept bar ────────────────────────────────────────────────────────
function AcceptBar() {
  return (
    <div style={{ padding: '10px 16px', background: HF.surface, color: HF.ink2, borderTop: `1px solid ${HF.border}`, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, fontFamily: FONT_SANS }}>
      <span style={{ fontSize: 9, fontFamily: FONT_MONO, color: HF.ink3, letterSpacing: '0.06em', fontWeight: 600 }}>PUBLISH</span>
      <span style={{ color: HF.ink3 }}>push to PIM → retailer → PDP · ~24h propagation</span>
      <div style={{ flex: 1 }} />
      <Btn variant="ghost" size="xs">✕ Reject</Btn>
      <Btn variant="ghost" size="xs" kbd="E">Edit</Btn>
      <Btn variant="primary" size="xs" kbd="A">✓ Accept</Btn>
    </div>
  );
}

// ── Category benchmark strip ──────────────────────────────────────────
interface BenchmarkRow { kind: string; coverage: string; weHaveIt: boolean; note?: string }
interface Benchmark { avgImageCount?: number; avgModuleCount?: number; weCurrentlyHave: number; topSKUBreakdown: BenchmarkRow[] }

function CategoryBenchmark({ data, label }: { data: Benchmark; label: string }) {
  return (
    <div style={{ borderTop: `1px solid ${HF.border}`, background: HF.paper, padding: '12px 14px' }}>
      <div style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.skillS, letterSpacing: '0.06em', marginBottom: 6 }}>
        ◈ CATEGORY BEST-IN-CLASS
        <span style={{ color: HF.ink3, fontWeight: 500, marginLeft: 8, fontStyle: 'italic', letterSpacing: 0, fontFamily: FONT_SANS }}>
          avg {data.avgImageCount || data.avgModuleCount} {label}s · we have {data.weCurrentlyHave}
        </span>
      </div>
      <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 5, overflow: 'hidden' }}>
        {data.topSKUBreakdown.map((row, i) => (
          <div key={i} style={{ padding: '6px 10px', borderTop: i === 0 ? 'none' : `1px solid ${HF.border}`, background: row.weHaveIt ? HF.paper : HF.skillCBg + '55', display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) 60px 60px minmax(0, 1.5fr)', gap: 10, alignItems: 'center', fontSize: 11 }}>
            <div style={{ color: HF.ink, fontWeight: 500, fontFamily: FONT_SANS }}>
              <span style={{ color: row.weHaveIt ? HF.greenInk : HF.skillC, marginRight: 6, fontFamily: FONT_MONO, fontWeight: 700 }}>{row.weHaveIt ? '✓' : '✗'}</span>
              {row.kind}
            </div>
            <div style={{ fontSize: 10.5, color: HF.ink2, fontFamily: FONT_MONO, textAlign: 'right' as const }}>{row.coverage}</div>
            <div>
              <Chip tone={row.weHaveIt ? 'green' : 'red'} size="xs">{row.weHaveIt ? 'have' : 'GAP'}</Chip>
            </div>
            <div style={{ fontSize: 10, color: HF.ink3, fontStyle: 'italic', fontFamily: FONT_SANS }}>{row.note || ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Generic SEO attr card ─────────────────────────────────────────────
function SeoAttr({
  letter, attr, meta, recoEl, recoHeaderMeta, liveEl, whyText, kwRows, benchmark, benchmarkLabel, last,
}: {
  letter: string; attr: string; meta: string;
  recoEl: React.ReactNode; recoHeaderMeta?: string;
  liveEl: React.ReactNode;
  whyText: React.ReactNode;
  kwRows: KwRow[];
  benchmark?: Benchmark; benchmarkLabel?: string;
  last?: boolean;
}) {
  return (
    <div style={{ marginBottom: last ? 0 : 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 4, background: HF.skillS, color: HF.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12 }}>{letter}</div>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: FONT_SANS }}>{attr}</div>
        <span style={{ fontSize: 11, color: HF.ink3, fontFamily: FONT_SANS }}>{meta}</span>
      </div>
      <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* LEFT · SEO rewrite */}
          <div style={{ background: HF.skillSBg, borderRight: `2px solid ${HF.skillS}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.skillS, letterSpacing: '0.06em', borderBottom: `1px solid ${HF.skillS}22` }}>
              <span>◈ SEO REWRITE</span>
              {recoHeaderMeta && <span style={{ color: HF.ink4 }}>{recoHeaderMeta}</span>}
            </div>
            <div style={{ padding: '12px 14px', flex: 1 }}>{recoEl}</div>
          </div>
          {/* RIGHT · live PDP */}
          <div style={{ background: HF.paper, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.06em', borderBottom: `1px solid ${HF.border}` }}>
              <span>LIVE · PDP</span>
              <span style={{ color: HF.ink4 }}>retrieved Apr 25</span>
            </div>
            <div style={{ padding: '12px 14px', flex: 1 }}>{liveEl}</div>
          </div>
        </div>
        {/* WHY + keywords */}
        <div style={{ borderTop: `1px solid ${HF.border}`, background: HF.surface, padding: '16px 20px', display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 0, alignItems: 'start' }}>
          <div style={{ paddingRight: 24 }}>
            <MonoLabel style={{ letterSpacing: '0.1em', marginBottom: 8 }}>WHY</MonoLabel>
            <div style={{ fontSize: 11.5, color: HF.ink2, lineHeight: 1.6, fontFamily: FONT_SANS }}>{whyText}</div>
          </div>
          {kwRows.length > 0 && (
            <div style={{ borderLeft: `1px solid ${HF.border}`, paddingLeft: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.skillS, letterSpacing: '0.1em' }}>KEYWORDS · {kwRows.length}</span>
                <span style={{ fontSize: 9, fontFamily: FONT_MONO, color: HF.ink4, letterSpacing: '0.06em' }}>VOL · RANK</span>
              </div>
              <KeywordList rows={kwRows.slice(0, 6)} />
            </div>
          )}
        </div>
        {benchmark && benchmarkLabel && <CategoryBenchmark data={benchmark} label={benchmarkLabel} />}
        <AcceptBar />
      </div>
    </div>
  );
}

// ── SEO Bullet row ────────────────────────────────────────────────────
function SeoBulletRow({ idx, liveText, recoText, meta }: { idx: number; liveText: string; recoText: string; meta: typeof CONTENT.bullets.perBullet[0] }) {
  const recoColon = recoText.indexOf(':');
  const recoPrefix = recoColon > 0 ? recoText.slice(0, recoColon) : '';
  const recoRest = recoColon > 0 ? recoText.slice(recoColon + 1).trim() : recoText;
  const liveColon = liveText.indexOf(':');
  const livePrefix = liveColon > 0 && liveColon < 40 ? liveText.slice(0, liveColon) : '';
  const liveRest = livePrefix ? liveText.slice(livePrefix.length + 1).trim() : liveText;

  return (
    <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', background: HF.surface, borderBottom: `1px solid ${HF.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 22, height: 22, borderRadius: 3, background: HF.dark, color: HF.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{idx}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: HF.ink, fontFamily: FONT_SANS }}>{meta.title}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: '12px 14px', background: HF.skillSBg, borderRight: `2px solid ${HF.skillS}`, display: 'flex', flexDirection: 'column', gap: 6, minHeight: 80 }}>
          <div style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.skillS, letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between' }}>
            <span>◈ SEO REWRITE</span>
            <span style={{ color: HF.ink4 }}>{recoText.length} chars · {meta.delta}</span>
          </div>
          <div style={{ fontSize: 12, color: HF.ink, lineHeight: 1.55, fontFamily: FONT_SANS }}>
            {recoPrefix && <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', padding: '1px 5px', background: HF.paper, borderRadius: 2, color: HF.skillS, marginRight: 6, fontFamily: FONT_MONO }}>{recoPrefix}</span>}
            {recoRest}
          </div>
        </div>
        <div style={{ padding: '12px 14px', background: HF.paper, display: 'flex', flexDirection: 'column', gap: 6, minHeight: 80 }}>
          <div style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between' }}>
            <span>LIVE · PDP</span>
            <span style={{ color: HF.ink4 }}>{liveText.length} chars</span>
          </div>
          <div style={{ fontSize: 12, color: HF.ink, lineHeight: 1.55, fontFamily: FONT_SANS }}>
            {livePrefix && <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', padding: '1px 5px', background: HF.surface2, borderRadius: 2, color: HF.ink2, marginRight: 6, fontFamily: FONT_MONO }}>{livePrefix}</span>}
            {liveRest}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 14px', background: HF.surface, borderTop: `1px solid ${HF.border}`, display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr) auto', gap: 14, fontSize: 11, color: HF.ink2, lineHeight: 1.45 }}>
        <div>
          <MonoLabel style={{ marginBottom: 4 }}>WHY</MonoLabel>
          <div style={{ fontSize: 11, color: HF.ink2, fontFamily: FONT_SANS }}>{meta.reason}</div>
        </div>
        <div>
          <MonoLabel style={{ marginBottom: 4 }}>KEYWORDS ADDED</MonoLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {meta.keywordsAdded.map((k, i) => (
              <span key={i} style={{ fontSize: 10.5, padding: '2px 6px', borderRadius: 3, background: HF.skillSBg, color: HF.skillS, fontFamily: FONT_MONO, fontWeight: 600 }}>◈ {k}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignSelf: 'center' }}>
          <Btn variant="ghost" size="xs">✕</Btn>
          <Btn variant="ghost" size="xs">Edit</Btn>
          <Btn variant="subtle" size="xs">✓</Btn>
        </div>
      </div>
    </div>
  );
}

function SeoBullets() {
  const pdp = CONTENT.bullets.pdp;
  const reco = CONTENT.bullets.seo.reco;
  const meta = CONTENT.bullets.perBullet;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 4, background: HF.skillS, color: HF.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12 }}>B</div>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: FONT_SANS }}>Bullets · 7 fields</div>
        <span style={{ fontSize: 11, color: HF.ink3, fontFamily: FONT_SANS }}>each bullet targets a shopper-intent cluster · full rewrite recommended</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <SeoBulletRow key={i} idx={i + 1} liveText={pdp[i]} recoText={reco[i]} meta={meta[i]} />
        ))}
      </div>
    </div>
  );
}

// ── SeoMode ───────────────────────────────────────────────────────────
export function SeoMode() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: HF.surface }}>
      <div style={{ padding: '20px 24px 40px 24px', maxWidth: 1300, width: '100%' }}>

        {/* Title */}
        <SeoAttr
          letter="T" attr="Title"
          meta="98 chars · 3 trending keywords not captured · ranks #2,188 for category"
          recoHeaderMeta={`${CONTENT.title.pdp.length + 38} chars · +3 keywords`}
          recoEl={
            <div style={{ fontSize: 13, lineHeight: 1.5, color: HF.ink, fontFamily: FONT_SANS }}>
              Yankee Candle Lemon Lavender <Diff op="add">Home Decor</Diff> Scented <Diff op="add">Candles</Diff>, Original Large Jar 22oz, Up to 150 Hour Burn Time, <Diff op="add">Giftable for Birthdays</Diff>
            </div>
          }
          liveEl={
            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: HF.ink2, fontFamily: FONT_SANS }}>
              {CONTENT.title.pdp}
              <div style={{ fontSize: 9.5, color: HF.ink4, fontFamily: FONT_MONO, marginTop: 8 }}>{CONTENT.title.pdp.length} chars</div>
            </div>
          }
          whyText={<><b>Added</b> "Home Decor", "Scented Candles", and "Giftable for Birthdays" to capture high-volume category + seasonal queries where we're currently unranked or ranking past page 40. <b>Kept</b> existing strong signals ("Lemon Lavender", "22oz", "150 Hour Burn Time") since we already rank top-15 for those. Amazon's A9 weights title keywords most heavily — these three additions expand our eligible search surface by ~560K monthly queries.</>}
          kwRows={buildKwRows(SEO_INTEL.title)}
        />

        {/* Bullets */}
        <SeoBullets />

        {/* Description */}
        <SeoAttr
          letter="D" attr="Description"
          meta="342 chars live → 742 chars rewrite · +3 high-volume keywords"
          recoHeaderMeta="742 chars · +400 chars vs live"
          recoEl={
            <div style={{ fontSize: 12, lineHeight: 1.55, color: HF.ink, fontFamily: FONT_SANS }}>
              Escape into serenity with Yankee Candle Lemon Lavender — a <Diff op="add">home fragrance</Diff> that blends uplifting zesty lemon with soothing lavender aromas to transform any room into a calming retreat. This 22oz Original Large Jar <Diff op="add">scented candle</Diff> delivers up to 150 hours of consistent, room-filling fragrance…
              <div style={{ marginTop: 8 }}>
                Whether you're creating a <Diff op="add">cozy bedroom atmosphere</Diff>, elevating your <Diff op="add">living room home decor</Diff>, or searching for the perfect <Diff op="add">giftable candle for birthdays</Diff>… <span style={{ color: HF.ink3, fontStyle: 'italic' }}>(+ 1 more paragraph)</span>
              </div>
            </div>
          }
          liveEl={
            <div style={{ fontSize: 12, lineHeight: 1.55, color: HF.ink2, fontFamily: FONT_SANS }}>
              {CONTENT.description.pdp}
              <div style={{ fontSize: 9.5, color: HF.ink4, fontFamily: FONT_MONO, marginTop: 8 }}>{CONTENT.description.pdp.length} chars</div>
            </div>
          }
          whyText={<><b>Expanded</b> from 342 → 742 chars (A9 rewards descriptions over 300 chars). <b>Added</b> "home fragrance", "cozy bedroom atmosphere", and "living room home decor" — head-term and long-tail queries we don't currently capture. <b>Restructured</b> into three scannable paragraphs. Description contributes ~18% of organic relevance score.</>}
          kwRows={buildKwRows(SEO_INTEL.description)}
        />

        {/* Images */}
        <SeoAttr
          letter="I" attr="Images · 3 slots"
          meta="34% of CTR · we have 3/7 of category best-in-class · 0 alt-text"
          recoEl={
            <div>
              <div style={{ fontSize: 12.5, color: HF.ink, lineHeight: 1.5, marginBottom: 10, fontFamily: FONT_SANS }}>
                <b style={{ color: HF.skillS }}>Add SEO alt-text to all 3 images</b> and <b style={{ color: HF.skillS }}>add 2 missing category-standard images</b> (size comparison + non-toxic ingredients callout).
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
                {[
                  { p: 'jar' as const, l: 'Primary', tag: 'alt+', tone: 'blue' as const },
                  { p: 'field' as const, l: 'Lifestyle', tag: 'alt+', tone: 'blue' as const },
                  { p: 'infographic' as const, l: '150hr', tag: 'alt+', tone: 'blue' as const },
                  { p: 'jar' as const, l: 'Size cmp', tag: 'NEW', tone: 'accent' as const },
                  { p: 'infographic' as const, l: 'Non-toxic', tag: 'NEW', tone: 'accent' as const },
                ].map((img, i) => (
                  <div key={i} style={{ border: `1px solid ${HF.border}`, borderRadius: 4, overflow: 'hidden', background: HF.paper }}>
                    <PlaceholderImg w={100} h={60} pattern={img.p} tone="indigo" style={{ borderRadius: 0, border: 'none' }} />
                    <div style={{ padding: '3px 5px', textAlign: 'center' as const }}>
                      <Chip tone={img.tone} size="xs">{img.tag}</Chip>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          liveEl={
            <>
              <div style={{ fontSize: 9.5, fontFamily: FONT_MONO, color: HF.ink3, marginBottom: 6 }}>3 images · no alt-text on any</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {[{ p: 'jar' as const, l: 'Primary' }, { p: 'field' as const, l: 'Lifestyle' }, { p: 'infographic' as const, l: '150hr' }].map((img, i) => (
                  <PlaceholderImg key={i} w={140} h={85} pattern={img.p} label={img.l} sub="no alt" tone="indigo" />
                ))}
              </div>
            </>
          }
          whyText={<><b>Added</b> SEO alt-text to all 3 existing images ("home decor", "scented candle" — indexed by A9, currently blank). <b>Added</b> two category-standard images (size comparison, non-toxic ingredient callout) — top-10 SKUs average 7.2 images and all include these two formats. Images drive ~34% of click-through rate.</>}
          kwRows={buildKwRows(SEO_INTEL.images)}
          benchmark={SEO_INTEL.images.categoryBenchmark}
          benchmarkLabel="image"
        />

        {/* A+ */}
        <SeoAttr
          letter="A+" attr="A+ Content · banners, modules, videos"
          meta="Converts +12–18% · we have 3/6 category modules · 0 video"
          recoEl={
            <div>
              <div style={{ fontSize: 12.5, color: HF.ink, lineHeight: 1.5, marginBottom: 10, fontFamily: FONT_SANS }}>
                <b style={{ color: HF.skillS }}>Add 3 missing A+ modules</b> (comparison chart, ingredient callout, gift-use seasonal banner) and <b style={{ color: HF.skillS }}>add 15–30s product video</b>.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { kind: 'Comparison', label: 'Scent family comparison chart', tag: 'NEW' },
                  { kind: 'Video', label: 'Burn-time + scent demo (22s)', tag: 'NEW' },
                  { kind: 'Callout', label: 'Non-toxic ingredient module', tag: 'NEW' },
                  { kind: 'Banner', label: 'Gift-use seasonal banner (Q2)', tag: 'NEW' },
                ].map((m, i) => (
                  <div key={i} style={{ padding: '7px 10px', background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5 }}>
                    <Chip tone="blue" size="xs">{m.kind}</Chip>
                    <span style={{ flex: 1, color: HF.ink, fontFamily: FONT_SANS }}>{m.label}</span>
                    <Chip tone="accent" size="xs">{m.tag}</Chip>
                  </div>
                ))}
              </div>
            </div>
          }
          liveEl={
            <>
              <div style={{ fontSize: 9.5, fontFamily: FONT_MONO, color: HF.ink3, marginBottom: 6 }}>3 modules · no video</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {CONTENT.aplus.pdp.map((m, i) => (
                  <div key={i} style={{ padding: '6px 10px', background: HF.surface, border: `1px solid ${HF.border}`, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                    <Chip tone="blue" size="xs">{m.kind}</Chip>
                    <span style={{ color: HF.ink2, flex: 1, fontFamily: FONT_SANS }}>{m.label}</span>
                    <span style={{ fontSize: 9.5, color: HF.ink3, fontFamily: FONT_MONO }}>{m.note}</span>
                  </div>
                ))}
              </div>
            </>
          }
          whyText={<><b>Added</b> four missing modules — top-performing SKUs average 6.4 A+ modules vs our 3. <b>Video</b> alone typically drives +8–14% conversion on candle PDPs. A+ content doesn't directly affect search rank but compounds SEO value by lifting conversion on the traffic we already earn.</>}
          kwRows={[]}
          benchmark={SEO_INTEL.aplus.categoryBenchmark as unknown as Benchmark}
          benchmarkLabel="module"
          last
        />

        {/* Footer */}
        <div style={{ padding: '20px 0 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: HF.ink2, fontFamily: FONT_SANS }}>
            <b style={{ color: HF.ink }}>5 SEO recommendations</b> · est. review 3m
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="subtle" size="sm" kbd="J">Next SKU</Btn>
            <Btn variant="primary" size="sm" kbd="⇧⏎" style={{ background: HF.skillS, borderColor: HF.skillS }}>Accept all → Publish → next SKU</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
