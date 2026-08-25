import { cn } from "@/lib/utils";

type BadgeProps = {
  variant?: "default" | "accent";
  children: React.ReactNode;
  className?: string;
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-[10px] py-[4px] rounded-[999px] text-[12px] font-medium",
        variant === "accent"
          ? "bg-accent-bg text-accent border border-accent-border"
          : "bg-surface-alt text-text-muted border border-border",
        className
      )}
    >
      {children}
    </span>
  );
}
