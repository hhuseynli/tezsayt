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

All content in `content/*.ts` as typed arrays. Translatable text fields use `{ az: string; ru: string; en: string }` objects. Content types: `Project`, `Hackathon`, `Testimonial`, `Service`, `FaqItem`, and team data.

`testimonials.ts` starts empty — components must render nothing (no wrapper, no heading, no spacing) when empty.

### Key files

- `lib/constants.ts` — agency name, social handles, Formspree ID, locale config
- `lib/i18n.ts` — translation hook
- `middleware.ts` — locale redirect logic
- `app/[locale]/layout.tsx` — locale-aware layout
- `components/sections/` — page sections (Hero, Proof, HowItWorks, WhyWebsite, Pricing, Team, ContactSection)
- `components/ui/` — reusable primitives (Button, Badge, Card, Accordion, BrowserMockup)
- `components/cards/` — domain cards (ProjectCard, HackathonCard, TestimonialCard, PricingCard)

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
