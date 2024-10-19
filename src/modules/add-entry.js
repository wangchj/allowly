import { Preferences } from "@capacitor/preferences";
import * as Storage from 'modules/storage';

/**
 * Adds a new entry to existing entries and flushes the updated entries to storage.
 *
 * @param {array} entries Existing entries.
 * @param {integer} value The new entry integer value.
 * @return {array} The updated entries.
 */
export default async function addEntry(entries, value) {
  let res = [...entries];

  // We only keep 20 entries
  if (res.length === 20) {
    res.pop();
  }

  // Prepend the new entry
  res.splice(0, 0, {
    time: Date.now(),
    value: value,
    total: res.length === 0 ? value : res[0].total + value
  });

  // Save the updated entries
  Storage.set('entries', res);

  return res;
}
