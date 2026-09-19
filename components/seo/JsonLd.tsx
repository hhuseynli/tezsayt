import { AGENCY_NAME, SITE_URL, EMAIL, WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import { facts, tiers, formatPrice, formatTurnaround, type TierId } from "@/content/offering";
import { faqItems } from "@/content/faq";
import { tl } from "@/content/types";
import type { Post } from "@/lib/blog";

function jsonLdScript(data: Record<string, unknown>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── Organization (sitewide) ────────────────────────────────────────────────

export function OrganizationJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: AGENCY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    email: EMAIL,
    telephone: `+${WHATSAPP_NUMBER}`,
    sameAs: [
      `https://instagram.com/${INSTAGRAM_HANDLE}`,
    ],
  };
  return jsonLdScript(org);
}

// ─── WebSite (sitewide) ─────────────────────────────────────────────────────

export function WebSiteJsonLd() {
  const ws = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: AGENCY_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["az", "ru", "en"],
  };
  return jsonLdScript(ws);
}

// ─── ProfessionalService + OfferCatalog (sitewide per locale) ───────────────

export function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const offerItems = tiers.map((tier) => {
    const offer: Record<string, unknown> = {
      "@type": "Offer",
      name: tl(tier.name, locale),
      description: tl(tier.description, locale),
      priceCurrency: facts.currency,
      availability: "https://schema.org/InStock",
    };
    // Only emit price for non-negotiable tiers
    if (tier.price.amount !== null) {
      offer.price = String(tier.price.amount);
      if (tier.price.type === "from") {
        offer.priceSpecification = {
          "@type": "PriceSpecification",
          price: String(tier.price.amount),
          priceCurrency: facts.currency,
          minPrice: String(tier.price.amount),
        };
      }
    }
    return offer;
  });

  // Free homepage offer — our most quotable fact
  const freeOffer = {
    "@type": "Offer",
    name: tl(facts.freeDraft.scope, locale),
    description: tl(facts.ownership.exitMechanic, locale),
    price: "0",
    priceCurrency: facts.currency,
    availability: "https://schema.org/InStock",
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: AGENCY_NAME,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/og-image.png`,
    description: tl({
      az: `Bakıda bizneslər üçün saytlar. Əvvəlcə pulsuz ana səhifə, bəyənsəniz tam sayt. ${facts.entryPrice} AZN-dən.`,
      ru: `Сайты для бизнеса в Баку. Сначала бесплатная главная, потом полный сайт. От ${facts.entryPrice} AZN.`,
      en: `Websites for businesses in Baku. Free homepage first, full site if you like it. From ${facts.entryPrice} AZN.`,
    }, locale),
    email: EMAIL,
    telephone: `+${WHATSAPP_NUMBER}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baku",
      addressCountry: "AZ",
    },
    areaServed: [
      { "@type": "City", name: "Baku" },
      { "@type": "Country", name: "Azerbaijan" },
    ],
    priceRange: facts.schemaOrgPriceRange,
    sameAs: [
      `https://instagram.com/${INSTAGRAM_HANDLE}`,
    ],
    serviceType: "Web Development",
    availableLanguage: [
      { "@type": "Language", name: "Azerbaijani", alternateName: "az" },
      { "@type": "Language", name: "Russian", alternateName: "ru" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [freeOffer, ...offerItems],
    },
  };

  return jsonLdScript(service);
}

// ─── FAQPage ────────────────────────────────────────────────────────────────

export function FAQPageJsonLd({ locale }: { locale: Locale }) {
  const items = faqItems
    .map((item) => ({
      "@type": "Question",
      name: tl(item.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: tl(item.answer, locale),
      },
    }));

  if (items.length === 0) return null;

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items,
  };

  return jsonLdScript(faq);
}

// ─── BreadcrumbList ─────────────────────────────────────────────────────────

export function BreadcrumbJsonLd({ locale, items }: {
  locale: Locale;
  items: { name: string; url?: string }[];
}) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };

  return jsonLdScript(breadcrumb);
}

// ─── BlogPosting ────────────────────────────────────────────────────────────

export function BlogPostingJsonLd({ post, locale }: { post: Post; locale: Locale }) {
  const posting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: post.lang,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: AGENCY_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${post.slug}`,
    },
    ...(post.heroImage ? { image: post.heroImage } : {}),
  };

  return jsonLdScript(posting);
}
