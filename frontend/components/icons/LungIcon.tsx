import { clsx } from "clsx";

interface LungIconProps {
  size?: number;
  color?: string;
  className?: string;
  variant?: "solid" | "outline";
  strokeWidth?: number;
}

export function LungIcon({
  size = 24,
  color = "white",
  className,
  variant = "solid",
  strokeWidth = 1.5,
}: LungIconProps) {
  if (variant === "outline") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        className={className}
        aria-hidden
      >
        {/* Trachea */}
        <line x1="24" y1="4" x2="24" y2="16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        {/* Left bronchus */}
        <path
          d="M24 16 C22 16 18 17 15 19 C10 22 7 27 7 33 C7 39 10 44 15 44 C19 44 21 41 21 38 L21 24"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left lobe detail */}
        <path
          d="M21 24 C20 21 16 20 13 22"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Right bronchus */}
        <path
          d="M24 16 C26 16 30 17 33 19 C38 22 41 27 41 33 C41 39 38 44 33 44 C29 44 27 41 27 38 L27 24"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right lobe detail */}
        <path
          d="M27 24 C28 21 32 20 35 22"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Lower lobe lines */}
        <path d="M11 36 C13 34 18 34 21 36" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.5" />
        <path d="M37 36 C35 34 30 34 27 36" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity="0.5" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={Math.round(size * 0.8)}
      viewBox="0 0 30 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 1.5C15 1.5 13.8 0.8 12.5 1.5C10.8 2.5 10.8 4.5 10.8 6V10.5C8.2 11.5 5 14 5 18C5 21.5 7.2 23.5 9.8 23.5C12 23.5 13.5 22 13.5 20V14.5L15 13.5L16.5 14.5V20C16.5 22 18 23.5 20.2 23.5C22.8 23.5 25 21.5 25 18C25 14 21.8 11.5 19.2 10.5V6C19.2 4.5 19.2 2.5 17.5 1.5C16.2 0.8 15 1.5 15 1.5Z"
        fill={color}
      />
    </svg>
  );
}

export function LungLogo({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "size-12 rounded-[12px] bg-[#2D9B7A] flex items-center justify-center shrink-0",
        "shadow-[0px_10px_15px_-3px_rgba(45,155,122,0.2),0px_4px_6px_-4px_rgba(45,155,122,0.2)]",
        className
      )}
    >
      <LungIcon size={28} color="white" variant="solid" />
    </div>
  );
}
