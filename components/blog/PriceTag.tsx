/**
 * Blog interpolation components for prices and turnarounds.
 * Authors use these in post bodies instead of typing literal figures.
 *
 * Usage in rendered HTML (post-processing):
 *   {{price:business}} → "800 AZN-dən"
 *   {{turnaround:business}} → "7–10 təqvim günü"
 *   {{support:carePlan}} → "100 AZN/ay"
 */

import { getTier, formatPrice, formatTurnaround, monthlyServices, perMonthLabel, type TierId } from "@/content/offering";
import type { Locale } from "@/lib/constants";

export function interpolatePriceTokens(html: string, locale: Locale): string {
  // {{price:tierId}}
  html = html.replace(/\{\{price:(\w+)\}\}/g, (_, tierId: string) => {
    try {
      const tier = getTier(tierId as TierId);
      return `<strong>${formatPrice(tier.price, locale)}</strong>`;
    } catch {
      return `[unknown tier: ${tierId}]`;
    }
  });

  // {{turnaround:tierId}}
  html = html.replace(/\{\{turnaround:(\w+)\}\}/g, (_, tierId: string) => {
    try {
      const tier = getTier(tierId as TierId);
      return `<strong>${formatTurnaround(tier.turnaround, locale)}</strong>`;
    } catch {
      return `[unknown tier: ${tierId}]`;
    }
  });

  // {{support:serviceId}}
  html = html.replace(/\{\{support:(\w+)\}\}/g, (_, serviceId: string) => {
    const svc = monthlyServices.find((s) => s.id === serviceId);
    if (!svc) return `[unknown service: ${serviceId}]`;
    return `<strong>${svc.price} ${perMonthLabel(locale)}</strong>`;
  });

  // {{entryPrice}} — lowest tier price
  html = html.replace(/\{\{entryPrice\}\}/g, () => {
    const tier = getTier("landing");
    return `<strong>${formatPrice(tier.price, locale)}</strong>`;
  });

  return html;
}
