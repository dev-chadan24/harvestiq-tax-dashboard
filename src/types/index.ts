export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  logoColor: string; // Used to draw gorgeous customized inline SVGs/icons for assets
  totalHolding: number;
  avgBuyPrice: number;
  currentPrice: number;
  stcgGain: number; // Unrealized short-term capital gains/losses
  ltcgGain: number; // Unrealized long-term capital gains/losses
}

export interface CapitalGainsBreakdown {
  profits: number;
  losses: number;
  netGain: number;
}

export interface CapitalGainsData {
  shortTerm: CapitalGainsBreakdown;
  longTerm: CapitalGainsBreakdown;
  realisedGains: number;
}

export interface SelectedHolding {
  id: string;
  amountToSell: number;
}

export interface HarvestState {
  selectedHoldings: Record<string, SelectedHolding>; // asset.id -> details
}
