# 04 — Component Specifications

Every component below has fixed behaviour. Build exactly as described.

---

## Header

Sticky, `position: sticky; top: 0`, `z-index: 50`. Background `--bg` with `backdrop-filter: blur(8px)` and 90% opacity. Bottom border `1px solid var(--border)` that only appears once the page has scrolled more than 8px.

Height 64px. Container max-width 1120px.

**Left:** agency wordmark, text, weight 600, 18px, links to `/[locale]`.

**Centre (desktop only, hidden below `md`):** nav links — Work, Services, About, Contact. 15px, weight 400, colour `--text-muted`. Active route is `--text` weight 500. Hover transitions colour over 200ms.

**Right:** LanguageToggle, then a primary Button reading `nav.cta` that opens WhatsApp.

**Mobile (below `md`):** wordmark left, LanguageToggle and a hamburger button right. Tapping the hamburger opens a full-screen overlay with background `--bg`, containing the four nav links at 24px weight 500 stacked with 24px gaps, then both contact buttons at full width. Close button top-right. Body scroll locks while open. Escape key closes it.

---

## LanguageToggle

Three text buttons in a row: `AZ` `RU` `EN`. 13px, weight 500, `padding: 4px 8px`, radius 6px.

Active locale: background `--accent-bg`, colour `--accent`, `aria-pressed="true"`.
Inactive: colour `--text-faint`, transparent background. Hover: colour `--text`.

Separated by 2px gaps. No flags. No dropdown.

Clicking writes the locale to `localStorage` under key `locale`, then navigates to the same path under the new locale prefix, preserving any hash or query string.

---

## Footer

Background `--surface-alt`. Top border `1px solid var(--border)`. Padding 64px vertical.

Three columns on desktop, stacked on mobile:

1. Wordmark, then `footer.tagline` in 14px `--text-muted`, max-width 280px.
2. Nav links stacked: Work, Services, About, Contact. 14px `--text-muted`, hover `--text`.
3. Contact links stacked: Instagram, WhatsApp, Telegram, Email. Each with its icon at 16px.

Bottom bar separated by a 1px border, 24px above and below: `footer.rights` on the left, `footer.builtWith` on the right, both 13px `--text-faint`. Stacked and centred on mobile.

---

## FloatingContact

Fixed, `bottom: 20px; right: 20px`, `z-index: 40`.

A pill button: background `--accent`, white text, `padding: 12px 18px`, radius 999px, `--shadow-lift`. WhatsApp icon 18px, then `floating.label` at 15px weight 500.

Appears 2000ms after mount with a 300ms fade and 8px upward translate.

Hidden — fades out over 200ms — whenever the ContactSection is intersecting the viewport. Use an IntersectionObserver on an element with id `contact`.

On mobile below `md`, shows the icon only, 48×48px circle, no label.

---

## BrowserMockup

Props: `src`, `alt`, `priority` (boolean, default false).

Outer div: border `1px solid var(--border)`, radius 10px, `--shadow-card`, `overflow: hidden`, background `--surface`.

Top bar: height 32px, background `--surface-alt`, bottom border `1px solid var(--border)`, `display: flex; align-items: center; padding-left: 12px; gap: 6px`. Three circles, each 10px diameter, `border-radius: 999px`, background `#E5E5E3`.

Below: `next/image` at `width: 100%`, `height: auto`, aspect ratio 16:10, `object-fit: cover`, `object-position: top`.

---

## Hero

Full-width section, background `--bg`, padding `80px 0 96px` desktop, `48px 0 64px` mobile.

Vertical stack, left-aligned on desktop within a max-width of 720px, centred text on mobile.

1. **Pill** — `home.hero.pill`. Background `--accent-bg`, colour `--accent`, border `1px solid var(--accent-border)`, `padding: 6px 14px`, radius 999px, 13px weight 500. A 6px filled circle in `--accent` sits 8px to the left of the text.
2. **H1** — `home.hero.h1`. Display scale. Margin top 24px.
3. **Credibility line** — `home.hero.credibility`. 15px, `--text-muted`, margin top 16px, max-width 60ch.
4. **Subheadline** — `home.hero.sub`. body-lg, `--text`, margin top 20px, max-width 60ch.
5. **Button row** — margin top 32px, 12px gap, wraps on mobile to full-width stacked buttons. First button primary with the Instagram icon, second secondary with the WhatsApp icon. Both open in a new tab.
6. **BrowserMockup** — margin top 64px, `priority` true, showing the strongest client screenshot.

**Constraint:** items 1 through 5 must fit within 844px viewport height at 390px width. Verify this before moving on.

---

## Proof

Background `--surface-alt`. Standard section padding.

1. **Eyebrow** — `home.proof.label`, micro scale, uppercase, tracked.
2. **Project cards** — three featured projects. Desktop: `grid-cols-3`, 20px gap. Mobile: horizontal scroll container, `scroll-snap-type: x mandatory`, cards at 80vw width, 16px gap, 20px start padding so the first card aligns to the container.
3. **TestimonialStrip** — margin top 48px. See below.
4. **Logo row** — margin top 48px. Hackathon organizer logos, grayscale, `opacity: 0.6`, max-height 32px each, evenly spaced in a flex row with 48px gaps, wrapping on mobile. Below it, `home.proof.logosCaption` at 13px `--text-faint`, centred.

---

## ProjectCard

Background `--surface`, border `1px solid var(--border)`, radius 12px, `overflow: hidden`, `--shadow-card`.

Structure:
1. BrowserMockup with the project screenshot, no additional border.
2. Content area, padding 20px:
   - Industry Badge
   - Client name, h3 scale, margin top 10px
   - Description, 15px `--text-muted`, margin top 8px, clamped to 2 lines
   - `common.viewSite` link with an `ArrowUpRight` icon at 16px, margin top 14px, ghost button styling. Omit entirely when `url` is null.

Hover: `--shadow-lift`, `transform: translateY(-2px)`, 200ms.

---

## TestimonialStrip

Renders `null` when `testimonials.ts` is empty. No wrapper, no heading, no spacing — the surrounding layout must collapse cleanly.

When one or more exist: show a maximum of two. Desktop `grid-cols-2` with 20px gap; a single testimonial spans one column and is left-aligned, not centred. Mobile: horizontal scroll with snap.

Below the cards, a ghost link `home.proof.moreFromClients` with an arrow icon, pointing to `/[locale]/work#testimonials`. Only render this link when there are more than two testimonials.

---

## TestimonialCard

Background `--surface`, border `1px solid var(--border)`, radius 12px, padding 24px.

1. A `Quote` icon, 20px, colour `--accent`, `opacity: 0.4`.
2. Quote text, 16px, `--text`, margin top 12px, line height 1.6.
3. Attribution row, margin top 20px, `display: flex; align-items: center; gap: 12px`:
   - Photo if present: 40px circle, `object-fit: cover`. If absent but a logo exists: logo at 40px height, `object-fit: contain`. If neither: omit the image entirely.
   - Name at 15px weight 500, and beneath it role plus business at 13px `--text-muted`.

---

## HowItWorks

Background `--bg`. Standard padding.

Heading `home.how.heading`, h2 scale, max-width 20ch.

Three steps. Desktop: `grid-cols-3`, 32px gap. Mobile: stacked with 32px gap and a 1px vertical line in `--border` running down the left at 15px, behind the number circles.

Each step:
- Number circle: 32px diameter, background `--accent`, white text, 15px weight 600, centred.
- Title, h3 scale, margin top 16px.
- Body, 15px `--text-muted`, margin top 8px.

Fine print `home.how.fineprint` at 13px `--text-faint`, margin top 40px, centred on desktop, left on mobile.

---

## WhyWebsite

Background `--surface-alt`. Standard padding.

Heading `home.why.heading`, h2, max-width 24ch.
Intro `home.why.intro`, body-lg, `--text-muted`, margin top 16px, max-width 60ch.

Four points in a 2×2 grid on desktop (32px gap), stacked on mobile (32px gap), margin top 48px.

Each point:
- Icon, 24px, `--accent`, `strokeWidth 1.75`
- Title, h3 scale, margin top 12px
- Body, 15px `--text-muted`, margin top 6px

Icons in order: `Search`, `Lock`, `MessageSquare`, `Building2`.

---

## Pricing

Background `--bg`. Standard padding.

Heading `home.pricing.heading`, h2. Sub `home.pricing.sub`, body-lg `--text-muted`, margin top 12px.

Three PricingCards, margin top 48px. Desktop `grid-cols-3` with 20px gap. Mobile stacked with 16px gap.

Below the cards, margin top 40px: the included checklist. Label `home.pricing.included.label` at micro scale uppercase tracked, then five items in a horizontal wrapping flex row with 20px gaps, each a `Check` icon at 16px `--success` followed by 14px text.

Below that, margin top 40px: a ghost button `home.pricing.estimatorToggle` with a `ChevronDown` icon that rotates 180° when expanded. Clicking expands the PriceEstimator with a height transition over 300ms.

---

## PricingCard

Background `--surface`, border `1px solid var(--border)`, radius 12px, padding 24px.

The middle card (Business site) gets `border: 2px solid var(--accent)` and a badge above the name reading the localized "Most popular" string: background `--accent`, white text, 12px weight 500, `padding: 4px 10px`, radius 999px, positioned inline above the name with 12px margin below.

Structure:
1. Optional badge
2. Service name, h3 scale
3. Price row, margin top 12px: `common.from` at 13px `--text-muted`, then the number at 32px weight 600, then `AZN` at 16px weight 500 `--text-muted`
4. Divider, 1px `--border`, margin 20px vertical
5. `common.readyIn` label at 13px `--text-muted`, value at 15px weight 500
6. `common.goodFor` label at 13px `--text-muted` margin top 12px, value at 15px

Cards in a row must be equal height — use `align-items: stretch` on the grid.

---

## PriceEstimator

Collapsed by default. Client component.

**Controls, stacked with 24px gaps:**

1. **Type** — a segmented button group, four options, full width, equal flex. Selected: background `--accent`, white text. Unselected: background `--surface`, border `1px solid var(--border)`, text `--text`. Radius 8px on the outer corners only. Stacks to a 2×2 grid on mobile.

2. **Pages** — a range input, min 1, max 15, step 1, default 5. Label left, current value right in 15px weight 500. Track 4px `--border`, filled portion `--accent`, thumb 18px `--accent`.

3. **Languages** — a segmented group with three options: 1, 2, 3.

4. **Add-ons** — four checkboxes in a 2×2 grid on desktop, stacked on mobile. Custom checkbox: 18px square, radius 4px, border `1px solid var(--border-strong)`. Checked: background `--accent`, white `Check` icon at 14px.

**Calculation:**

```
base = { landing: 300, business: 600, store: 1000, custom: 1500 }[type]
includedPages = { landing: 1, business: 6, store: 8, custom: 8 }[type]
extraPages = max(0, pages - includedPages) * 50
extraLanguages = (languages - 1) * 150
addons = booking:200 + payments:300 + blog:150 + admin:400
total = base + extraPages + extraLanguages + addons

low  = floor(total / 50) * 50
high = ceil((total + 150) / 50) * 50

baseDays = { landing: 4, business: 9, store: 12, custom: 21 }[type]
days = baseDays + floor(extraPages / 50) + (languages - 1) * 2 + addonCount * 2
```

**Output block**, margin top 32px, background `--accent-bg`, border `1px solid var(--accent-border)`, radius 12px, padding 24px:
- `estimator.result.label` at 13px `--text-muted`
- `{low}–{high} AZN` at 32px weight 600 `--text`
- `estimator.result.timeline` and `{days} {estimator.result.days}` at 15px, margin top 8px
- `estimator.disclaimer` at 13px `--text-muted`, margin top 16px
- A primary Button `estimator.cta` opening WhatsApp, margin top 20px

Values update on every input change with no submit action. Never display a single price. Never gate the result behind an email.

---

## Team

Background `--surface-alt`. Standard padding.

Two-column on desktop: photo left at 40% width, text right at 60%, 48px gap. Stacked on mobile with the photo first.

Photo: `next/image`, aspect ratio 4:5, radius 12px, `object-fit: cover`.

Text column:
- Heading `home.team.heading`, h2
- `home.team.body1` and `home.team.body2`, 16px, margin top 20px, 16px between paragraphs, max-width 60ch
- Hackathon list, margin top 32px: label `home.team.hackLabel` at micro uppercase tracked, then four rows each with the event name at 15px weight 500 and the one-line description at 14px `--text-muted`, 12px between rows
- Ghost link `home.team.aboutLink` to `/[locale]/about`, margin top 24px

---

## ContactSection

`id="contact"`. Background `--bg`. Standard padding. Centred content, max-width 560px.

- Heading `home.contact.heading`, h2, centred
- Body `home.contact.body`, body-lg `--text-muted`, margin top 12px, centred
- Two buttons side by side, margin top 32px, 12px gap, full width and stacked on mobile. Instagram primary, WhatsApp secondary.
- Secondary row margin top 24px: Telegram and Email as ghost links with 16px icons, centred, 24px gap
- `contact.response` at 13px `--text-faint`, margin top 16px, centred

---

## ContactForm

Client component. Used on `/contact` only.

Four fields stacked with 20px gaps, max-width 480px:
1. Name — text input, required
2. Business name — text input, optional
3. What do you need? — textarea, 4 rows, required
4. How should we reach you? — text input, required, with `contact.form.reachHint` at 13px `--text-faint` beneath the label

Inputs: height 44px (textarea auto), background `--surface`, border `1px solid var(--border)`, radius 8px, padding `10px 14px`, 16px text. Focus: border `--accent`, `box-shadow: 0 0 0 3px var(--accent-bg)`, no default outline.

Labels above each field, 14px weight 500, margin bottom 6px. Never rely on placeholders as labels.

Submit: primary Button, full width, margin top 24px. Disabled state is not used — instead, on submit, validate and show inline errors.

Validation on submit: any empty required field shows its error string in 13px `--danger` beneath the field, and the form does not submit. Errors clear on the field's next change event.

On success: `router.push('/[locale]/thank-you')`.
On network failure: show `contact.form.error.send` above the submit button in `--danger`, with the WhatsApp link inline.

Posts to `https://formspree.io/f/{FORMSPREE_ID}` as JSON with `Accept: application/json`.

---

## Accordion

Used for the FAQ.

Each item: a full-width button row with the question at 16px weight 500 on the left and a `Plus` icon at 18px on the right that rotates 45° when open. Padding `20px 0`. Bottom border `1px solid var(--border)` on every item except the last.

Answer panel: 15px `--text-muted`, line height 1.7, max-width 65ch, padding bottom 20px. Height animates over 250ms.

`aria-expanded` on the button, `aria-controls` pointing to the panel id, panel has `role="region"`.

Multiple items may be open at once. No accordion-exclusive behaviour.

---

## Badge

Inline, `padding: 4px 10px`, radius 999px, 12px weight 500, background `--surface-alt`, colour `--text-muted`, border `1px solid var(--border)`.

Accent variant: background `--accent-bg`, colour `--accent`, border `--accent-border`.

---

## HackathonCard

Visually distinct from ProjectCard: no image, background `--surface-alt`, border `1px solid var(--border-strong)`, radius 12px, padding 24px.

1. Event name, 13px weight 500 `--accent`
2. Organizer, 13px `--text-faint`, same row, separated by a `·`
3. Project name, h3 scale, margin top 10px
4. Problem, 14px `--text-muted`, margin top 10px
5. Built, 15px `--text`, margin top 8px
6. Tags row, margin top 16px, Badges with 6px gaps, wrapping

---

## Work page filter

Three text buttons in a row, styled like LanguageToggle. Filtering happens client-side with no route change and no page reload.

Cards animate on filter change: exiting cards fade out over 150ms, entering cards fade in and translate up 8px over 250ms with a 40ms stagger. Use Framer Motion's `AnimatePresence` with `mode="popLayout"`.

The testimonials block on this page has `id="testimonials"` and shows all entries in a 2-column grid, or renders nothing when the array is empty.
