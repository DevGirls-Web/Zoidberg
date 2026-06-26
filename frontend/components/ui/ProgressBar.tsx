import { clsx } from "clsx";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: "brand" | "alert" | "success";
  className?: string;
}

const colorClasses = {
  brand: "progress-fill",
  alert: "progress-fill progress-fill-alert",
  success: "progress-fill progress-fill-success",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  color = "brand",
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx("flex flex-col gap-2 w-full", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
          {showValue && <span className="text-sm font-semibold text-foreground">{value}%</span>}
        </div>
      )}
      <div className="progress-track">
        <div className={clsx("h-full rounded-full transition-all duration-700", colorClasses[color])} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
