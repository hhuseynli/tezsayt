import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path already has a locale prefix
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 301 redirects for changed blog slugs
  const slugRedirects: Record<string, string> = {
    "/blog/seo-ve-geo-niye-vacibdir": "/blog/google-da-biznesimi-nece-tapirlar",
  };
  for (const [old, newSlug] of Object.entries(slugRedirects)) {
    for (const loc of LOCALES) {
      if (pathname === `/${loc}${old}`) {
        return NextResponse.redirect(new URL(`/${loc}${newSlug}`, request.url), 301);
      }
    }
  }

  if (pathnameHasLocale) return NextResponse.next();

  // Determine preferred locale from cookie or default
  const localeCookie = request.cookies.get("locale")?.value;
  const locale =
    localeCookie && LOCALES.includes(localeCookie as (typeof LOCALES)[number])
      ? localeCookie
      : DEFAULT_LOCALE;

  // Root path → redirect to locale homepage
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Any other path without a locale prefix (e.g. /api, /random) →
  // redirect to the locale-prefixed version so it hits the locale
  // not-found page instead of causing a 500
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, og-image.png, robots.txt, sitemap.xml
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|og-image\\.png|robots\\.txt|sitemap\\.xml|images/).*)",
  ],
};
