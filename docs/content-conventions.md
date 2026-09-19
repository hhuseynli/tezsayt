# Content Conventions

Adopted at Phase 1 of Issue 1. All copy written or edited after this point follows
these rules. Issue 2 (AZ review), Issue 3 (blog), and Issue 4 (SEO/AISO) inherit them.

## 1. Lead with a direct answer

Every key section opens with a self-contained answer of 40-60 words that makes sense
if extracted with zero surrounding context. It must still name "Tezsayt" and "Baku" or
"Azerbaijan" where relevant — never rely on the page around it.

Then elaborate.

## 2. Headings are buyer questions

Section headings are the real questions a buyer in Baku would ask, in the real
language, verbatim. Not marketing phrases, not clever wordplay. Examples:

- "Bakıda sayt neçəyə başa gəlir?"
- "Saytı gördükdən sonra bəyənməsəm nə olur?"
- "Domen və hostinq kimin adınadır?"

## 3. Entities explicit at section starts

First mention in each section: "Tezsayt" not "we", "Bakı" not "here", "Azərbaycan"
not "the country." After the first sentence, pronouns are fine.

## 4. Figures interpolated, never typed

Every price, turnaround, fee, page count, and revision count is read from
`content/offering.ts` at build time or render time. No locale file, component, meta
tag, or schema may contain a literal commercial figure.

Helpers: `formatPrice()`, `formatTurnaround()`, `formatTurnaroundShort()`, `fromLabel()`,
`perMonthLabel()` — all in `content/offering.ts`.

## 5. No value-dependent sentences

No sentence may depend on a specific numeric value. Test: could the sentence survive
a 30% price change without becoming false?

Bad: "Under a week" (breaks if turnaround changes to 10-14 days)
Bad: "Less than 1000 AZN" (breaks if price rises)
Good: "Turnaround depends on your tier — see the range below."
Good: Use the formatted value inline: `{formatTurnaroundShort(tier.turnaround, locale)}`

## 6. One H1 per page, logical nesting

Each page has exactly one `<h1>`. Sections use `<h2>`. Subsections use `<h3>`. Never
skip levels. Screen readers and crawlers depend on this hierarchy.

## 7. Turnaround always as a range

Never state a single-number turnaround for the whole business. Always:
- Name the tier
- State its range (from `offering.ts`)
- Include the clock-start condition at least once per page
- Include the day-type (calendar days) at least once per page

## 8. Optionality must be unmistakable

Wherever a recurring fee appears, the word "ixtiyari" / "по желанию" / "optional" must
be visible in the same visual context. The care plan is never the default next step —
it is one option alongside "pay per change" or "do it yourself."

## 9. Ownership copy rules (from strategy §3)

- Never describe our access as administration, management, or control.
- State the exit mechanic concretely at least once per page where ownership is
  mentioned: use `facts.ownership.exitMechanic` from offering.ts.
- The care plan is sold on response speed and convenience, never on holding keys.

## 10. No fabrication

No invented ratings, testimonials, project counts, client names, statistics, or dates.
If a fact is unknown, omit it — never fill with a vague adjective.

## 11. AZ review queue

Every new or edited Azerbaijani string is appended to `docs/az-review-queue.md` with
its file path. Issue 2 (idiomatic AZ) works from this queue.
