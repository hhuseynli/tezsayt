import { Search, Lock, MessageSquare, Building2 } from "lucide-react";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

const icons = [Search, Lock, MessageSquare, Building2];

export function WhyWebsite({ dict }: { dict: Record<string, string> }) {
  const points = [1, 2, 3, 4].map((n) => ({
    title: dict[`home.why.p${n}.title`], body: dict[`home.why.p${n}.body`], Icon: icons[n - 1],
  }));

  return (
    <section className="bg-surface-alt">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
        <ScrollReveal>
          <RevealItem>
            <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em] max-w-[24ch]">{dict["home.why.heading"]}</h2>
            <p className="text-[18px] leading-[1.6] text-text-muted mt-[16px] max-w-[60ch]">{dict["home.why.intro"]}</p>
          </RevealItem>
          <RevealItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-[48px]">
              {points.map((point, i) => (
                <div key={i} className="border border-border rounded-[12px] p-[24px] bg-bg">
                  <point.Icon size={24} className="text-accent" strokeWidth={1.75} />
                  <h3 className="font-serif text-[20px] font-normal leading-[1.3] mt-[12px]">{point.title}</h3>
                  <p className="text-[15px] text-text-muted mt-[8px]">{point.body}</p>
                </div>
              ))}
            </div>
          </RevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
}
