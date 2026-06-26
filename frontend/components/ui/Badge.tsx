import { HTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

type BadgeVariant = "brand" | "pneumonia" | "normal" | "model" | "muted";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  brand: "bg-brand-light border border-border text-brand",
  pneumonia: "bg-alert-light border border-[rgba(244,114,182,0.2)] text-alert",
  normal: "bg-[rgba(76,175,140,0.14)] border border-[rgba(76,175,140,0.2)] text-success",
  model: "bg-brand-light border border-border text-brand text-xs",
  muted: "bg-background border border-border text-muted-foreground",
};

const dotColors: Record<BadgeVariant, string> = {
  brand: "bg-brand",
  pneumonia: "bg-alert",
  normal: "bg-success",
  model: "bg-brand",
  muted: "bg-muted-foreground/40",
};

export function Badge({
  variant = "brand",
  dot = false,
  icon,
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span className={clsx("badge-base", variantClasses[variant], className)} {...props}>
      {dot && <span className={clsx("shrink-0 size-2 rounded-full", dotColors[variant])} />}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
