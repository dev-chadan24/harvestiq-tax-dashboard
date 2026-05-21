import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Check, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CheckboxProps {
  id?: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  indeterminate = false,
  onChange,
  disabled = false,
  className,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  const isActive = checked || indeterminate;

  return (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      onKeyDown={handleKeyDown}
      className="relative focus:outline-none select-none"
    >
      <motion.div
        className={twMerge(
          clsx(
            "w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300",
            {
              "bg-gradient-to-br from-blue-500 to-indigo-600 border-transparent shadow-[0_0_12px_rgba(59,130,246,0.3)]":
                isActive && !disabled,
              "border-zinc-700 bg-zinc-900/60 hover:border-zinc-500":
                !isActive && !disabled,
              "bg-zinc-800 border-zinc-700 text-zinc-500 opacity-50 cursor-not-allowed":
                disabled,
            },
            className
          )
        )}
        whileHover={disabled ? {} : { scale: 1.05 }}
        whileTap={disabled ? {} : { scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <AnimatePresence mode="wait">
          {checked && !indeterminate && (
            <motion.div
              key="checked"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3px] text-white" />
            </motion.div>
          )}
          {indeterminate && (
            <motion.div
              key="indeterminate"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Minus className="w-3.5 h-3.5 stroke-[3px] text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default Checkbox;
