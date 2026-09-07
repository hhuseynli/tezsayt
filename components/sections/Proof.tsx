import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { TestimonialStrip } from "./TestimonialStrip";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import type { Locale } from "@/lib/constants";
import { tl } from "@/content/types";

type ProofProps = { locale: Locale; dict: Record<string, string> };

export function Proof({ locale, dict }: ProofProps) {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="bg-surface-alt">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
        <ScrollReveal>
          <RevealItem>
            <div className="flex items-baseline justify-between">
              <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-text-muted">{dict["home.proof.label"]}</p>
              <Link href={`/${locale}/work`} className="inline-flex items-center gap-[4px] text-accent font-medium hover:underline text-[15px]">
                {dict["common.seeAll"]} <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="mt-[32px]">
              <div className="hidden md:grid grid-cols-3 gap-[20px]">
                {featured.map((p) => (
                  <ProjectCard key={p.slug} client={p.client} industry={tl(p.industry, locale)} description={tl(p.description, locale)} image={p.image} url={p.url} viewSiteLabel={dict["common.viewSite"]} tags={p.tags.map((t) => tl(t, locale))} />
                ))}
              </div>
              <div className="md:hidden flex gap-[16px] overflow-x-auto snap-x snap-mandatory pl-[20px] -mx-[20px] pr-[20px] pb-[8px]">
                {featured.map((p) => (
                  <div key={p.slug} className="snap-start flex-shrink-0 w-[80vw]">
                    <ProjectCard client={p.client} industry={tl(p.industry, locale)} description={tl(p.description, locale)} image={p.image} url={p.url} viewSiteLabel={dict["common.viewSite"]} tags={p.tags.map((t) => tl(t, locale))} />
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="mt-[48px]">
              <TestimonialStrip locale={locale} moreLabel={dict["home.proof.moreFromClients"]} />
            </div>
          </RevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
}
