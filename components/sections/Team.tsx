import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { team } from "@/content/team";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import type { Locale } from "@/lib/constants";
import { tl } from "@/content/types";

export function Team({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  return (
    <section className="bg-surface-alt">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-[48px] items-start">
            {/* Left: text */}
            <RevealItem>
              <div>
                <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em]">{dict["home.team.heading"]}</h2>
                <p className="text-[16px] leading-[1.6] mt-[20px] max-w-[50ch]">{dict["home.team.body1"]}</p>
                <p className="text-[16px] leading-[1.6] mt-[16px] max-w-[50ch]">{dict["home.team.body2"]}</p>

                <Link href={`/${locale}/about`} className="inline-flex items-center gap-[4px] text-accent font-medium mt-[24px] hover:underline">
                  {dict["home.team.aboutLink"]} <ArrowRight size={16} strokeWidth={1.75} />
                </Link>
              </div>
            </RevealItem>

            {/* Right: team member photos */}
            <RevealItem>
              <div className="grid grid-cols-2 gap-[16px] md:mt-[64px]">
                {team.map((member, i) => (
                  <div key={i}>
                    <div className="aspect-square rounded-[12px] overflow-hidden">
                      {member.photo.includes("member") ? (
                        <div className="w-full h-full bg-surface border border-border flex items-center justify-center">
                          <span className="text-[13px] text-text-faint">Şəkil tezliklə</span>
                        </div>
                      ) : (
                        <Image src={member.photo} alt={member.name} width={400} height={400} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <p className="text-[15px] font-medium mt-[12px]">{member.name}</p>
                    <p className="text-[13px] text-text-muted">{tl(member.role, locale)}</p>
                  </div>
                ))}
              </div>
            </RevealItem>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
