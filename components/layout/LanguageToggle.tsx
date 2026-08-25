"use client";

import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LanguageToggle({ currentLocale, className }: { currentLocale: Locale; className?: string }) {
  const pathname = usePathname();

  function switchLocale(newLocale: Locale) {
    localStorage.setItem("locale", newLocale);
    document.cookie = `locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/") + window.location.search + window.location.hash;
  }

  return (
    <div className={cn("flex gap-[2px]", className)} role="group" aria-label="Language">
      {LOCALES.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          aria-pressed={locale === currentLocale}
          className={cn(
            "px-[8px] py-[4px] text-[13px] font-medium rounded-[6px] transition-colors duration-200 uppercase",
            locale === currentLocale
              ? "bg-accent-bg text-accent"
              : "text-text-faint hover:text-text bg-transparent"
          )}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
