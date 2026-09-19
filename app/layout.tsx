import type { Metadata } from "next";
import { lora, dmSans } from "@/lib/fonts";
import "./globals.css";
import { AGENCY_NAME, SITE_URL } from "@/lib/constants";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: AGENCY_NAME,
  description: "Websites for Azerbaijani businesses",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    languages: {
      "x-default": `${SITE_URL}/az`,
      az: `${SITE_URL}/az`,
      ru: `${SITE_URL}/ru`,
      en: `${SITE_URL}/en`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className={`${lora.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
