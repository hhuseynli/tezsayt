import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SITE_URL, type Locale } from "@/lib/constants";
import { getDictionary, t } from "@/lib/i18n";
import { getPostBySlug, getPublishedPosts, getTranslations, getRelatedPosts } from "@/lib/blog";
import { interpolatePriceTokens } from "@/components/blog/PriceTag";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { waLink } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/blog");
  const posts = await getAllPosts();
  return posts
    .filter((p) => !p.draft && p.status === "published")
    .map((p) => ({ locale: p.lang, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale as Locale);
  if (!post) return {};

  const translations = await getTranslations(post.translationKey);
  const alternates: Record<string, string> = {};
  for (const t of translations) {
    alternates[t.lang] = `${SITE_URL}/${t.lang}/blog/${t.slug}`;
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { languages: alternates },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      ...(post.heroImage ? { images: [{ url: post.heroImage }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const post = await getPostBySlug(slug, loc);
  if (!post) notFound();

  const dict = await getDictionary(loc);
  const translations = await getTranslations(post.translationKey);
  const related = await getRelatedPosts(post);
  const html = interpolatePriceTokens(post.html, loc);

  return (
    <article className="bg-bg">
      <div className="max-w-[720px] mx-auto px-[20px] md:px-[24px] py-[48px] md:py-[64px]">
        {/* Back link */}
        <Link
          href={`/${loc}/blog`}
          className="inline-flex items-center gap-[4px] text-[14px] text-text-muted hover:text-accent transition-colors mb-[32px]"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          {dict["blog.backToList"]}
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-[12px] text-[13px] text-text-faint">
          <span>{post.category}</span>
          <span>·</span>
          <span>{post.datePublished}</span>
          <span>·</span>
          <span>{post.author}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-[28px] md:text-[40px] font-normal leading-[1.15] tracking-[-0.02em] mt-[12px]">
          {post.title}
        </h1>

        {/* Translation links */}
        {translations.length > 1 && (
          <div className="flex gap-[8px] mt-[16px]">
            {translations
              .filter((t) => t.lang !== loc)
              .map((t) => (
                <Link
                  key={t.lang}
                  href={`/${t.lang}/blog/${t.slug}`}
                  className="text-[13px] text-accent hover:underline"
                >
                  {t.lang === "az" ? "Azərbaycanca" : t.lang === "ru" ? "На русском" : "In English"}
                </Link>
              ))}
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-[6px] mt-[16px]">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[12px] text-text-faint bg-surface-alt px-[8px] py-[3px] rounded-[999px] border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="mt-[32px] prose prose-neutral max-w-none
            [&_h2]:font-serif [&_h2]:text-[22px] [&_h2]:md:text-[26px] [&_h2]:font-normal [&_h2]:leading-[1.2] [&_h2]:mt-[40px] [&_h2]:mb-[16px]
            [&_h3]:font-serif [&_h3]:text-[18px] [&_h3]:md:text-[20px] [&_h3]:font-normal [&_h3]:leading-[1.3] [&_h3]:mt-[32px] [&_h3]:mb-[12px]
            [&_p]:text-[16px] [&_p]:leading-[1.7] [&_p]:text-text [&_p]:mb-[16px]
            [&_ul]:text-[16px] [&_ul]:leading-[1.7] [&_ul]:mb-[16px] [&_ul]:pl-[24px]
            [&_ol]:text-[16px] [&_ol]:leading-[1.7] [&_ol]:mb-[16px] [&_ol]:pl-[24px]
            [&_li]:mb-[6px]
            [&_a]:text-accent [&_a]:underline
            [&_strong]:font-semibold
            [&_table]:w-full [&_table]:border-collapse [&_table]:mt-[16px] [&_table]:mb-[24px]
            [&_th]:text-left [&_th]:text-[14px] [&_th]:font-medium [&_th]:p-[12px] [&_th]:border-b [&_th]:border-border [&_th]:bg-surface-alt
            [&_td]:text-[14px] [&_td]:p-[12px] [&_td]:border-b [&_td]:border-border
          "
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* CTA block */}
        <div className="mt-[48px] border border-border rounded-[12px] p-[24px] bg-surface-alt">
          <p className="font-serif text-[20px] font-normal leading-[1.3]">{dict["blog.cta.heading"]}</p>
          <p className="text-[15px] text-text-muted mt-[8px]">{dict["blog.cta.body"]}</p>
          <div className="mt-[16px]">
            <Button variant="primary" href={waLink(loc)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />}>
              {dict["blog.cta.button"]}
            </Button>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-[48px]">
            <h2 className="font-serif text-[20px] font-normal mb-[16px]">{dict["blog.related"]}</h2>
            <div className="space-y-[12px]">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${loc}/blog/${r.slug}`}
                  className="flex items-center justify-between border border-border rounded-[8px] p-[16px] bg-surface hover:shadow-[var(--shadow-lift)] transition-shadow"
                >
                  <span className="text-[15px] font-medium">{r.title}</span>
                  <ArrowRight size={16} strokeWidth={1.75} className="text-accent flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
