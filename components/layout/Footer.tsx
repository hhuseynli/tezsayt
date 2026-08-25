import Link from "next/link";
import { Mail } from "lucide-react";
import { AGENCY_NAME, EMAIL, TELEGRAM_HANDLE, type Locale } from "@/lib/constants";
import { waLink, igLink } from "@/lib/utils";
import { Instagram } from "@/components/ui/icons/Instagram";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { Telegram } from "@/components/ui/icons/Telegram";

type FooterProps = { locale: Locale; dict: Record<string, string> };

export function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="bg-surface-alt border-t border-border">
      <div className="max-w-[1120px] mx-auto px-[24px] py-[64px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[48px]">
          <div>
            <span className="font-serif text-[18px] font-normal text-text tracking-[-0.01em]">{AGENCY_NAME}</span>
            <p className="text-[14px] text-text-muted mt-[12px] max-w-[280px]">{dict["footer.tagline"]}</p>
          </div>
          <nav className="flex flex-col gap-[12px]">
            {(["work", "services", "about", "contact"] as const).map((key) => (
              <Link key={key} href={`/${locale}/${key}`} className="text-[14px] text-text-muted hover:text-text transition-colors duration-200">
                {dict[`nav.${key}`]}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-[12px]">
            <a href={igLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px] text-[14px] text-text-muted hover:text-text transition-colors">
              <Instagram size={16} /> {dict["common.instagram"]}
            </a>
            <a href={waLink(locale)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px] text-[14px] text-text-muted hover:text-text transition-colors">
              <WhatsApp size={16} /> {dict["common.whatsapp"]}
            </a>
            <a href={`https://t.me/${TELEGRAM_HANDLE}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px] text-[14px] text-text-muted hover:text-text transition-colors">
              <Telegram size={16} /> {dict["common.telegram"]}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-[8px] text-[14px] text-text-muted hover:text-text transition-colors">
              <Mail size={16} strokeWidth={1.75} /> {dict["common.email"]}
            </a>
          </div>
        </div>
        <div className="border-t border-border mt-[24px] pt-[24px] flex flex-col md:flex-row items-center justify-between gap-[8px]">
          <span className="text-[13px] text-text-faint">{dict["footer.rights"]}</span>
        </div>
      </div>
    </footer>
  );
}
