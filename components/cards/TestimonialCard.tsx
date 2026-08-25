import Image from "next/image";
import { Quote } from "lucide-react";

type TestimonialCardProps = { quote: string; name: string; role: string; business: string; photo: string | null; logo: string | null };

export function TestimonialCard({ quote, name, role, business, photo, logo }: TestimonialCardProps) {
  return (
    <div className="bg-surface border border-border rounded-[12px] p-[24px]">
      <Quote size={20} className="text-accent opacity-40" strokeWidth={1.75} />
      <p className="text-[16px] text-text mt-[12px] leading-[1.6]">{quote}</p>
      <div className="flex items-center gap-[12px] mt-[20px]">
        {photo ? (
          <Image src={photo} alt={name} width={40} height={40} className="w-[40px] h-[40px] rounded-full object-cover" />
        ) : logo ? (
          <Image src={logo} alt={business} width={40} height={40} className="h-[40px] w-auto object-contain" />
        ) : null}
        <div>
          <p className="text-[15px] font-medium">{name}</p>
          <p className="text-[13px] text-text-muted">{role}, {business}</p>
        </div>
      </div>
    </div>
  );
}
