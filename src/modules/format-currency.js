import currency from 'currency.js';

/**
 * Formats cents value as a currency string.
 *
 * @param {integer} cents The value in cents.
 * @returns {string} The currency formatted string (e.g., $99.99).
 */
export default function formatCurrency(cents) {
  return currency(cents, {fromCents: true}).format();
}
