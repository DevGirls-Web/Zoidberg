import { clsx } from "clsx";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "brand" | "white";
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: "size-5 border-2",
  md: "size-8 border-2",
  lg: "size-12 border-[3px]",
};

const colorClasses = {
  brand: "border-[#E8F5F0] border-t-[#2D9B7A]",
  white: "border-white/30 border-t-white",
};

export function Loader({ size = "md", color = "brand", label, className }: LoaderProps) {
  return (
    <div className={clsx("flex flex-col items-center gap-3", className)}>
      <div
        className={clsx(
          "rounded-full animate-spin",
          sizeClasses[size],
          colorClasses[color]
        )}
      />
      {label && (
        <p className="text-sm text-[rgba(26,46,40,0.6)] font-medium">{label}</p>
      )}
    </div>
  );
}
