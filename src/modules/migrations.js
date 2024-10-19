import countryToCurrency from 'country-to-currency';
import * as Storage from './storage';

/**
 * Runs all data migrations.
 */
export default async function migrate() {
  await toV2();
  await toV3();
}

/**
 * Migrates data from version 1 to version 2.
 *
 * Version 2 of the data model has the following changes:
 *
 * - Use Capacitor Preferences API for storage instead of browser local storage.
 * - Added the version field with the value of 2
 * - Store fields using using multiple storage keys: `entries`, and `version`. In version 1,
 *   all data is stored under a root key `spending-state`.
 */
async function toV2() {
  const version = await Storage.get('version');

  if (version) {
    return;
  }

  const oldData = JSON.parse(localStorage.getItem('spending-state'));
  await Storage.set('entries', oldData ? oldData.entries : []);
  localStorage.removeItem('spending-state');
  await Storage.set('version', 2);
}

/**
 * Migrates data from version 2 to version 3.
 *
 * Version 3 of the data model has the following changes:
 *
 * - Add `currency_config` storage key.
 * - Add `custom_currency` (optional) storage key.
 * - Change currency value precision from 2 (USD) to 4 to support global currency.
 */
async function toV3() {
  const version = await Storage.get('version');

  if (version !== 2) {
    return;
  }

  // Update precision from 2 to 4
  let entries = await Storage.get('entries');
  entries = entries.map(entry => ({
    ...entry,
    value: entry.value * 100,
    total: entry.total * 100
  }));
  await Storage.set('entries', entries);

  // Create currency_config object
  const country = navigator.language.split('-')[1]?.toUpperCase() ?? 'US';
  const code = countryToCurrency[country] ?? 'USD';
  await Storage.set('currency_config', {type: 'standard', code});

  // Update model version
  await Storage.set('version', 3);
}
