export const AGENCY_NAME = "Tezsayt";
export const WHATSAPP_NUMBER = "994XXXXXXXXX";
export const INSTAGRAM_HANDLE = "yourhandle";
export const TELEGRAM_HANDLE = "yourhandle";
export const EMAIL = "hello@example.com";
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xxxxxxxx";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.az";
export const LOCALES = ["az", "ru", "en"] as const;
export const DEFAULT_LOCALE = "az";

export type Locale = (typeof LOCALES)[number];
