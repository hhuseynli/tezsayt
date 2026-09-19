/**
 * Build-time check: validates offering.ts for consistency.
 * Run: npx tsx scripts/validate-offering.ts
 * Added to build in package.json predev/prebuild.
 */

import { tiers, monthlyServices, featureAddons, oneTimeAddons, facts } from "../content/offering";

let errors = 0;

function fail(msg: string) {
  console.error(`  ✗ ${msg}`);
  errors++;
}

function check(label: string, fn: () => void) {
  console.log(`Checking: ${label}`);
  fn();
}

check("Tier IDs are unique", () => {
  const ids = tiers.map((t) => t.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fail(`Duplicate tier IDs: ${dupes.join(", ")}`);
});

check("Every tier has all three locale fields", () => {
  for (const tier of tiers) {
    for (const field of ["name", "description", "bestFor", "standardLanguages"] as const) {
      const val = tier[field];
      if (!val.az || !val.ru || !val.en) fail(`Tier ${tier.id}.${field} missing locale`);
    }
    for (const [i, inc] of tier.includes.entries()) {
      if (!inc.az || !inc.ru || !inc.en) fail(`Tier ${tier.id}.includes[${i}] missing locale`);
    }
  }
});

check("Price amounts are non-negative or null", () => {
  for (const tier of tiers) {
    if (tier.price.amount !== null && tier.price.amount < 0) {
      fail(`Tier ${tier.id} has negative price: ${tier.price.amount}`);
    }
  }
});

check("Turnaround ranges are valid", () => {
  for (const tier of tiers) {
    const ta = tier.turnaround;
    if (ta.range) {
      if (ta.range[0] > ta.range[1]) fail(`Tier ${tier.id} turnaround range is inverted`);
      if (ta.range[0] <= 0) fail(`Tier ${tier.id} turnaround starts at 0 or negative`);
    }
  }
});

check("Monthly services have optional: true", () => {
  for (const svc of monthlyServices) {
    if (!svc.optional) fail(`Monthly service ${svc.id} must have optional: true`);
  }
});

check("Monthly service requires references exist", () => {
  const addonIds = new Set(oneTimeAddons.map((a) => a.id));
  for (const svc of monthlyServices) {
    if (svc.requires && !addonIds.has(svc.requires)) {
      fail(`Monthly service ${svc.id} requires '${svc.requires}' but no such addon exists`);
    }
  }
});

check("Feature addon availableFor references valid tier IDs", () => {
  const tierIds = new Set(tiers.map((t) => t.id));
  for (const addon of featureAddons) {
    for (const tid of addon.availableFor) {
      if (!tierIds.has(tid)) fail(`Feature addon ${addon.id} references unknown tier: ${tid}`);
    }
  }
});

check("Entry price matches lowest tier", () => {
  const lowestTier = tiers
    .filter((t) => t.price.amount !== null)
    .sort((a, b) => (a.price.amount ?? 0) - (b.price.amount ?? 0))[0];
  if (lowestTier && lowestTier.price.amount !== facts.entryPrice) {
    fail(`facts.entryPrice (${facts.entryPrice}) doesn't match lowest tier ${lowestTier.id} (${lowestTier.price.amount})`);
  }
});

check("Free support days is positive", () => {
  if (facts.freeSupport.days <= 0) fail("Free support days must be positive");
});

console.log("");
if (errors > 0) {
  console.error(`Validation FAILED with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log("All offering checks passed.");
}
