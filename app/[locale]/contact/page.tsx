import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { LOCALES, SITE_URL, TELEGRAM_HANDLE, EMAIL, type Locale } from "@/lib/constants";
import { getDictionary, t } from "@/lib/i18n";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/Button";
import { Instagram } from "@/components/ui/icons/Instagram";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { waLink, igLink } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: t(dict, "contact.meta.title"), description: t(dict, "contact.meta.desc"), alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/contact`])) } };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const loc = locale as Locale;

  return (
    <section className="bg-bg">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[64px]">
          <div>
            <h1 className="font-serif text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-[-0.02em]">{dict["contact.heading"]}</h1>
            <p className="text-[18px] leading-[1.6] text-text-muted mt-[12px] max-w-[60ch]">{dict["contact.body"]}</p>
            <div className="flex flex-col sm:flex-row gap-[12px] mt-[32px]">
              <Button variant="primary" href={igLink()} target="_blank" rel="noopener noreferrer" icon={<Instagram />}>{dict["common.instagram"]}</Button>
              <Button variant="secondary" href={waLink(loc)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />}>{dict["common.whatsapp"]}</Button>
            </div>
            <p className="text-[13px] text-text-faint mt-[16px]">{dict["contact.response"]}</p>
          </div>
          <div>
            <h2 className="font-serif text-[20px] font-normal mb-[24px]">{dict["contact.form.heading"]}</h2>
            <ContactForm locale={loc} dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
