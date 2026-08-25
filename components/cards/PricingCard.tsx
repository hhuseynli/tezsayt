type PricingCardProps = {
  name: string; priceFrom: number; timeline: string; bestFor: string;
  isPopular?: boolean; popularLabel?: string; fromLabel: string; readyInLabel: string; goodForLabel: string;
};

export function PricingCard({ name, priceFrom, timeline, bestFor, isPopular, popularLabel, fromLabel, readyInLabel, goodForLabel }: PricingCardProps) {
  return (
    <div className={`bg-surface rounded-[12px] p-[24px] flex flex-col relative ${isPopular ? "border-2 border-accent" : "border border-border"}`}>
      {isPopular && popularLabel && (
        <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-accent text-white text-[12px] font-medium px-[12px] py-[4px] rounded-[999px] whitespace-nowrap">{popularLabel}</span>
      )}
      <h3 className="font-serif text-[20px] font-normal leading-[1.3]">{name}</h3>
      <div className="flex items-baseline gap-[4px] mt-[12px]">
        <span className="text-[13px] text-text-muted">{fromLabel}</span>
        <span className="font-serif text-[32px] font-normal">{priceFrom}</span>
        <span className="text-[16px] font-medium text-text-muted">AZN</span>
      </div>
      <div className="border-t border-border my-[20px]" />
      <div>
        <span className="text-[13px] text-text-muted">{readyInLabel}</span>
        <p className="text-[15px] font-medium mt-[4px]">{timeline}</p>
      </div>
      <div className="mt-[12px]">
        <span className="text-[13px] text-text-muted">{goodForLabel}</span>
        <p className="text-[15px] mt-[4px]">{bestFor}</p>
      </div>
    </div>
  );
}
