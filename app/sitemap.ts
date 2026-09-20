import { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "@/lib/constants";
import { getPublishedPosts } from "@/lib/blog";

const routes = ["", "/work", "/services", "/about", "/contact", "/blog"];

// Update this date when static page content actually changes
const STATIC_LAST_MODIFIED = new Date("2026-09-20");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages with hreflang alternates + x-default
  for (const route of routes) {
    for (const locale of LOCALES) {
      const alternates: Record<string, string> = {};
      for (const altLocale of LOCALES) {
        alternates[altLocale] = `${SITE_URL}/${altLocale}${route}`;
      }
      alternates["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${route}`;
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  // Blog posts with translation-aware hreflang + x-default
  const allPosts = new Map<string, { locale: string; slug: string; dateModified: string }[]>();
  for (const locale of LOCALES) {
    const posts = await getPublishedPosts(locale);
    for (const post of posts) {
      const existing = allPosts.get(post.translationKey) || [];
      existing.push({ locale: post.lang, slug: post.slug, dateModified: post.dateModified });
      allPosts.set(post.translationKey, existing);
    }
  }

  for (const locale of LOCALES) {
    const posts = await getPublishedPosts(locale);
    for (const post of posts) {
      const translations = allPosts.get(post.translationKey) || [];
      const alternates: Record<string, string> = {};
      for (const t of translations) {
        alternates[t.locale] = `${SITE_URL}/${t.locale}/blog/${t.slug}`;
      }
      // x-default points to the az version (or first available translation)
      const defaultTranslation = translations.find((t) => t.locale === DEFAULT_LOCALE) || translations[0];
      if (defaultTranslation) {
        alternates["x-default"] = `${SITE_URL}/${defaultTranslation.locale}/blog/${defaultTranslation.slug}`;
      }
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.dateModified),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: Object.keys(alternates).length > 0 ? { languages: alternates } : undefined,
      });
    }
  }

  return entries;
}
