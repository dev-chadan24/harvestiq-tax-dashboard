import React from "react";
import { CapitalGainsData } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import Card from "../ui/Card";
import { Scale, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SummaryCardsProps {
  preGains: CapitalGainsData;
  afterGains: CapitalGainsData;
  isHarvestingActive: boolean;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  preGains,
  afterGains,
  isHarvestingActive,
}) => {
  // Render sub-section for STCG or LTCG
  const renderGainsSection = (
    title: string,
    profits: number,
    losses: number,
    net: number,
    recalculatedNet?: number
  ) => {
    const isNetPositive = net >= 0;
    const isRecalcNetPositive = recalculatedNet !== undefined ? recalculatedNet >= 0 : isNetPositive;
    const hasChanged = recalculatedNet !== undefined && recalculatedNet !== net;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase">
            {title}
          </h4>
          {hasChanged && (
            <span className="text-[9px] bg-blue-500/10 text-blue-400 font-bold px-1.5 py-0.5 rounded border border-blue-500/20">
              Offset Applied
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 bg-zinc-950/40 p-3 rounded-xl border border-zinc-900/50 hover:border-zinc-800/80 transition-all duration-300">
          <div>
            <span className="block text-[9px] text-zinc-500 font-medium uppercase">Profits</span>
            <span className="text-xs font-semibold text-emerald-500/90 tracking-tight">
              {formatCurrency(profits)}
            </span>
          </div>
          <div>
            <span className="block text-[9px] text-zinc-500 font-medium uppercase">Losses</span>
            <span className="text-xs font-semibold text-rose-500/90 tracking-tight">
              {formatCurrency(losses)}
            </span>
          </div>
          <div>
            <span className="block text-[9px] text-zinc-500 font-medium uppercase">Net Position</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={recalculatedNet !== undefined ? recalculatedNet : net}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.15 }}
                className={`text-xs font-bold tracking-tight ${
                  recalculatedNet !== undefined
                    ? isRecalcNetPositive
                      ? "text-emerald-400"
                      : "text-rose-400"
                    : isNetPositive
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
              >
                {(recalculatedNet !== undefined ? recalculatedNet : net) > 0 ? "+" : ""}
                {formatCurrency(recalculatedNet !== undefined ? recalculatedNet : net)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  const getRealisedGainsStyles = (value: number, isActiveGlow?: boolean) => {
    if (value > 0) {
      return isActiveGlow
        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        : "text-emerald-400 bg-emerald-500/5 border-emerald-500/10";
    }
    if (value < 0) {
      return isActiveGlow
        ? "text-rose-400 bg-rose-500/10 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
        : "text-rose-400 bg-rose-500/5 border-rose-500/10";
    }
    return "text-zinc-400 bg-zinc-800/30 border-zinc-800/50";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Pre-Harvesting Card */}
      <Card
        hoverable={true}
        delayIndex={0}
        className="border-zinc-800/60 bg-gradient-to-b from-zinc-900/40 via-zinc-950/60 to-zinc-950/80 relative shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
      >
        {/* Elite Top Accent Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-800"></div>

        <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
          <Scale className="w-24 h-24 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4 mb-5">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase tracking-wider">
              Pre-Harvest Baseline
            </span>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              1. Current Tax Liabilities
            </h3>
          </div>
          <div className="text-right">
            <span className="block text-[9px] text-zinc-500 uppercase tracking-widest font-extrabold">
              Est. Tax (30%)
            </span>
            <span className="text-base font-black text-zinc-300 tracking-tight">
              {formatCurrency(Math.max(0, preGains.realisedGains) * 0.3)}
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {renderGainsSection(
            "Short Term Capital Gains (STCG)",
            preGains.shortTerm.profits,
            preGains.shortTerm.losses,
            preGains.shortTerm.netGain
          )}

          {renderGainsSection(
            "Long Term Capital Gains (LTCG)",
            preGains.longTerm.profits,
            preGains.longTerm.losses,
            preGains.longTerm.netGain
          )}

          <div className="border-t border-zinc-800/60 pt-4 mt-6 flex items-center justify-between">
            <div>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-400">
                Total Realized Gains
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">
                Combined positions before optimizations
              </span>
            </div>
            <div
              className={`px-3 py-1.5 rounded-xl border text-sm font-black tracking-tight ${getRealisedGainsStyles(
                preGains.realisedGains
              )}`}
            >
              {preGains.realisedGains > 0 ? "+" : ""}
              {formatCurrency(preGains.realisedGains)}
            </div>
          </div>
        </div>
      </Card>

      {/* After-Harvesting Card */}
      <Card
        hoverable={true}
        delayIndex={1}
        glow={isHarvestingActive ? "blue" : "none"}
        className={`relative overflow-hidden transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.3)] ${
          isHarvestingActive
            ? "border-blue-500/25 bg-gradient-to-b from-zinc-900/40 via-zinc-950/60 to-blue-950/5"
            : "border-zinc-800/60 bg-gradient-to-b from-zinc-900/40 via-zinc-950/60 to-zinc-950/80"
        }`}
      >
        {/* Elite Top Accent Glow Line */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${
            isHarvestingActive
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_1px_10px_rgba(59,130,246,0.5)]"
              : "bg-zinc-800"
          }`}
        ></div>

        {isHarvestingActive && (
          <div className="absolute top-0 right-0 p-4 opacity-[0.06] text-blue-400 pointer-events-none animate-pulse">
            <Zap className="w-24 h-24" />
          </div>
        )}

        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4 mb-5">
          <div className="space-y-1">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold transition-all duration-500 uppercase tracking-wider ${
                isHarvestingActive
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.1)] animate-pulse"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400"
              }`}
            >
              {isHarvestingActive ? "HarvestIQ Active" : "No Positions Selected"}
            </span>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              2. Projected Tax Liabilities
            </h3>
          </div>
          <div className="text-right">
            <span className="block text-[9px] text-zinc-500 uppercase tracking-widest font-extrabold">
              Est. Tax (30%)
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={afterGains.realisedGains}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`text-base font-black tracking-tight block ${
                  isHarvestingActive ? "text-blue-400" : "text-zinc-300"
                }`}
              >
                {formatCurrency(Math.max(0, afterGains.realisedGains) * 0.3)}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-5">
          {renderGainsSection(
            "Short Term Capital Gains (STCG)",
            afterGains.shortTerm.profits,
            afterGains.shortTerm.losses,
            afterGains.shortTerm.netGain,
            afterGains.shortTerm.netGain
          )}

          {renderGainsSection(
            "Long Term Capital Gains (LTCG)",
            afterGains.longTerm.profits,
            afterGains.longTerm.losses,
            afterGains.longTerm.netGain,
            afterGains.longTerm.netGain
          )}

          <div className="border-t border-zinc-800/60 pt-4 mt-6 flex items-center justify-between">
            <div>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-400">
                Total Realized Gains
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">
                Recalculated position net-of-harvest
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={afterGains.realisedGains}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`px-3 py-1.5 rounded-xl border text-sm font-black tracking-tight transition-all duration-300 ${getRealisedGainsStyles(
                  afterGains.realisedGains,
                  isHarvestingActive
                )} ${isHarvestingActive ? "ring-1 ring-blue-500/20" : ""}`}
              >
                {afterGains.realisedGains > 0 ? "+" : ""}
                {formatCurrency(afterGains.realisedGains)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryCards;
