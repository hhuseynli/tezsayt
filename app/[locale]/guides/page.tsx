import type { Metadata } from "next";
import { LOCALES, SITE_URL, type Locale } from "@/lib/constants";
import { getDictionary, t } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: t(dict, "guides.meta.title"),
    description: t(dict, "guides.meta.desc"),
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}/guides`])
      ),
    },
  };
}

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <section className="bg-bg">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
        <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.02em]">
          {dict["guides.heading"]}
        </h1>
        <p className="text-[18px] leading-[1.6] text-text-muted mt-[16px]">
          {dict["guides.empty"]}
        </p>
      </div>
    </section>
  );
}
