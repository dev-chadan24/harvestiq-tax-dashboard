/**
 * Formats a numeric value into Indian Rupees (INR) currency format.
 * E.g., 12430 -> ₹12,430
 */
export const formatCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};

/**
 * Formats a numeric value as a percentage.
 * E.g., 0.1234 -> 12.34%
 */
export const formatPercentage = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};

/**
 * Formats numbers compactly for cleaner layouts
 * E.g. 1000000 -> 1M, 1500 -> 1.5K
 */
export const formatCompactNumber = (value: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};
