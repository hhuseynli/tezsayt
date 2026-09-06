import { AGENCY_NAME, SITE_URL, EMAIL, WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "@/lib/constants";
import type { Locale } from "@/lib/constants";

export function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const descriptions: Record<Locale, string> = {
    az: "Azərbaycan biznesləri üçün veb-saytlar. 7 günə hazır. 500 AZN-dən başlayaraq.",
    ru: "Сайты для бизнеса в Азербайджане. Готовы за 7 дней. От 500 AZN.",
    en: "Websites for Azerbaijani businesses. Ready in seven days. From 500 AZN.",
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
    priceRange: "500-5000 AZN",
    sameAs: [
      `https://instagram.com/${INSTAGRAM_HANDLE}`,
    ],
    serviceType: "Web Development",
    knowsLanguage: ["az", "ru", "en"],
    offers: {
      "@type": "Offer",
      name: "Free homepage draft",
      price: "0",
      priceCurrency: "AZN",
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
