import { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/lib/constants";
import { getPublishedPosts } from "@/lib/blog";

const routes = ["", "/work", "/services", "/about", "/contact", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }

    // Add individual blog posts
    const posts = await getPublishedPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.dateModified),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
