import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/constants";
import { getDictionary, t } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { waLink } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: t(dict, "thanks.heading"), robots: { index: false } };
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const loc = locale as Locale;

  return (
    <section className="bg-bg">
      <div className="max-w-[560px] mx-auto px-[20px] md:px-[24px] py-[96px] md:py-[128px] text-center">
        <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.02em]">{dict["thanks.heading"]}</h1>
        <p className="text-[18px] leading-[1.6] text-text-muted mt-[16px]">{dict["thanks.body"]}</p>
        <div className="flex flex-col sm:flex-row gap-[12px] mt-[32px] justify-center">
          <Button variant="secondary" href={waLink(loc)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />}>WhatsApp</Button>
        </div>
        <Link href={`/${locale}`} className="inline-block text-accent font-medium hover:underline mt-[24px]">{dict["thanks.back"]}</Link>
      </div>
    </section>
  );
}
