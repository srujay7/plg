'use client';

import React, { useState } from 'react';
import { HF, FONT_SANS, FONT_MONO } from './tokens';
import { Btn, Chip, Diff, PlaceholderImg, MonoLabel, SkillTag } from './primitives';
import type { SkillKey } from './primitives';
import { CONTENT, SEO_INTEL } from './data';

// ── PIM/PDP toggle ────────────────────────────────────────────────────
function LiveToggle({ which, onChange }: { which: 'pdp' | 'pim'; onChange: (v: 'pdp' | 'pim') => void }) {
  return (
    <div style={{ display: 'flex', gap: 2, padding: 2, background: HF.surface2, borderRadius: 4, border: `1px solid ${HF.border}` }}>
      {(['pdp', 'pim'] as const).map(key => {
        const on = which === key;
        return (
          <button key={key} onClick={() => onChange(key)} style={{
            fontSize: 10.5, padding: '3px 8px', borderRadius: 3,
            background: on ? HF.paper : 'transparent',
            color: on ? HF.ink : HF.ink3,
            border: on ? `1px solid ${HF.border2}` : '1px solid transparent',
            fontWeight: on ? 600 : 500, fontFamily: FONT_SANS, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            {key === 'pim' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: HF.skillC }} />}
            <span>{key === 'pdp' ? 'PDP · Amazon' : 'PIM · Salsify'}</span>
            <span style={{ fontSize: 9, fontFamily: FONT_MONO, color: HF.ink3, textTransform: 'uppercase' as const }}>
              {key === 'pdp' ? 'live' : 'stale'}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── Accept bar ────────────────────────────────────────────────────────
function AcceptBar({ verb = 'PUBLISH' }: { verb?: string }) {
  return (
    <div style={{
      padding: '10px 16px', background: HF.surface, color: HF.ink2,
      borderTop: `1px solid ${HF.border}`,
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 11, fontFamily: FONT_SANS,
    }}>
      <span style={{ fontSize: 9, fontFamily: FONT_MONO, color: HF.ink3, letterSpacing: '0.06em', fontWeight: 600 }}>{verb}</span>
      <span style={{ color: HF.ink3 }}>accept → PIM → retailer → PDP · ~24h propagation</span>
      <div style={{ flex: 1 }} />
      <Btn variant="ghost" size="xs">✕ Reject</Btn>
      <Btn variant="ghost" size="xs" kbd="E">Edit</Btn>
      <Btn variant="primary" size="xs" kbd="A">✓ Accept</Btn>
    </div>
  );
}

// ── Attribute card header ─────────────────────────────────────────────
function AttrHeader({
  letter, attr, meta, which, onWhichChange,
}: {
  letter: string; attr: string; meta: string;
  which: 'pdp' | 'pim'; onWhichChange: (v: 'pdp' | 'pim') => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <div style={{
        width: 24, height: 24, borderRadius: 4,
        background: HF.dark, color: HF.paper,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12,
      }}>{letter}</div>
      <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: FONT_SANS }}>{attr}</div>
      <span style={{ fontSize: 11, color: HF.ink3, fontFamily: FONT_SANS }}>{meta}</span>
      <div style={{ flex: 1 }} />
      <LiveToggle which={which} onChange={onWhichChange} />
    </div>
  );
}

// ── WHY strip — three-skill rows ──────────────────────────────────────
type WhyRow = { skill: SkillKey; score: number; target: number; note: string };

const SKILL_CFG_LOCAL = {
  C: { icon: '⬢', name: 'COMPLIANCE', bg: HF.skillCBg, fg: HF.skillC },
  S: { icon: '◈', name: 'SEO',        bg: HF.skillSBg, fg: HF.skillS },
  A: { icon: '◎', name: 'AEO',        bg: HF.skillABg, fg: HF.skillA },
};

function WhyStrip({ rows }: { rows: WhyRow[] }) {
  return (
    <>
      <MonoLabel style={{ letterSpacing: '0.1em', marginBottom: 10 }}>WHY · ONE CHANGE · THREE SKILLS</MonoLabel>
      <div>
        {rows.map((r, i) => {
          const cfg = SKILL_CFG_LOCAL[r.skill];
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '108px 1fr 88px',
              gap: 14, alignItems: 'center',
              padding: '8px 0',
              borderTop: i === 0 ? 'none' : `1px dashed ${HF.border}`,
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '3px 7px', borderRadius: 3,
                background: cfg.bg, color: cfg.fg,
                fontFamily: FONT_MONO, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.05em',
                width: 'fit-content',
              }}>
                <span>{cfg.icon}</span>{cfg.name}
              </div>
              <div style={{ fontSize: 11.5, color: HF.ink2, lineHeight: 1.55, fontFamily: FONT_SANS }}>{r.note}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10.5, textAlign: 'right' as const }}>
                <span style={{ color: HF.ink3 }}>{r.score}</span>
                <span style={{ color: HF.ink4, margin: '0 4px' }}>→</span>
                <span style={{ color: HF.greenInk, fontWeight: 700 }}>{r.target}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── Keyword list (for Title WHY strip) ───────────────────────────────
type KwRow = { term: string; type: 'missing' | 'trending' | 'ranking'; volume?: string; rank?: string };

function KeywordList({ rows }: { rows: KwRow[] }) {
  const TYPE_DOTS: Record<string, string> = {
    missing:  HF.skillC,
    ranking:  HF.greenInk,
    trending: HF.skillS,
  };
  return (
    <div>
      {rows.slice(0, 6).map((k, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 64px 56px',
          gap: 10, alignItems: 'center',
          padding: '5px 0',
          borderTop: i === 0 ? 'none' : `1px dashed ${HF.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: TYPE_DOTS[k.type] || HF.ink3, flexShrink: 0 }} />
            <span style={{ fontSize: 11.5, color: HF.ink, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: FONT_SANS }}>
              {k.term}
            </span>
            <span style={{ fontSize: 8.5, fontFamily: FONT_MONO, color: TYPE_DOTS[k.type] || HF.ink3, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, flexShrink: 0 }}>
              {k.type}
            </span>
          </div>
          <div style={{ fontSize: 10.5, color: HF.ink3, fontFamily: FONT_MONO, textAlign: 'right' as const }}>{k.volume || '—'}</div>
          <div style={{
            fontSize: 10.5, fontFamily: FONT_MONO, textAlign: 'right' as const,
            color: k.rank === 'unranked' ? HF.skillC : HF.ink3,
            fontWeight: k.rank === 'unranked' ? 700 : 500,
          }}>{k.rank || '—'}</div>
        </div>
      ))}
    </div>
  );
}

function buildKwRows(intel: typeof SEO_INTEL.title): KwRow[] {
  const rows: KwRow[] = [];
  (intel.missingKeywords || []).forEach(k => rows.push({ term: k.term, type: 'missing', volume: k.volume, rank: k.rank }));
  (intel.trendingKeywords || []).forEach(k => rows.push({ term: k.term, type: 'trending', volume: k.volume, rank: k.growth }));
  ('coveredKeywords' in intel ? (intel as typeof SEO_INTEL.title).coveredKeywords || [] : []).forEach((k: { term: string; rank: string; volume: string }) => rows.push({ term: k.term, type: 'ranking', volume: k.volume, rank: k.rank }));
  return rows;
}

// ── Title attribute card ──────────────────────────────────────────────
function TitleAttr() {
  const [which, setWhich] = useState<'pdp' | 'pim'>('pdp');
  const kwRows = buildKwRows(SEO_INTEL.title);

  return (
    <div style={{ marginBottom: 20 }}>
      <AttrHeader letter="T" attr="Title" meta="one unified recommendation covers all 3 skills" which={which} onWhichChange={setWhich} />
      <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {/* Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* LEFT */}
          <div style={{ background: HF.accentBg, borderRight: `2px solid ${HF.accentHi}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.accentHi, letterSpacing: '0.06em', borderBottom: `1px solid ${HF.accentHi}22` }}>
              <span>◈ AGENT RECOMMENDS</span>
              <span style={{ color: HF.ink4 }}>HIGH CONFIDENCE</span>
            </div>
            <div style={{ padding: '12px 14px', flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: HF.ink, marginBottom: 8, lineHeight: 1.4, fontFamily: FONT_SANS }}>
                Rewrite title — sync with PDP, add 3 trending keywords, target 5 new Rufus queries
              </div>
              <div style={{ background: HF.diffAdd, padding: '9px 11px', borderRadius: 5, border: `1px solid ${HF.greenInk}22`, fontSize: 13, lineHeight: 1.5, color: HF.ink }}>
                Yankee Candle Lemon Lavender <Diff op="add">Home Decor</Diff> Scented <Diff op="add">Candles</Diff>, Original Large Jar 22oz, Up to 150 Hour Burn Time, <Diff op="add">Giftable for Birthdays</Diff>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div style={{ background: HF.paper, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.06em', borderBottom: `1px solid ${HF.border}` }}>
              <span>{which === 'pim' ? 'LIVE · PIM · SALSIFY' : 'LIVE · PDP'}</span>
              <span style={{ color: HF.ink4 }}>{which === 'pim' ? 'last sync Feb 14' : 'retrieved Apr 18'}</span>
            </div>
            {which === 'pim' && (
              <div style={{ padding: '6px 14px', background: HF.skillCBg, color: HF.skillC, fontSize: 10, fontFamily: FONT_MONO, fontWeight: 700, letterSpacing: '0.04em', borderBottom: `1px solid ${HF.skillC}22` }}>
                ⬢ PIM IS STALE · source of truth behind live PDP
              </div>
            )}
            <div style={{ padding: '12px 14px', flex: 1 }}>
              <MonoLabel style={{ marginBottom: 6 }}>LIVE TITLE · {which === 'pdp' ? CONTENT.title.pdp.length : CONTENT.title.pim.length} CHARS</MonoLabel>
              <div style={{ fontSize: 12, lineHeight: 1.55, color: HF.ink2, fontFamily: FONT_SANS }}>
                {which === 'pdp' ? CONTENT.title.pdp : CONTENT.title.pim}
              </div>
            </div>
          </div>
        </div>

        {/* WHY */}
        <div style={{ borderTop: `1px solid ${HF.border}`, background: HF.surface, padding: '16px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 0, alignItems: 'start' }}>
            <div style={{ paddingRight: 24 }}>
              <MonoLabel style={{ letterSpacing: '0.1em', marginBottom: 8 }}>WHY · ONE CHANGE · THREE SKILLS</MonoLabel>
              <div style={{ fontSize: 11.5, color: HF.ink2, lineHeight: 1.6, fontFamily: FONT_SANS }}>
                Syncs stale PIM (Feb 14) with live PDP — resolves <b style={{ color: HF.skillC }}>58% mismatch</b>. Adds <b style={{ color: HF.skillS }}>3 trending keywords</b> Amazon search rewards (+396K/mo unranked surface), and targets <b style={{ color: HF.skillA }}>5 new Rufus queries</b> — answer-rate <b>3/42 → 8/42</b>.
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {[
                  { skill: 'C' as SkillKey, from: 60, to: 95, icon: '⬢', name: 'Compliance', bg: HF.skillCBg, fg: HF.skillC },
                  { skill: 'S' as SkillKey, from: 95, to: 99, icon: '◈', name: 'SEO', bg: HF.skillSBg, fg: HF.skillS },
                  { skill: 'A' as SkillKey, from: 76, to: 88, icon: '◎', name: 'AEO', bg: HF.skillABg, fg: HF.skillA },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '2px 7px 2px 6px', borderRadius: 3,
                    background: r.bg, color: r.fg,
                    fontFamily: FONT_MONO, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.04em',
                  }}>
                    <span>{r.icon}</span>
                    <span>{r.name}</span>
                    <span style={{ opacity: 0.55 }}>{r.from}</span>
                    <span style={{ opacity: 0.5 }}>→</span>
                    <span>{r.to}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderLeft: `1px solid ${HF.border}`, paddingLeft: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.skillS, letterSpacing: '0.1em' }}>
                  KEYWORDS · {kwRows.length}
                </span>
                <span style={{ fontSize: 9, fontFamily: FONT_MONO, color: HF.ink4, letterSpacing: '0.06em' }}>VOL · RANK</span>
              </div>
              <KeywordList rows={kwRows} />
            </div>
          </div>
        </div>

        <AcceptBar />
      </div>
    </div>
  );
}

// ── Bullet row ────────────────────────────────────────────────────────
function BulletRow({
  idx, liveText, liveWhich, isMissing, isTruncated, recoText, meta,
}: {
  idx: number;
  liveText: string | undefined;
  liveWhich: 'pdp' | 'pim';
  isMissing: boolean;
  isTruncated: boolean;
  recoText: string;
  meta: typeof CONTENT.bullets.perBullet[0];
}) {
  const colonIdx = recoText.indexOf(':');
  const recoPrefix = colonIdx > 0 ? recoText.slice(0, colonIdx) : '';
  const recoRest = colonIdx > 0 ? recoText.slice(colonIdx + 1).trim() : recoText;

  const liveColon = liveText ? liveText.indexOf(':') : -1;
  const livePrefix = liveText && liveColon > 0 && liveColon < 40 ? liveText.slice(0, liveColon) : '';
  const liveRest = livePrefix ? liveText!.slice(livePrefix.length + 1).trim() : liveText;

  return (
    <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 8, overflow: 'hidden' }}>
      {/* Row header */}
      <div style={{ padding: '8px 12px', background: HF.surface, borderBottom: `1px solid ${HF.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 22, height: 22, borderRadius: 3, background: HF.dark, color: HF.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{idx}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: HF.ink, fontFamily: FONT_SANS }}>{meta.title}</div>
        {isMissing && <Chip tone="red" size="xs">missing in PIM</Chip>}
        {isTruncated && <Chip tone="yellow" size="xs">truncated in PIM</Chip>}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 4 }}>
          {meta.skills.map((s) => <SkillTag key={s} skill={s} />)}
        </div>
      </div>

      {/* Diff */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* AGENT */}
        <div style={{ padding: '12px 14px', background: HF.accentBg, borderRight: `2px solid ${HF.accentHi}`, display: 'flex', flexDirection: 'column', gap: 6, minHeight: 96 }}>
          <div style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.accentHi, letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between' }}>
            <span>◈ AGENT REWRITE</span>
            <span style={{ color: HF.ink4 }}>{recoText.length} chars · {meta.delta}</span>
          </div>
          <div style={{ fontSize: 12, color: HF.ink, lineHeight: 1.55, fontFamily: FONT_SANS }}>
            {recoPrefix && (
              <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', padding: '1px 5px', background: HF.paper, borderRadius: 2, color: HF.accentHi, marginRight: 6, fontFamily: FONT_MONO, verticalAlign: 'baseline' }}>{recoPrefix}</span>
            )}
            {recoRest}
          </div>
        </div>
        {/* LIVE */}
        <div style={{ padding: '12px 14px', background: isMissing ? HF.skillCBg + '55' : HF.paper, display: 'flex', flexDirection: 'column', gap: 6, minHeight: 96 }}>
          <div style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: isMissing ? HF.skillC : HF.ink3, letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between' }}>
            <span>{liveWhich === 'pdp' ? 'LIVE · PDP' : 'LIVE · PIM'}</span>
            <span style={{ color: HF.ink4 }}>{liveText ? `${liveText.length} chars` : '—'}</span>
          </div>
          {isMissing ? (
            <div style={{ fontSize: 12, color: HF.skillC, fontStyle: 'italic', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: 6, flex: 1, fontFamily: FONT_SANS }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 16 }}>∅</span>
              This bullet does not exist in PIM. PDP has it live.
            </div>
          ) : (
            <div style={{ fontSize: 12, color: HF.ink, lineHeight: 1.55, fontFamily: FONT_SANS }}>
              {livePrefix && (
                <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', padding: '1px 5px', background: HF.surface2, borderRadius: 2, color: HF.ink2, marginRight: 6, fontFamily: FONT_MONO, verticalAlign: 'baseline' }}>{livePrefix}</span>
              )}
              {liveRest}
            </div>
          )}
        </div>
      </div>

      {/* Reasoning */}
      <div style={{ padding: '9px 14px', background: HF.surface, borderTop: `1px solid ${HF.border}`, display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr) auto', gap: 14, alignItems: 'start', fontSize: 11, color: HF.ink2, lineHeight: 1.45 }}>
        <div>
          <MonoLabel style={{ marginBottom: 3 }}>WHY</MonoLabel>
          <div style={{ fontFamily: FONT_SANS }}>{meta.reason}</div>
        </div>
        <div>
          <MonoLabel style={{ marginBottom: 3 }}>ANSWERS SHOPPER QUERY</MonoLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {meta.answersQueries.map((q, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontSize: 11 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: HF.skillA, fontWeight: 700 }}>◎</span>
                <span style={{ color: HF.ink2, fontStyle: 'italic', fontFamily: FONT_SANS }}>{q}</span>
              </div>
            ))}
          </div>
          {meta.keywordsAdded.length > 0 && (
            <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 9, color: HF.skillS, fontWeight: 700 }}>◈ +</span>
              {meta.keywordsAdded.map((k, i) => (
                <span key={i} style={{ fontSize: 10, padding: '1px 5px', borderRadius: 2, background: HF.skillSBg, color: HF.skillS, fontFamily: FONT_MONO, fontWeight: 600 }}>{k}</span>
              ))}
            </div>
          )}
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

// ── Bullets attribute card ────────────────────────────────────────────
function BulletsAttr() {
  const [liveWhich, setLiveWhich] = useState<'pdp' | 'pim'>('pdp');
  const pdp = CONTENT.bullets.pdp;
  const pim = CONTENT.bullets.pim;
  const reco = CONTENT.bullets.seo.reco;
  const meta = CONTENT.bullets.perBullet;

  const skillCfg = {
    C: { icon: '⬢', bg: HF.skillCBg, fg: HF.skillC },
    S: { icon: '◈', bg: HF.skillSBg, fg: HF.skillS },
    A: { icon: '◎', bg: HF.skillABg, fg: HF.skillA },
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 4, background: HF.dark, color: HF.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12 }}>B</div>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: FONT_SANS }}>Bullets · 7 fields</div>
        <span style={{ fontSize: 11, color: HF.ink3, fontFamily: FONT_SANS }}>per-bullet rewrite · each answers a distinct shopper query</span>
        <div style={{ flex: 1 }} />
        <LiveToggle which={liveWhich} onChange={setLiveWhich} />
      </div>

      {/* Roll-up */}
      <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ padding: '3px 7px', borderRadius: 3, background: HF.accentBg, color: HF.accentHi, fontFamily: FONT_MONO, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em' }}>◈ AGENT · REWRITE ALL 7 BULLETS</div>
        <div style={{ fontSize: 12, color: HF.ink2, lineHeight: 1.4, flex: 1, minWidth: 260, fontFamily: FONT_SANS }}>
          Each bullet answers a different shopper question. Unified rewrite fixes <b style={{ color: HF.skillC }}>2 missing</b> + <b style={{ color: HF.skillC }}>1 truncated</b> PIM bullets and targets <b style={{ color: HF.ink }}>14 new Rufus queries</b>.
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {([['C', 74, 95], ['S', 82, 96], ['A', 68, 92]] as [SkillKey, number, number][]).map(([s, score, target]) => {
            const cfg = skillCfg[s];
            return (
              <div key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 7px', borderRadius: 3, background: cfg.bg, color: cfg.fg, fontFamily: FONT_MONO, fontSize: 10, fontWeight: 700 }}>
                <span>{cfg.icon}</span>
                <span style={{ opacity: 0.65 }}>{score}</span>
                <span style={{ opacity: 0.5 }}>→</span>
                <span>{target}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Btn variant="subtle" size="xs">Reject all</Btn>
          <Btn variant="accent" size="xs">✓ Accept all 7</Btn>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const liveText = liveWhich === 'pdp' ? pdp[i] : pim[i];
          const isMissing = !liveText;
          const isTruncated = liveWhich === 'pim' && !!liveText && liveText.length < pdp[i].length * 0.6;
          return (
            <BulletRow
              key={i}
              idx={i + 1}
              liveText={liveText}
              liveWhich={liveWhich}
              isMissing={isMissing}
              isTruncated={isTruncated}
              recoText={reco[i]}
              meta={meta[i]}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Description attribute card ────────────────────────────────────────
function DescriptionAttr() {
  const [which, setWhich] = useState<'pdp' | 'pim'>('pdp');
  return (
    <div style={{ marginBottom: 20 }}>
      <AttrHeader letter="D" attr="Description" meta="one unified recommendation covers all 3 skills" which={which} onWhichChange={setWhich} />
      <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: HF.accentBg, borderRight: `2px solid ${HF.accentHi}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.accentHi, letterSpacing: '0.06em', borderBottom: `1px solid ${HF.accentHi}22` }}>
              <span>◈ AGENT RECOMMENDS</span>
              <span style={{ color: HF.ink4 }}>HIGH CONFIDENCE</span>
            </div>
            <div style={{ padding: '12px 14px', flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: HF.ink, marginBottom: 8, lineHeight: 1.4, fontFamily: FONT_SANS }}>
                Expand description — 742 chars, 3 query-targeted paragraphs, +3 keywords
              </div>
              <div style={{ background: HF.diffAdd, padding: '9px 11px', borderRadius: 5, border: `1px solid ${HF.greenInk}22`, fontSize: 12, lineHeight: 1.55, color: HF.ink }}>
                <Diff op="add">742 chars</Diff> · <Diff op="add">3 paragraphs</Diff> · <Diff op="add">+3 trending keywords</Diff> · Q-style H3 headings
              </div>
            </div>
          </div>
          <div style={{ background: HF.paper, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.06em', borderBottom: `1px solid ${HF.border}` }}>
              <span>{which === 'pim' ? 'LIVE · PIM · SALSIFY' : 'LIVE · PDP'}</span>
              <span style={{ color: HF.ink4 }}>{which === 'pim' ? 'last sync Feb 14' : 'retrieved Apr 18'}</span>
            </div>
            {which === 'pim' && (
              <div style={{ padding: '6px 14px', background: HF.skillCBg, color: HF.skillC, fontSize: 10, fontFamily: FONT_MONO, fontWeight: 700, letterSpacing: '0.04em', borderBottom: `1px solid ${HF.skillC}22` }}>
                ⬢ PIM IS STALE · source of truth behind live PDP
              </div>
            )}
            <div style={{ padding: '12px 14px', flex: 1 }}>
              <MonoLabel style={{ marginBottom: 6 }}>LIVE DESCRIPTION · {which === 'pdp' ? `${CONTENT.description.pdp.length} CHARS` : '0 CHARS (EMPTY)'}</MonoLabel>
              {which === 'pim' ? (
                <div style={{ fontSize: 11, color: HF.skillC, fontStyle: 'italic', padding: '10px', background: HF.skillCBg, border: `1px dashed ${HF.skillC}55`, borderRadius: 4, fontFamily: FONT_SANS }}>
                  ⬢ No description in Salsify. Field is empty since SKU was created.
                </div>
              ) : (
                <div style={{ fontSize: 12, lineHeight: 1.55, color: HF.ink2, fontFamily: FONT_SANS }}>
                  {CONTENT.description.pdp}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${HF.border}`, background: HF.surface, padding: '14px 20px' }}>
          <WhyStrip rows={[
            { skill: 'C', score: 55, target: 95, note: 'PIM description is empty — fills gap with brand-approved copy.' },
            { skill: 'S', score: 88, target: 94, note: 'Amazon rewards descriptions > 300 chars; adds home fragrance, home decor.' },
            { skill: 'A', score: 76, target: 89, note: '3 paragraphs = 3 retrievable semantic chunks for Rufus.' },
          ]} />
        </div>
        <AcceptBar />
      </div>
    </div>
  );
}

// ── Images attribute card ─────────────────────────────────────────────
function ImagesAttr() {
  const [which, setWhich] = useState<'pdp' | 'pim'>('pdp');
  return (
    <div style={{ marginBottom: 0 }}>
      <AttrHeader letter="I" attr="Images · 3 slots" meta="one unified recommendation covers all 3 skills" which={which} onWhichChange={setWhich} />
      <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: HF.accentBg, borderRight: `2px solid ${HF.accentHi}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.accentHi, letterSpacing: '0.06em', borderBottom: `1px solid ${HF.accentHi}22` }}>
              <span>◈ AGENT RECOMMENDS</span>
              <span style={{ color: HF.ink4 }}>HIGH CONFIDENCE</span>
            </div>
            <div style={{ padding: '12px 14px', flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: HF.ink, marginBottom: 8, lineHeight: 1.4, fontFamily: FONT_SANS }}>
                Sync 2 stale images, add alt-text, add 2 instructional images
              </div>
              <div style={{ background: HF.diffAdd, padding: '9px 11px', borderRadius: 5, border: `1px solid ${HF.greenInk}22`, fontSize: 12, lineHeight: 1.55, color: HF.ink, marginBottom: 12 }}>
                <Diff op="add">3 synced brand images</Diff> · <Diff op="add">alt-text on all</Diff> · <Diff op="add">+2 instructional</Diff> (how-to, wax comparison)
              </div>
              <MonoLabel style={{ marginBottom: 6 }}>PROPOSED · 5 IMAGES</MonoLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
                {[
                  { p: 'jar' as const, l: 'Primary', tag: 'sync', tone: 'red' as const },
                  { p: 'field' as const, l: 'Lifestyle', tag: 'sync', tone: 'red' as const },
                  { p: 'infographic' as const, l: '150hr', tag: 'alt+1', tone: 'blue' as const },
                  { p: 'jar' as const, l: 'How-to', tag: 'new', tone: 'accent' as const },
                  { p: 'infographic' as const, l: 'Wax cmp', tag: 'new', tone: 'accent' as const },
                ].map((img, i) => (
                  <div key={i} style={{ border: `1px solid ${HF.border}`, borderRadius: 4, overflow: 'hidden' }}>
                    <PlaceholderImg w={100} h={60} pattern={img.p} tone="indigo" style={{ borderRadius: 0, border: 'none' }} />
                    <div style={{ padding: '3px 5px', textAlign: 'center' as const }}>
                      <Chip tone={img.tone} size="xs">{img.tag}</Chip>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: HF.paper, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.06em', borderBottom: `1px solid ${HF.border}` }}>
              <span>{which === 'pim' ? 'LIVE · PIM · SALSIFY' : 'LIVE · PDP'}</span>
              <span style={{ color: HF.ink4 }}>{which === 'pim' ? 'last sync Feb 14' : 'retrieved Apr 18'}</span>
            </div>
            {which === 'pim' && (
              <div style={{ padding: '6px 14px', background: HF.skillCBg, color: HF.skillC, fontSize: 10, fontFamily: FONT_MONO, fontWeight: 700, letterSpacing: '0.04em', borderBottom: `1px solid ${HF.skillC}22` }}>
                ⬢ PIM IS STALE · source of truth behind live PDP
              </div>
            )}
            <div style={{ padding: '12px 14px', flex: 1 }}>
              <MonoLabel style={{ marginBottom: 6 }}>LIVE IMAGES · 3</MonoLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {[
                  { p: 'jar' as const, l: 'Primary' },
                  { p: 'field' as const, l: 'Lifestyle' },
                  { p: 'infographic' as const, l: '150hr' },
                ].map((img, i) => (
                  <PlaceholderImg key={i} w={140} h={85} pattern={img.p} label={img.l} sub="no alt" tone="indigo" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${HF.border}`, background: HF.surface, padding: '14px 20px' }}>
          <WhyStrip rows={[
            { skill: 'C', score: 62, target: 95, note: 'Replaces 2 stale assets with Apr 18 brand-approved versions already on PDP.' },
            { skill: 'S', score: 85, target: 94, note: 'Alt-text on all 3 is indexed by Amazon search — adds keyword surface.' },
            { skill: 'A', score: 76, target: 89, note: 'Rufus cites how-to visuals at 2.3× — adds 3-step + wax comparison.' },
          ]} />
        </div>
        <AcceptBar />
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <>
      <div style={{ padding: '20px 0 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: HF.ink2, fontFamily: FONT_SANS }}>
          <b style={{ color: HF.ink }}>4 unified recommendations</b> · est. review 2m
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="subtle" size="sm" kbd="J">Next SKU</Btn>
          <Btn variant="primary" size="sm" kbd="⇧⏎">Accept all → Publish → next SKU</Btn>
        </div>
      </div>
      <div style={{ marginTop: 12, padding: '10px 14px', background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 6, display: 'flex', gap: 16, fontSize: 11, color: HF.ink3, flexWrap: 'wrap', fontFamily: FONT_SANS }}>
        <span><kbd style={{ fontFamily: FONT_MONO, fontSize: 10, padding: '1px 5px', border: `1px solid ${HF.border2}`, borderBottomWidth: 2, borderRadius: 3, background: HF.paper, color: HF.ink2 }}>J</kbd>/<kbd style={{ fontFamily: FONT_MONO, fontSize: 10, padding: '1px 5px', border: `1px solid ${HF.border2}`, borderBottomWidth: 2, borderRadius: 3, background: HF.paper, color: HF.ink2 }}>K</kbd> next/prev SKU</span>
        <span><kbd style={{ fontFamily: FONT_MONO, fontSize: 10, padding: '1px 5px', border: `1px solid ${HF.border2}`, borderBottomWidth: 2, borderRadius: 3, background: HF.paper, color: HF.ink2 }}>A</kbd> accept reco</span>
        <span><kbd style={{ fontFamily: FONT_MONO, fontSize: 10, padding: '1px 5px', border: `1px solid ${HF.border2}`, borderBottomWidth: 2, borderRadius: 3, background: HF.paper, color: HF.ink2 }}>R</kbd> reject</span>
        <span><kbd style={{ fontFamily: FONT_MONO, fontSize: 10, padding: '1px 5px', border: `1px solid ${HF.border2}`, borderBottomWidth: 2, borderRadius: 3, background: HF.paper, color: HF.ink2 }}>E</kbd> edit</span>
        <span><kbd style={{ fontFamily: FONT_MONO, fontSize: 10, padding: '1px 5px', border: `1px solid ${HF.border2}`, borderBottomWidth: 2, borderRadius: 3, background: HF.paper, color: HF.ink2 }}>L</kbd> send SKU to legal</span>
        <span><kbd style={{ fontFamily: FONT_MONO, fontSize: 10, padding: '1px 5px', border: `1px solid ${HF.border2}`, borderBottomWidth: 2, borderRadius: 3, background: HF.paper, color: HF.ink2 }}>⇧⏎</kbd> accept all · publish</span>
        <span><kbd style={{ fontFamily: FONT_MONO, fontSize: 10, padding: '1px 5px', border: `1px solid ${HF.border2}`, borderBottomWidth: 2, borderRadius: 3, background: HF.paper, color: HF.ink2 }}>?</kbd> all shortcuts</span>
      </div>
    </>
  );
}

// ── AllMode ───────────────────────────────────────────────────────────
export function AllMode() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: HF.surface }}>
      <div style={{ padding: '20px 24px 40px 24px', maxWidth: 1300, width: '100%' }}>
        <TitleAttr />
        <BulletsAttr />
        <DescriptionAttr />
        <ImagesAttr />
        <Footer />
      </div>
    </div>
  );
}
