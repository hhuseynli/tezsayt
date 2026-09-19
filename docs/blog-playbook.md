# Blog Playbook

How to add a post, the frontmatter contract, the price components, the structure
checklist, the review cadence, and the reviewBy report.

## Adding a post

1. Create a `.md` file in `content/blog/`
2. Name it with the slug: `my-post-slug.md`
3. Add frontmatter (see contract below)
4. Write the body in Markdown
5. Use `{{price:tierId}}`, `{{turnaround:tierId}}`, `{{support:serviceId}}` for figures
6. Set `draft: true` and `status: "draft"` until ready
7. Run `npm run check:blog` to validate
8. When ready: set `draft: false`, `status: "published"`
9. Build and deploy

## Frontmatter contract

```yaml
---
title: "Post title in the post's language"
slug: "transliterated-slug-no-dates"
description: "40-60 word description, self-contained"
lang: az | ru | en
translationKey: "shared-key-across-translations"
datePublished: "2026-09-19"      # YYYY-MM-DD, set once
dateModified: "2026-09-19"       # YYYY-MM-DD, update on substantive edits only
author: "Full Name"
category: "Category name"
tags: ["tag1", "tag2"]
relatedTiers: ["landing", "business"]  # from offering.ts
relatedPages: ["/services"]
heroImage: "/images/blog/slug.jpg"     # optional
heroAlt: "Description of image"        # required if heroImage set
draft: false                           # true = excluded from everything
reviewBy: "2027-03-19"                 # when to re-check facts, or null
status: "published" | "review" | "draft"
---
```

**Rules:**
- `dateModified` updates ONLY on substantive edits. Never wire to build timestamp.
- `draft: true` excludes from build output, sitemap, RSS, and index.
- `reviewBy` is the date by which the post should be re-checked for stale facts.
- Slugs: lowercase, AZ chars transliterated (ə→e, ş→sh, ç→ch, ğ→g, ö→o, ü→u, ı→i).
  No dates in slugs.
- `translationKey` must be identical across translations of the same post.

## Price interpolation components

Use these tokens in post bodies — they render as `<strong>` with the current value:

| Token | Example output (AZ) | Source |
|---|---|---|
| `{{price:landing}}` | **500 AZN-dən** | `offering.ts` tier price |
| `{{price:business}}` | **800 AZN-dən** | |
| `{{turnaround:landing}}` | **3–5 təqvim günü** | `offering.ts` tier turnaround |
| `{{turnaround:business}}` | **7–10 təqvim günü** | |
| `{{support:carePlan}}` | **100 AZN/ay** | `offering.ts` monthly service |
| `{{entryPrice}}` | **500 AZN-dən** | Lowest tier price |

**Never type a literal price, turnaround, or fee.** The build validation warns if it
finds `\d+ AZN` or `\d+ gün` outside of interpolation tokens.

Exception: market prices not ours (competitor pricing, domain costs) may be literal
but must have source attribution and a `reviewBy` date in frontmatter.

## Structure checklist

Per `content-conventions.md`:

- [ ] Opens with 40-60 word direct answer to the title question
- [ ] H1 is the buyer's real question (or close to it)
- [ ] Sub-questions as H2s
- [ ] Entities named: "Tezsayt", "Bakı" — not "we", "here"
- [ ] At least one table, list, or comparison
- [ ] Short summary of key points at the end
- [ ] Links to relevant money pages (services, contact)
- [ ] Links to 2-3 related posts (will show via frontmatter `relatedPages`)
- [ ] No value-dependent sentences ("under a week", "less than 1000")
- [ ] All AZ text checked against `style-az.md`
- [ ] New AZ strings appended to `az-review-queue.md`

## Review cadence

- **Monthly:** run `npm run check:blog` — catches stale `reviewBy` dates
- **Quarterly:** re-read each published post. Are the facts still true? Has a
  competitor changed? Has our offering changed?
- **On any offering change:** grep posts for the affected `{{token}}` — they'll
  auto-update, but check that the surrounding prose still makes sense.

## reviewBy report

Run this to see which posts need review:

```bash
npx tsx scripts/validate-blog.ts
```

Posts with passed `reviewBy` dates show as warnings.

## Pre-publish checklist

Before setting `status: "published"`:

- [ ] Opens with 40–60 word direct answer to the title question
- [ ] Title is the buyer's real question (not our vocabulary)
- [ ] Sub-questions as H2s
- [ ] Entities named: "Tezsayt", "Bakı" — not "we", "here"
- [ ] At least one table, list, or comparison where content supports it
- [ ] Internal links to relevant money pages (/services, /contact)
- [ ] Links to 2-3 related posts with descriptive anchor text
- [ ] No urgency framing ("ən yaxşı vaxt bu gündür", "gec qaldıqca rəqib öndə")
- [ ] No unsupported claims — every factual statement has a basis
- [ ] Third-party figures have named source, date, and `reviewBy` set
- [ ] Product names match `offering.ts` (Texniki dəstək planı, not Əsas/Care Plan)
- [ ] All AZ text checked against `style-az.md`
- [ ] New AZ strings appended to `az-review-queue.md`
- [ ] `reviewBy` date set (6 months from publish is default)
- [ ] Where Instagram is discussed: concede what it does well before arguing what it can't
- [ ] No "Tezsayt-ın hazırladığı hər saytda..." claims without verification

## Build checks that catch violations

1. **Unrendered tables:** build fails if `|---|` appears in rendered HTML
2. **Literal prices/durations:** warns on `\d+ AZN` or `\d+ gün` outside tokens
3. **Stale reviewBy:** warns on posts past their review date
4. **Frontmatter validity:** fails on missing/malformed required fields

## Note on legacy posts

The first four posts were written before all build checks existed. They've been
through a remediation pass (Issue 3b). Any other pre-existing post needs the same
treatment — run it through the pre-publish checklist before considering it clean.

## Seasonality

Baku SMB rhythm:
- **Ramazan** (dates vary) — traffic slows. Use for writing, not publishing.
- **July–August** — summer slowdown. Same — write, don't expect traffic.
- **September–October** — back to school, new business quarter. Best time to publish.
- **Pre-Novruz (February–March)** — businesses refreshing. Good time.

A quiet month is not failure. Six strong posts beat forty thin ones.

## Multilingual policy

- AZ first, always
- RU for commercially important posts (objection posts, pricing)
- EN only where it serves credibility
- Never auto-translate and publish
- `translationKey` links versions; hreflang only for versions that exist
- Language switcher on a post with no counterpart → blog index in that language
