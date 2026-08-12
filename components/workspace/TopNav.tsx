'use client';

import { HF, FONT_SANS, FONT_MONO } from './tokens';
import { Kbd } from './primitives';

export function TopNav() {
  return (
    <div style={{
      height: 48,
      borderBottom: `1px solid ${HF.border}`,
      background: HF.paper,
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 16,
      fontSize: 12, color: HF.ink2,
      flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 200 }}>
        <div style={{
          width: 22, height: 22, borderRadius: 5,
          background: HF.dark, color: HF.paper,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT_MONO, fontWeight: 700, fontSize: 11,
        }}>cIQ</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: HF.ink, letterSpacing: '-0.01em', fontFamily: FONT_SANS }}>
          Content Agent
        </span>
        <span style={{
          fontSize: 9, fontFamily: FONT_MONO, color: HF.ink3,
          padding: '1px 5px', borderRadius: 3, background: HF.surface2,
          letterSpacing: '0.04em',
        }}>BETA</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0 }}>
        {[
          { label: 'Queue', n: 126, active: true },
          { label: 'Catalog', n: 4823 },
          { label: 'Workflows' },
          { label: 'Reports' },
        ].map(t => (
          <button key={t.label} style={{
            fontSize: 12, padding: '6px 12px',
            background: 'transparent',
            color: t.active ? HF.ink : HF.ink3,
            fontWeight: t.active ? 600 : 500,
            border: 'none',
            borderBottom: t.active ? `2px solid ${HF.accentHi}` : '2px solid transparent',
            marginBottom: -1,
            fontFamily: FONT_SANS, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            {t.label}
            {t.n != null && (
              <span style={{
                fontSize: 9, fontFamily: FONT_MONO,
                padding: '1px 5px', borderRadius: 3,
                background: t.active ? HF.accentBg : HF.surface2,
                color: t.active ? HF.accentHi : HF.ink3,
                fontWeight: 600,
              }}>{t.n}</span>
            )}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 5,
        border: `1px solid ${HF.border}`, background: HF.surface,
        fontSize: 11, color: HF.ink3, minWidth: 240,
        fontFamily: FONT_SANS,
      }}>
        <span>⌕</span>
        <span style={{ flex: 1 }}>Search SKUs, attributes, queries…</span>
        <Kbd>⌘K</Kbd>
      </div>

      {/* User */}
      <div style={{
        width: 26, height: 26, borderRadius: '50%',
        background: HF.accentBg, color: HF.accentHi,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT_MONO, fontWeight: 700, fontSize: 11,
      }}>RP</div>
    </div>
  );
}
