"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/constants";

const notFoundText: Record<Locale, { heading: string; body: string; back: string }> = {
  az: {
    heading: "Səhifə tapılmadı",
    body: "Axtardığınız səhifə mövcud deyil.",
    back: "Ana səhifəyə qayıdın",
  },
  ru: {
    heading: "Страница не найдена",
    body: "Страница, которую вы ищете, не существует.",
    back: "На главную",
  },
  en: {
    heading: "Page not found",
    body: "The page you're looking for doesn't exist.",
    back: "Back to homepage",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale: Locale =
    segment && LOCALES.includes(segment as Locale)
      ? (segment as Locale)
      : DEFAULT_LOCALE;

  const text = notFoundText[locale];

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center px-[24px]">
        <h1 className="font-serif text-[32px] font-normal">
          {text.heading}
        </h1>
        <p className="text-[16px] text-text-muted mt-[12px]">
          {text.body}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-block text-accent font-medium hover:underline mt-[24px]"
        >
          {text.back}
        </Link>
      </div>
    </div>
  );
}
