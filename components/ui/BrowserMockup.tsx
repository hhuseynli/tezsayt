import Image from "next/image";
import { cn } from "@/lib/utils";

type BrowserMockupProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function BrowserMockup({ src, alt, priority = false, className }: BrowserMockupProps) {
  return (
    <div className={cn("border border-border rounded-[10px] shadow-[var(--shadow-card)] overflow-hidden bg-surface", className)}>
      <div className="h-[32px] bg-surface-alt border-b border-border flex items-center pl-[12px] gap-[6px]">
        <div className="w-[10px] h-[10px] rounded-full bg-[#E5E5E3]" />
        <div className="w-[10px] h-[10px] rounded-full bg-[#E5E5E3]" />
        <div className="w-[10px] h-[10px] rounded-full bg-[#E5E5E3]" />
      </div>
      <Image src={src} alt={alt} width={1120} height={700} className="w-full h-auto object-cover object-top" style={{ aspectRatio: "16/10" }} priority={priority} />
    </div>
  );
}
