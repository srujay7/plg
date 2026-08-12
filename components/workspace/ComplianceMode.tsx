'use client';

import React from 'react';
import { HF, FONT_SANS, FONT_MONO } from './tokens';
import { Btn, Chip, Diff, PlaceholderImg, MonoLabel } from './primitives';
import { CONTENT, COMPLIANCE_INTEL } from './data';

// ── Discrepancy list ──────────────────────────────────────────────────
type DiscType = 'mismatch' | 'missing' | 'stale' | 'outdated' | 'synced';
interface DiscRow { field: string; type: DiscType; lastSynced?: string; note?: string }

const DISC_DOT: Record<DiscType, string> = {
  mismatch: HF.skillC,
  missing:  HF.skillC,
  stale:    HF.yellowInk,
  outdated: HF.yellowInk,
  synced:   HF.greenInk,
};

function DiscrepancyList({ rows }: { rows: DiscRow[] }) {
  return (
    <div>
      {rows.map((r, i) => {
        const dot = DISC_DOT[r.type] || HF.skillC;
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 90px', gap: 10, alignItems: 'start', padding: '6px 0', borderTop: i === 0 ? 'none' : `1px dashed ${HF.border}` }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: dot, flexShrink: 0 }} />
                <span style={{ fontSize: 11.5, color: HF.ink, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: FONT_SANS }}>{r.field}</span>
                <span style={{ fontSize: 8.5, fontFamily: FONT_MONO, color: dot, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, flexShrink: 0 }}>{r.type}</span>
              </div>
              {r.note && (
                <div style={{ fontSize: 10.5, color: HF.ink3, fontStyle: 'italic', paddingLeft: 13, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: FONT_SANS }}>{r.note}</div>
              )}
            </div>
            <div style={{ fontSize: 10, fontFamily: FONT_MONO, color: HF.ink3, textAlign: 'right' as const, whiteSpace: 'nowrap' }}>{r.lastSynced || '—'}</div>
          </div>
        );
      })}
    </div>
  );
}

// ── Pane header ───────────────────────────────────────────────────────
function CompPaneHeader({ side, lastSynced }: { side: 'pim' | 'pdp'; lastSynced?: { label: string; tone: 'stale' | 'fresh' } }) {
  const isPim = side === 'pim';
  return (
    <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.06em', borderBottom: `1px solid ${HF.border}`, background: isPim ? HF.paper : HF.surface }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: isPim ? HF.ink : HF.ink3, fontWeight: 700 }}>{isPim ? 'PIM · SALSIFY' : 'PDP · AMAZON'}</span>
        {isPim ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: HF.dark, color: HF.paper, padding: '1px 6px', borderRadius: 3, fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em' }}>WORKING</span>
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'transparent', color: HF.ink4, padding: '1px 6px', borderRadius: 3, fontSize: 8.5, fontWeight: 600, letterSpacing: '0.06em', border: `1px solid ${HF.border}` }}>READ-ONLY · REFERENCE</span>
        )}
      </span>
      {lastSynced && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: HF.ink4 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: lastSynced.tone === 'stale' ? HF.yellowInk : HF.greenInk }} />
          {lastSynced.label}
        </span>
      )}
    </div>
  );
}

// ── Accept bar ────────────────────────────────────────────────────────
function SyncBar() {
  return (
    <div style={{ padding: '10px 16px', background: HF.surface, color: HF.ink2, borderTop: `1px solid ${HF.border}`, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, fontFamily: FONT_SANS }}>
      <span style={{ fontSize: 9, fontFamily: FONT_MONO, color: HF.ink3, letterSpacing: '0.06em', fontWeight: 600 }}>SYNC</span>
      <span style={{ color: HF.ink3 }}>edit PIM, then push to PDP via API · ~24h propagation</span>
      <div style={{ flex: 1 }} />
      <Btn variant="ghost" size="xs">✕ Skip</Btn>
      <Btn variant="ghost" size="xs" kbd="E">Edit PIM</Btn>
      <Btn variant="primary" size="xs" kbd="A">✓ Sync PIM → PDP</Btn>
    </div>
  );
}

// ── Generic compliance attr card ──────────────────────────────────────
function CompAttr({
  letter, attr, meta,
  pimEl, pimLastSynced,
  pdpEl, pdpLastSynced,
  whyText, recommend,
  discRows,
  showCopy = true,
  last,
}: {
  letter: string; attr: string; meta: string;
  pimEl: React.ReactNode;
  pimLastSynced?: { label: string; tone: 'stale' | 'fresh' };
  pdpEl: React.ReactNode;
  pdpLastSynced?: { label: string; tone: 'stale' | 'fresh' };
  whyText: React.ReactNode;
  recommend: 'pdp' | 'pim';
  discRows: DiscRow[];
  showCopy?: boolean;
  last?: boolean;
}) {
  const recoIsPdp = recommend === 'pdp';
  return (
    <div style={{ marginBottom: last ? 0 : 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 4, background: HF.skillC, color: HF.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12 }}>{letter}</div>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: FONT_SANS }}>{attr}</div>
        <span style={{ fontSize: 11, color: HF.ink3, fontFamily: FONT_SANS }}>{meta}</span>
      </div>
      <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* LEFT · PIM */}
          <div style={{ background: HF.paper, borderRight: `1px solid ${HF.border}`, display: 'flex', flexDirection: 'column' }}>
            <CompPaneHeader side="pim" lastSynced={pimLastSynced} />
            <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pimEl}
              {showCopy && recoIsPdp && (
                <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                  <button style={{ fontFamily: FONT_MONO, fontSize: 9.5, fontWeight: 600, letterSpacing: '0.04em', padding: '3px 7px', borderRadius: 3, background: 'transparent', color: HF.ink2, border: `1px solid ${HF.border}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>↓ Copy from PDP</button>
                </div>
              )}
            </div>
          </div>
          {/* RIGHT · PDP */}
          <div style={{ background: HF.surface, display: 'flex', flexDirection: 'column', opacity: 0.92 }}>
            <CompPaneHeader side="pdp" lastSynced={pdpLastSynced} />
            <div style={{ padding: '12px 14px', flex: 1, color: HF.ink2 }}>{pdpEl}</div>
          </div>
        </div>

        {/* WHY + discrepancies */}
        <div style={{ borderTop: `1px solid ${HF.border}`, background: HF.surface, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.1em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>WHY</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: HF.greenInk, color: HF.paper, padding: '1px 6px', borderRadius: 3, fontSize: 8.5, fontWeight: 700, letterSpacing: '0.06em' }}>
                ★ AGENT RECO · USE {recoIsPdp ? 'PDP' : 'PIM'}
              </span>
            </div>
            <div style={{ fontSize: 11.5, color: HF.ink2, lineHeight: 1.6, fontFamily: FONT_SANS }}>{whyText}</div>
            <div style={{ marginTop: 10, fontSize: 10.5, color: HF.ink3, fontStyle: 'italic', paddingTop: 8, borderTop: `1px dashed ${HF.border}`, fontFamily: FONT_SANS }}>
              You decide. Agent only compares · PIM is the source of truth · sync from PIM → PDP.
            </div>
          </div>
          {discRows.length > 0 && (
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.skillC, letterSpacing: '0.1em' }}>DISCREPANCIES · {discRows.length}</span>
                <span style={{ fontSize: 9, fontFamily: FONT_MONO, color: HF.ink4, letterSpacing: '0.06em' }}>LAST SYNC</span>
              </div>
              <DiscrepancyList rows={discRows} />
            </div>
          )}
        </div>

        <SyncBar />
      </div>
    </div>
  );
}

// ── Compliance bullets ────────────────────────────────────────────────
function highlightedPdp(pdpText: string, pimText: string | undefined): React.ReactNode {
  if (!pimText) return <Diff op="add">{pdpText}</Diff>;
  const minLen = Math.min(pdpText.length, pimText.length);
  let split = 0;
  for (let i = 0; i < minLen; i++) {
    if (pdpText[i].toLowerCase() === pimText[i].toLowerCase()) split = i + 1;
    else break;
  }
  while (split > 0 && pdpText[split - 1] !== ' ') split--;
  const common = pdpText.slice(0, split);
  const extra = pdpText.slice(split);
  if (!extra) return <>{pdpText}</>;
  return <>{common}<Diff op="add">{extra}</Diff></>;
}

type BulletStatus = 'missing' | 'truncated' | 'synced';

const STATUS_CFG: Record<BulletStatus, { label: string; color: string; bg: string }> = {
  missing:   { label: 'MISSING IN PIM',   color: HF.skillC,   bg: HF.skillCBg },
  truncated: { label: 'TRUNCATED IN PIM', color: HF.yellowInk, bg: HF.yellowBg },
  synced:    { label: 'SYNCED',           color: HF.greenInk,  bg: HF.greenBg },
};

function CompBulletRow({ row, meta }: { row: { idx: number; status: BulletStatus; pdpText: string; pimText: string | undefined }; meta: typeof CONTENT.bullets.perBullet[0] }) {
  const { idx, status, pdpText, pimText } = row;
  const cfg = STATUS_CFG[status];

  return (
    <div style={{ background: HF.paper, border: `1px solid ${HF.border}`, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', background: HF.surface, borderBottom: `1px solid ${HF.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 22, height: 22, borderRadius: 3, background: HF.dark, color: HF.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{idx}</div>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: HF.ink, flex: 1, fontFamily: FONT_SANS }}>{meta.title}</div>
        <span style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: cfg.color, background: cfg.bg, padding: '2px 7px', borderRadius: 3, letterSpacing: '0.06em' }}>{cfg.label}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* LEFT · PIM */}
        <div style={{ background: HF.paper, borderRight: `1px solid ${HF.border}`, display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 14px', minHeight: 80 }}>
          <div style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: HF.ink }}>PIM · SALSIFY</span>
              <span style={{ background: HF.dark, color: HF.paper, padding: '1px 5px', borderRadius: 2, fontSize: 8, fontWeight: 700, letterSpacing: '0.06em' }}>WORKING</span>
            </span>
            <span style={{ color: HF.ink4 }}>{pimText ? `${pimText.length} chars` : '— not set —'}</span>
          </div>
          {pimText ? (
            <div style={{ fontSize: 12, color: HF.ink, lineHeight: 1.55, fontFamily: FONT_SANS }}>{pimText}</div>
          ) : (
            <div style={{ fontSize: 11, color: HF.skillC, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: HF.skillCBg, border: `1px dashed ${HF.skillC}55`, borderRadius: 4, fontFamily: FONT_SANS }}>
              <span style={{ fontFamily: FONT_MONO, fontWeight: 700 }}>⬢</span>
              No bullet authored in Salsify.
            </div>
          )}
          <div style={{ marginTop: 'auto', paddingTop: 6 }}>
            <button style={{ fontFamily: FONT_MONO, fontSize: 9, fontWeight: 600, letterSpacing: '0.04em', padding: '2px 6px', borderRadius: 3, background: 'transparent', color: HF.ink2, border: `1px solid ${HF.border}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>↓ Copy from PDP</button>
          </div>
        </div>

        {/* RIGHT · PDP */}
        <div style={{ background: HF.surface, display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 14px', minHeight: 80, opacity: 0.92 }}>
          <div style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.06em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span>PDP · AMAZON</span>
              <span style={{ background: 'transparent', color: HF.ink4, padding: '1px 5px', borderRadius: 2, fontSize: 8, fontWeight: 600, letterSpacing: '0.06em', border: `1px solid ${HF.border}` }}>READ-ONLY</span>
            </span>
            <span style={{ color: HF.ink4 }}>{pdpText.length} chars</span>
          </div>
          <div style={{ fontSize: 12, color: HF.ink2, lineHeight: 1.55, fontFamily: FONT_SANS }}>
            {highlightedPdp(pdpText, pimText)}
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div style={{ padding: '10px 14px', background: HF.surface, borderTop: `1px solid ${HF.border}`, display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr) auto', gap: 14, fontSize: 11, color: HF.ink2, lineHeight: 1.45 }}>
        <div>
          <div style={{ fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700, color: HF.ink3, letterSpacing: '0.06em', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            WHY
            <span style={{ background: HF.greenInk, color: HF.paper, padding: '1px 5px', borderRadius: 2, fontSize: 8, fontWeight: 700, letterSpacing: '0.06em' }}>★ RECO · PDP</span>
          </div>
          <div style={{ fontSize: 11, color: HF.ink2, fontFamily: FONT_SANS }}>
            {status === 'missing'
              ? 'PIM never had this bullet. PDP has the brand-approved Apr 18 version. Recommend copying from PDP.'
              : status === 'truncated'
                ? `PIM is ${pdpText.length - (pimText?.length || 0)} chars shorter than PDP. PDP refreshed Apr 18, PIM Feb 14. Recommend copying from PDP.`
                : 'PIM and PDP match within tolerance. No action needed; user can confirm "synced".'}
          </div>
        </div>
        <div>
          <MonoLabel style={{ marginBottom: 4 }}>EVIDENCE</MonoLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
            {status === 'missing' && (
              <><Chip tone="red" size="xs">PIM gap</Chip><span style={{ fontSize: 10, color: HF.ink3, fontFamily: FONT_MONO }}>PDP Apr 18 · PIM never set</span></>
            )}
            {status === 'truncated' && (
              <><Chip tone="yellow" size="xs">{pdpText.length - (pimText?.length || 0)}-char delta</Chip><span style={{ fontSize: 10, color: HF.ink3, fontFamily: FONT_MONO }}>PDP Apr 18 · PIM Feb 14</span></>
            )}
            {status === 'synced' && (
              <><Chip tone="green" size="xs">match</Chip><span style={{ fontSize: 10, color: HF.ink3, fontFamily: FONT_MONO }}>both refreshed Apr 18</span></>
            )}
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

function CompBullets() {
  const pdp = CONTENT.bullets.pdp;
  const pim = CONTENT.bullets.pim;
  const meta = CONTENT.bullets.perBullet;

  const rows = pdp.map((pdpText, i) => {
    const pimText = pim[i];
    if (!pimText) return { idx: i, status: 'missing' as BulletStatus, pdpText, pimText: undefined };
    const lenDelta = pdpText.length - pimText.length;
    if (lenDelta > 60) return { idx: i, status: 'truncated' as BulletStatus, pdpText, pimText };
    return { idx: i, status: 'synced' as BulletStatus, pdpText, pimText };
  });

  const counts = rows.reduce((a, r) => { a[r.status] = (a[r.status] || 0) + 1; return a; }, {} as Record<BulletStatus, number>);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ width: 24, height: 24, borderRadius: 4, background: HF.skillC, color: HF.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 12 }}>B</div>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em', fontFamily: FONT_SANS }}>Bullets · 7 fields</div>
        <span style={{ fontSize: 11, color: HF.ink3, fontFamily: FONT_SANS }}>
          PIM has {pim.length} · PDP has 7 ·{' '}
          <b style={{ color: HF.skillC }}>{counts.missing || 0} missing</b>,{' '}
          <b style={{ color: HF.yellowInk }}>{counts.truncated || 0} truncated</b>,{' '}
          <b style={{ color: HF.greenInk }}>{counts.synced || 0} synced</b>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((r, i) => <CompBulletRow key={i} row={r} meta={meta[i]} />)}
      </div>
    </div>
  );
}

// ── ComplianceMode ────────────────────────────────────────────────────
export function ComplianceMode() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: HF.surface }}>
      <div style={{ padding: '20px 24px 40px 24px', maxWidth: 1300, width: '100%' }}>

        {/* Title */}
        <CompAttr
          letter="T" attr="Title"
          meta="PIM ↔ PDP match 58% · target 95% · last PIM sync Feb 14 · last PDP refresh Apr 18"
          recommend="pdp"
          pimLastSynced={{ label: 'last sync Feb 14', tone: 'stale' }}
          pimEl={
            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: HF.ink, fontFamily: FONT_SANS }}>
              Yankee Candle® Lemon Lavender Scented Candle, 22oz <Diff op="del">Jar, 150 Hour Burn, Gift</Diff>
            </div>
          }
          pdpLastSynced={{ label: 'refreshed Apr 18', tone: 'fresh' }}
          pdpEl={
            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: HF.ink, fontFamily: FONT_SANS }}>
              Yankee Candle® Lemon Lavender Scented Candle, 22oz <Diff op="add">Large Jar with up to 150 Hour Burn Time, Giftable, Birthdays</Diff>
            </div>
          }
          whyText={<>PDP refreshed Apr 18 with the full descriptive long-form ("Large Jar with up to 150 Hour Burn Time, Giftable, Birthdays"); Salsify still has the Feb 14 shorthand. Brand prefix, scent and size are identical — only the suffix differs (highlighted). PDP is brand-approved truth.</>}
          discRows={COMPLIANCE_INTEL.title.rows}
        />

        {/* Bullets */}
        <CompBullets />

        {/* Description */}
        <CompAttr
          letter="D" attr="Description"
          meta="PIM is empty · PDP has 342-char description · target 95%"
          recommend="pdp"
          pimLastSynced={{ label: 'never authored', tone: 'stale' }}
          pimEl={
            <div style={{ fontSize: 11, color: HF.skillC, fontStyle: 'italic', padding: '12px 14px', background: HF.skillCBg, border: `1px dashed ${HF.skillC}55`, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT_SANS }}>
              <span style={{ fontFamily: FONT_MONO, fontWeight: 700 }}>⬢</span>
              No description in Salsify. Field is empty since SKU was created.
            </div>
          }
          pdpLastSynced={{ label: 'refreshed Apr 18', tone: 'fresh' }}
          pdpEl={
            <div style={{ fontSize: 12, lineHeight: 1.55, color: HF.ink, fontFamily: FONT_SANS }}>
              <Diff op="add">{CONTENT.description.pdp}</Diff>
            </div>
          }
          whyText={<>PIM has no description on file at all. PDP has a brand-approved 342-character paragraph (uplifting lemon · soothing lavender · plant wax · 22oz · 150 hrs). Recommend copying PDP into PIM — zero risk since there's no competing source.</>}
          discRows={COMPLIANCE_INTEL.description.rows}
        />

        {/* Images */}
        <CompAttr
          letter="I" attr="Images · 3 slots"
          meta="PDP refreshed Apr 18 · PIM still on Feb 14 creative · 0 alt-text"
          recommend="pdp"
          pimLastSynced={{ label: 'last sync Feb 14', tone: 'stale' }}
          pimEl={
            <>
              <div style={{ fontSize: 9.5, fontFamily: FONT_MONO, color: HF.ink3, marginBottom: 6 }}>3 images · stale Feb 14 set · 0 alt-text</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {[{ p: 'jar' as const, l: 'Primary (old)', sub: 'Feb 14' }, { p: 'jar' as const, l: 'Jar + lemon', sub: 'Feb 14' }, { p: 'infographic' as const, l: 'More fragrance', sub: 'Feb 14' }].map((img, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <PlaceholderImg w={140} h={85} pattern={img.p} label={img.l} sub={img.sub} tone="neutral" />
                    <span style={{ position: 'absolute', top: 4, right: 4, background: HF.diffDel, color: HF.diffDelInk, padding: '1px 4px', borderRadius: 2, fontSize: 8, fontFamily: FONT_MONO, fontWeight: 700 }}>STALE</span>
                  </div>
                ))}
              </div>
            </>
          }
          pdpLastSynced={{ label: 'refreshed Apr 18', tone: 'fresh' }}
          pdpEl={
            <>
              <div style={{ fontSize: 9.5, fontFamily: FONT_MONO, color: HF.ink3, marginBottom: 6 }}>3 images · brand-approved Apr 18 set</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {[{ p: 'jar' as const, l: 'Primary', sub: 'Apr 18' }, { p: 'field' as const, l: 'Lavender field', sub: 'Apr 18' }, { p: 'infographic' as const, l: '150hr burn', sub: 'Apr 18' }].map((img, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <PlaceholderImg w={140} h={85} pattern={img.p} label={img.l} sub={img.sub} tone="indigo" />
                    <span style={{ position: 'absolute', top: 4, right: 4, background: HF.diffAdd, color: HF.diffAddInk, padding: '1px 4px', borderRadius: 2, fontSize: 8, fontFamily: FONT_MONO, fontWeight: 700 }}>NEW</span>
                  </div>
                ))}
              </div>
            </>
          }
          whyText={<>All 3 PIM images are two cycles behind the live PDP. Brand team approved the refreshed set on Apr 18; Salsify still serves the Feb 14 creative. Recommend copying the PDP set into PIM — these are the assets shoppers see today.</>}
          discRows={COMPLIANCE_INTEL.images.rows}
        />

        {/* A+ */}
        <CompAttr
          letter="A+" attr="A+ Content · banners, modules, videos"
          meta="Banner stale · comparison module missing in PIM"
          recommend="pdp"
          pimLastSynced={{ label: 'last sync Jan 12', tone: 'stale' }}
          pimEl={
            <>
              <div style={{ fontSize: 9.5, fontFamily: FONT_MONO, color: HF.ink3, marginBottom: 6 }}>2 modules · banner stale · comparison missing</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {CONTENT.aplus.pim.map((m, i) => (
                  <div key={i} style={{ padding: '6px 10px', background: HF.surface, border: `1px solid ${HF.border}`, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                    <Chip tone="blue" size="xs">{m.kind}</Chip>
                    <span style={{ color: HF.ink2, flex: 1, fontFamily: FONT_SANS }}>{m.label}</span>
                    <span style={{ fontSize: 9.5, color: HF.ink3, fontFamily: FONT_MONO }}>{m.note}</span>
                  </div>
                ))}
                <div style={{ padding: '6px 10px', background: HF.skillCBg, border: `1px dashed ${HF.skillC}55`, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: HF.skillC, fontStyle: 'italic', fontFamily: FONT_SANS }}>
                  <span style={{ fontFamily: FONT_MONO, fontWeight: 700 }}>⬢</span>
                  Comparison module — not authored in Salsify
                </div>
              </div>
            </>
          }
          pdpLastSynced={{ label: 'refreshed Apr 18', tone: 'fresh' }}
          pdpEl={
            <>
              <div style={{ fontSize: 9.5, fontFamily: FONT_MONO, color: HF.ink3, marginBottom: 6 }}>3 modules · all current</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {CONTENT.aplus.pdp.map((m, i) => (
                  <div key={i} style={{ padding: '6px 10px', background: i === 1 ? HF.diffAdd : HF.paper, border: `1px solid ${i === 1 ? HF.diffAddInk + '33' : HF.border}`, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
                    <Chip tone="blue" size="xs">{m.kind}</Chip>
                    <span style={{ color: i === 1 ? HF.diffAddInk : HF.ink2, flex: 1, fontWeight: i === 1 ? 600 : 400, fontFamily: FONT_SANS }}>{m.label}</span>
                    <span style={{ fontSize: 9.5, color: HF.ink3, fontFamily: FONT_MONO }}>{m.note}</span>
                  </div>
                ))}
              </div>
            </>
          }
          whyText={<>A+ score is the lowest of any attribute. PDP refreshed the brand banner on Apr 18 (PIM still on Jan 12) and has a "Scent family comparison" module that was never authored in Salsify. Brand story matches. Recommend copying banner + comparison from PDP.</>}
          discRows={COMPLIANCE_INTEL.aplus.rows}
          last
        />

        {/* Footer */}
        <div style={{ padding: '20px 0 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: HF.ink2, fontFamily: FONT_SANS }}>
            <b style={{ color: HF.ink }}>5 attributes need review</b> · agent recommends PDP for all 5 · final call is yours
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="subtle" size="sm" kbd="J">Next SKU</Btn>
            <Btn variant="primary" size="sm" kbd="⇧⏎" style={{ background: HF.skillC, borderColor: HF.skillC }}>Accept all recos · Sync · next SKU</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
