import { Preferences } from "@capacitor/preferences";

/**
 * Loads entries.
 *
 * @returns {array} The entries.
 */
export default async function loadEntries() {
  let value = (await Preferences.get({key: 'entries'})).value;
  return value ? JSON.parse(value) : [];
}
