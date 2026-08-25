# 02 — Design System

All values below are fixed. Do not substitute alternatives.

## Colour

Defined as CSS custom properties in `globals.css` under `:root`.

```css
:root {
  --bg:            #FAFAF9;
  --surface:       #FFFFFF;
  --surface-alt:   #F4F4F2;
  --border:        #E7E7E4;
  --border-strong: #D4D4D0;

  --text:          #18181B;
  --text-muted:    #71717A;
  --text-faint:    #A1A1AA;

  --accent:        #2563EB;
  --accent-hover:  #1D4ED8;
  --accent-bg:     #EFF4FF;
  --accent-border: #BFD3FE;

  --success:       #16A34A;
  --success-bg:    #F0FDF4;
  --danger:        #DC2626;
}
```

Light mode only. Do not implement dark mode.

Usage rules:
- Page background is `--bg`. Cards are `--surface`. Alternating sections use `--surface-alt`.
- `--accent` is used for primary buttons, links, active states, and the credibility pill. Nothing else.
- Never use more than one accent-filled button per viewport.
- Borders are always `1px solid var(--border)`.

## Typography

Font: **Inter**, self-hosted via `next/font/local`. Weights 400, 500, 600 only. Latin, Latin Extended, and Cyrillic subsets — all three are required for Azerbaijani and Russian.

Before writing any other code, verify these two strings render correctly with no missing glyphs:

```
Azərbaycan müştəriləri üçün keyfiyyətli vebsayt
Качественный сайт для азербайджанского бизнеса
```

Scale:

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `display` | 48px / 32px mobile | 600 | 1.1 | H1 only |
| `h2` | 32px / 26px mobile | 600 | 1.2 | Section headings |
| `h3` | 20px | 500 | 1.3 | Card titles, step titles |
| `body-lg` | 18px | 400 | 1.6 | Hero subheadline, section intros |
| `body` | 16px | 400 | 1.6 | Default |
| `small` | 14px | 400 | 1.5 | Captions, fine print |
| `micro` | 13px | 500 | 1.4 | Labels, badges, eyebrows |

Letter spacing: `-0.02em` on `display` and `h2`. Default elsewhere.

Rules:
- Sentence case everywhere. Never title case.
- Eyebrow labels are `micro`, uppercase, `letter-spacing: 0.08em`, colour `--text-muted`.
- Body text is never lighter than `--text-muted`.
- Maximum line length for prose is 65 characters — use `max-w-[65ch]`.

## Spacing

Use only these values: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px.

Section vertical padding: `96px` desktop, `64px` mobile.
Container: `max-width: 1120px`, horizontal padding `24px` desktop, `20px` mobile.
Card internal padding: `24px`.
Gap between cards in a grid: `20px`.

## Radius

- Buttons and inputs: `8px`
- Cards: `12px`
- Pills and badges: `999px`
- Browser mockup frame: `10px`

## Shadows

Two only:

```css
--shadow-card: 0 1px 2px rgb(0 0 0 / 0.04), 0 1px 3px rgb(0 0 0 / 0.06);
--shadow-lift: 0 4px 8px rgb(0 0 0 / 0.05), 0 8px 24px rgb(0 0 0 / 0.08);
```

`--shadow-card` on resting cards. `--shadow-lift` on hover for project cards only. Nothing else gets a shadow.

## Motion

- Transition duration `200ms`, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Scroll reveal: elements fade from `opacity: 0, translateY(16px)` to visible, triggered once at 20% viewport intersection, `400ms` duration, staggered `60ms` between siblings.
- All motion wrapped in `@media (prefers-reduced-motion: no-preference)`.
- No parallax. No auto-playing carousels. No looping animations.

## Buttons

Three variants.

**Primary** — background `--accent`, text white, `padding: 12px 20px`, radius `8px`, weight 500, size 16px. Hover: background `--accent-hover`. Active: `transform: scale(0.98)`.

**Secondary** — background `--surface`, text `--text`, border `1px solid var(--border-strong)`, same padding and radius. Hover: background `--surface-alt`.

**Ghost** — no background, no border, text `--accent`, weight 500. Hover: underline.

Sizes: default as above. `lg` variant is `padding: 16px 28px`, size 18px — used only for the contact page primary CTA.

Buttons containing an icon place it left of the label with an `8px` gap, icon size `18px`.

## Icons

Use `lucide-react`. Outline style, `strokeWidth={1.75}`. Sizes: 18px inline, 20px in buttons, 24px in feature blocks. Never larger.

Specific icons:
- WhatsApp and Instagram: use the brand SVGs, not lucide, placed in `components/ui/icons/`
- Steps: numbered circles, not icons
- Value points: `Search`, `Lock`, `MessageSquare`, `Building2`
- Included checklist: `Check`

## Browser mockup

A wrapper component that frames a screenshot.

Structure: outer div with border `1px solid var(--border)`, radius `10px`, `--shadow-card`, `overflow: hidden`. Inside, a top bar `32px` tall with background `--surface-alt`, a bottom border, and three `10px` circles at `#E5E5E3` spaced `6px` apart starting `12px` from the left. Below it, the image at full width.

No URL bar text. No fake browser buttons beyond the three dots.

## Grid and layout

- Homepage sections alternate background between `--bg` and `--surface-alt`, starting with `--bg` for the hero.
- Project cards: 3 columns desktop, horizontal scroll on mobile with `scroll-snap-type: x mandatory`.
- Pricing cards: 3 columns desktop, stacked mobile.
- Value points: 2×2 grid desktop, stacked mobile.
- Steps: 3 columns desktop, stacked mobile with a connecting vertical line.

## Breakpoints

Tailwind defaults. Design mobile-first. The only breakpoints used are `md` (768px) and `lg` (1024px).

## Forbidden

- Gradients of any kind
- Glassmorphism, blur backdrops
- More than two font weights in a single component
- Stock photography
- Emoji anywhere in the UI
- Carousels that auto-advance
- Modal popups on page load
- Cookie banners unless legally required
