import { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

type CardVariant = "default" | "tinted" | "accent";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
  default: "surface-card bg-card",
  tinted: "surface-subtle bg-muted",
  accent: "surface-accent bg-brand-light",
};

const paddingClasses = {
  sm: "p-6",
  md: "p-8",
  lg: "p-8",
};

export function Card({
  variant = "default",
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx("rounded-card overflow-hidden relative", variantClasses[variant], paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  titleIcon?: ReactNode;
  action?: ReactNode;
}

export function CardHeader({ title, titleIcon, action, className, ...props }: CardHeaderProps) {
  return (
    <div className={clsx("flex items-center justify-between w-full", className)} {...props}>
      <div className="flex items-center gap-2">
        {titleIcon && <span className="text-brand shrink-0">{titleIcon}</span>}
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
