# 01 — Project Specification

## Project

A marketing website for a two-person web agency in Baku, Azerbaijan. The site sells website development services to Azerbaijani small and medium businesses. The primary conversion action is starting a conversation on Instagram or WhatsApp.

**Placeholder to replace globally before launch:** `[AGENCY]` — the agency name.

## Stack

- Next.js 15, App Router, TypeScript
- Tailwind CSS v4
- Framer Motion for scroll reveals only
- next/font for self-hosted fonts
- Deployed on Vercel
- Contact form posts to Formspree

No CMS. No database. No authentication. All content lives in TypeScript files in the repo.

## Languages

Three locales: `az` (default), `ru`, `en`.

URL structure is `/az/...`, `/ru/...`, `/en/...`. The root path `/` redirects to `/az`.

Translation is handled by a custom hook reading from flat JSON dictionaries. No i18n library.

At build time all three locales must exist as files. Russian and English files start as copies of the Azerbaijani file with English source text — they get translated later. The site must never render a missing key; missing keys fall back to the `az` value.

## Routes

```
/[locale]                 Homepage
/[locale]/work            Portfolio
/[locale]/services        Services, pricing, FAQ
/[locale]/about           Team and story
/[locale]/contact         Contact
/[locale]/thank-you       Post-form confirmation
/[locale]/blog            Blog index (fully functional)
/[locale]/blog/[slug]     Blog article (markdown posts from content/blog/)
/[locale]/blog/feed.xml   RSS feed
/[locale]/guides          Legacy stub (redirects or empty)
/[locale]/guides/[slug]   Legacy stub
```

## File structure

```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                      redirects to /az
│   ├── globals.css
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx                  homepage
│       ├── work/page.tsx
│       ├── services/page.tsx
│       ├── about/page.tsx
│       ├── contact/page.tsx
│       ├── thank-you/page.tsx
│       ├── blog/
│       │   ├── page.tsx
│       │   ├── [slug]/page.tsx
│       │   └── feed.xml/route.ts
│       └── guides/
│           ├── page.tsx
│           └── [slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── FloatingContact.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Accordion.tsx
│   │   └── BrowserMockup.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Proof.tsx
│   │   ├── TestimonialStrip.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhyWebsite.tsx
│   │   ├── Pricing.tsx
│   │   ├── PriceEstimator.tsx
│   │   ├── Team.tsx
│   │   └── ContactSection.tsx
│   ├── cards/
│   │   ├── ProjectCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── PricingCard.tsx
│   ├── blog/
│   │   ├── BlogCta.tsx
│   │   └── PriceTag.tsx
│   ├── seo/
│   │   └── JsonLd.tsx
│   └── ContactForm.tsx
├── content/
│   ├── types.ts              Locale and Localized type definitions
│   ├── offering.ts           Single source of truth for all commercial facts
│   ├── services.ts           Re-exports offering tiers as Service[]
│   ├── projects.ts
│   ├── testimonials.ts
│   ├── faq.ts
│   ├── team.ts
│   └── blog/                 Markdown blog posts (*.mdx)
├── locales/
│   ├── az.json
│   ├── ru.json
│   └── en.json
├── lib/
│   ├── i18n.ts
│   ├── constants.ts
│   ├── utils.ts
│   └── blog.ts              Blog post loading and metadata
├── public/
│   ├── images/
│   │   ├── projects/
│   │   ├── logos/
│   │   └── team/
│   ├── og-image.png
│   └── favicon.ico
└── middleware.ts
```

## Constants

`lib/constants.ts` exports:

```ts
export const AGENCY_NAME = "[AGENCY]";
export const WHATSAPP_NUMBER = "994XXXXXXXXX";
export const INSTAGRAM_HANDLE = "yourhandle";
export const TELEGRAM_HANDLE = "yourhandle";
export const EMAIL = "hello@example.com";
export const FORMSPREE_ID = "xxxxxxxx";
export const SITE_URL = "https://example.az";
export const LOCALES = ["az", "ru", "en"] as const;
export const DEFAULT_LOCALE = "az";
```

WhatsApp links are built by a helper that takes a locale and returns a `wa.me` URL with a locale-appropriate pre-filled message.

## Content model

Every content file exports a typed array. Text fields that need translation are objects keyed by locale.

```ts
type Localized = { az: string; ru: string; en: string };

type ProjectType = "landing" | "business" | "store" | "platform";

type Project = {
  slug: string;
  client: string;
  type: ProjectType;
  industry: Localized;
  description: Localized;
  image: string;
  url: string | null;
  featured: boolean;
  tags: Localized[];
};

type Testimonial = {
  id: string;
  quote: Localized;
  name: string;
  role: Localized;
  business: string;
  photo: string | null;
  logo: string | null;
};

type Service = {
  slug: string;
  name: Localized;
  description: Localized;
  bestFor: Localized;
  includes: Localized[];
  timeline: Localized;
  priceFrom: number;
  priceLabel?: Localized;
};

type FaqItem = {
  id: string;
  question: Localized;
  answer: Localized;
  showOnHomepage: boolean;
};
```

`testimonials.ts` ships as an empty array. The testimonial strip renders nothing when the array is empty and must not leave a visual gap.

## Behaviour rules

- The homepage hero text (h1, subheadline, CTA button) fills the viewport and fades on scroll, followed by a scroll-revealed interactive card with three animated stages.
- The language toggle writes the chosen locale to `localStorage` under the key `locale`. On subsequent visits, middleware reads it and redirects the root path accordingly. Browser language is never used to redirect.
- The floating contact button appears after a 2 second delay with a fade-in, and is hidden when the contact section is in the viewport.
- The price estimator outputs a range: `floor(total / 50) * 50` to `ceil(total × 1.15 / 50) * 50`. All pricing data from `content/offering.ts`. Outputs both a one-time and monthly estimate. Never a single number.
- The contact form validates that name and message are non-empty before submitting, showing an inline error in red 13px text beneath the offending field.
- On successful form submit, redirect to `/[locale]/thank-you`.
- All external links open in a new tab with `rel="noopener noreferrer"`.

## SEO

- Every page exports `metadata` with a localized title and description.
- Every page emits `alternates.languages` with all three locale URLs.
- `app/sitemap.ts` generates entries for every route in every locale.
- `app/robots.ts` allows everything and points to the sitemap.
- Open Graph image at `/og-image.png`, 1200×630. This is critical — links are shared via WhatsApp and Instagram DM, and the preview card is often seen before the site itself.
- `og:locale` set per locale.

## Performance targets

- Lighthouse Performance 90 or above on mobile
- Lighthouse Accessibility 100
- Largest Contentful Paint under 1.5 seconds
- All images served through `next/image` with explicit width and height
- Fonts self-hosted through `next/font/local` with `display: swap`
- Framer Motion imported only in components that use it, never in layout

## Accessibility

- Every interactive element reachable by keyboard with a visible focus ring
- Every image has descriptive alt text pulled from content files
- Colour contrast at least 4.5:1 for body text and 3:1 for large text
- The language toggle is a button group with `aria-pressed`
- The accordion uses `aria-expanded` and `aria-controls`
- Form fields have associated `<label>` elements, never placeholder-only labelling
