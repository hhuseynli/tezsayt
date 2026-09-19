/**
 * Drift protection: greps all locale files, content files, and blog posts
 * for hardcoded currency amounts and day/week counts, verifying each traces
 * back to offering.ts.
 *
 * Run: npx tsx scripts/check-drift.ts
 */

import fs from "fs";
import path from "path";
import { tiers, monthlyServices, facts, EXTRA_PAGE_PRICE, EXTRA_LANGUAGE_PRICE, featureAddons, oneTimeAddons } from "../content/offering";

// Known legitimate values from offering.ts
const legitimatePrices = new Set<number>();
const legitimateDurations = new Set<string>();

// Tier prices
for (const tier of tiers) {
  if (tier.price.amount !== null) legitimatePrices.add(tier.price.amount);
  if (tier.turnaround.range) {
    legitimateDurations.add(`${tier.turnaround.range[0]}`);
    legitimateDurations.add(`${tier.turnaround.range[1]}`);
  }
  legitimatePrices.add(tier.estimatorBaseDays);
}

// Monthly services
for (const svc of monthlyServices) {
  legitimatePrices.add(svc.price);
}

// Add-ons
for (const addon of featureAddons) {
  legitimatePrices.add(addon.price);
}
for (const addon of oneTimeAddons) {
  if (addon.flat) legitimatePrices.add(addon.flat);
  if (addon.perPage) legitimatePrices.add(addon.perPage);
}

// Constants
legitimatePrices.add(EXTRA_PAGE_PRICE);
legitimatePrices.add(EXTRA_LANGUAGE_PRICE);
legitimatePrices.add(facts.freeSupport.days);
legitimatePrices.add(facts.entryPrice);

// Patterns
const PRICE_RE = /(\d+)\s*(AZN|manat|₼)/gi;
const DURATION_RE = /(\d+)\s*(gün|günə|günlük|həftə|дней|дня|день|недел|days?|weeks?)/gi;

// Files to check
function getFiles(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules" && entry.name !== ".next") {
      results.push(...getFiles(full, exts));
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

const root = process.cwd();
const files = [
  ...getFiles(path.join(root, "locales"), [".json"]),
  ...getFiles(path.join(root, "content"), [".ts", ".md"]),
  ...getFiles(path.join(root, "components"), [".tsx"]),
  ...getFiles(path.join(root, "app"), [".tsx", ".ts"]),
];

let warnings = 0;

for (const file of files) {
  // Skip offering.ts itself and this script
  if (file.includes("offering.ts") || file.includes("check-drift")) continue;
  // Skip validation scripts
  if (file.includes("validate-")) continue;

  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");
  const relPath = path.relative(root, file);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip comments, imports, and type definitions
    if (line.trim().startsWith("//") || line.trim().startsWith("*") || line.trim().startsWith("import ") || line.trim().startsWith("export type")) continue;
    // Skip interpolation tokens in blog posts
    if (line.includes("{{price:") || line.includes("{{turnaround:") || line.includes("{{support:") || line.includes("{{entryPrice}}")) continue;

    // Check prices
    let match;
    PRICE_RE.lastIndex = 0;
    while ((match = PRICE_RE.exec(line)) !== null) {
      const amount = parseInt(match[1], 10);
      if (!legitimatePrices.has(amount)) {
        console.warn(`⚠ ${relPath}:${i + 1}: Price ${amount} AZN not in offering.ts — "${line.trim().slice(0, 80)}"`);
        warnings++;
      }
    }

    // Check durations (only in locale/content files, not in components)
    if (relPath.startsWith("locales/") || relPath.startsWith("content/")) {
      DURATION_RE.lastIndex = 0;
      while ((match = DURATION_RE.exec(line)) !== null) {
        const num = match[1];
        if (!legitimateDurations.has(num) && !legitimatePrices.has(parseInt(num, 10))) {
          // Allow "30 gün" (free support days) and known tier durations
          if (parseInt(num, 10) !== facts.freeSupport.days) {
            console.warn(`⚠ ${relPath}:${i + 1}: Duration "${num} ${match[2]}" not in offering.ts — "${line.trim().slice(0, 80)}"`);
            warnings++;
          }
        }
      }
    }
  }
}

console.log(`\nDrift check: ${warnings} warning(s)`);
if (warnings > 0) {
  console.log("Review each warning. Market prices with attribution and reviewBy dates are expected.");
}
