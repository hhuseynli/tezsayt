import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LOCALES, SITE_URL, type Locale } from "@/lib/constants";
import { getDictionary, t } from "@/lib/i18n";
import { getPublishedPosts } from "@/lib/blog";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: t(dict, "blog.meta.title"),
    description: t(dict, "blog.meta.desc"),
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/blog`])),
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const dict = await getDictionary(loc);
  const posts = await getPublishedPosts(loc);

  return (
    <section className="bg-bg">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
        <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.02em]">
          {dict["blog.heading"]}
        </h1>
        <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px] max-w-[60ch]">
          {dict["blog.sub"]}
        </p>

        {posts.length === 0 ? (
          <p className="text-[16px] text-text-muted mt-[32px]">{dict["blog.empty"]}</p>
        ) : (
          <ScrollReveal>
            <div className="mt-[48px] space-y-[24px]">
              {posts.map((post) => (
                <RevealItem key={post.slug}>
                  <Link
                    href={`/${loc}/blog/${post.slug}`}
                    className="block border border-border rounded-[12px] p-[24px] bg-surface hover:shadow-[var(--shadow-lift)] transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-[16px]">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-text-faint uppercase tracking-[0.06em]">{post.category}</p>
                        <h2 className="font-serif text-[20px] md:text-[24px] font-normal leading-[1.2] mt-[4px]">
                          {post.title}
                        </h2>
                        <p className="text-[14px] md:text-[15px] text-text-muted leading-[1.5] mt-[8px] line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-[12px] mt-[12px]">
                          <span className="text-[13px] text-text-faint">{post.datePublished}</span>
                          <span className="text-accent text-[14px] font-medium inline-flex items-center gap-[4px]">
                            {dict["blog.readMore"]} <ArrowRight size={14} strokeWidth={1.75} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
