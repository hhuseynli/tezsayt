/**
 * Blog content loader — reads markdown files from content/blog/,
 * parses frontmatter with gray-matter, validates, and renders HTML.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { Locale } from "./constants";
import type { TierId } from "@/content/offering";

// ─── Frontmatter schema ─────────────────────────────────────────────────────

export type PostStatus = "published" | "review" | "draft";

export type PostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  lang: Locale;
  translationKey: string;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  author: string;
  category: string;
  tags: string[];
  relatedTiers: TierId[];
  relatedPages: string[];
  heroImage: string;
  heroAlt: string;
  draft: boolean;
  reviewBy: string | null; // ISO date or null
  status: PostStatus;
};

export type Post = PostFrontmatter & {
  content: string; // raw markdown
  html: string; // rendered HTML
  filePath: string;
};

// ─── Transliteration for slugs ──────────────────────────────────────────────

const AZ_CHAR_MAP: Record<string, string> = {
  ə: "e",
  ı: "i",
  ğ: "g",
  ş: "sh",
  ç: "ch",
  ö: "o",
  ü: "u",
  Ə: "e",
  I: "i",
  Ğ: "g",
  Ş: "sh",
  Ç: "ch",
  Ö: "o",
  Ü: "u",
};

export function transliterateSlug(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((ch) => AZ_CHAR_MAP[ch] || ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Content directory ──────────────────────────────────────────────────────

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// ─── Validation ─────────────────────────────────────────────────────────────

const REQUIRED_FIELDS: (keyof PostFrontmatter)[] = [
  "title",
  "slug",
  "description",
  "lang",
  "translationKey",
  "datePublished",
  "dateModified",
  "author",
  "category",
  "tags",
  "relatedTiers",
  "draft",
  "status",
];

const VALID_LOCALES = ["az", "ru", "en"];
const VALID_TIERS: TierId[] = ["landing", "business", "store", "custom"];
const VALID_STATUSES: PostStatus[] = ["published", "review", "draft"];

function validateFrontmatter(data: Record<string, unknown>, filePath: string): PostFrontmatter {
  const errors: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (data.lang && !VALID_LOCALES.includes(data.lang as string)) {
    errors.push(`Invalid lang: ${data.lang}. Must be one of: ${VALID_LOCALES.join(", ")}`);
  }

  if (data.status && !VALID_STATUSES.includes(data.status as PostStatus)) {
    errors.push(`Invalid status: ${data.status}. Must be one of: ${VALID_STATUSES.join(", ")}`);
  }

  if (Array.isArray(data.relatedTiers)) {
    for (const tier of data.relatedTiers) {
      if (!VALID_TIERS.includes(tier as TierId)) {
        errors.push(`Invalid relatedTier: ${tier}. Must be one of: ${VALID_TIERS.join(", ")}`);
      }
    }
  }

  if (data.datePublished && !/^\d{4}-\d{2}-\d{2}$/.test(data.datePublished as string)) {
    errors.push(`datePublished must be YYYY-MM-DD format, got: ${data.datePublished}`);
  }

  if (data.dateModified && !/^\d{4}-\d{2}-\d{2}$/.test(data.dateModified as string)) {
    errors.push(`dateModified must be YYYY-MM-DD format, got: ${data.dateModified}`);
  }

  if (errors.length > 0) {
    throw new Error(`Blog post validation failed (${filePath}):\n  ${errors.join("\n  ")}`);
  }

  return {
    title: data.title as string,
    slug: data.slug as string,
    description: data.description as string,
    lang: data.lang as Locale,
    translationKey: data.translationKey as string,
    datePublished: data.datePublished as string,
    dateModified: data.dateModified as string,
    author: data.author as string,
    category: data.category as string,
    tags: (data.tags as string[]) || [],
    relatedTiers: (data.relatedTiers as TierId[]) || [],
    relatedPages: (data.relatedPages as string[]) || [],
    heroImage: (data.heroImage as string) || "",
    heroAlt: (data.heroAlt as string) || "",
    draft: data.draft as boolean,
    reviewBy: (data.reviewBy as string) || null,
    status: data.status as PostStatus,
  };
}

// ─── Literal price/duration check ───────────────────────────────────────────
// Warns if post body contains hardcoded currency amounts or day/week counts.

const PRICE_PATTERN = /\b\d+\s*(AZN|manat|₼)\b/i;
const DURATION_PATTERN = /\b\d+\s*(gün|günə|günlük|həftə|дней|дня|день|недел|days?|weeks?)\b/i;

export function checkForLiteralValues(content: string, filePath: string): string[] {
  const warnings: string[] = [];
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip HTML comments and component tags (interpolation components are OK)
    if (line.trim().startsWith("<!--") || line.trim().startsWith("<Price") || line.trim().startsWith("<Turnaround") || line.trim().startsWith("<SupportFee")) continue;
    if (PRICE_PATTERN.test(line)) {
      warnings.push(`${filePath}:${i + 1}: Literal price found: "${line.trim()}"`);
    }
    if (DURATION_PATTERN.test(line)) {
      warnings.push(`${filePath}:${i + 1}: Literal duration found: "${line.trim()}"`);
    }
  }
  return warnings;
}

// ─── Loading ────────────────────────────────────────────────────────────────

async function renderMarkdown(content: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(content);
  return result.toString();
}

function getAllPostFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(BLOG_DIR, f));
}

export async function getPost(filePath: string): Promise<Post> {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = validateFrontmatter(data, filePath);
  const html = await renderMarkdown(content);
  return { ...frontmatter, content, html, filePath };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = getAllPostFiles();
  const posts: Post[] = [];
  for (const f of files) {
    const post = await getPost(f);
    posts.push(post);
  }
  return posts;
}

/** Published posts for a given locale, sorted by date descending */
export async function getPublishedPosts(locale: Locale): Promise<Post[]> {
  const all = await getAllPosts();
  return all
    .filter((p) => p.lang === locale && !p.draft && p.status === "published")
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

/** Get post by slug and locale */
export async function getPostBySlug(slug: string, locale: Locale): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug && p.lang === locale && !p.draft) || null;
}

/** Get translations of a post by translationKey */
export async function getTranslations(translationKey: string): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.translationKey === translationKey && !p.draft && p.status === "published");
}

/** Get related posts by tags, excluding the current post */
export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const published = await getPublishedPosts(post.lang);
  return published
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, limit);
}

/** Get all unique categories for a locale */
export async function getCategories(locale: Locale): Promise<string[]> {
  const posts = await getPublishedPosts(locale);
  return [...new Set(posts.map((p) => p.category))];
}

/** Paginate posts */
export function paginatePosts(posts: Post[], page: number, perPage = 10): { posts: Post[]; totalPages: number } {
  const totalPages = Math.ceil(posts.length / perPage);
  const start = (page - 1) * perPage;
  return { posts: posts.slice(start, start + perPage), totalPages };
}
