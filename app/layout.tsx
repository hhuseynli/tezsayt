import type { Metadata } from "next";
import { lora, dmSans } from "@/lib/fonts";
import "./globals.css";
import { AGENCY_NAME, SITE_URL } from "@/lib/constants";
import { CursorTrail } from "@/components/ui/CursorTrail";

export const metadata: Metadata = {
  title: AGENCY_NAME,
  description: "Websites for Azerbaijani businesses",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.ico",
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
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
