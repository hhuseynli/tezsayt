# Offering Findings — Phase 0b
Extracted 2026-09-19. Every published commercial fact, with file path and language.

## Tier summary

| ID | Display name (AZ / RU / EN) | Price | Price type | Turnaround | Recurring fee | Audience |
|---|---|---|---|---|---|---|
| landing | Vizitkart (tək səhifəlik) / Лендинг / Landing page | 500 AZN | from | 3–5 gün / 3–5 дней / 3–5 days | 100 AZN/ay | Yeni bizneslər, məhsul təqdimatları, tədbirlər, tək xidmət |
| business | Biznes saytı / Бизнес-сайт / Business site | 800 AZN | from | 7–10 gün / 7–10 дней / 7–10 days | 100 AZN/ay | Klinikalar, hüquq firmaları, konsaltinqlər, məktəblər, xidmət biznesləri |
| store | Onlayn mağaza / Интернет-магазин / Online store | 2000 AZN | from | 10–14 gün / 10–14 дней / 10–14 days | 200 AZN/ay | Pərakəndə, topdan satış, məhsul brendləri |
| custom | Xüsusi alət / Кастомный инструмент / Custom tool | N/A | negotiable | 2–4 həftə / 2–4 недели / 2–4 weeks | 200 AZN/ay | Xüsusi iş axınları olan bizneslər |

Sources: `content/services.ts` (lines 14–103), `components/sections/PriceEstimator.tsx` (lines 14–16).

## All published figures with file paths

### One-time prices

| Figure | Where | Language | Context |
|---|---|---|---|
| 500 AZN | `content/services.ts:34` | all | Landing priceFrom |
| 800 AZN | `content/services.ts:56` | all | Business priceFrom |
| 2000 AZN | `content/services.ts:78` | all | Store priceFrom |
| 500 AZN-dən başlayır | `locales/az.json` home.meta.desc | AZ | Meta description |
| От 500 AZN | `locales/ru.json` home.meta.desc | RU | Meta description |
| From 500 AZN | `locales/en.json` home.meta.desc | EN | Meta description |
| 500 AZN-dən | `locales/az.json` about.comparison.ourCost | AZ | Comparison table |
| от 500 AZN | `locales/ru.json` about.comparison.ourCost | RU | Comparison table |
| from 500 AZN | `locales/en.json` about.comparison.ourCost | EN | Comparison table |
| 2000+ AZN | `locales/az.json` about.comparison.tradCost | AZ | Competitor price anchor |
| 2000+ AZN | `locales/ru.json` about.comparison.tradCost | RU | Competitor price anchor |
| 2000+ AZN | `locales/en.json` about.comparison.tradCost | EN | Competitor price anchor |
| 500-5000 AZN | `components/seo/JsonLd.tsx:29` | all | Schema.org priceRange |
| 0 AZN | `components/seo/JsonLd.tsx:39` | all | Free homepage offer price |

### Calculator prices (PriceEstimator.tsx)

| Figure | Line | Context |
|---|---|---|
| landing: 500, business: 800, store: 2000, custom: null | 14 | basePrice |
| Extra page: 50 AZN | 77 | Per additional page |
| Extra language: 150 AZN | 79 | Per additional language |
| booking: 200, payments: 300, blog: 150, admin: 400 | 18 | Feature add-ons |
| translation: 12/page, copywriting: 35/page | 28-30 | Per-page add-ons |
| whatsappBot: 400, adsSetup: 300 | 31-32 | Flat add-ons |

### Turnaround times

| Figure | Where | Language | Context |
|---|---|---|---|
| 3–5 gün | `content/services.ts:33` | AZ | Landing tier |
| 7–10 gün | `content/services.ts:55` | AZ | Business tier |
| 10–14 gün | `content/services.ts:77` | AZ | Store tier |
| 2–4 həftə | `content/services.ts:99` | AZ | Custom tier |
| **7 günə hazır olur** | `locales/az.json` home.meta.desc | AZ | Meta description — SINGLE NUMBER |
| **за 7 дней** | `locales/ru.json` home.meta.desc | RU | Meta description — SINGLE NUMBER |
| **in seven days** | `locales/en.json` home.meta.desc | EN | Meta description — SINGLE NUMBER |
| **tam sayt 7 günə hazır olur** | `locales/az.json` home.hero.sub | AZ | Hero subtitle — SINGLE NUMBER |
| **полный сайт за 7 дней** | `locales/ru.json` home.hero.sub | RU | Hero subtitle — SINGLE NUMBER |
| **full site in 7 days** | `locales/en.json` home.hero.sub | EN | Hero subtitle — SINGLE NUMBER |
| **Tam saytı hazırla — 7 gün** | `locales/az.json` home.hero.continueLabel | AZ | CTA button — SINGLE NUMBER |
| **Собрать полный сайт — 7 дней** | `locales/ru.json` home.hero.continueLabel | RU | CTA button — SINGLE NUMBER |
| **Build the full site — 7 days** | `locales/en.json` home.hero.continueLabel | EN | CTA button — SINGLE NUMBER |
| **Tam saytı 7 günə hazırlayırıq** | `locales/az.json` home.hero.offerStep2 | AZ | Offer step — SINGLE NUMBER |
| **Соберём полный сайт за 7 дней** | `locales/ru.json` home.hero.offerStep2 | RU | Offer step — SINGLE NUMBER |
| **Build the full site in 7 days** | `locales/en.json` home.hero.offerStep2 | EN | Offer step — SINGLE NUMBER |
| **qalanını 7 günə hazırlayırıq** | `locales/az.json` home.how.step3.body | AZ | How it works step 3 |
| **за семь дней** | `locales/ru.json` home.how.step3.body | RU | How it works step 3 |
| **in seven days** | `locales/en.json` home.how.step3.body | EN | How it works step 3 |
| **1 həftə** | `locales/az.json` about.comparison.ourTimeline | AZ | Comparison table |
| **1 неделя** | `locales/ru.json` about.comparison.ourTimeline | RU | Comparison table |
| **1 week** | `locales/en.json` about.comparison.ourTimeline | EN | Comparison table |
| 6–8 həftə | `locales/az.json` about.comparison.tradTimeline | AZ | Competitor timeline |
| 6–8 недель | `locales/ru.json` about.comparison.tradTimeline | RU | Competitor timeline |
| 6–8 weeks | `locales/en.json` about.comparison.tradTimeline | EN | Competitor timeline |
| 3 gün (free draft) | `locales/az.json` home.how.time2 | AZ | HowItWorks tab |
| baseDays: landing 4, business 9, store 12, custom 21 | `PriceEstimator.tsx:16` | code | Calculator base days |
| **Ready in 7 days** | `components/seo/JsonLd.tsx:8` | all | Schema.org description |

### Support / care plans

#### STRUCTURE 1: /services page care plans (locales/*.json under `services.maintenance`)
| Tier | AZ name | RU name | EN name | Price |
|---|---|---|---|---|
| basic | Əsas | Базовый | Basic | 100 AZN/ay |
| standard | Standart | Стандарт | Standard | 200 AZN/ay |
| growth | Böyümə | Рост | Growth | 350 AZN/ay |

Features per tier:
- Basic: Hosting/domain management, security patches, monthly backup
- Standard: Basic + content updates (2 hrs/mo), monthly analytics report
- Growth: Standard + small feature additions, priority support

"Ən populyar" / "Самый популярный" / "Most popular" badge on Standard tier.

#### STRUCTURE 2: Calculator monthly services (PriceEstimator.tsx lines 37-43)
| Service | AZ name | RU name | EN name | Price |
|---|---|---|---|---|
| carePlan | Care Plan — Basic | Care Plan — Basic | Care Plan — Basic | 100 AZN/ay |
| gbpSeo | Google Business + Local SEO | Google Business + Local SEO | Google Business + Local SEO | 50 AZN/ay |
| analyticsReport | Aylıq analitika hesabatı | Ежемесячный отчёт аналитики | Monthly analytics report | 20 AZN/ay |
| smmContent | SMM (kontent, fotosuz) | SMM (контент, без фото) | SMM (content only, no photos) | 300 AZN/ay |
| whatsappUpkeep | WhatsApp bot dəstəyi | Поддержка WhatsApp бота | WhatsApp bot support | 75 AZN/ay |

#### STRUCTURE 3: Service card support upsell (services/page.tsx lines 21-26)
Per-tier monthly support: landing 100, business 100, store 200, custom 200

### Other commercial facts

| Fact | Where | Language |
|---|---|---|
| 30 gün pulsuz dəstək | `locales/az.json` services.always.5, faq changes answer | AZ |
| 1 saniyədən az yüklənmə vaxtı | `locales/az.json` home.pricing.included.2, services.always.2 | AZ |
| Payment: 50%/50% | `content/faq.ts:88-91` (all 3 langs) | all |
| Free draft scope: homepage + 1 revision | `locales/az.json` home.how.fineprint | all |
| "bir neçə saat ərzində cavab veririk" | `locales/az.json` home.contact.body, contact.response, contact.meta.desc, thanks.body | AZ |
| AZ/RU/EN languages standard | `content/faq.ts:117` | all |
| Translation add-on: 12 AZN/page | `PriceEstimator.tsx:29` | code |
| Copywriting: 35 AZN/page | `PriceEstimator.tsx:30` | code |

## DISCREPANCIES

### D1. Turnaround: "7 days" everywhere vs per-tier ranges in content/services.ts
The hero, meta descriptions, CTAs, offer steps, HowItWorks step 3, about comparison table, and JSON-LD all say "7 days" or "1 week" — a single number for all project types. But the actual tier data says 3–5 days (landing), 7–10 days (business), 10–14 days (store), 2–4 weeks (custom). The "7 days" claim is only true for the lower end of the business tier and impossible for store/custom.

**Also:** The calculator uses `baseDays` of 4/9/12/21 — yet another set of numbers. The calculator's "business" base is 9 days, not "7". Adding pages, languages, or features pushes it higher.

### D2. Two incompatible support plan structures
Structure 1 (services page): Əsas (100) / Standart (200) / Böyümə (350) — bundled tiers with increasing features.
Structure 2 (calculator): à la carte services — Care Plan Basic (100) + Google Business (50) + Analytics (20) + SMM (300) + WhatsApp (75).
These are fundamentally different products. A buyer who picks Standart on the services page expects content updates for 200/mo. A buyer who uses the calculator sees "Care Plan — Basic" at 100 with a separate analytics report at 20. They will not reconcile.

### D3. "Ən populyar" badge on Standart — also on Biznes saytı pricing card
Both the support plan (standard tier) and the pricing card (business tier) carry an "Ən populyar" / "Most popular" badge (via `isPopular={s.slug === "business"}` in Pricing.tsx:31 and `i === 1` in services/page.tsx:119). Two different things are labeled "most popular" on the same site.

### D4. Support line pricing mismatch
Service cards show support at 100 AZN/mo for landing and business, 200 for store and custom (services/page.tsx:21-26). But the care plan tiers are 100/200/350. The "100 AZN/ay" support line on a business card links conceptually to the Əsas plan but doesn't say that. The "200 AZN/ay" support line on store matches Standart by price but not by name.

### D5. "Care Plan — Basic" in English across all languages
The calculator label `estimator.monthlyServices.carePlan` is "Care Plan — Basic" in AZ, RU, and EN locales. This is English in the AZ and RU versions. (§6 C9)

### D6. "isteğe bağlı" — Turkish orthography
`locales/az.json` estimator.monthlyServices.label: "Aylıq xidmətlər (isteğe bağlı)". Should be "istəyə bağlı" or "ixtiyari". (§6 C8)

### D7. "Pulsuz nümunənin tutduğu nədir?" — calque
`content/faq.ts:14` AZ question. "tutduğu" is a calque. Should be "Pulsuz nümunə nələri əhatə edir?" or similar. (§6 C10)

### D8. Competitor price anchor matches our tier
About comparison: "Ənənəvi agentlik 2000+ AZN" vs "Tezsayt 500 AZN-dən". But our store tier IS 2000 AZN. We're criticizing a price band we charge. (§6 C4)

### D9. Story body hardcodes figures
`locales/az.json` about.story.body2: "2000 manat" and "400 manat" as competitor/freelancer prices. These are hardcoded prose, not interpolated. If our prices change, these comparisons become confusing.
`locales/ru.json` about.story.body2: "две тысячи манат" and "четыреста" — same.
`locales/en.json` about.story.body2: "two thousand manat" and "four hundred" — same.

### D10. "5 səhifəlik sayt üçün 6 həftə gözləməyəcəksiniz"
`locales/az.json` about.values.2.body: Claims you won't wait 6 weeks for a 5-page site. But a 5-page site is the business tier (7–10 days), and the text implies delivery far under that. (§6 C3)
RU: "6 недель за 5-страничный сайт"
EN: "6 weeks for a 5-page site"

### D11. Homepage meta desc on /services also says "7 günə"
`locales/az.json` services.meta.desc: "500 AZN-dən başlayan vebsaytlar, 7 günə hazır olur."
`locales/ru.json` services.meta.desc: "Сайты от 500 AZN, готовы за семь дней."
`locales/en.json` services.meta.desc: "Websites from 500 AZN, delivered in seven days."

### D12. Team section body hardcodes "1 həftə"
`locales/az.json` home.team.body2: "1 həftədə təhvil verə bilirik" — single number.
`locales/ru.json` home.team.body2: "за неделю" — single number.
`locales/en.json` home.team.body2: "in a week" — single number.

## AMBIGUITIES

### A1. Support plan optionality
The care plans (Structure 1) have no explicit "optional" marker anywhere in code or locale files. The FAQ says "ixtiyari aylıq xidmət planı" (optional monthly plan). The calculator header says "isteğe bağlı" (optional). But the /services page presents the three tiers without any "optional" language — it reads as an expected next step after 30 days.

### A2. What starts the clock?
No mention anywhere of when the timeline starts (contract, deposit, content received). This is §12 decision #1.

### A3. "gün" — business or calendar days?
Not specified anywhere. §12 decision #2.

### A4. Payment structure
FAQ says 50%/50% but this conflicts with potential "pay on completion" model. §12 decision #4.

### A5. Revision count for full build
Only the free draft's "one round" is stated. Full build revision policy is never mentioned. §12 decision #5.

### A6. Domain/hosting renewal — who pays from year 2?
Not stated. §12 decision #6.

## MISSING FACTS a buyer needs

1. **Exit mechanic** — The §3 ownership claim is stated in FAQ but never with the concrete exit mechanic ("reset the passwords and we're out"). Ownership section doesn't exist as a standalone.
2. **What happens if I cancel the care plan?** — Not addressed.
3. **Revision policy on full build** — Only free draft says "one round". Full build revisions are undefined.
4. **Domain registrar ownership** — FAQ says "sizin adınıza" but doesn't specify whether the registrar account itself is in the client's name.
5. **Hosting provider** — Never named or explained.
6. **Source code delivery format** — "Kod sizə təhvil verilir" but how? GitHub repo? ZIP?
7. **What exactly is included in the free 30-day support?** — FAQ says "real changes, not just bug fixes" but no scope limit.
8. **Response time SLA** — "bir neçə saat" is vague and acknowledged as unreliable in §11.
