import { CryptoAsset, CapitalGainsData } from '../types';

// Pre-harvesting realized capital gains (already realized transactions during the current tax year)
export const initialCapitalGains: CapitalGainsData = {
  shortTerm: {
    profits: 145000,
    losses: 35000,
    netGain: 110000,
  },
  longTerm: {
    profits: 280000,
    losses: 60000,
    netGain: 220000,
  },
  realisedGains: 330000, // 110,000 + 220,000
};

// Crypto holdings with unrealized short-term and long-term gains/losses
export const mockCryptoAssets: CryptoAsset[] = [
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    logoColor: '#627EEA', // Ethereum Blue
    totalHolding: 4.5,
    avgBuyPrice: 285000,
    currentPrice: 245000,
    stcgGain: -80000, // STCG Loss (buying at peak recently)
    ltcgGain: -100000, // LTCG Loss (held for a long time but overall down)
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    logoColor: '#14F195', // Solana Green
    totalHolding: 120,
    avgBuyPrice: 15400,
    currentPrice: 13200,
    stcgGain: -114000, // STCG Loss
    ltcgGain: -150000, // LTCG Loss
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    logoColor: '#F7931A', // Bitcoin Orange
    totalHolding: 0.85,
    avgBuyPrice: 4200000,
    currentPrice: 5100000,
    stcgGain: 265000, // STCG Profit
    ltcgGain: 500000, // LTCG Profit
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    logoColor: '#0033AD', // Cardano Blue
    totalHolding: 8500,
    avgBuyPrice: 55,
    currentPrice: 42,
    stcgGain: -45000, // STCG Loss
    ltcgGain: -65500, // LTCG Loss
  },
  {
    id: 'dot',
    name: 'Polkadot',
    symbol: 'DOT',
    logoColor: '#E6007A', // Polkadot Pink
    totalHolding: 950,
    avgBuyPrice: 620,
    currentPrice: 510,
    stcgGain: -24500, // STCG Loss
    ltcgGain: -80000, // LTCG Loss
  },
  {
    id: 'link',
    name: 'Chainlink',
    symbol: 'LINK',
    logoColor: '#375BD2', // Chainlink Blue
    totalHolding: 350,
    avgBuyPrice: 1250,
    currentPrice: 1480,
    stcgGain: 80500, // STCG Profit
    ltcgGain: 0, // No LTCG
  },
  {
    id: 'matic',
    name: 'Polygon',
    symbol: 'MATIC',
    logoColor: '#8247E5', // Polygon Purple
    totalHolding: 6200,
    avgBuyPrice: 85,
    currentPrice: 68,
    stcgGain: -35400, // STCG Loss
    ltcgGain: -70000, // LTCG Loss
  },
  {
    id: 'uni',
    name: 'Uniswap',
    symbol: 'UNI',
    logoColor: '#FF007A', // Uniswap Pink
    totalHolding: 420,
    avgBuyPrice: 920,
    currentPrice: 710,
    stcgGain: -18200, // STCG Loss
    ltcgGain: -70000, // LTCG Loss
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    logoColor: '#C2A633', // Dogecoin Gold
    totalHolding: 45000,
    avgBuyPrice: 8.5,
    currentPrice: 12.2,
    stcgGain: 166500, // STCG Profit
    ltcgGain: 0,
  }
];
