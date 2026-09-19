# SEO & GEO Playbook

Written for the business owner, not a developer. What's automated, what you maintain
by hand, and what to do when things change.

## What's automated (happens on every build)

| What | How it works |
|---|---|
| Sitemap | Generated from routes + published blog posts. Includes hreflang. |
| robots.txt | Allows search engines + AI search bots. Blocks AI training bots. |
| Structured data (JSON-LD) | Organization, WebSite, ProfessionalService, OfferCatalog, FAQPage, BlogPosting, BreadcrumbList — all generated from offering.ts and content files. |
| llms.txt | Generated from offering.ts + blog post index. Gives AI assistants our key facts. |
| Meta titles & descriptions | Per-page, per-language, from locale files. |
| hreflang tags | Per-page, per-language, with x-default on Azerbaijani. |
| Price interpolation | Blog posts use `{{price:tier}}` tokens — prices auto-update on rebuild. |
| Drift check | `npx tsx scripts/check-drift.ts` finds hardcoded prices/durations outside offering.ts. |

## What you do when X changes

| Change | What to do |
|---|---|
| **Price change** | Edit `content/offering.ts` → change the `amount` field → rebuild → run `npx tsx scripts/check-drift.ts` → deploy. Everything updates: site, blog, JSON-LD, llms.txt. |
| **New tier** | Add to `tiers` array in `content/offering.ts` → update relevant locale files → rebuild. |
| **Turnaround change** | Edit the `range` in `content/offering.ts` → rebuild. |
| **New blog post** | Create `.md` in `content/blog/` → follow `blog-playbook.md` → set `draft: false, status: "published"` → rebuild. |
| **New monthly service** | Add to `monthlyServices` in `content/offering.ts` → rebuild. |
| **New language for a post** | Create translation with same `translationKey` → hreflang auto-links. |
| **Remove a service** | Remove from `offering.ts` → rebuild → check for broken `{{tokens}}` in blog posts. |

## What you maintain by hand

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://tezsayt.dev`
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: `https://tezsayt.dev/sitemap.xml`
5. Check monthly for crawl errors, indexing issues

### Bing Webmaster Tools
1. Go to https://www.bing.com/webmasters
2. Import from Google Search Console (easiest)
3. Submit sitemap

### Yandex Webmaster
1. Go to https://webmaster.yandex.com
2. Add site, verify via DNS
3. Submit sitemap
4. Important for Russian-language traffic from Baku

### Google Business Profile
1. Create/claim profile at https://business.google.com
2. Business name: Tezsayt
3. Category: Web Designer / Web Development
4. Address: your Baku address
5. Phone: +994993600545
6. Website: https://tezsayt.dev/az
7. Add photos, hours, description in AZ and RU
8. **NAP consistency**: same name, address, phone everywhere

### Directory listings
Create consistent listings on:
- lalafo.az — IT xidmətlər category
- xidmetler.az — web development
- tezbazar.az — if relevant

All must link back to https://tezsayt.dev and use the same phone/address.

## Monthly checklist

- [ ] Run `npx tsx scripts/check-drift.ts` — check for stale prices
- [ ] Run `npx tsx scripts/validate-blog.ts` — check reviewBy dates
- [ ] Check Google Search Console for crawl errors
- [ ] Check Google Business reviews — respond to all
- [ ] Prompt test: ask ChatGPT, Perplexity, and Gemini in Azerbaijani:
  - "Bakıda sayt hazırlayan kim var?"
  - "Bakıda biznes üçün sayt neçəyədir?"
  - "Bakıda pulsuz sayt nümunəsi verən var?"
- [ ] Same in Russian:
  - "Кто делает сайты в Баку?"
  - "Сколько стоит сайт для бизнеса в Баку?"
- [ ] Note whether Tezsayt appears in any AI responses
- [ ] Review blog post analytics — which posts get traffic?

## AI crawler policy (current)

**Policy B: Allow AI search, block AI training.**

- Allowed: Googlebot, Bingbot, YandexBot, ChatGPT-User, PerplexityBot, Google-Extended
- Blocked: GPTBot (training), CCBot (Common Crawl/training), anthropic-ai, Claude-Web, Bytespider, cohere-ai

This means the blog is citable by AI search tools (ChatGPT, Perplexity, Gemini) but
not used for training datasets. The blog is the asset most likely to be cited — blocking
search crawlers would waste the blog investment.

**Note:** Vercel doesn't silently override robots.txt. The policy is enforced as written.
To change: edit `app/robots.ts`.

## llms.txt

Available at `/llms.txt`. Generated from offering.ts + blog index. Contains:
- What Tezsayt is
- The free homepage offer
- Tiers with prices
- The ownership/exit mechanic
- Monthly services
- Published blog post links

This file helps AI assistants give accurate answers about Tezsayt. It governs
navigation (what to link to), not access (what to crawl).
