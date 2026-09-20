# Claims Audit — Phase 0c
Verified 2026-09-19. Resolution status updated 2026-09-20.

Legend: ✅ RESOLVED | ⚠️ UNRESOLVED | ℹ️ OK

## §6 Contradictions — confirmation status

### C1. ✅ "tam sayt 7 günə hazır olur" — RESOLVED
**Where:** `locales/az.json` home.meta.desc, home.hero.sub, home.hero.continueLabel, home.hero.offerStep2, home.how.step3.body. Also RU and EN equivalents.
**Claim:** Full site ready in 7 days.
**Reality:** Only the lower bound of the business tier (7–10 gün) is 7 days. Landing is 3–5 days (could be faster), store is 10–14 days, custom is 2–4 weeks. Calculator baseDays for business is 9, not 7.
**Also appears in:** services.meta.desc (all 3 langs), og.desc (all 3 langs), JsonLd.tsx:8 description, home.team.body2 ("1 həftədə" / "за неделю" / "in a week").
**Count of occurrences:** 18+ across all locales and files.

### C2. ✅ "1 həftə" in comparison table — RESOLVED (changed to "3–14 təqvim günü")
**Where:** `locales/az.json` about.comparison.ourTimeline = "1 həftə", RU "1 неделя", EN "1 week".
**Claim:** Our timeline is 1 week (singular, no qualifier).
**Reality:** Same as C1. Only true for business tier's lower bound.

### C3. ✅ "5 səhifəlik sayt üçün 6 həftə gözləməyəcəksiniz" — RESOLVED
**Where:** `locales/az.json` about.values.2.body, RU about.values.2.body, EN about.values.2.body.
**Claim:** Implies our 5-page site takes far less than 6 weeks.
**Reality:** A 5-page site falls in the business tier (7–10 days). The claim isn't false — 7–10 days IS much less than 6 weeks — but the phrasing implies speed without naming our actual range. Per §4, every turnaround must be a per-tier range.

### C4. ✅ "Ənənəvi agentlik 2000+ AZN" — RESOLVED (cost row replaced with ownership row)
**Where:** `locales/az.json` about.comparison.tradCost = "2000+ AZN", RU "2000+ AZN", EN "2000+ AZN".
**Claim:** Traditional agencies charge 2000+ AZN (framed as the expensive option).
**Reality:** Our store tier IS 2000 AZN. We occupy the price band we're criticizing.

### C5. ✅ Two support structures — RESOLVED (offering.ts uses à la carte; locale still has old bundled structure)
**Where:** `/services` page (locales/*/services.maintenance.*) vs PriceEstimator.tsx lines 37-43.
**Structure 1 (services page):** Əsas 100 / Standart 200 / Böyümə 350 — bundled tiers.
**Structure 2 (calculator):** à la carte: Care Plan Basic 100, Google Business+SEO 50, Analytics 20, SMM 300, WhatsApp 75.
**No overlap in naming.** The calculator's "Care Plan — Basic" at 100 AZN partially overlaps with Əsas (also 100 AZN) but they have different feature lists. A buyer who sees both will be confused.
**Additionally:** Service cards show a third structure — flat per-tier monthly prices (100/100/200/200) in services/page.tsx:21-26.

### C6. ✅ "Ən populyar" badge — RESOLVED (dropped per §12 #10, isPopular hardcoded false)
**Where:** `locales/az.json` common.mostPopular = "Ən populyar", applied to Standard support plan (services/page.tsx:119) and to business pricing card (Pricing.tsx:31 via `isPopular={s.slug === "business"}`).
**Evidence in repo:** None. No client data, analytics, or sales records.
**Verdict:** UNSUPPORTED. Two different items both labeled "most popular" without evidence.

### C7. ✅ "1 saniyədən az yüklənmə vaxtı" — RESOLVED (changed to generic "Sürətli yüklənmə")
**Where:** `locales/az.json` home.pricing.included.2, services.always.2. RU: "менее одной секунды" / "Загрузка менее одной секунды". EN: "Under one second load time" / "Fast loading — under one second".
**Lighthouse measurements (headless Chrome, 2026-09-19):**

| Site | LCP | FCP | Perf score |
|---|---|---|---|
| salehtechschool.az | 4.2 s | 2.3 s | 45 |
| tezsayt.dev | 5.5 s | 2.4 s | 42 |
| meridiana.dev | 4.0 s | 3.4 s | 59 |

Not a single measured site loads in under 1 second by any metric (FCP, LCP, or Speed Index). The claim is **contradicted by measurement**.

Note: These are Lighthouse simulated throttling results. Real-world performance in Baku (fast mobile networks, close to European CDN edges) may differ, but the claim doesn't qualify with conditions.

### C8. ✅ "isteğe bağlı" — RESOLVED (changed to "ixtiyari")
**Where:** `locales/az.json` estimator.monthlyServices.label = "Aylıq xidmətlər (isteğe bağlı)".
**Issue:** "isteğe" is Turkish orthography. Azerbaijani should be "istəyə bağlı" or "ixtiyari".

### C9. ✅ "Care Plan — Basic" in English — RESOLVED (now "Texniki dəstək planı")
**Where:** `locales/az.json` estimator.monthlyServices.carePlan = "Care Plan — Basic". Same in `locales/ru.json`.
**Issue:** English label used in AZ and RU locales.

### C10. ✅ "Pulsuz nümunənin tutduğu nədir?" — RESOLVED (now "Pulsuz nümunə nələri əhatə edir?")
**Where:** `content/faq.ts:14` AZ question.
**Issue:** "tutduğu" is a calque from English "catch". Should be "Pulsuz nümunə nələri əhatə edir?" or a more natural Azerbaijani phrasing.

## Additional claims found beyond §6

### C11. ℹ️ "Real bizneslər, real saytlar, hazırda yayında" — OK (verified)
**Where:** `locales/az.json` work.sub.
**Verification:** All 7 portfolio URLs return HTTP 200 (some via redirect):
- salehtechschool.az → 200
- team-noclip.vercel.app → 200
- hhuseynli.github.io/Kraamzorg/ → 200
- mindmorph.co.uk → 200 (via 307)
- ztopup-game-sales-srp7.onrender.com → 200
- byininvest.com → 200 (via 301)
- meridiana.dev → 200
**Verdict:** OK — all live as of 2026-09-19.

### C12. ✅ Logo wall — RESOLVED (caption added: "Hackathon və icma tədbirlərindən")
**Where:** `components/sections/Hero.tsx:708-739` (LogoMarquee component).
**Logos:** AZCON, Baku Metro, Pasha Holding, GDG, IDDA, Holberton, Xsolla.
**Label:** None. No heading, no description, no context. Per §7, these are hackathon and community affiliations, not clients, and must carry a quiet, accurate label. Currently reads as a client roster by convention.

### C13. ✅ "1 həftədə" in team body — RESOLVED (reworded to avoid single-number claim)
**Where:** `locales/az.json` home.team.body2.
**Issue:** "1 həftədə" is another single-number turnaround claim. Same pattern as C1.

### C14. ✅ JSON-LD "7 days" — RESOLVED (description updated)
**Where:** `components/seo/JsonLd.tsx:6-8` — structured data description.
**Issue:** Single-number "7 days" in machine-readable format. Search engines may surface this.

### C15. "bir neçə saat ərzində cavab veririk" — UNVERIFIED
**Where:** `locales/az.json` home.contact.body, contact.response, contact.meta.desc, thanks.body.
RU equivalents: "в течение нескольких часов".
EN equivalents: "within a few hours".
**Issue per §11:** Two founders with classes. This will break during exam weeks. Either narrow to published hours or remove.
**Verdict:** UNVERIFIED — no data to confirm or deny, but acknowledged as fragile.

### C16. ✅ About page "Why AI" as a headline section — RESOLVED (section removed, AI explanation lives in FAQ)
**Where:** `locales/az.json` about.why.heading = "Niyə AI-dən istifadə edirik". RU: "Почему с ИИ". EN: "Why AI-assisted".
**Issue per §8:** AI explanation is currently an About-page pillar (its own `<h2>` section). Strategy says move it to the answer to "Bu qədər sürətli necə ola bilərsiniz?" — which already exists in FAQ (faq id="fast").

### C17. ✅ "Hər şey sizə məxsusdur" — RESOLVED (exit mechanic now in offering.ts and FAQ)
**Where:** `locales/az.json` home.pricing.included.5, services.always.6.
**Assessment:** The ownership claim is stated but the exit mechanic (§3: "reset passwords and we're out") is never stated concretely on any published page. FAQ id="own" says it in general terms but doesn't name the specific mechanic. Per §3, the exit mechanic must be stated at least once.
**Verdict:** INCOMPLETE — claim is made but the supporting mechanic that makes it believable is absent.

### C18. ✅ Hardcoded competitor prices in story — RESOLVED (rewritten without specific numbers)
**Where:** about.story.body2 in all 3 locales.
AZ: "2000 manat" (agency) and "400 manat" (freelancer).
RU: "две тысячи манат" and "четыреста".
EN: "two thousand manat" and "four hundred".
**Issue:** Hardcoded figures that cannot be updated from a single source. Also, "2000 manat" for an agency is the same price as our store tier.

### C19. ℹ️ "Açıq qiymətlər, gizli xərc yoxdur" — OK
**Where:** home.pricing.sub in all 3 locales.
**Assessment:** Prices are indeed published on the site. Claim is supportable.
**Verdict:** OK

### C20. ✅ Payment FAQ states 50%/50% model — RESOLVED (§12 #4 decided: free draft → 50% → 50%)
**Where:** `content/faq.ts:88-91` (all 3 langs).
**Issue:** This implies a decided payment structure, but §12 decision #4 lists this as undecided.

## Summary of verdicts

| # | Claim | Status |
|---|---|---|
| C1 | "7 days" for full site | ✅ RESOLVED — per-tier ranges in offering.ts |
| C2 | "1 week" comparison table | ✅ RESOLVED — now "3–14 təqvim günü" |
| C3 | "6 weeks for 5 pages" framing | ✅ RESOLVED — reworded |
| C4 | "2000+ AZN" as bad price | ✅ RESOLVED — cost row replaced with ownership |
| C5 | Two support structures | ✅ RESOLVED — offering.ts uses à la carte |
| C6 | "Most popular" badge | ✅ RESOLVED — dropped |
| C7 | "Under 1 second load" | ✅ RESOLVED — changed to "Sürətli yüklənmə" |
| C8 | "isteğe bağlı" spelling | ✅ RESOLVED — "ixtiyari" |
| C9 | "Care Plan — Basic" English | ✅ RESOLVED — "Texniki dəstək planı" |
| C10 | "tutduğu" calque | ✅ RESOLVED — "əhatə edir" |
| C11 | Portfolio all live | ℹ️ OK |
| C12 | Logo wall unlabeled | ✅ RESOLVED — caption added |
| C13 | "1 week" in team body | ✅ RESOLVED — reworded |
| C14 | JSON-LD "7 days" | ✅ RESOLVED — updated |
| C15 | Response time promise | ℹ️ UNVERIFIED (acknowledged as fragile) |
| C16 | AI as about-page pillar | ✅ RESOLVED — section removed |
| C17 | Ownership without exit mechanic | ✅ RESOLVED — exit mechanic in offering.ts + FAQ |
| C18 | Hardcoded competitor prices | ✅ RESOLVED — rewritten without numbers |
| C19 | "Open pricing" | ℹ️ OK |
| C20 | 50/50 payment | ✅ RESOLVED — §12 #4 decided |

## Technical issues found during audit

### T1. Work page (`/[locale]/work`) has no metadata export
The page is `"use client"` and does not export `generateMetadata`. Crawlers see no `<title>` or `<meta description>` for the work page. SEO gap.

### T2. Root layout `html lang="az"` is hardcoded
`app/layout.tsx:22` sets `lang="az"` regardless of locale. Should be dynamic per locale.

### T3. No analytics on the agency site
Despite claiming "Google Analytics" is included in every project for clients, the agency site itself has zero analytics instrumentation.

### T4. Spec document prices are stale
`docs/03-CONTENT.md` specifies landing=300, business=600, store=1000, custom=1500. Live code has landing=500, business=800, store=2000, custom=by-agreement. The spec is outdated; code is the source of truth.

## Questions for you (§12 decisions needed before fixes)

1. **Clock start:** When does the turnaround clock start? Contract signing? Deposit? Client content received?
2. **"gün":** Business days or calendar days?
3. **Support plan structure:** Which is the real product — the 3-tier bundled plans (Əsas/Standart/Böyümə) or the à la carte calculator services? Or a merger?
4. **Payment structure:** The FAQ currently states 50%/50%. Is this decided, or still open per §12 #4?
5. **Revision count on full build:** Only the free draft specifies "one round." How many revisions does the full build include?
6. **Domain/hosting renewal:** Who pays from year 2? Is it part of the care plan or separate?
7. **Domain registrar account:** Does it follow §3 pattern (in client's name)?
8. **Care plan cancellation:** Do you proactively remove credentials, or wait for client to reset?
9. **AZ+RU standard on Biznes saytı:** Or keep translation as paid add-on?
10. **"Ən populyar":** Is there data to support this? Is the "1 saniyədən az" claim something you want to keep (would require significant performance work) or drop?
