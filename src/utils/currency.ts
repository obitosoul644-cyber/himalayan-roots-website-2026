import { CURRENCIES } from '../data/products';
import { CurrencyCode } from '../types';

export function formatPrice(priceNpr: number, currency: CurrencyCode = 'NPR'): string {
  const config = CURRENCIES[currency] || CURRENCIES.NPR;
  const converted = priceNpr * config.rate;

  if (currency === 'NPR') {
    return `NPR ${priceNpr.toLocaleString('en-US')}`;
  }

  // International currencies with 2 decimals
  return `${config.symbol}${converted.toFixed(2)}`;
}
