import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-surface border border-border rounded-[12px] shadow-[var(--shadow-card)]", className)}>
      {children}
    </div>
  );
}
