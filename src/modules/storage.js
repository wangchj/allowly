import { Preferences } from '@capacitor/preferences';

/**
 * Gets the data from local device storage.
 *
 * @param {string} key The data key.
 * @return {any} The data associated with the key.
 */
export async function get(key) {
  return JSON.parse((await Preferences.get({key})).value);
}

/**
 * Saves the data to the local device storage using the key.
 *
 * @param {string} key The data key.
 * @param {any} value The data to save. This can be any valid JavaScript type that can be JSON
 * stringified.
 */
export async function set(key, value) {
  await Preferences.set({key, value: JSON.stringify(value)});
}
