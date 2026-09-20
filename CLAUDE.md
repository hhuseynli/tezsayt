# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Marketing website for a two-person web agency in Baku, Azerbaijan. Sells website development services to Azerbaijani SMBs. Primary conversion: starting a conversation on Instagram or WhatsApp. No CMS, no database, no auth — all content lives in TypeScript files.

**Placeholder:** `[AGENCY]` must be replaced globally with the agency name before launch.

## Stack

- Next.js 15, App Router, TypeScript
- Tailwind CSS v4
- Framer Motion (scroll reveals only — never import in layout files)
- next/font/local for Inter (weights 400, 500, 600; Latin, Latin Extended, Cyrillic subsets)
- Deployed on Vercel
- Contact form posts to Formspree

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint
```

## Architecture

### Routing and i18n

Three locales: `az` (default), `ru`, `en`. URL structure: `/[locale]/...`. Root `/` redirects to `/az`.

Translation uses a custom hook reading flat JSON dictionaries in `locales/{az,ru,en}.json` — no i18n library. Missing keys fall back to the `az` value. The language toggle writes to `localStorage` key `locale`; middleware reads it for root redirect. Browser language is never used.

### Content model

All content in `content/*.ts` as typed arrays. Translatable text fields use `{ az: string; ru: string; en: string }` objects. Content types: `Project`, `Testimonial`, `Service`, `FaqItem`, and team data.

`testimonials.ts` starts empty — components must render nothing (no wrapper, no heading, no spacing) when empty.

### Key files

- `lib/constants.ts` — agency name, social handles, Formspree ID, locale config
- `lib/i18n.ts` — translation hook
- `middleware.ts` — locale redirect logic
- `app/[locale]/layout.tsx` — locale-aware layout
- `components/sections/` — page sections (Hero, Proof, HowItWorks, WhyWebsite, Pricing, Team, ContactSection)
- `components/ui/` — reusable primitives (Button, Badge, Card, Accordion, BrowserMockup)
- `components/cards/` — domain cards (ProjectCard, TestimonialCard, PricingCard)

### Routes

```
/[locale]                 Homepage
/[locale]/work            Portfolio (client-side filtering with AnimatePresence)
/[locale]/services        Services, pricing, FAQ
/[locale]/about           Team and story
/[locale]/contact         Contact form (client component, posts to Formspree)
/[locale]/thank-you       Post-form confirmation
/[locale]/guides          Blog index (stub)
/[locale]/guides/[slug]   Blog article (stub)
```

## Design system rules

- **Light mode only.** No dark mode.
- Colors defined as CSS custom properties in `globals.css`. Accent color (`--accent: #2563EB`) used only for primary buttons, links, active states, and the credibility pill. Never more than one accent-filled button per viewport.
- Spacing restricted to: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Borders always `1px solid var(--border)`.
- Two shadows only: `--shadow-card` (resting) and `--shadow-lift` (hover, project cards only).
- Radius: buttons/inputs 8px, cards 12px, pills/badges 999px, browser mockup 10px.
- Icons from `lucide-react` (outline, `strokeWidth={1.75}`). WhatsApp/Instagram use brand SVGs in `components/ui/icons/`.
- Breakpoints: only `md` (768px) and `lg` (1024px), mobile-first.
- **Forbidden:** gradients, glassmorphism, blur backdrops (except header), stock photos, emoji in UI, auto-play carousels, modal popups on load, more than two font weights per component.

## UI transition rule

When a new element or view appears in response to user interaction (e.g. clicking a button, selecting an option), it must **replace** the current content — never append below it. Use `AnimatePresence mode="wait"` with state-driven views so the old content exits before the new content enters. The screen should never feel crowded with stacked content.

## Key behaviour constraints

- Hero (items 1–5: pill through button row) must fit in one 390×844 viewport without scrolling.
- Floating contact button: appears after 2s delay, hides when `#contact` section is in viewport (IntersectionObserver).
- Price estimator always outputs a range (low–high), never a single number. Calculation formula is specified in `docs/04-COMPONENTS.md`.
- Contact form validates name, message, and reach-method fields as non-empty; inline errors in 13px red text. Success redirects to `/[locale]/thank-you`.
- All external links: `target="_blank" rel="noopener noreferrer"`.
- All motion wrapped in `@media (prefers-reduced-motion: no-preference)`.

## SEO requirements

- Every page exports `metadata` with localized title, description, and `alternates.languages` for all three locales.
- `app/sitemap.ts` and `app/robots.ts` must exist.
- **Sitemap `lastModified`:** Static pages use `STATIC_LAST_MODIFIED` in `app/sitemap.ts` (not `new Date()`). Update this date whenever static page content changes.
- Open Graph image at `/og-image.png` (1200×630) — critical for WhatsApp/Instagram link previews.

## Performance targets

- Lighthouse Performance ≥90 mobile, Accessibility 100
- LCP < 1.5s
- All images via `next/image` with explicit width/height
- Fonts self-hosted via `next/font/local` with `display: swap`

## Detailed specs

The `docs/` folder contains complete specifications:
- `01-PROJECT-SPEC.md` — routes, file structure, constants, content types, behaviour rules
- `02-DESIGN-SYSTEM.md` — colors, typography, spacing, motion, button variants, grid layouts
- `03-CONTENT.md` — all copy (English source), content data for projects/hackathons
- `04-COMPONENTS.md` — exact specs for every component (Header, Footer, Hero, cards, forms, etc.)

**Read these before building any component.** Specs are fixed — build exactly as described.

## Business content dependency map

When any business-related file changes, **propagate the change to all its dependents** listed below. Walk the graph: if A → B → C and you change A, update B and then C.

### Source-of-truth hierarchy

```
docs/market-fit-strategy.md          ← Strategic source of truth (wins over everything)
  └→ docs/brief.md                   ← Summarises strategy + §12 decisions for all issues
      └→ docs/content-conventions.md ← Copy rules derived from brief + strategy

content/offering.ts                  ← Single source of truth for ALL commercial facts
                                       (prices, turnarounds, tiers, add-ons, business facts)
```

### Dependency graph

```
content/offering.ts
  ├→ content/services.ts             (re-exports tiers as Service[])
  │    ├→ components/sections/Pricing.tsx
  │    └→ app/[locale]/services/page.tsx
  ├→ components/sections/PriceEstimator.tsx
  ├→ components/seo/JsonLd.tsx       (schema.org prices, FAQ)
  ├→ components/blog/PriceTag.tsx
  ├→ lib/blog.ts                     (blog metadata referencing prices)
  ├→ app/llms.txt/route.ts           (LLM-facing site description)
  └→ app/[locale]/services/page.tsx  (metadata, page content)

lib/constants.ts                     (agency name, socials, Formspree, site URL, locales)
  └→ 36 files — virtually every layout, page, and component

content/team.ts
  ├→ components/sections/Team.tsx
  ├→ app/[locale]/about/page.tsx
  └→ components/seo/JsonLd.tsx

content/projects.ts
  ├→ components/sections/Proof.tsx
  ├→ app/[locale]/work/page.tsx
  └→ components/seo/JsonLd.tsx

content/faq.ts
  ├→ app/[locale]/services/page.tsx
  └→ components/seo/JsonLd.tsx

content/testimonials.ts
  └→ components/sections/TestimonialStrip.tsx

locales/{az,ru,en}.json              (UI strings — headings, labels, CTAs)
  └→ lib/i18n.ts → all components using useTranslation()
```

### Docs cross-references

```
docs/market-fit-strategy.md
  ├→ docs/brief.md
  ├→ docs/content-conventions.md
  ├→ docs/seo-geo-playbook.md
  └→ docs/blog-playbook.md

docs/brief.md
  ├→ docs/az-review-queue.md
  └→ docs/content-conventions.md

docs/content-conventions.md
  └→ docs/style-az.md

docs/claims-audit.md                 (verifies claims in offering.ts and strategy)
docs/offering-findings.md            (extraction log — input to offering.ts)
```

### Change propagation rules

1. **Price, turnaround, tier, or add-on change** → update `content/offering.ts` first, then verify every dependent component and page listed above still renders correctly. Update `docs/03-CONTENT.md` copy if it hardcodes the old value. Update `app/sitemap.ts` `STATIC_LAST_MODIFIED`.
2. **Differentiator, positioning, or audience change** → update `docs/market-fit-strategy.md` first, then cascade through `docs/brief.md` → `docs/content-conventions.md` → locale JSONs and component copy.
3. **Agency name, URL, or contact info change** → update `lib/constants.ts`. All 36+ consumers read from it so no manual propagation needed, but verify `app/llms.txt/route.ts`, JSON-LD, and OG metadata.
4. **Team change** → update `content/team.ts`, verify About page and JSON-LD.
5. **New project or portfolio change** → update `content/projects.ts`, verify Work page and Proof section.
6. **FAQ change** → update `content/faq.ts`, verify services page and JSON-LD.
7. **Copy/tone rule change** → update `docs/content-conventions.md`, then propagate to `docs/style-az.md` and review affected locale strings.
8. **Any static content change** → update `STATIC_LAST_MODIFIED` in `app/sitemap.ts`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
