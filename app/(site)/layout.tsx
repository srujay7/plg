import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ReportModalProvider } from '@/components/report/ReportModalProvider';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReportModalProvider>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </ReportModalProvider>
  );
}
