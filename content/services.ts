/**
 * Service definitions — derived from offering.ts.
 *
 * This file re-exports tier data in the shape that components expect.
 * All prices and turnarounds come from offering.ts.
 */

import { type Localized } from "./types";
import { tiers, formatTurnaround, type TierId } from "./offering";

export type Service = {
  slug: string;
  name: Localized;
  description: Localized;
  bestFor: Localized;
  includes: Localized[];
  timeline: Localized;
  priceFrom: number;
  priceLabel?: Localized;
};

function tierTimeline(tierId: TierId): Localized {
  const tier = tiers.find((t) => t.id === tierId)!;
  return {
    az: formatTurnaround(tier.turnaround, "az"),
    ru: formatTurnaround(tier.turnaround, "ru"),
    en: formatTurnaround(tier.turnaround, "en"),
  };
}

export const services: Service[] = tiers.map((tier) => ({
  slug: tier.id,
  name: tier.name,
  description: tier.description,
  bestFor: tier.bestFor,
  includes: tier.includes,
  timeline: tierTimeline(tier.id),
  priceFrom: tier.price.amount ?? 0,
  ...(tier.price.type === "negotiable"
    ? {
        priceLabel: {
          az: "Razılaşma yolu ilə",
          ru: "По договорённости",
          en: "By agreement",
        },
      }
    : {}),
}));
