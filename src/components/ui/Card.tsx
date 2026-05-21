import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  glow?: "blue" | "success" | "none";
  hoverable?: boolean;
  delayIndex?: number; // Optional indexing for staggered fade-ins
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, glow = "none", hoverable = true, delayIndex = 0, children, ...props },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 25,
          delay: delayIndex * 0.05,
        }}
        whileHover={
          hoverable
            ? {
                y: -4,
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
              }
            : undefined
        }
        className={twMerge(
          clsx(
            "glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden",
            {
              "glass-panel-hover border-glow-hover": hoverable,
              "glow-blue": glow === "blue",
              "glow-success": glow === "success",
            },
            className
          )
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
export default Card;
