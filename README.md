# Tezsayt — Agency Website

Marketing website for a web agency in Baku, Azerbaijan. Built with Next.js 15, Tailwind CSS v4, and Framer Motion.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint
npm run check:locales  # Verify all locale files have matching keys
```

Copy `.env.example` to `.env.local` and fill in the values:
- `NEXT_PUBLIC_FORMSPREE_ID` — your Formspree form ID
- `NEXT_PUBLIC_SITE_URL` — production URL (e.g. `https://example.az`)

## Content

All content lives in TypeScript files — no CMS.

### Adding a project

Edit `content/projects.ts`. Add a new entry to the array:

```ts
{
  slug: "your-slug",
  client: "Client Name",
  industry: localizedText("Industry"),
  description: localizedText("One-line description"),
  image: "/images/projects/your-slug.png",
  url: "https://example.com",
  featured: false,  // true to show on homepage
}
```

Add a screenshot at `public/images/projects/your-slug.png` (16:10 aspect ratio, 1120x700px recommended).

### Adding a testimonial

Edit `content/testimonials.ts`. Add an entry:

```ts
{
  id: "unique-id",
  quote: localizedText("The quote text"),
  name: "Person Name",
  role: localizedText("Their role"),
  business: "Business Name",
  photo: "/images/logos/photo.jpg",  // or null
  logo: null,
}
```

The testimonial strip renders automatically when the array is non-empty.

### Other content files

- `content/hackathons.ts` — hackathon entries
- `content/services.ts` — service tiers and pricing
- `content/faq.ts` — FAQ items (`showOnHomepage: true` to show on homepage)
- `content/team.ts` — team member data

All text fields use `localizedText("English text")` which copies the same text to all three locales. Replace with `{ az: "...", ru: "...", en: "..." }` for translated content.

## Translations

Three locales: `az` (default), `ru`, `en`. Dictionary files are in `locales/`.

### Adding or updating a translation

1. Edit `locales/az.json`, `locales/ru.json`, and `locales/en.json`
2. Keys use dot notation in a nested JSON structure (e.g., `nav.work`)
3. All three files must have the same key structure
4. Run `npm run check:locales` to verify no keys are missing
5. Missing keys fall back to the `az` value at runtime

## Pre-launch checklist

- [ ] Replace every `[AGENCY]` placeholder in `lib/constants.ts` with the real agency name
- [ ] Set `WHATSAPP_NUMBER`, `INSTAGRAM_HANDLE`, `TELEGRAM_HANDLE`, `EMAIL` in `lib/constants.ts`
- [ ] Set `NEXT_PUBLIC_FORMSPREE_ID` and `NEXT_PUBLIC_SITE_URL` in `.env.local`
- [ ] Replace all placeholder images in `public/images/projects/` with real screenshots
- [ ] Replace team photos in `public/images/team/`
- [ ] Replace `public/og-image.png` with a real 1200x630 render
- [ ] Translate `locales/az.json` fully into Azerbaijani
- [ ] Translate `locales/ru.json` fully into Russian
- [ ] Add at least one real testimonial or confirm the array is empty
- [ ] Confirm every project URL in `content/projects.ts` resolves
- [ ] Confirm the WhatsApp number is correct and the prefill messages are localized
- [ ] Run `npm run check:locales`
- [ ] Run `npm run build` with no errors
- [ ] Run Lighthouse on the deployed URL (target: Performance 90+, Accessibility 100)
