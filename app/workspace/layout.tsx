import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Agent Workspace',
  description: 'SKU review workspace — Compliance, SEO, AEO recommendations',
};

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ isolation: 'isolate' }}>
      {children}
    </div>
  );
}
