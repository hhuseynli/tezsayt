import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/icons/WhatsApp";
import { Instagram } from "@/components/ui/icons/Instagram";
import { waLink, igLink } from "@/lib/utils";
import type { Locale } from "@/lib/constants";

type BlogCtaProps = {
  locale: Locale;
  heading: string;
  body: string;
  whatsappLabel: string;
  instagramLabel: string;
};

export function BlogCta({ locale, heading, body, whatsappLabel, instagramLabel }: BlogCtaProps) {
  return (
    <div className="mt-[48px] border border-border rounded-[12px] p-[24px] bg-surface-alt">
      <p className="font-serif text-[20px] font-normal leading-[1.3]">{heading}</p>
      <p className="text-[15px] text-text-muted mt-[8px]">{body}</p>
      <div className="mt-[16px] flex flex-col sm:flex-row gap-[8px]">
        <Button variant="primary" href={waLink(locale)} target="_blank" rel="noopener noreferrer" icon={<WhatsApp />}>
          {whatsappLabel}
        </Button>
        <Button variant="secondary" href={igLink()} target="_blank" rel="noopener noreferrer" icon={<Instagram />}>
          {instagramLabel}
        </Button>
      </div>
    </div>
  );
}
