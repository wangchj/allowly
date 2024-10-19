import currency from 'currency.js';
import * as Storage from './storage';

/**
 * Loads currency config object from storage.
 */
export async function loadCurrencyConfig() {
  return await Storage.get('currency_config');
}

/**
 * Saves currency config object to storage.
 *
 * @param {object} config The config object to save.
 */
export async function saveCurrencyConfig(config) {
  await Storage.set('currency_config', config);
}

/**
 * Loads custom currency object from storage.
 */
export async function loadCustomCurrency() {
  return await Storage.get('custom_currency');
}

/**
 * Saves custom currency config to storage.
 *
 * @param {object} config The config object to save.
 */
export async function saveCustomCurrency(config) {
  await Storage.set('custom_currency', config);
}

/**
 * Gets currency info.
 *
 * @param {string} code The ISO 4217 currency code
 * @returns {object} An object that contains various currency properties.
 */
export function getCurrencyInfo(code) {
  return {
    decimal: getDecimalSymbol(),
    precision: getPrecision(code)
  };
}

/**
 * Gets the numeric decimal symbol of the current locale. For example:
 *
 * - en-US -> .
 * - de-DE -> ,
 *
 * @returns {string} The decimal symbol.
 */
export function getDecimalSymbol() {
  const numberFormat = new Intl.NumberFormat();
  const str = numberFormat.format(1.1);
  const match = str.match(/\d+(\D+)\d+/);
  return match ? match[1] : null;
}

/**
 * Gets the Intl.NumberFormat currency symbol of a currency code.
 *
 * @param {string} code The currency code.
 * @return {string} The symbol.
 */
export function getSymbol(code) {
  const number = Intl.NumberFormat().format(1);
  const currency = Intl.NumberFormat(
    undefined,
    {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0
    }
  ).format(1);
  return currency.replace(number, '').trim();
}

/**
 * Gets the currency symbol position based on the current locale.
 *
 * @return {string} The symbol is 'before' or 'after' the currency value.
 */
export function getSymbolPlacement() {
  const number = Intl.NumberFormat().format(1);
  const symbol = getSymbol('USD')
  const currency = Intl.NumberFormat(
    undefined,
    {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }
  ).format(1);
  const symbolIndex = currency.indexOf(symbol);
  const numberIndex = currency.indexOf(number);
  return symbolIndex < numberIndex ? 'before' : 'after';
}

/**
 * Gets the max number of decimal places of a currency.
 *
 * @param {string} code The ISO 4217 currency code
 * @return {integer} The precision ranging from 0 to 4.
 */
export function getPrecision(code) {
  const numberFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: code});
  const str = numberFormat.format(1.1234);
  const match = str.match(/\d+\.(\d+)/);
  return match ? Math.min(match[1].length, 4) : 0;
}

/**
 * Formats stored currency value as a string using the currency config. Stored values are integers
 * with the lowest 4 digits representing the fractional portion.
 *
 * Example: 120000 -> $12.00
 *
 * @param {integer} value The stored currency value to format, e.g., 120000.
 * @param {object} currencyConfig The currency settings object.
 * @param {object} customCurrency The custom currency settings object.
 */
export function format(value, currencyConfig, customCurrency) {
  return currencyConfig.type === 'custom' ?
    formatCustom(value, customCurrency) :
    formatStandard(value, currencyConfig);
}

export function formatStandard(value, currencyConfig) {
  return Intl.NumberFormat(
    undefined,
    {
      style: 'currency',
      currency: currencyConfig.code
    }
  ).format(currency(value, {fromCents: true, precision: 4}));
}

export function formatCustom(value, customCurrency) {
  let symbol = getSymbol('USD');
  let usd = Intl.NumberFormat(
    undefined,
    {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: customCurrency.precision,
      maximumFractionDigits: customCurrency.precision
    }
  ).format(currency(value, {fromCents: true, precision: 4}));
  return usd.replace(symbol, customCurrency.symbol);
}
