'use client';

import { HF, FONT_SANS, FONT_MONO } from './tokens';
import { Btn, Chip } from './primitives';
import { INBOX_ITEMS } from './data';

function InboxRow({
  sku, title, brand, score, current, alerts,
}: {
  sku: string; title: string; brand: string; score: number;
  current?: boolean; alerts: string[];
}) {
  return (
    <div style={{
      padding: '10px 14px',
      borderBottom: `1px solid ${HF.border}`,
      borderLeft: `3px solid ${current ? HF.accentHi : 'transparent'}`,
      background: current ? HF.accentBg : 'transparent',
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 9.5, fontFamily: FONT_MONO, color: HF.ink3, letterSpacing: '0.04em' }}>
          {sku}
        </span>
        <div style={{ flex: 1 }} />
        {alerts.map((color, i) => (
          <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
        ))}
      </div>
      <div style={{
        fontSize: 12.5, fontWeight: current ? 600 : 500, color: HF.ink,
        lineHeight: 1.3, letterSpacing: '-0.005em',
        overflow: 'hidden', textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
        fontFamily: FONT_SANS,
      }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: HF.ink3, fontFamily: FONT_SANS }}>
        <span>{brand}</span>
        <div style={{ flex: 1 }} />
        <span style={{
          fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600,
          color: score < 70 ? HF.skillC : score < 85 ? HF.yellowInk : HF.greenInk,
        }}>{score}</span>
      </div>
    </div>
  );
}

export function InboxRail() {
  return (
    <div style={{
      width: 320, flexShrink: 0,
      borderRight: `1px solid ${HF.border}`,
      background: HF.paper,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 14px',
        borderBottom: `1px solid ${HF.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: HF.ink, fontFamily: FONT_SANS }}>Inbox</span>
        <span style={{
          fontSize: 9.5, fontFamily: FONT_MONO, color: HF.ink3,
          padding: '1px 6px', borderRadius: 3, background: HF.surface2,
          fontWeight: 600, letterSpacing: '0.04em',
        }}>126</span>
        <div style={{ flex: 1 }} />
        <Btn variant="ghost" size="xs">Filter</Btn>
        <Btn variant="ghost" size="xs">Sort</Btn>
      </div>

      {/* Filter chips */}
      <div style={{
        padding: '8px 14px', borderBottom: `1px solid ${HF.border}`,
        display: 'flex', gap: 4, flexWrap: 'wrap',
        flexShrink: 0,
      }}>
        <Chip tone="accent" size="xs">All</Chip>
        <Chip tone="ghost" size="xs">⬢ Compliance</Chip>
        <Chip tone="ghost" size="xs">◈ SEO</Chip>
        <Chip tone="ghost" size="xs">◎ AEO</Chip>
      </div>

      {/* Rows */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {INBOX_ITEMS.map((item, i) => (
          <InboxRow key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
