import type { Metadata } from "next";
import { LOCALES, SITE_URL, type Locale } from "@/lib/constants";
import { getDictionary, t } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { Proof } from "@/components/sections/Proof";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyWebsite } from "@/components/sections/WhyWebsite";
import { Pricing } from "@/components/sections/Pricing";
import { Team } from "@/components/sections/Team";
import { ContactSection } from "@/components/sections/ContactSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: t(dict, "home.meta.title"),
    description: t(dict, "home.meta.desc"),
    openGraph: {
      title: t(dict, "og.title"),
      description: t(dict, "og.desc"),
      locale,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const loc = locale as Locale;

  return (
    <>
      <Hero locale={loc} dict={dict} />
      <Proof locale={loc} dict={dict} />
      <HowItWorks dict={dict} />
      <WhyWebsite dict={dict} />
      <Pricing locale={loc} dict={dict} />
      <Team locale={loc} dict={dict} />
      <ContactSection locale={loc} dict={dict} />
    </>
  );
}
