import { CryptoAsset, CapitalGainsData } from '../types';
import { mockCryptoAssets, initialCapitalGains } from '../data/mockData';

// Simulated API latency in milliseconds
const API_LATENCY = 800;

// Internal state to simulate occasional API failures (can be triggered for testing)
let shouldFailHoldings = false;
let shouldFailGains = false;

export const setHoldingsApiFailure = (fail: boolean) => {
  shouldFailHoldings = fail;
};

export const setGainsApiFailure = (fail: boolean) => {
  shouldFailGains = fail;
};

/**
 * Simulates fetching current cryptocurrency holdings for the logged-in user.
 */
export const fetchHoldings = (): Promise<CryptoAsset[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFailHoldings) {
        reject(new Error('Failed to fetch cryptocurrency holdings from the server.'));
      } else {
        // Return a deep copy to ensure state is clean
        resolve(JSON.parse(JSON.stringify(mockCryptoAssets)));
      }
    }, API_LATENCY);
  });
};

/**
 * Simulates fetching pre-harvest realized capital gains data for the current financial year.
 */
export const fetchCapitalGains = (): Promise<CapitalGainsData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFailGains) {
        reject(new Error('Failed to fetch capital gains tax history.'));
      } else {
        resolve(JSON.parse(JSON.stringify(initialCapitalGains)));
      }
    }, API_LATENCY);
  });
};
