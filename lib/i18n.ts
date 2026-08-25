import type { Locale } from "./constants";
import { DEFAULT_LOCALE } from "./constants";

type Dictionary = Record<string, string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<Locale, () => Promise<any>> = {
  az: () => import("@/locales/az.json").then((m) => m.default),
  ru: () => import("@/locales/ru.json").then((m) => m.default),
  en: () => import("@/locales/en.json").then((m) => m.default),
};

let fallbackDict: Dictionary | null = null;

function flatten(obj: Record<string, unknown>, prefix = ""): Dictionary {
  const result: Dictionary = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (typeof item === "object" && item !== null) {
          Object.assign(result, flatten(item as Record<string, unknown>, `${fullKey}.${i}`));
        } else {
          result[`${fullKey}.${i}`] = String(item);
        }
      });
    } else if (typeof value === "object" && value !== null) {
      Object.assign(result, flatten(value as Record<string, unknown>, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}

async function getFallback(): Promise<Dictionary> {
  if (fallbackDict) return fallbackDict;
  const raw = await dictionaries[DEFAULT_LOCALE]();
  const result: Dictionary = typeof raw === "object" ? flatten(raw) : raw;
  fallbackDict = result;
  return result;
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const raw = await dictionaries[locale]();
  const dict: Dictionary = typeof raw === "object" ? flatten(raw) : raw;

  if (locale !== DEFAULT_LOCALE) {
    const fb = await getFallback();
    for (const key of Object.keys(fb)) {
      if (!(key in dict)) {
        dict[key] = fb[key];
      }
    }
  }

  return dict;
}

export function t(dict: Dictionary, key: string): string {
  return dict[key] || key;
}
