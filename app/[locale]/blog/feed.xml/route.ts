import { SITE_URL, AGENCY_NAME, type Locale } from "@/lib/constants";
import { getPublishedPosts } from "@/lib/blog";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const loc = locale as Locale;
  const posts = await getPublishedPosts(loc);

  const langTitles: Record<Locale, string> = {
    az: "Tezsayt Bloq",
    ru: "Блог Tezsayt",
    en: "Tezsayt Blog",
  };

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/${loc}/blog/${post.slug}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/${loc}/blog/${post.slug}</guid>
      <category>${post.category}</category>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${langTitles[loc]}</title>
    <link>${SITE_URL}/${loc}/blog</link>
    <description>${AGENCY_NAME} — Blog (${loc})</description>
    <language>${loc}</language>
    <atom:link href="${SITE_URL}/${loc}/blog/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
