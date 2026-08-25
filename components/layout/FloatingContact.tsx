"use client";

import { useState, useEffect } from "react";
import { waLink, cn } from "@/lib/utils";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import type { Locale } from "@/lib/constants";

export function FloatingContact({ locale, label }: { locale: Locale; label: string }) {
  const [visible, setVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setContactInView(e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const show = visible && !contactInView;

  return (
    <a
      href={waLink(locale)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-[20px] right-[20px] z-40 inline-flex items-center gap-[8px] bg-accent text-white rounded-[999px] shadow-[var(--shadow-lift)] transition-all duration-300",
        "md:px-[18px] md:py-[12px]",
        "w-[48px] h-[48px] md:w-auto md:h-auto justify-center md:justify-start",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[8px] pointer-events-none"
      )}
      aria-label={label}
    >
      <WhatsApp size={18} />
      <span className="hidden md:inline text-[15px] font-medium">{label}</span>
    </a>
  );
}
