/**
 * Utility to merge class names conditionally
 */
export function cn(...inputs) {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === 'string') return input.split(' ');
      if (typeof input === 'object') {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .filter(Boolean)
    .join(' ');
}

export { formatINR, formatPaiseToINR } from '../utils/currency';

/**
 * Format monetary amount with consistent currency code/symbol (defaults to INR)
 */
export function formatCurrency(amount, currency = 'INR', options = {}) {
  const numericAmount = Number(amount) || 0;
  const curr = (currency || 'INR').toUpperCase();
  const locale = curr === 'INR' ? 'en-IN' : undefined;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: curr,
      maximumFractionDigits: options.maximumFractionDigits ?? (curr === 'INR' ? 0 : 2),
      minimumFractionDigits: options.minimumFractionDigits ?? (curr === 'INR' ? 0 : 2),
    }).format(numericAmount);
  } catch {
    return curr === 'INR'
      ? `₹${numericAmount.toLocaleString('en-IN')}`
      : `${numericAmount.toLocaleString()} ${curr}`;
  }
}

