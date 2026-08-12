'use client';

import { useState } from 'react';
import { HF, FONT_SANS, FONT_MONO } from './tokens';
import { TopNav } from './TopNav';
import { InboxRail } from './InboxRail';
import { SkuHeader, Mode } from './SkuHeader';
import { AllMode } from './AllMode';
import { SeoMode } from './SeoMode';
import { ComplianceMode } from './ComplianceMode';

function AeoPlaceholder() {
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: HF.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: HF.ink3, fontFamily: FONT_SANS }}>
        <div style={{ fontSize: 32, marginBottom: 12, fontFamily: FONT_MONO }}>◎</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: HF.ink, marginBottom: 6 }}>AEO Mode</div>
        <div style={{ fontSize: 12, color: HF.ink3, maxWidth: 320 }}>
          Answer Engine Optimization view not yet designed. AEO recommendations are visible in All mode.
        </div>
      </div>
    </div>
  );
}

export function WorkspaceShell() {
  const [mode, setMode] = useState<Mode>('all');

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100vh', overflow: 'hidden',
      background: HF.paper,
      fontFamily: FONT_SANS,
      fontSize: 13,
      color: HF.ink,
      letterSpacing: '-0.005em',
    }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <InboxRail />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <SkuHeader mode={mode} onModeChange={setMode} />
          {mode === 'all' && <AllMode />}
          {mode === 'seo' && <SeoMode />}
          {mode === 'compliance' && <ComplianceMode />}
          {mode === 'aeo' && <AeoPlaceholder />}
        </div>
      </div>
    </div>
  );
}
