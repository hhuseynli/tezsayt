import type { Metadata } from "next";
import { playfair, sourceSans } from "@/lib/fonts";
import "./globals.css";
import { AGENCY_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: AGENCY_NAME,
  description: "Websites for Azerbaijani businesses",
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
