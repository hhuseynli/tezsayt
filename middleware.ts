import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./lib/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path already has a locale prefix
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Only redirect the root path
  if (pathname === "/") {
    const localeCookie = request.cookies.get("locale")?.value;
    const locale =
      localeCookie && LOCALES.includes(localeCookie as (typeof LOCALES)[number])
        ? localeCookie
        : DEFAULT_LOCALE;

    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
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
