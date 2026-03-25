"use client";

import { cn } from "@/lib/cn";
import { useReportModal } from "@/components/report/ReportModalProvider";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Case Study", href: "/#case-study" },
      { label: "Pricing", href: "/#pricing" },
      { label: "AI Agency", href: "/ai-agency" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

interface SiteFooterProps {
  className?: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  const { open: openReportModal } = useReportModal();

  return (
    <footer
      className={cn(
        "border-t border-slate-200 bg-white",
        className
      )}
    >
      {/* CTA banner */}
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex flex-col items-center gap-4 border-b border-slate-200 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Get your AI Visibility Report
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              See how your brand performs across AI-powered search today.
            </p>
          </div>
          <button
            onClick={openReportModal}
            className="shrink-0 rounded-lg bg-[#10B981] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Get Free Report
          </button>
        </div>
      </div>

      {/* Footer columns */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                {column.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6 md:px-8">
          <p className="text-xs text-slate-400">
            &copy; 2024 Content Agent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
