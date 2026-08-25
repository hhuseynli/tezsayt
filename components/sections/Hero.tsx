import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Instagram } from "@/components/ui/icons/Instagram";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { waLink, igLink } from "@/lib/utils";
import type { Locale } from "@/lib/constants";

type HeroProps = { locale: Locale; dict: Record<string, string> };

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="bg-bg">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] pt-[48px] pb-[64px] md:pt-[80px] md:pb-[96px]">
        <div className="lg:grid lg:grid-cols-2 lg:gap-[48px] lg:items-center">
          {/* Left: text */}
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-text-muted mb-[16px]">{dict["home.hero.eyebrow"]}</p>
            <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.02em]">
              {dict["home.hero.h1"]}
            </h1>
            <p className="text-[18px] leading-[1.6] mt-[20px] max-w-[50ch]">
              {dict["home.hero.sub"]}
            </p>
            <div className="flex flex-col sm:flex-row gap-[12px] mt-[32px]">
              <Button variant="primary" href={igLink()} target="_blank" rel="noopener noreferrer" icon={<Instagram />} className="w-full sm:w-auto">
                {dict["common.instagram"]}
              </Button>
              <Button variant="secondary" href={waLink(locale)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />} className="w-full sm:w-auto">
                {dict["common.whatsapp"]}
              </Button>
            </div>
          </div>

          {/* Right: Google search screenshot */}
          <div className="mt-[48px] lg:mt-0">
            <BrowserMockup src={`/images/hero-search-${locale}.png`} alt="Google search showing no results for a business" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
