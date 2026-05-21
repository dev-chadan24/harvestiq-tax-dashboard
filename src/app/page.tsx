"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { CryptoAsset, CapitalGainsData } from "../types";
import {
  fetchHoldings,
  fetchCapitalGains,
  setHoldingsApiFailure,
  setGainsApiFailure,
} from "../services/api";
import { useHarvestState } from "../hooks/useHarvestState";
import SummaryCards from "../components/cards/SummaryCards";
import SavingsBanner from "../components/cards/SavingsBanner";
import HoldingsTable from "../components/table/HoldingsTable";
import Skeleton from "../components/ui/Skeleton";
import { formatCurrency } from "../utils/formatters";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  AlertTriangle,
  Settings,
  Percent,
  Sparkles,
  User,
  Heart,
  TrendingDown,
} from "lucide-react";

export default function Dashboard() {
  // App data states
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [preGains, setPreGains] = useState<CapitalGainsData | null>(null);

  // Loading and Error states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated API failure configurations (for review/test purposes)
  const [simHoldingsError, setSimHoldingsError] = useState<boolean>(false);
  const [simGainsError, setSimGainsError] = useState<boolean>(false);
  const [showSimControls, setShowSimControls] = useState<boolean>(false);

  // Fetch all necessary data from mock APIs
  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Configure simulation rules before calling endpoints
      setHoldingsApiFailure(simHoldingsError);
      setGainsApiFailure(simGainsError);

      const [holdingsResult, gainsResult] = await Promise.all([
        fetchHoldings(),
        fetchCapitalGains(),
      ]);

      setAssets(holdingsResult);
      setPreGains(gainsResult);
    } catch (err: unknown) {
      console.error(err);
      const errMsg =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading dashboard analytics.";
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  }, [simHoldingsError, simGainsError]);

  // Load data on mount
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Custom harvesting state hook
  const {
    selectedHoldings,
    afterGains,
    taxSavings,
    isAllSelected,
    isSomeSelected,
    toggleSelect,
    updateAmountToSell,
    toggleSelectAll,
    reset,
  } = useHarvestState(
    assets,
    preGains || {
      shortTerm: { profits: 0, losses: 0, netGain: 0 },
      longTerm: { profits: 0, losses: 0, netGain: 0 },
      realisedGains: 0,
    }
  );

  const selectedCount = Object.keys(selectedHoldings).length;

  // Compute total harvested loss amount (STCG + LTCG losses realized by selling selected amounts)
  const totalHarvestedLoss = useMemo(() => {
    let sum = 0;
    assets.forEach((asset) => {
      const selection = selectedHoldings[asset.id];
      if (selection) {
        const ratio =
          asset.totalHolding > 0 ? selection.amountToSell / asset.totalHolding : 0;
        const harvestedStcg = asset.stcgGain * ratio;
        const harvestedLtcg = asset.ltcgGain * ratio;
        if (harvestedStcg < 0) sum += Math.abs(harvestedStcg);
        if (harvestedLtcg < 0) sum += Math.abs(harvestedLtcg);
      }
    });
    return sum;
  }, [assets, selectedHoldings]);

  // Auto-harvest all loss-making assets
  const quickSelectAllLosses = useCallback(() => {
    assets.forEach((asset) => {
      const totalGains = asset.stcgGain + asset.ltcgGain;
      const isLossMaking = totalGains < 0;
      const isAlreadySelected = !!selectedHoldings[asset.id];

      // If it is loss-making and not yet selected, select it
      if (isLossMaking && !isAlreadySelected) {
        toggleSelect(asset);
      }
    });
  }, [assets, selectedHoldings, toggleSelect]);

  // Loading Skeleton Screen
  const renderSkeletons = () => (
    <div className="space-y-8">
      {/* Skeletons for top stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-[360px] w-full" variant="rect" />
        <Skeleton className="h-[360px] w-full" variant="rect" />
      </div>

      {/* Skeleton for table */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" variant="text" />
        <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/10">
          <Skeleton className="h-12 w-full" variant="rect" />
          <div className="p-4 space-y-4">
            <Skeleton className="h-14 w-full" variant="rect" />
            <Skeleton className="h-14 w-full" variant="rect" />
            <Skeleton className="h-14 w-full" variant="rect" />
            <Skeleton className="h-14 w-full" variant="rect" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200 font-sans relative overflow-x-hidden">
      {/* HIGH-END AMBIENT SAAS LIGHTING & BLURS */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-950/15 via-indigo-950/5 to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-[-5%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/10 to-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[25%] right-[10%] w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[110px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[15%] left-[5%] w-[450px] h-[450px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* STICKY GLASSMORPHIC HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-lg shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black tracking-tighter border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <span className="relative z-10 text-lg">H</span>
            </div>
            <div>
              <span className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-300">
                Harvest
              </span>
              <span className="font-extrabold text-lg text-blue-400">IQ</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex items-center gap-4"
          >
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-400 shadow-inner">
              <Percent className="w-3.5 h-3.5 text-blue-400" />
              Tax Year: FY 2026-27
            </span>

            <button
              type="button"
              onClick={() => setShowSimControls(!showSimControls)}
              className={`p-2 rounded-xl border transition-all duration-300 shadow-inner ${
                showSimControls
                  ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                  : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
              }`}
              title="Simulate API configurations"
            >
              <Settings className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-zinc-800/80">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 shadow-lg relative overflow-hidden">
                <User className="w-4.5 h-4.5" />
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-zinc-200 leading-none">
                  Chandan
                </span>
                <span className="text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase mt-0.5">
                  Portfolio Review
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 z-10 relative">
        {/* SIMULATED API FAILURES CONTROLLER */}
        <AnimatePresence>
          {showSimControls && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -15 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="overflow-hidden"
            >
              <div className="p-6 rounded-2xl bg-zinc-950/90 border border-blue-500/25 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                  <h4 className="text-xs font-black tracking-widest text-blue-400 uppercase flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    API Simulator Panel
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-bold">
                    Interactive Loader & Error Recovery Testing
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-3.5 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/60 cursor-pointer hover:border-zinc-700 transition-all select-none shadow-sm">
                    <input
                      type="checkbox"
                      checked={simHoldingsError}
                      onChange={(e) => setSimHoldingsError(e.target.checked)}
                      className="rounded border-zinc-800 bg-zinc-950 text-blue-500 focus:ring-blue-500/80 w-4 h-4"
                    />
                    <div className="text-xs">
                      <span className="block font-black text-zinc-200">
                        Holdings API Failure
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium">
                        Simulate failure fetching crypto holdings
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3.5 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-800/60 cursor-pointer hover:border-zinc-700 transition-all select-none shadow-sm">
                    <input
                      type="checkbox"
                      checked={simGainsError}
                      onChange={(e) => setSimGainsError(e.target.checked)}
                      className="rounded border-zinc-800 bg-zinc-950 text-blue-500 focus:ring-blue-500/80 w-4 h-4"
                    />
                    <div className="text-xs">
                      <span className="block font-black text-zinc-200">
                        Capital Gains API Failure
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium">
                        Simulate failure loading pre-harvest tax data
                      </span>
                    </div>
                  </label>

                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={loadDashboardData}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/15 transition-all duration-300 disabled:opacity-50 active:scale-95"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
                      />
                      Sync Sandbox Data
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Tax Loss Harvesting Dashboard
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Optimize your crypto tax liabilities with intelligent tax-loss harvesting insights and real-time portfolio analytics.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto shrink-0 z-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={quickSelectAllLosses}
              disabled={isLoading || !!error || assets.length === 0}
              className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/25 hover:border-emerald-500/40 text-emerald-400 text-xs font-black shadow-lg shadow-emerald-950/10 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 fill-emerald-400/10" />
              Auto-Select Losses
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={loadDashboardData}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-black shadow-lg transition-all disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
              />
              Sync Data
            </motion.button>
          </div>
        </motion.div>

        {/* ERROR STATE */}
        {error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-center space-y-5 shadow-2xl"
          >
            <div className="inline-flex items-center justify-center p-4.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="font-extrabold text-lg text-zinc-100">
                API Synchronization Interrupted
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {error} You can toggle simulators off inside the settings panel or click below to retry the connection.
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={loadDashboardData}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 font-bold text-xs text-zinc-200 transition-all active:scale-95 shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry API Request
              </button>
            </div>
          </motion.div>
        ) : isLoading ? (
          renderSkeletons()
        ) : (
          /* ACTIVE DASHBOARD RENDER */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* SAVINGS BANNER */}
            <SavingsBanner savings={taxSavings} offsetAmount={totalHarvestedLoss} />

            {/* LIVE COMPARISON STATS CARDS */}
            {preGains && (
              <SummaryCards
                preGains={preGains}
                afterGains={afterGains}
                isHarvestingActive={selectedCount > 0}
              />
            )}

            {/* SELECTION STATISTICS AND CONTROLS */}
            <AnimatePresence>
              {selectedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4.5 rounded-2xl bg-blue-950/15 border border-blue-500/20 text-xs gap-3 shadow-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-blue-500/5 opacity-50 blur-xl pointer-events-none"></div>
                  <div className="flex items-center gap-3.5 z-10">
                    <div className="flex items-center justify-center p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-inner shrink-0">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 text-left">
                      <span className="block text-zinc-300 font-bold">
                        Simulation Active:{" "}
                        <span className="font-extrabold text-blue-400">
                          {selectedCount} positions
                        </span>{" "}
                        targeted for harvesting.
                      </span>
                      <span className="block text-zinc-400 font-medium">
                        Offsets{" "}
                        <span className="font-extrabold text-emerald-400">
                          {formatCurrency(totalHarvestedLoss)}
                        </span>{" "}
                        of paper capital losses against taxable profits.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-extrabold shadow transition-all shrink-0 active:scale-95"
                  >
                    Reset Optimization
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HOLDINGS TABLE SECTION */}
            <HoldingsTable
              assets={assets}
              selectedHoldings={selectedHoldings}
              isAllSelected={isAllSelected}
              isSomeSelected={isSomeSelected}
              onToggleSelect={toggleSelect}
              onToggleSelectAll={toggleSelectAll}
              onUpdateAmountToSell={updateAmountToSell}
            />
          </motion.div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-zinc-900/80 bg-zinc-950/70 backdrop-blur-md py-6 text-center text-xs text-zinc-500 shadow-inner z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 select-none">
            <span className="font-black tracking-widest text-[9px] text-zinc-400 bg-zinc-900 border border-zinc-800/80 px-2 py-0.5 rounded">
              HarvestIQ Ledger System
            </span>
            <span className="text-zinc-600">•</span>
            <span>Premium FinTech Portfolio Review</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>using Next.js 14, React & Tailwind CSS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
