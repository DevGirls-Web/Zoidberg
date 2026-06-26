import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, leftIcon, rightElement, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={inputId} className="field-label">
            {label}
          </label>
        )}

        <div className="relative w-full">
          {leftIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand/50 flex items-center pointer-events-none z-10">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={clsx(
              "field-input py-[18px] text-base",
              leftIcon ? "pl-12 pr-4" : "px-4",
              rightElement ? "pr-12" : "",
              error && "border-destructive focus:border-destructive focus:shadow-[0_0_0_4px_rgba(244,114,182,0.16)]",
              className
            )}
            {...props}
          />

          {rightElement && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">{rightElement}</span>
          )}
        </div>

        {error && <p className="text-xs field-error mt-0.5">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
