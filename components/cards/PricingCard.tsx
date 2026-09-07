import { FileText, Briefcase, ShoppingBag, Wrench } from "lucide-react";

const slugIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  landing: FileText,
  business: Briefcase,
  store: ShoppingBag,
  custom: Wrench,
};

type PricingCardProps = {
  slug?: string;
  name: string;
  priceFrom: number;
  priceLabel?: string;
  timeline: string;
  bestFor: string;
  includes?: string[];
  isPopular?: boolean;
  popularLabel?: string;
  fromLabel: string;
  readyInLabel: string;
  goodForLabel: string;
  includesLabel?: string;
};

export function PricingCard({
  slug, name, priceFrom, priceLabel, timeline, bestFor, includes,
  isPopular, popularLabel, fromLabel, readyInLabel, goodForLabel, includesLabel,
}: PricingCardProps) {
  const Icon = slug ? slugIcons[slug] || FileText : FileText;

  return (
    <div className={`bg-surface rounded-[12px] p-[24px] md:p-[28px] flex flex-col relative ${isPopular ? "border-2 border-accent" : "border border-border"}`}>
      {isPopular && popularLabel && (
        <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-accent text-white text-[12px] font-medium px-[12px] py-[4px] rounded-[999px] whitespace-nowrap">{popularLabel}</span>
      )}

      {/* Icon */}
      <div className="w-[40px] h-[40px] rounded-[10px] bg-accent-bg flex items-center justify-center mb-[16px]">
        <Icon size={20} strokeWidth={1.75} className="text-accent" />
      </div>

      {/* Name */}
      <h3 className="font-serif text-[20px] font-normal leading-[1.3]">{name}</h3>

      {/* Price */}
      <div className="flex items-baseline gap-[4px] mt-[12px]">
        {priceLabel ? (
          <span className="text-[16px] font-medium text-text-muted">{priceLabel}</span>
        ) : (
          <>
            <span className="text-[13px] text-text-muted">{fromLabel}</span>
            <span className="font-serif text-[32px] font-normal">{priceFrom}</span>
            <span className="text-[16px] font-medium text-text-muted">AZN</span>
          </>
        )}
      </div>

      <div className="border-t border-border my-[20px]" />

      {/* Timeline */}
      <div>
        <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-text-faint">{readyInLabel}</span>
        <p className="text-[15px] font-medium mt-[4px]">{timeline}</p>
      </div>

      {/* Best for */}
      <div className="mt-[14px]">
        <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-text-faint">{goodForLabel}</span>
        <p className="text-[14px] text-text-muted mt-[4px] leading-[1.5]">{bestFor}</p>
      </div>

      {/* Includes */}
      {includes && includes.length > 0 && (
        <div className="mt-[14px]">
          <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-text-faint">{includesLabel || "Includes"}</span>
          <ul className="mt-[6px] space-y-[4px]">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-[6px] text-[14px] text-text-muted leading-[1.5]">
                <span className="text-accent mt-[2px]">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
