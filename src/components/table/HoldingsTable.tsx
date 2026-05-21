import React, { useState } from "react";
import { CryptoAsset, SelectedHolding } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";
import Card from "../ui/Card";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HoldingsTableProps {
  assets: CryptoAsset[];
  selectedHoldings: Record<string, SelectedHolding>;
  isAllSelected: boolean;
  isSomeSelected: boolean;
  onToggleSelect: (asset: CryptoAsset) => void;
  onToggleSelectAll: (assets: CryptoAsset[]) => void;
  onUpdateAmountToSell: (
    assetId: string,
    amount: number,
    totalHolding: number
  ) => void;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  assets,
  selectedHoldings,
  isAllSelected,
  isSomeSelected,
  onToggleSelect,
  onToggleSelectAll,
  onUpdateAmountToSell,
}) => {
  // Mobile: ID of expanded asset card
  const [expandedMobileAsset, setExpandedMobileAsset] = useState<string | null>(
    null
  );

  // Validation state: records assetId -> error message
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const toggleMobileExpand = (id: string) => {
    setExpandedMobileAsset((prev) => (prev === id ? null : id));
  };

  const handleAmountChange = (asset: CryptoAsset, valueString: string) => {
    const assetId = asset.id;
    const total = asset.totalHolding;

    if (valueString.trim() === "") {
      onUpdateAmountToSell(assetId, 0, total);
      setValidationErrors((prev) => ({
        ...prev,
        [assetId]: "Amount is required",
      }));
      return;
    }

    const value = parseFloat(valueString);

    if (isNaN(value)) {
      setValidationErrors((prev) => ({
        ...prev,
        [assetId]: "Must be a valid number",
      }));
      return;
    }

    if (value < 0) {
      setValidationErrors((prev) => ({
        ...prev,
        [assetId]: "Cannot be negative",
      }));
      onUpdateAmountToSell(assetId, 0, total);
    } else if (value > total) {
      setValidationErrors((prev) => ({
        ...prev,
        [assetId]: `Cannot exceed total holdings (${total})`,
      }));
      onUpdateAmountToSell(assetId, total, total);
    } else {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[assetId];
        return next;
      });
      onUpdateAmountToSell(assetId, value, total);
    }
  };

  const renderGainLossBadge = (gain: number) => {
    const isLoss = gain < 0;
    if (gain === 0) return <span className="text-zinc-600 font-bold">-</span>;

    return (
      <span
        className={`inline-flex items-center gap-1 font-bold text-xs px-2.5 py-1 rounded-lg border tracking-tight ${
          isLoss
            ? "text-rose-400 bg-rose-500/5 border-rose-500/10"
            : "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
        }`}
      >
        {isLoss ? (
          <TrendingDown className="w-3 h-3 text-rose-400" />
        ) : (
          <TrendingUp className="w-3 h-3 text-emerald-400" />
        )}
        <span>{isLoss ? "-" : "+"}</span>
        <span>{formatCurrency(Math.abs(gain))}</span>
      </span>
    );
  };

  const AssetLogo = ({ symbol, color }: { symbol: string; color: string }) => (
    <div
      className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white shrink-0 tracking-widest relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}bb 100%)`,
        boxShadow: `0 4px 12px ${color}35`,
      }}
    >
      <div className="absolute inset-0 bg-white/5 opacity-50"></div>
      <span className="relative z-10">{symbol.substring(0, 3)}</span>
    </div>
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            Portfolio Holdings
          </h3>
          <p className="text-xs text-zinc-400">
            Select holdings carrying unrealized losses to activate proportional harvesting calculations.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-900/40 border border-zinc-800/60 px-3 py-1.5 rounded-xl self-start sm:self-auto shadow-inner">
          <Info className="w-3.5 h-3.5 text-zinc-400" />
          <span>STCG/LTCG represent current paper gains/losses.</span>
        </div>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md max-h-[600px] overflow-y-auto shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 z-10 shadow-[0_1px_10px_rgba(0,0,0,0.4)]">
            <tr>
              <th className="p-4 w-12 text-center">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={() => onToggleSelectAll(assets)}
                />
              </th>
              <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500">
                Asset
              </th>
              <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 text-right">
                Holdings Size
              </th>
              <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 text-right">
                Avg Purchase Price
              </th>
              <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 text-right">
                Current Price
              </th>
              <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 text-right">
                Short-Term Gain (STCG)
              </th>
              <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 text-right">
                Long-Term Gain (LTCG)
              </th>
              <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 text-center w-52">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/60">
            {assets.map((asset) => {
              const isSelected = !!selectedHoldings[asset.id];
              const selection = selectedHoldings[asset.id];
              const amountVal = selection
                ? selection.amountToSell
                : asset.totalHolding;
              const hasError = !!validationErrors[asset.id];

              return (
                <tr
                  key={asset.id}
                  className={`group transition-all duration-300 ${
                    isSelected
                      ? "bg-blue-600/5 hover:bg-blue-600/10"
                      : "hover:bg-zinc-900/40"
                  }`}
                >
                  <td className="p-4 text-center">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onToggleSelect(asset)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <AssetLogo symbol={asset.symbol} color={asset.logoColor} />
                      <div>
                        <div className="font-bold text-sm text-zinc-100 group-hover:text-white transition-colors">
                          {asset.name}
                        </div>
                        <div className="text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase">
                          {asset.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-bold text-sm text-zinc-200">
                      {asset.totalHolding}
                    </div>
                    <div className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider">
                      {asset.symbol}
                    </div>
                  </td>
                  <td className="p-4 text-right text-sm font-semibold text-zinc-300">
                    {formatCurrency(asset.avgBuyPrice)}
                  </td>
                  <td className="p-4 text-right text-sm font-semibold text-zinc-300">
                    {formatCurrency(asset.currentPrice)}
                  </td>
                  <td className="p-4 text-right">
                    {renderGainLossBadge(asset.stcgGain)}
                  </td>
                  <td className="p-4 text-right">
                    {renderGainLossBadge(asset.ltcgGain)}
                  </td>
                  <td className="p-4 relative">
                    <div className="flex items-center justify-center gap-2">
                      <Input
                        type="number"
                        step="any"
                        min="0"
                        max={asset.totalHolding}
                        disabled={!isSelected}
                        value={isSelected ? amountVal : asset.totalHolding}
                        onChange={(val) => handleAmountChange(asset, val)}
                        error={hasError}
                        className="w-28 bg-zinc-950/80 font-bold text-center border-zinc-800/80"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!isSelected) onToggleSelect(asset);
                          onUpdateAmountToSell(
                            asset.id,
                            asset.totalHolding,
                            asset.totalHolding
                          );
                          setValidationErrors((prev) => {
                            const next = { ...prev };
                            delete next[asset.id];
                            return next;
                          });
                        }}
                        className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1.5 rounded-lg transition-all shrink-0 border ${
                          isSelected && amountVal === asset.totalHolding
                            ? "bg-zinc-900 border-zinc-800/80 text-zinc-500 cursor-default"
                            : "bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.15)] active:scale-95"
                        }`}
                      >
                        Max
                      </button>
                    </div>
                    {hasError && (
                      <div className="absolute left-1/2 translate-x-[-50%] bottom-[0px] text-[9px] text-red-400 font-bold flex items-center gap-1 z-15 bg-zinc-950 px-2 py-0.5 border border-red-500/30 rounded-lg shadow-xl">
                        <AlertCircle className="w-2.5 h-2.5 text-red-400 shrink-0" />
                        <span>{validationErrors[asset.id]}</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW & COLLAPSIBLE DETAILS */}
      <div className="md:hidden space-y-3">
        {assets.map((asset) => {
          const isSelected = !!selectedHoldings[asset.id];
          const isExpanded = expandedMobileAsset === asset.id;
          const selection = selectedHoldings[asset.id];
          const amountVal = selection
            ? selection.amountToSell
            : asset.totalHolding;
          const hasError = !!validationErrors[asset.id];
          const totalGains = asset.stcgGain + asset.ltcgGain;

          return (
            <Card
              key={asset.id}
              hoverable={false}
              className={`p-4.5 transition-all duration-300 border ${
                isSelected
                  ? "border-blue-500/35 bg-gradient-to-r from-zinc-900/60 to-blue-950/10 shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                  : "border-zinc-800/80 bg-zinc-950/30"
              }`}
            >
              {/* Header: Checkbox, Name, Expand trigger */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => onToggleSelect(asset)}
                  />
                  <div
                    onClick={() => toggleMobileExpand(asset.id)}
                    className="flex items-center gap-2.5 cursor-pointer select-none"
                  >
                    <AssetLogo symbol={asset.symbol} color={asset.logoColor} />
                    <div>
                      <div className="font-extrabold text-zinc-100 text-sm">
                        {asset.name}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-extrabold flex items-center gap-1">
                        <span>
                          {asset.totalHolding} {asset.symbol}
                        </span>
                        <span>•</span>
                        <span
                          className={
                            totalGains < 0
                              ? "text-rose-500"
                              : totalGains > 0
                              ? "text-emerald-500"
                              : "text-zinc-500"
                          }
                        >
                          {totalGains < 0 ? "Loss" : "Gain"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="text-right select-none">
                    <span className="block text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider">
                      Unrealized Net
                    </span>
                    <span
                      className={`text-xs font-black ${
                        totalGains < 0 ? "text-rose-400" : "text-emerald-400"
                      }`}
                    >
                      {totalGains > 0 ? "+" : ""}
                      {formatCurrency(totalGains)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleMobileExpand(asset.id)}
                    className="p-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-zinc-400 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-zinc-900 space-y-3.5 text-xs relative">
                      <div className="grid grid-cols-2 gap-3 bg-zinc-950/60 p-3 rounded-xl border border-zinc-900/80 shadow-inner">
                        <div>
                          <span className="block text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider">
                            Avg Purchase Price
                          </span>
                          <span className="text-zinc-200 font-black">
                            {formatCurrency(asset.avgBuyPrice)}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider">
                            Current Price
                          </span>
                          <span className="text-zinc-200 font-black">
                            {formatCurrency(asset.currentPrice)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="block text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider mb-1">
                            Short-Term Gain (STCG)
                          </span>
                          <div>{renderGainLossBadge(asset.stcgGain)}</div>
                        </div>
                        <div>
                          <span className="block text-[9px] text-zinc-500 font-extrabold uppercase tracking-wider mb-1">
                            Long-Term Gain (LTCG)
                          </span>
                          <div>{renderGainLossBadge(asset.ltcgGain)}</div>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                        <div className="flex items-center justify-between">
                          <label className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-wider">
                            Amount to Sell ({asset.symbol})
                          </label>
                          {!isSelected && (
                            <span className="text-[9px] text-amber-500 font-bold bg-amber-500/5 border border-amber-500/20 px-1.5 py-0.5 rounded">
                              Check holding to edit
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            step="any"
                            min="0"
                            max={asset.totalHolding}
                            disabled={!isSelected}
                            value={isSelected ? amountVal : asset.totalHolding}
                            onChange={(val) => handleAmountChange(asset, val)}
                            error={hasError}
                            className="bg-zinc-950 font-bold flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (!isSelected) onToggleSelect(asset);
                              onUpdateAmountToSell(
                                asset.id,
                                asset.totalHolding,
                                asset.totalHolding
                              );
                              setValidationErrors((prev) => {
                                const next = { ...prev };
                                delete next[asset.id];
                                return next;
                              });
                            }}
                            className="bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 px-4 py-2 text-xs rounded-lg font-black transition-all shrink-0 active:scale-95 shadow-inner"
                          >
                            MAX
                          </button>
                        </div>
                        {hasError && (
                          <div className="text-[10px] text-red-400 font-bold flex items-center gap-1 mt-1 bg-red-500/5 border border-red-500/10 p-1 rounded-lg">
                            <AlertCircle className="w-3 h-3 shrink-0 text-red-400" />
                            <span>{validationErrors[asset.id]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HoldingsTable;
