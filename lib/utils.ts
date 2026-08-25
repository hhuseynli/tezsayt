import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE } from "./constants";
import type { Locale } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const whatsappPrefills: Record<Locale, string> = {
  az: "Salam, pulsuz ana səhifə haqqında soruşmaq istərdim.",
  ru: "Здравствуйте, хочу узнать о бесплатном макете главной страницы.",
  en: "Hi, I'd like to ask about the free homepage draft.",
};

export function waLink(locale: Locale): string {
  const message = encodeURIComponent(whatsappPrefills[locale]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function igLink(): string {
  return `https://instagram.com/${INSTAGRAM_HANDLE}`;
}

export function tgLink(): string {
  return `https://t.me/${INSTAGRAM_HANDLE}`;
}
