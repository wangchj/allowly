import { Preferences } from "@capacitor/preferences";

/**
 * Delete all entries.
 */
export default async function clearEntries() {
  await Preferences.set({
    key: 'entries',
    value: JSON.stringify([])
  });
}
