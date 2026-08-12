'use client';

import React, { CSSProperties } from 'react';
import { HF, FONT_SANS, FONT_MONO } from './tokens';

// ── Kbd ─────────────────────────────────────────────────────────────
export function Kbd({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: FONT_MONO, fontSize: 10, fontWeight: 500,
      padding: '1px 5px',
      border: `1px solid ${HF.border2}`,
      borderBottomWidth: 2,
      borderRadius: 3,
      background: HF.paper,
      color: HF.ink2,
      minWidth: 14, textAlign: 'center', lineHeight: 1.4,
      ...style,
    }}>{children}</span>
  );
}

// ── Chip ─────────────────────────────────────────────────────────────
type ChipTone = 'neutral' | 'accent' | 'green' | 'yellow' | 'red' | 'blue' | 'dark' | 'ghost';
type ChipSize = 'xs' | 'sm' | 'md' | 'lg';

const CHIP_TONES: Record<ChipTone, { bg: string; ink: string; bd: string }> = {
  neutral: { bg: HF.surface2, ink: HF.ink2, bd: HF.border },
  accent:  { bg: HF.accentBg, ink: HF.accentHi, bd: HF.accentBg2 },
  green:   { bg: HF.greenBg, ink: HF.greenInk, bd: '#cae8d5' },
  yellow:  { bg: HF.yellowBg, ink: HF.yellowInk, bd: '#f0e2a0' },
  red:     { bg: HF.redBg, ink: HF.redInk, bd: '#f5c6c0' },
  blue:    { bg: HF.blueBg, ink: HF.blueInk, bd: '#c2d2f5' },
  dark:    { bg: HF.dark, ink: HF.paper, bd: HF.dark },
  ghost:   { bg: 'transparent', ink: HF.ink3, bd: HF.border },
};

const CHIP_SIZES: Record<ChipSize, [number, string]> = {
  xs: [9, '2px 5px'],
  sm: [11, '2px 7px'],
  md: [12, '3px 9px'],
  lg: [13, '4px 10px'],
};

export function Chip({
  children, tone = 'neutral', size = 'sm', icon, style,
}: {
  children: React.ReactNode;
  tone?: ChipTone;
  size?: ChipSize;
  icon?: React.ReactNode;
  style?: CSSProperties;
}) {
  const t = CHIP_TONES[tone];
  const [fs, pad] = CHIP_SIZES[size];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: fs, padding: pad, borderRadius: 4,
      background: t.bg, color: t.ink,
      border: `1px solid ${t.bd}`,
      fontWeight: 500, letterSpacing: '-0.005em',
      fontFamily: size === 'xs' ? FONT_MONO : FONT_SANS,
      ...style,
    }}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}

// ── Button ────────────────────────────────────────────────────────────
type BtnVariant = 'primary' | 'accent' | 'ghost' | 'subtle' | 'danger';
type BtnSize = 'xs' | 'sm' | 'md' | 'lg';

const BTN_VARIANTS: Record<BtnVariant, { bg: string; fg: string; bd: string }> = {
  primary: { bg: HF.dark, fg: HF.paper, bd: HF.dark },
  accent:  { bg: HF.accentHi, fg: HF.paper, bd: HF.accentHi },
  ghost:   { bg: HF.paper, fg: HF.ink, bd: HF.border2 },
  subtle:  { bg: HF.surface, fg: HF.ink2, bd: HF.border },
  danger:  { bg: HF.paper, fg: HF.redInk, bd: '#f5c6c0' },
};

const BTN_SIZES: Record<BtnSize, [number, string]> = {
  xs: [10, '3px 7px'],
  sm: [12, '4px 10px'],
  md: [13, '6px 12px'],
  lg: [14, '8px 16px'],
};

export function Btn({
  children, variant = 'ghost', size = 'sm', kbd, icon, style, onClick,
}: {
  children?: React.ReactNode;
  variant?: BtnVariant;
  size?: BtnSize;
  kbd?: string;
  icon?: React.ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  const v = BTN_VARIANTS[variant];
  const [fs, pad] = BTN_SIZES[size];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: fs, padding: pad, borderRadius: 5,
      background: v.bg, color: v.fg, border: `1px solid ${v.bd}`,
      fontWeight: 500, fontFamily: FONT_SANS, cursor: 'pointer',
      letterSpacing: '-0.005em', lineHeight: 1.3, whiteSpace: 'nowrap',
      ...style,
    }}>
      {icon && <span style={{ lineHeight: 1 }}>{icon}</span>}
      {children}
      {kbd && <Kbd style={{ marginLeft: 2, opacity: 0.8 }}>{kbd}</Kbd>}
    </button>
  );
}

// ── Score ─────────────────────────────────────────────────────────────
type SkillKey = 'C' | 'S' | 'A';

const SCORE_ICONS: Record<SkillKey, string> = { C: '⬢', S: '◈', A: '◎' };
const SCORE_NAMES: Record<SkillKey, string> = { C: 'COMP', S: 'SEO', A: 'AEO' };
const SCORE_COLS: Record<SkillKey, string> = { C: HF.skillC, S: HF.skillS, A: HF.skillA };
const SCORE_BGS: Record<SkillKey, string> = { C: HF.skillCBg, S: HF.skillSBg, A: HF.skillABg };

export function Score({ skill, value, size = 'sm', style }: { skill: SkillKey; value: number; size?: 'xs' | 'sm' | 'md' | 'lg'; style?: CSSProperties }) {
  const sizes = {
    xs: { fs: 10, pad: '2px 5px', iconFs: 9 },
    sm: { fs: 11, pad: '3px 7px', iconFs: 10 },
    md: { fs: 13, pad: '5px 9px', iconFs: 12 },
    lg: { fs: 16, pad: '7px 11px', iconFs: 14 },
  };
  const s = sizes[size];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: s.fs, padding: s.pad, borderRadius: 4,
      background: SCORE_BGS[skill], color: SCORE_COLS[skill],
      border: `1px solid ${SCORE_COLS[skill]}22`,
      fontFamily: FONT_MONO, fontWeight: 600,
      ...style,
    }}>
      <span style={{ fontSize: s.iconFs }}>{SCORE_ICONS[skill]}</span>
      <span style={{ opacity: 0.7 }}>{SCORE_NAMES[skill]}</span>
      <span>{value}</span>
    </span>
  );
}

// ── Diff ──────────────────────────────────────────────────────────────
export function Diff({ children, op, style }: { children: React.ReactNode; op: 'add' | 'del'; style?: CSSProperties }) {
  return (
    <span style={{
      display: 'inline',
      background: op === 'add' ? HF.diffAdd : HF.diffDel,
      color: op === 'add' ? HF.diffAddInk : HF.diffDelInk,
      textDecoration: op === 'del' ? 'line-through' : 'none',
      padding: '0 2px', borderRadius: 2,
      ...style,
    }}>{children}</span>
  );
}

// ── Placeholder Image ─────────────────────────────────────────────────
type ImgPattern = 'jar' | 'field' | 'infographic' | 'howto';
type ImgTone = 'neutral' | 'blue' | 'green' | 'red' | 'indigo';

const IMG_TONES: Record<ImgTone, [string, string]> = {
  neutral: ['#f4f4f5', '#d4d4d8'],
  blue:    [HF.blueBg, '#bfd4f8'],
  green:   [HF.greenBg, '#bddfca'],
  red:     [HF.redBg, '#f5c6c0'],
  indigo:  [HF.accentBg, HF.accentBg2],
};

export function PlaceholderImg({
  w, h, pattern = 'jar', label, sub, tone = 'neutral', style,
}: {
  w: number; h: number; pattern?: ImgPattern; label?: string; sub?: string;
  tone?: ImgTone; style?: CSSProperties;
}) {
  const [bg, fg] = IMG_TONES[tone];
  const renderPattern = () => {
    switch (pattern) {
      case 'jar':
        return (
          <>
            <rect x={w * 0.38} y={h * 0.18} width={w * 0.24} height={h * 0.66} rx={4} fill={fg} />
            <rect x={w * 0.40} y={h * 0.14} width={w * 0.20} height={h * 0.08} rx={2} fill={fg} opacity={0.7} />
          </>
        );
      case 'field':
        return (
          <>
            <rect x={0} y={h * 0.6} width={w} height={h * 0.4} fill={fg} />
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((p, i) => (
              <circle key={i} cx={w * p} cy={h * 0.58} r={h * 0.08} fill={fg} opacity={0.6} />
            ))}
          </>
        );
      case 'infographic':
        return (
          <>
            <rect x={w * 0.1} y={h * 0.2} width={w * 0.8} height={2} fill={fg} />
            <rect x={w * 0.1} y={h * 0.42} width={w * 0.6} height={2} fill={fg} />
            <rect x={w * 0.1} y={h * 0.64} width={w * 0.7} height={2} fill={fg} />
            <circle cx={w * 0.5} cy={h * 0.5} r={h * 0.22} fill="none" stroke={fg} strokeWidth={3} />
          </>
        );
      case 'howto':
        return (
          <>
            {[0.2, 0.5, 0.8].map((p, i) => (
              <g key={i}>
                <circle cx={w * p} cy={h * 0.4} r={h * 0.12} fill="none" stroke={fg} strokeWidth={2} />
              </g>
            ))}
          </>
        );
    }
  };
  return (
    <div style={{
      position: 'relative', width: w, height: h,
      background: bg, borderRadius: 6,
      border: `1px solid ${HF.border}`, overflow: 'hidden', flexShrink: 0,
      ...style,
    }}>
      <svg width={w} height={h} style={{ display: 'block' }}>{renderPattern()}</svg>
      {(label || sub) && (
        <div style={{
          position: 'absolute', bottom: 4, left: 4, right: 4,
          fontSize: 9, fontFamily: FONT_MONO, color: HF.ink3,
          display: 'flex', justifyContent: 'space-between',
        }}>
          {label && <span>{label}</span>}
          {sub && <span>{sub}</span>}
        </div>
      )}
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────
export function MonoLabel({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      fontSize: 9, fontFamily: FONT_MONO, fontWeight: 700,
      color: HF.ink3, letterSpacing: '0.06em', textTransform: 'uppercase',
      ...style,
    }}>{children}</div>
  );
}

// ── Skill tag ─────────────────────────────────────────────────────────
const SKILL_CFG: Record<SkillKey, { icon: string; name: string; bg: string; fg: string }> = {
  C: { icon: '⬢', name: 'Compliance', bg: HF.skillCBg, fg: HF.skillC },
  S: { icon: '◈', name: 'SEO',        bg: HF.skillSBg, fg: HF.skillS },
  A: { icon: '◎', name: 'AEO',        bg: HF.skillABg, fg: HF.skillA },
};

export function SkillTag({ skill }: { skill: SkillKey }) {
  const cfg = SKILL_CFG[skill];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '2px 6px', borderRadius: 3,
      background: cfg.bg, color: cfg.fg,
      fontFamily: FONT_MONO, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.04em',
    }}>
      <span>{cfg.icon}</span>{cfg.name}
    </span>
  );
}

export { SKILL_CFG };
export type { SkillKey };
