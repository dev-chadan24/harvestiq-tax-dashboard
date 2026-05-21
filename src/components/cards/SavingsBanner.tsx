import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SavingsBannerProps {
  savings: number;
  offsetAmount: number; // Total losses harvested to achieve these savings
}

export const SavingsBanner: React.FC<SavingsBannerProps> = ({
  savings,
  offsetAmount,
}) => {
  return (
    <AnimatePresence>
      {savings > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          layout
          className="w-full relative group"
        >
          {/* Outer elegant rotating/pulse ambient glowing border */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-blue-500/30 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000"></div>

          {/* Premium dark glassmorphic banner body */}
          <div className="relative flex flex-col md:flex-row items-stretch md:items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-zinc-950/95 via-zinc-950/90 to-emerald-950/15 border border-emerald-500/25 overflow-hidden glow-success shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            {/* Soft decorative background radial lights */}
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="flex items-start md:items-center gap-4.5 z-10">
              <motion.div
                className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-5.5 h-5.5 text-emerald-400 fill-emerald-400/20" />
              </motion.div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    HarvestIQ Optimizer
                  </span>
                  <motion.div
                    className="flex items-center gap-1 text-[10px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span>Instant Update</span>
                  </motion.div>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-zinc-100 tracking-tight flex flex-wrap items-baseline gap-x-2">
                  <span>Harvest to save</span>
                  <motion.span
                    key={savings}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 font-extrabold"
                  >
                    {formatCurrency(savings)}
                  </motion.span>
                  <span className="text-zinc-300 font-semibold text-lg md:text-xl">
                    in tax liabilities
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 flex flex-wrap items-center gap-1.5 leading-relaxed">
                  <span>Offsetting your capital gains by realizing</span>
                  <span className="font-extrabold text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">
                    {formatCurrency(offsetAmount)}
                  </span>
                  <span>in capital losses.</span>
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 border-zinc-800/60 pt-4 md:pt-0 z-10 shrink-0">
              <div className="flex items-center gap-2 bg-emerald-950/20 border border-emerald-500/15 px-3.5 py-2 rounded-xl text-[11px] font-semibold text-zinc-300 shadow-inner">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>30% Flat Tax Offset Applied</span>
              </div>
              <div className="hidden md:flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
                <span>View recalculations below</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SavingsBanner;
