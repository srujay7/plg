# content-agent-site

Next.js 15 (App Router) + React 19 + Tailwind v4 marketing/product site for CommerceIQ's Content Agent, including the AEO PLG product surfaces (sign-up flow, AI Visibility report).

## Stack

- Next.js App Router, TypeScript, Tailwind CSS v4 (config lives in `app/globals.css` via `@theme`, no `tailwind.config.js`)
- `framer-motion` for animation, `lucide-react` for icons, `clsx` via `lib/cn.ts` for conditional classes
- Path alias `@/*` → repo root

## Structure

- `app/(site)/` — marketing site (home, pricing, ai-agency, customers, sample-report) sharing `SiteHeader`/`SiteFooter` from `components/layout/`. Light "Emerald Zenith" theme (see `app/globals.css` `@theme` tokens: `--color-midnight`, `--color-cyan`, etc.), font is Manrope.
- `app/(plg)/` — the actual AEO PLG product UI (sign-up flow, AI Visibility report product). This is a **separate dark-themed product surface**, intentionally not using the marketing site's light theme, header, or footer. Its own layout loads DM Sans and a near-black background. Source of truth for design/behavior is the HTML mockups in `/Users/srujaygautam/Documents/PLG-LFG/aeo-plg-visibility-report-dark_3.html` and `/Users/srujaygautam/Downloads/aeo-plg-signup-mock-dark_5.html` (static HTML/CSS/vanilla-JS prototypes reviewed against `AEO_PLG_Product_PRD_v2.md`, PLG-01/02/03/04/05/06/06b/07).
- `app/workspace/` — separate internal workspace product (unrelated to the PLG report flow).
- `components/ui/` — shared marketing-site primitives (Button, Tag, MetricCard, etc.) styled for the light theme — don't reuse these inside `(plg)`, which has its own visual language.
- `components/report/` — components backing the marketing site's `sample-report` demo page (light theme). Distinct from the PLG product's own report components.
- `data/` — static content/data modules consumed by pages (e.g. `sampleReportData.ts`, `pricingContent.ts`).

## Conventions

- Client components (`"use client"`) for anything with state/interaction; keep data-only modules server-safe.
- Section-based marketing pages compose `SectionShell` + `ContentContainer` + `SectionHeading` from `components/layout`/`components/ui`.
- No test suite configured — verify UI changes by running `npm run dev` and checking in-browser.
