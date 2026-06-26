import { clsx } from "clsx";

interface MiniCardProps {
  label: string;
  value: string;
  className?: string;
}

export function MiniCard({ label, value, className }: MiniCardProps) {
  return (
    <div className={clsx("surface-muted px-3 py-3 flex flex-col gap-1.5", className)}>
      <span className="text-xs text-muted-foreground/70 leading-none">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}
