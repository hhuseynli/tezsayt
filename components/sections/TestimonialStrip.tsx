import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import type { Locale } from "@/lib/constants";
import { tl } from "@/content/types";

export function TestimonialStrip({ locale, moreLabel }: { locale: Locale; moreLabel: string }) {
  if (testimonials.length === 0) return null;
  const shown = testimonials.slice(0, 2);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
        {shown.map((t) => (
          <TestimonialCard key={t.id} quote={tl(t.quote, locale)} name={t.name} role={tl(t.role, locale)} business={t.business} photo={t.photo} logo={t.logo} />
        ))}
      </div>
      {testimonials.length > 2 && (
        <Link href={`/${locale}/work#testimonials`} className="inline-flex items-center gap-[4px] text-accent font-medium mt-[16px] hover:underline">
          {moreLabel} <ArrowRight size={16} strokeWidth={1.75} />
        </Link>
      )}
    </div>
  );
}
