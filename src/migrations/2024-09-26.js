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

import { Preferences } from '@capacitor/preferences';

export default async function migrate() {
  let oldData = JSON.parse(localStorage.getItem('spending-state'));
  let newData = JSON.parse((await Preferences.get({key: 'entries'})).value);

  if (oldData && !newData) {
    await Preferences.set({
      key: 'entries',
      value: JSON.stringify(oldData.entries)
    });
  }

  await Preferences.set({
    key: 'version',
    value: JSON.stringify(2)
  });

  localStorage.removeItem('spending-state');
}
