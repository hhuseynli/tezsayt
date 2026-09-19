/**
 * Build-time blog validation.
 * Checks: frontmatter validity, no literal prices/durations in post bodies,
 * slug transliteration consistency, duplicate slugs.
 *
 * Run: npx tsx scripts/validate-blog.ts
 */

import { getAllPosts, checkForLiteralValues, transliterateSlug } from "../lib/blog";

async function main() {
  let errors = 0;
  let warnings = 0;

  console.log("Validating blog posts...\n");

  let posts;
  try {
    posts = await getAllPosts();
  } catch (e) {
    console.error(`FATAL: ${(e as Error).message}`);
    process.exit(1);
  }

  if (posts.length === 0) {
    console.log("No blog posts found. Skipping.\n");
    process.exit(0);
  }

  console.log(`Found ${posts.length} post(s).\n`);

  // Check for duplicate slugs within same locale
  const slugMap = new Map<string, string>();
  for (const post of posts) {
    const key = `${post.lang}:${post.slug}`;
    if (slugMap.has(key)) {
      console.error(`  ✗ Duplicate slug: ${key} in ${post.filePath} and ${slugMap.get(key)}`);
      errors++;
    } else {
      slugMap.set(key, post.filePath);
    }
  }

  // Check each post
  for (const post of posts) {
    console.log(`  ${post.draft ? "[DRAFT]" : "[PUBLISHED]"} ${post.lang}/${post.slug}`);

    // Check for literal prices/durations in body
    const literalWarnings = checkForLiteralValues(post.content, post.filePath);
    for (const w of literalWarnings) {
      console.warn(`    ⚠ ${w}`);
      warnings++;
    }

    // Check slug matches transliteration of title
    const expected = transliterateSlug(post.title);
    if (post.slug !== expected && !post.slug.startsWith(expected.slice(0, 20))) {
      // Soft check — slug doesn't need to exactly match, but should be related
      console.log(`    ℹ Slug "${post.slug}" differs from auto-transliterated "${expected}"`);
    }

    // Check reviewBy date
    if (post.reviewBy) {
      const reviewDate = new Date(post.reviewBy);
      if (reviewDate < new Date()) {
        console.warn(`    ⚠ reviewBy date has passed: ${post.reviewBy}`);
        warnings++;
      }
    }

    // Check dateModified >= datePublished
    if (post.dateModified < post.datePublished) {
      console.error(`    ✗ dateModified (${post.dateModified}) is before datePublished (${post.datePublished})`);
      errors++;
    }
  }

  console.log(`\nResults: ${errors} error(s), ${warnings} warning(s)`);

  if (errors > 0) {
    console.error("Blog validation FAILED.");
    process.exit(1);
  }

  if (warnings > 0) {
    console.warn("Blog validation passed with warnings.");
  } else {
    console.log("All blog checks passed.");
  }
}

main();
