import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover active:scale-[0.98]",
  secondary: "bg-surface text-text border border-border-strong hover:bg-surface-alt",
  ghost: "text-accent font-medium hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-[20px] py-[12px] text-[16px]",
  lg: "px-[28px] py-[16px] text-[18px]",
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "default",
    icon,
    children,
    className,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-[8px] font-medium transition-all duration-200 rounded-[8px]",
    variant !== "ghost" && sizeStyles[size],
    variantStyles[variant],
    className
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} {...anchorProps}>
        {icon && <span className="w-[18px] h-[18px] flex-shrink-0">{icon}</span>}
        {children}
      </a>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof ButtonBaseProps>;
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...buttonProps}>
      {icon && <span className="w-[18px] h-[18px] flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
});
