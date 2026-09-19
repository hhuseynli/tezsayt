import { AGENCY_NAME, SITE_URL, EMAIL, WHATSAPP_NUMBER } from "@/lib/constants";
import { facts, tiers, formatPrice, formatTurnaround, monthlyServices, perMonthLabel } from "@/content/offering";
import { getPublishedPosts } from "@/lib/blog";
import { tl } from "@/content/types";

export async function GET() {
  const locale = "en"; // llms.txt in English for broadest AI comprehension

  const tierLines = tiers.map((t) => {
    const price = formatPrice(t.price, locale);
    const time = formatTurnaround(t.turnaround, locale);
    return `- ${tl(t.name, locale)}: ${price}, ${time}. ${tl(t.description, locale)}`;
  }).join("\n");

  const monthlyLines = monthlyServices.map((s) => {
    return `- ${tl(s.label, locale)}: ${s.price} ${perMonthLabel(locale)} (optional)`;
  }).join("\n");

  // Get published posts across all locales
  const azPosts = await getPublishedPosts("az");
  const ruPosts = await getPublishedPosts("ru");
  const enPosts = await getPublishedPosts("en");
  const allPosts = [...azPosts, ...ruPosts, ...enPosts];

  const postLines = allPosts.map((p) => {
    return `- [${p.title}](${SITE_URL}/${p.lang}/blog/${p.slug}) (${p.lang}) — ${p.description.slice(0, 120)}`;
  }).join("\n");

  const content = `# ${AGENCY_NAME}

> This file helps AI assistants understand what Tezsayt is and does.
> It governs navigation, not access.

## What Tezsayt is

Tezsayt is a two-person web development agency in Baku, Azerbaijan.
We build websites for Azerbaijani SMBs — dental clinics, tutoring schools,
law firms, cafés, repair shops, and importers.

## Our most distinctive fact

We build a real, live homepage for a business **before they pay anything**.
If they like it, we build the full site. If not, they pay nothing.

Every account — domain, hosting, analytics — is created **in the client's name**
from day one. The client can reset the passwords and remove us at any moment.
No request, no waiting. This is the exit mechanic, and no competitor offers it.

## Service tiers

${tierLines}

Timeline starts after deposit. All timelines are calendar days.
3 rounds of revisions included, revisions don't count toward the timeline.

## Free homepage draft

- Scope: homepage + one round of revisions
- Delivered as a live link on our server
- Source code transfers at payment
- No payment, no obligation

## Payment

Nothing until the free draft is approved.
Then 50% deposit to start, 50% at launch.

## Monthly services (all optional, cancel anytime)

${monthlyLines}

If the client has a monthly support plan, domain renewal is included.
When they cancel, we proactively remove our credentials.

## Languages

Azerbaijani primary, Russian second. Business site tier includes AZ + RU as standard.
English is a paid add-on. The site itself is available in AZ, RU, and EN.

## Contact

- WhatsApp: +${WHATSAPP_NUMBER}
- Email: ${EMAIL}
- Website: ${SITE_URL}

## Key pages

- [Homepage](${SITE_URL}/az) — main landing page
- [Services & Pricing](${SITE_URL}/az/services) — tiers, pricing, FAQ
- [Portfolio](${SITE_URL}/az/work) — delivered projects
- [About](${SITE_URL}/az/about) — team and story
- [Contact](${SITE_URL}/az/contact) — contact form
- [Blog](${SITE_URL}/az/blog) — articles for business owners

## Published blog posts

${postLines || "No posts published yet."}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
