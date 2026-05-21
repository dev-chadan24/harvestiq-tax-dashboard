import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string) => void;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", onChange, error = false, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <input
        ref={ref}
        type={type}
        onChange={handleChange}
        className={twMerge(
          clsx(
            "flex h-9 w-full rounded-lg border bg-zinc-950/90 px-3 py-1 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/80 disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border-zinc-800/80 focus:border-zinc-600 hover:border-zinc-700/80":
                !error,
              "border-rose-500/80 focus:border-rose-500 text-rose-400 bg-rose-950/5":
                error,
            },
            className
          )
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
