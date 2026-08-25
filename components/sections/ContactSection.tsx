import { Button } from "@/components/ui/Button";
import { Instagram } from "@/components/ui/icons/Instagram";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { waLink, igLink } from "@/lib/utils";
import type { Locale } from "@/lib/constants";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

export function ContactSection({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  return (
    <section id="contact" className="bg-bg">
      <div className="max-w-[560px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px] text-center">
        <ScrollReveal>
          <RevealItem>
            <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["home.contact.heading"]}</h2>
            <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px]">{dict["home.contact.body"]}</p>
          </RevealItem>
          <RevealItem>
            <div className="flex flex-col sm:flex-row gap-[12px] mt-[32px]">
              <Button variant="primary" href={igLink()} target="_blank" rel="noopener noreferrer" icon={<Instagram />} className="w-full sm:flex-1 justify-center">
                {dict["common.instagram"]}
              </Button>
              <Button variant="secondary" href={waLink(locale)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />} className="w-full sm:flex-1 justify-center">
                {dict["common.whatsapp"]}
              </Button>
            </div>
          </RevealItem>
          <RevealItem>
            <p className="text-[13px] text-text-faint mt-[16px]">{dict["contact.response"]}</p>
          </RevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
}
