export const AGENCY_NAME = "Tezsayt.dev";
export const WHATSAPP_NUMBER = "994993600545";
export const INSTAGRAM_HANDLE = "tezsayt.dev";
export const TELEGRAM_HANDLE = "yourhandle";
export const EMAIL = "info@tezsayt.dev";
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xxxxxxxx";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.az";
export const LOCALES = ["az", "ru", "en"] as const;
export const DEFAULT_LOCALE = "az";

export type Locale = (typeof LOCALES)[number];
