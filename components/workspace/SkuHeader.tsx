'use client';

import { HF, FONT_SANS, FONT_MONO } from './tokens';
import { Btn, Chip, Score } from './primitives';
import { SKU } from './data';

export type Mode = 'all' | 'compliance' | 'seo' | 'aeo';

const MODE_TABS: { key: Mode; label: string; count: number }[] = [
  { key: 'all', label: 'All', count: 4 },
  { key: 'compliance', label: '🛡 Compliance', count: 4 },
  { key: 'seo', label: '🔍 SEO', count: 4 },
  { key: 'aeo', label: '🤖 AEO', count: 4 },
];

export function SkuHeader({ mode, onModeChange }: { mode: Mode; onModeChange: (m: Mode) => void }) {
  return (
    <div style={{
      padding: '16px 24px 14px 24px',
      borderBottom: `1px solid ${HF.border}`,
      background: HF.paper,
      flexShrink: 0,
    }}>
      {/* Breadcrumbs */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, color: HF.ink3, marginBottom: 10,
        fontFamily: FONT_MONO,
      }}>
        <span>Queue</span><span>›</span><span>Home</span><span>›</span><span>Yankee Candle</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <span>{SKU.id} · {SKU.sapId}</span>
          <span>·</span>
          <span>2 of 126</span>
        </span>
      </div>

      {/* Hero row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 6, flexShrink: 0,
          background: HF.accentBg, border: `1px solid ${HF.accentBg2}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: HF.accentHi, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 13,
        }}>YC</div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25,
            fontFamily: FONT_SANS, color: HF.ink,
          }}>
            Yankee Candle Lemon Lavender · 22oz Original Large Jar
          </div>
          <div style={{
            fontSize: 12, color: HF.ink3, marginTop: 4,
            display: 'flex', gap: 8, alignItems: 'center',
            fontFamily: FONT_SANS,
          }}>
            <span>L3M: <b style={{ color: HF.ink2 }}>$109.12K</b></span>
            <span>·</span>
            <span>Last synced: <b style={{ color: HF.ink2 }}>Apr 18, 2026</b></span>
            <span>·</span>
            <Chip tone="blue" size="xs">CONTENT_READY</Chip>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, alignItems: 'center' }}>
            <Score skill="C" value={SKU.scores.C} size="md" />
            <Score skill="S" value={SKU.scores.S} size="md" />
            <Score skill="A" value={SKU.scores.A} size="md" />
            <span style={{ fontSize: 11, color: HF.ink3, marginLeft: 12, fontFamily: FONT_SANS }}>
              ~<b style={{ color: HF.ink2 }}>$4.2K/mo</b> revenue left on the table
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
          <Btn variant="subtle" size="sm" icon="↗">PDP</Btn>
          <Btn variant="subtle" size="sm" icon="⧉">History</Btn>
          <Btn variant="ghost" size="sm" icon="⋯" />
        </div>
      </div>

      {/* Mode tabs + bulk actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
        <div style={{
          display: 'flex', gap: 2, padding: 2,
          background: HF.surface2, borderRadius: 6,
          border: `1px solid ${HF.border}`,
        }}>
          {MODE_TABS.map(({ key, label, count }) => {
            const active = mode === key;
            return (
              <button key={key} onClick={() => onModeChange(key)} style={{
                fontSize: 12, padding: '5px 11px', borderRadius: 4,
                background: active ? HF.paper : 'transparent',
                color: active ? HF.ink : HF.ink3,
                border: active ? `1px solid ${HF.border2}` : '1px solid transparent',
                fontWeight: active ? 600 : 500, fontFamily: FONT_SANS, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 5,
              }}>
                {label}
                <span style={{
                  fontSize: 9, fontFamily: FONT_MONO, fontWeight: 600,
                  padding: '1px 5px', borderRadius: 3,
                  background: active ? HF.accentBg : HF.surface3,
                  color: active ? HF.accentHi : HF.ink3,
                }}>{count}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: HF.ink3, fontFamily: FONT_SANS }}>4 recos · est. 2m</span>
          <Btn variant="subtle" size="sm">Reject all</Btn>
          <Btn variant="ghost" size="sm" kbd="L">Send SKU to Legal</Btn>
          <Btn variant="primary" size="sm" kbd="⏎">Accept all → next SKU</Btn>
        </div>
      </div>
    </div>
  );
}
