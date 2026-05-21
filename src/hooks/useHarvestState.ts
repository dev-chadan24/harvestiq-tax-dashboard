import { useState, useMemo, useCallback } from 'react';
import { CryptoAsset, CapitalGainsData, SelectedHolding } from '../types';
import { calculateNetGain, calculateRealisedGains, calculateHarvestSavings } from '../utils/calculations';

export const useHarvestState = (
  initialAssets: CryptoAsset[],
  preGains: CapitalGainsData
) => {
  const [selectedHoldings, setSelectedHoldings] = useState<Record<string, SelectedHolding>>({});

  // Reset all selections
  const reset = useCallback(() => {
    setSelectedHoldings({});
  }, []);

  // Toggle single selection
  const toggleSelect = useCallback((asset: CryptoAsset) => {
    setSelectedHoldings((prev) => {
      const next = { ...prev };
      if (next[asset.id]) {
        delete next[asset.id];
      } else {
        next[asset.id] = {
          id: asset.id,
          amountToSell: asset.totalHolding,
        };
      }
      return next;
    });
  }, []);

  // Update Amount to Sell for a specific asset
  const updateAmountToSell = useCallback((assetId: string, amount: number, totalHolding: number) => {
    setSelectedHoldings((prev) => {
      // If asset is not selected, select it first
      const validatedAmount = Math.max(0, Math.min(amount, totalHolding));
      
      return {
        ...prev,
        [assetId]: {
          id: assetId,
          amountToSell: validatedAmount,
        },
      };
    });
  }, []);

  // Toggle Select All/Deselect All
  const toggleSelectAll = useCallback((assets: CryptoAsset[]) => {
    setSelectedHoldings((prev) => {
      const allSelected = assets.every((asset) => !!prev[asset.id]);
      if (allSelected) {
        // Deselect all
        return {};
      } else {
        // Select all
        const next: Record<string, SelectedHolding> = {};
        assets.forEach((asset) => {
          next[asset.id] = {
            id: asset.id,
            amountToSell: asset.totalHolding,
          };
        });
        return next;
      }
    });
  }, []);

  // Compute live After-Harvesting values based on selections
  const afterGains = useMemo((): CapitalGainsData => {
    let stcgProfits = preGains.shortTerm.profits;
    let stcgLosses = preGains.shortTerm.losses;
    
    let ltcgProfits = preGains.longTerm.profits;
    let ltcgLosses = preGains.longTerm.losses;

    initialAssets.forEach((asset) => {
      const selection = selectedHoldings[asset.id];
      if (selection) {
        // Proportional gain/loss calculation
        const ratio = asset.totalHolding > 0 ? selection.amountToSell / asset.totalHolding : 0;
        const harvestedStcg = asset.stcgGain * ratio;
        const harvestedLtcg = asset.ltcgGain * ratio;

        // Process Short-Term Capital Gain/Loss
        if (harvestedStcg > 0) {
          stcgProfits += harvestedStcg;
        } else if (harvestedStcg < 0) {
          stcgLosses += Math.abs(harvestedStcg);
        }

        // Process Long-Term Capital Gain/Loss
        if (harvestedLtcg > 0) {
          ltcgProfits += harvestedLtcg;
        } else if (harvestedLtcg < 0) {
          ltcgLosses += Math.abs(harvestedLtcg);
        }
      }
    });

    const shortTermNet = calculateNetGain(stcgProfits, stcgLosses);
    const longTermNet = calculateNetGain(ltcgProfits, ltcgLosses);
    const realisedGains = calculateRealisedGains(shortTermNet, longTermNet);

    return {
      shortTerm: {
        profits: stcgProfits,
        losses: stcgLosses,
        netGain: shortTermNet,
      },
      longTerm: {
        profits: ltcgProfits,
        losses: ltcgLosses,
        netGain: longTermNet,
      },
      realisedGains,
    };
  }, [initialAssets, preGains, selectedHoldings]);

  // Calculate live tax savings (30% flat tax on net gains)
  const taxSavings = useMemo(() => {
    return calculateHarvestSavings(preGains.realisedGains, afterGains.realisedGains, 0.30);
  }, [preGains.realisedGains, afterGains.realisedGains]);

  const isAllSelected = useMemo(() => {
    if (initialAssets.length === 0) return false;
    return initialAssets.every((asset) => !!selectedHoldings[asset.id]);
  }, [initialAssets, selectedHoldings]);

  const isSomeSelected = useMemo(() => {
    const selectedCount = Object.keys(selectedHoldings).length;
    return selectedCount > 0 && selectedCount < initialAssets.length;
  }, [initialAssets, selectedHoldings]);

  return {
    selectedHoldings,
    afterGains,
    taxSavings,
    isAllSelected,
    isSomeSelected,
    toggleSelect,
    updateAmountToSell,
    toggleSelectAll,
    reset,
  };
};
