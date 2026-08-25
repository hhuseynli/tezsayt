import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-[9px]", className)}>
      <div className="w-[22px] h-[1px] bg-accent" />
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.20em] text-accent">
        {children}
      </span>
    </div>
  );
}
