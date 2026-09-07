"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AGENCY_NAME, type Locale } from "@/lib/constants";
import { cn, waLink, igLink } from "@/lib/utils";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "@/components/ui/Button";
import { Instagram } from "@/components/ui/icons/Instagram";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";

type HeaderProps = { locale: Locale; dict: Record<string, string> };

const navKeys = ["work", "services", "about", "contact"] as const;

export function Header({ locale, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && menuOpen) setMenuOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const mobileMenu = menuOpen && mounted ? createPortal(
    <div className="fixed inset-0 z-[100] bg-bg flex flex-col md:hidden">
      <div className="h-[64px] flex items-center justify-between px-[24px] flex-shrink-0">
        <Link href={`/${locale}`} className="flex items-center" onClick={() => setMenuOpen(false)}>
          <Image src="/images/tezsayt-logo.png" alt={AGENCY_NAME} width={140} height={32} className="h-[24px] w-auto" priority />
        </Link>
        <button className="p-[4px] text-text" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col gap-[24px] px-[24px] pt-[32px]">
        {navKeys.map((key) => (
          <Link key={key} href={`/${locale}/${key}`} className="font-serif text-[24px] font-normal text-text" onClick={() => setMenuOpen(false)}>
            {dict[`nav.${key}`]}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col gap-[12px] px-[24px] mt-[48px]">
        <Button variant="primary" href={igLink()} target="_blank" rel="noopener noreferrer" icon={<Instagram />} className="w-full justify-center">
          {dict["common.instagram"]}
        </Button>
        <Button variant="secondary" href={waLink(locale)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />} className="w-full justify-center">
          {dict["common.whatsapp"]}
        </Button>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 bg-bg/90 backdrop-blur-[8px] transition-[border-color] duration-200",
        scrolled ? "border-b border-border" : "border-b border-transparent"
      )}>
        <div className="max-w-[1120px] mx-auto px-[24px] h-[64px] flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center">
            <Image src="/images/tezsayt-logo.png" alt={AGENCY_NAME} width={140} height={32} className="h-[24px] w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-[32px]">
            {navKeys.map((key) => (
              <Link key={key} href={`/${locale}/${key}`} className="text-[15px] text-text-muted hover:text-text transition-colors duration-200">
                {dict[`nav.${key}`]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-[16px]">
            <LanguageToggle currentLocale={locale} />
            <button className="md:hidden p-[4px] text-text" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
