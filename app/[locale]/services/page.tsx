import type { Metadata } from "next";
import { Check } from "lucide-react";
import { LOCALES, SITE_URL, type Locale } from "@/lib/constants";
import { getDictionary, t } from "@/lib/i18n";
import { services } from "@/content/services";
import { faqItems } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { PriceEstimator } from "@/components/sections/PriceEstimator";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { tl } from "@/content/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: t(dict, "services.meta.title"), description: t(dict, "services.meta.desc"), alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/services`])) } };
}

// Monthly support prices per service tier
const supportPrices: Record<string, number> = {
  landing: 100,
  business: 100,
  store: 200,
  custom: 200,
};

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const loc = locale as Locale;
  const always = [1, 2, 3, 4, 5, 6].map((n) => dict[`services.always.${n}`]);
  const processSteps = [1, 2, 3, 4, 5].map((n) => ({ title: dict[`services.process.${n}.title`], when: dict[`services.process.${n}.when`], body: dict[`services.process.${n}.body`] }));
  const faqData = faqItems.map((item) => ({ question: tl(item.question, loc), answer: tl(item.answer, loc) }));

  const tiers = [
    { key: "basic", features: dict["services.maintenance.basic.features"] },
    { key: "standard", features: dict["services.maintenance.standard.features"] },
    { key: "growth", features: dict["services.maintenance.growth.features"] },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-bg">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] pt-[48px] md:pt-[64px] pb-[48px]">
          <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.02em]">{dict["services.heading"]}</h1>
          <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px] max-w-[60ch]">{dict["services.sub"]}</p>
        </div>
      </section>

      {/* Service cards — 2x2 grid with support upsell line (#6) */}
      <section className="bg-bg">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] pb-[64px]">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              {services.map((s) => (
                <RevealItem key={s.slug}>
                  <div className="bg-bg border border-border rounded-[12px] p-[24px] h-full flex flex-col">
                    <h2 className="font-serif text-[22px] font-normal leading-[1.2] tracking-[-0.02em]">{tl(s.name, loc)}</h2>
                    <p className="text-[14px] text-text-muted mt-[6px]">{tl(s.description, loc)}</p>
                    <div className="mt-auto pt-[20px] space-y-[8px]">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[13px] text-text-muted">{s.priceLabel ? "" : dict["common.from"]}</span>
                        <span className="font-serif text-[22px]">{s.priceLabel ? tl(s.priceLabel, loc) : `${s.priceFrom} AZN`}</span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[13px] text-text-muted">{dict["services.timeline.label"]}</span>
                        <span className="text-[14px] font-medium">{tl(s.timeline, loc)}</span>
                      </div>
                      {/* Support upsell line */}
                      <div className="flex items-baseline justify-between">
                        <span className="text-[12px] text-text-faint">{dict["services.maintenance.supportLine"]}</span>
                        <span className="text-[12px] text-accent">{supportPrices[s.slug] || 100} {dict["services.maintenance.perMonth"]}</span>
                      </div>
                      <div className="border-t border-border pt-[8px] mt-[8px]">
                        <span className="text-[12px] text-text-faint">{dict["services.bestFor.label"]}: {tl(s.bestFor, loc)}</span>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Always included */}
      <section className="bg-surface-alt">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
          <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["services.always.heading"]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mt-[32px]">
            {always.map((item, i) => (
              <div key={i} className="flex items-start gap-[8px]"><Check size={16} className="text-success mt-[4px] flex-shrink-0" strokeWidth={2} /><span className="text-[15px]">{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Care plans — 3 tiers with equal visual weight (#1, #2, #3) */}
      <section className="bg-bg">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
          <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["services.maintenance.heading"]}</h2>
          <p className="text-[16px] text-text-muted mt-[12px] max-w-[60ch]">{dict["services.maintenance.body"]}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mt-[32px] pt-[14px]">
            {(["basic", "standard", "growth"] as const).map((tier, i) => {
              const name = dict[`services.maintenance.${tier}.name`];
              const price = dict[`services.maintenance.${tier}.price`];
              // Features stored as comma-joined string from flattened JSON
              const features: string[] = [];
              for (let j = 0; j < 5; j++) {
                const key = `services.maintenance.${tier}.features.${j}`;
                if (dict[key]) features.push(dict[key]);
              }

              return (
                <div key={tier} className={`bg-bg rounded-[12px] p-[24px] flex flex-col relative ${i === 1 ? "border-2 border-accent" : "border border-border"}`}>
                  {i === 1 && <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-accent text-white text-[12px] font-medium px-[12px] py-[4px] rounded-[999px] whitespace-nowrap">{dict["common.mostPopular"]}</span>}
                  <h3 className="font-serif text-[20px] font-normal">{name}</h3>
                  <p className="text-[14px] text-text-muted mt-[6px]">{dict[`services.maintenance.${tier}.desc`]}</p>
                  <div className="flex items-baseline gap-[4px] mt-[12px]">
                    <span className="font-serif text-[28px]">{price}</span>
                    <span className="text-[14px] text-text-muted">{dict["services.maintenance.perMonth"]}</span>
                  </div>
                  <div className="border-t border-border my-[16px]" />
                  <div className="space-y-[8px] flex-1">
                    {features.map((f, j) => (
                      <div key={j} className="flex items-start gap-[8px]">
                        <Check size={14} className="text-success mt-[3px] flex-shrink-0" strokeWidth={2} />
                        <span className="text-[14px]">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface-alt">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
          <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em] md:text-center">{dict["services.process.heading"]}</h2>

          {/* Mobile: left-aligned with line */}
          <div className="md:hidden relative mt-[32px] pl-[40px]">
            <div className="absolute left-[17px] top-0 bottom-0 w-[1px] bg-border" />
            {processSteps.map((step, i) => (
              <div key={i} className="relative pb-[32px] last:pb-0">
                <div className="absolute left-[-40px] w-[36px] h-[36px] rounded-full bg-accent text-white flex items-center justify-center text-[15px] font-semibold z-10">{i + 1}</div>
                <div className="flex items-baseline gap-[8px]">
                  <h3 className="font-serif text-[20px] font-normal leading-[1.3]">{step.title}</h3>
                  <span className="text-[13px] text-text-faint">{step.when}</span>
                </div>
                <p className="text-[15px] text-text-muted mt-[6px]">{step.body}</p>
                {i === processSteps.length - 1 && (
                  <p className="text-[13px] text-text-faint italic mt-[6px]">{dict["services.maintenance.body"]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: alternating roadmap */}
          <div className="hidden md:block relative mt-[48px] max-w-[800px] mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="relative grid grid-cols-[1fr_48px_1fr] mb-[40px] last:mb-0">
                  {/* Left side */}
                  <div className={isLeft ? "text-right pr-[24px]" : ""}>
                    {isLeft && (
                      <>
                        <div className="flex items-baseline gap-[8px] justify-end">
                          <span className="text-[13px] text-text-faint">{step.when}</span>
                          <h3 className="font-serif text-[20px] font-normal leading-[1.3]">{step.title}</h3>
                        </div>
                        <p className="text-[15px] text-text-muted mt-[8px]">{step.body}</p>
                        {i === processSteps.length - 1 && (
                          <p className="text-[13px] text-text-faint italic mt-[8px]">{dict["services.maintenance.body"]}</p>
                        )}
                      </>
                    )}
                  </div>
                  {/* Circle */}
                  <div className="flex justify-center">
                    <div className="w-[36px] h-[36px] rounded-full bg-accent text-white flex items-center justify-center text-[15px] font-semibold relative z-10">{i + 1}</div>
                  </div>
                  {/* Right side */}
                  <div className={!isLeft ? "pl-[24px]" : ""}>
                    {!isLeft && (
                      <>
                        <div className="flex items-baseline gap-[8px]">
                          <h3 className="font-serif text-[20px] font-normal leading-[1.3]">{step.title}</h3>
                          <span className="text-[13px] text-text-faint">{step.when}</span>
                        </div>
                        <p className="text-[15px] text-text-muted mt-[8px]">{step.body}</p>
                        {i === processSteps.length - 1 && (
                          <p className="text-[13px] text-text-faint italic mt-[8px]">{dict["services.maintenance.body"]}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section className="bg-bg">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
          <PriceEstimator locale={loc} dict={dict} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-alt">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
          <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em] mb-[32px]">{dict["services.faq.heading"]}</h2>
          <Accordion items={faqData} />
        </div>
      </section>
    </div>
  );
}
