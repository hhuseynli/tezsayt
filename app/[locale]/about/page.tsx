import type { Metadata } from "next";
import Image from "next/image";
import { LOCALES, SITE_URL, type Locale } from "@/lib/constants";
import { getDictionary, t } from "@/lib/i18n";
import { team } from "@/content/team";
import { Button } from "@/components/ui/Button";
import { Instagram } from "@/components/ui/icons/Instagram";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { Search, Lock, Zap, MapPin } from "lucide-react";
import { waLink, igLink } from "@/lib/utils";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { tl } from "@/content/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: t(dict, "about.meta.title"), description: t(dict, "about.meta.desc"), alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/about`])) } };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const loc = locale as Locale;
  const values = [1, 2, 3, 4].map((n) => ({ title: dict[`about.values.${n}.title`], body: dict[`about.values.${n}.body`] }));

  return (
    <div>
      <section className="bg-bg">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] pt-[48px] md:pt-[64px] pb-[64px] md:pb-[96px]">
          <ScrollReveal>
            <RevealItem>
              <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.02em]">{dict["about.heading"]}</h1>
              <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px] max-w-[60ch]">{dict["about.intro"]}</p>
            </RevealItem>
            <RevealItem>
              <div className="mt-[48px] md:grid md:grid-cols-[45%_55%] md:gap-[48px] md:items-center">
                {/* Left: team photos */}
                <div className="md:mt-[64px]">
                  <div className="grid grid-cols-2 gap-[16px] md:gap-[24px]">
                    {team.map((member, i) => (
                      <div key={`story-${i}`}>
                        <div className="aspect-square rounded-[12px] overflow-hidden">
                          <Image src={member.photo} alt={member.name} width={400} height={400} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[15px] font-medium mt-[8px]">{member.name}</p>
                        <p className="text-[13px] text-text-muted">{tl(member.role, loc)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right: story text */}
                <div className="mt-[24px] md:mt-0">
                  <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["about.story.heading"]}</h2>
                  <div className="mt-[20px] space-y-[16px]">
                    <p className="text-[16px] leading-[1.6]">{dict["about.story.body1"]}</p>
                    <p className="text-[16px] leading-[1.6]">{dict["about.story.body2"]}</p>
                    <p className="text-[16px] leading-[1.6]">{dict["about.story.body3"]}</p>
                  </div>
                </div>
              </div>
            </RevealItem>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
          <div className="md:grid md:grid-cols-2 md:gap-[48px] md:items-start">
            {/* Left: text */}
            <div>
              <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["about.why.heading"]}</h2>
              <p className="text-[16px] leading-[1.6] text-text-muted mt-[16px]">{dict["about.why.body"]}</p>
            </div>

            {/* Right: comparison visualization */}
            <div className="mt-[32px] md:mt-0">
              <div className="grid grid-cols-[1fr_1fr] gap-0 rounded-[12px] border border-border overflow-hidden">
                {/* Header row */}
                <div className="p-[16px] bg-surface-alt border-b border-r border-border text-center">
                  <p className="text-[13px] text-text-faint">{dict["about.comparison.traditional"]}</p>
                </div>
                <div className="p-[16px] bg-accent-bg border-b border-border text-center">
                  <p className="text-[13px] font-medium text-accent">{dict["about.comparison.tezsayt"]}</p>
                </div>

                {/* Timeline row */}
                <div className="p-[16px] border-b border-r border-border bg-surface text-center">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-text-faint">{dict["about.comparison.timeline"]}</p>
                  <p className="text-[16px] mt-[4px]">{dict["about.comparison.tradTimeline"]}</p>
                </div>
                <div className="p-[16px] border-b border-border bg-surface text-center">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-text-faint">{dict["about.comparison.timeline"]}</p>
                  <p className="text-[16px] font-medium mt-[4px]">{dict["about.comparison.ourTimeline"]}</p>
                </div>

                {/* Cost row */}
                <div className="p-[16px] border-b border-r border-border bg-surface text-center">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-text-faint">{dict["about.comparison.cost"]}</p>
                  <p className="text-[16px] mt-[4px]">{dict["about.comparison.tradCost"]}</p>
                </div>
                <div className="p-[16px] border-b border-border bg-surface text-center">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-text-faint">{dict["about.comparison.cost"]}</p>
                  <p className="text-[16px] font-medium mt-[4px]">{dict["about.comparison.ourCost"]}</p>
                </div>

                {/* Preview row */}
                <div className="p-[16px] border-r border-border bg-surface text-center">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-text-faint">{dict["about.comparison.preview"]}</p>
                  <p className="text-[16px] mt-[4px]">{dict["about.comparison.tradPreview"]}</p>
                </div>
                <div className="p-[16px] bg-surface text-center">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-text-faint">{dict["about.comparison.preview"]}</p>
                  <p className="text-[16px] font-medium text-accent mt-[4px]">{dict["about.comparison.ourPreview"]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-alt">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
          <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["about.values.heading"]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-[32px]">
            {values.map((v, i) => {
              const Icons = [Search, Zap, Lock, MapPin];
              const Icon = Icons[i];
              return (
                <div key={i} className="border border-border rounded-[12px] p-[24px] bg-bg">
                  <Icon size={24} className="text-accent" strokeWidth={1.75} />
                  <h3 className="font-serif text-[20px] font-normal leading-[1.3] mt-[12px]">{v.title}</h3>
                  <p className="text-[15px] text-text-muted mt-[8px]">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-bg">
        <div className="max-w-[560px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px] text-center">
          <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["home.contact.heading"]}</h2>
          <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px]">{dict["home.contact.body"]}</p>
          <div className="flex flex-col sm:flex-row gap-[12px] mt-[32px] justify-center">
            <Button variant="primary" href={igLink()} target="_blank" rel="noopener noreferrer" icon={<Instagram />}>{dict["common.instagram"]}</Button>
            <Button variant="secondary" href={waLink(loc)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />}>{dict["common.whatsapp"]}</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
