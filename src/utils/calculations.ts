/**
 * Calculates net gains from profits and losses.
 * Net Gain = Profits - Losses
 */
export const calculateNetGain = (profits: number, losses: number): number => {
  return profits - losses;
};

/**
 * Calculates total combined realized capital gains.
 * Total Realised = Net STCG + Net LTCG
 */
export const calculateRealisedGains = (stcgNet: number, ltcgNet: number): number => {
  return stcgNet + ltcgNet;
};

/**
 * Calculates the tax savings.
 * Tax Savings = Max(0, (Tax on Pre-Harvest Net Gains) - (Tax on Post-Harvest Net Gains))
 * A flat tax rate of 30% (0.30) is applied to net realized gains.
 */
export const calculateHarvestSavings = (
  preRealisedGains: number,
  postRealisedGains: number,
  taxRate: number = 0.30
): number => {
  const preTax = Math.max(0, preRealisedGains) * taxRate;
  const postTax = Math.max(0, postRealisedGains) * taxRate;
  return Math.max(0, preTax - postTax);
};
