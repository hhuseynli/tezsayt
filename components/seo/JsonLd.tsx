import { AGENCY_NAME, SITE_URL, EMAIL, WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "@/lib/constants";
import type { Locale } from "@/lib/constants";
import { facts, tiers, formatTurnaroundShort } from "@/content/offering";

export function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const entryTier = tiers[0];
  const entryRange = formatTurnaroundShort(entryTier.turnaround, locale);
  const businessTier = tiers.find((t) => t.id === "business")!;
  const businessRange = formatTurnaroundShort(businessTier.turnaround, locale);

  const descriptions: Record<Locale, string> = {
    az: `Azərbaycan biznesləri üçün veb-saytlar. ${facts.entryPrice} AZN-dən başlayaraq. Vizitkart ${entryRange}, Biznes saytı ${businessRange}.`,
    ru: `Сайты для бизнеса в Азербайджане. От ${facts.entryPrice} AZN. Визитка ${entryRange}, Бизнес-сайт ${businessRange}.`,
    en: `Websites for Azerbaijani businesses. From ${facts.entryPrice} AZN. Business card ${entryRange}, Business site ${businessRange}.`,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: AGENCY_NAME,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/og-image.png`,
    description: descriptions[locale],
    email: EMAIL,
    telephone: `+${WHATSAPP_NUMBER}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baku",
      addressCountry: "AZ",
    },
    areaServed: {
      "@type": "Country",
      name: "Azerbaijan",
    },
    priceRange: facts.schemaOrgPriceRange,
    sameAs: [
      `https://instagram.com/${INSTAGRAM_HANDLE}`,
    ],
    serviceType: "Web Development",
    knowsLanguage: ["az", "ru", "en"],
    offers: {
      "@type": "Offer",
      name: "Free homepage draft",
      price: "0",
      priceCurrency: facts.currency,
      description: "We build your homepage before you pay anything.",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
