export type Locale = "az" | "ru" | "en";
export type Localized = { az: string; ru: string; en: string };

export function localizedText(text: string): Localized {
  return { az: text, ru: text, en: text };
}

export function tl(field: Localized, locale: Locale): string {
  return field[locale] || field.az;
}
