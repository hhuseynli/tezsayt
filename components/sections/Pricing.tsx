"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { services } from "@/content/services";
import { PricingCard } from "@/components/cards/PricingCard";
import { PriceEstimator } from "./PriceEstimator";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/constants";
import { tl } from "@/content/types";

type PricingProps = { locale: Locale; dict: Record<string, string> };

export function Pricing({ locale, dict }: PricingProps) {
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const pricingServices = services.slice(0, 3);
  const included = [1, 2, 3, 4, 5].map((n) => dict[`home.pricing.included.${n}`]);

  return (
    <section className="bg-bg">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
        <ScrollReveal>
          <RevealItem>
            <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["home.pricing.heading"]}</h2>
            <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px]">{dict["home.pricing.sub"]}</p>
          </RevealItem>
          <RevealItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mt-[48px] pt-[14px] items-stretch">
              {pricingServices.map((s) => (
                <PricingCard key={s.slug} slug={s.slug} name={tl(s.name, locale)} priceFrom={s.priceFrom} priceLabel={s.priceLabel ? tl(s.priceLabel, locale) : undefined} timeline={tl(s.timeline, locale)} bestFor={tl(s.bestFor, locale)} includes={s.includes.map((inc) => tl(inc, locale))} isPopular={false} popularLabel="" fromLabel={dict["common.from"]} readyInLabel={dict["common.readyIn"]} goodForLabel={dict["common.goodFor"]} includesLabel={dict["services.includes.label"]} />
              ))}
            </div>
          </RevealItem>
          <RevealItem>
            <div className="mt-[40px]">
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-text-muted">{dict["home.pricing.included.label"]}</p>
              <div className="flex flex-wrap gap-[20px] mt-[12px]">
                {included.map((item, i) => (
                  <div key={i} className="flex items-center gap-[6px]">
                    <Check size={16} className="text-success" strokeWidth={2} />
                    <span className="text-[14px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="mt-[40px]">
              <button onClick={() => setEstimatorOpen(!estimatorOpen)} className="inline-flex items-center gap-[4px] text-accent font-medium hover:underline">
                {dict["home.pricing.estimatorToggle"]}
                <ChevronDown size={18} className={cn("transition-transform duration-200", estimatorOpen && "rotate-180")} strokeWidth={1.75} />
              </button>
              <div className={cn("overflow-hidden transition-all duration-300", estimatorOpen ? "max-h-[2000px] mt-[24px]" : "max-h-0")}>
                <PriceEstimator locale={locale} dict={dict} />
              </div>
            </div>
          </RevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
}
