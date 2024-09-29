import '@fontsource/inter';
import './app.scss';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import React, {useEffect, useState} from 'react';
import MaxWidth from './max-width.jsx';
import Center from './center.jsx';
import Entries from './entries.jsx';
import PageLoading from './page-loading';
import Total from './total.jsx';
import loadEntries from 'modules/load-entries.js';

/**
 * The entries data.
 */
let entries, setEntries;

/**
 * Determines if the app is loading data.
 */
let loading, setLoading;

/**
 * The error text to show on the UI.
 */
let error, setError;

/**
 * Loads the app data from Preferences API.
 */
async function init() {
  setError();
  setLoading(true);

  try {
    setEntries(await loadEntries())
  }
  catch (error) {
    setError(JSON.stringify(error));
  }

  setLoading(false);
}

/**
 * The main app component.
 */
export default function App() {
  [entries, setEntries] = useState([]);
  [loading, setLoading] = useState(true);
  [error, setError] = useState();

  /**
   * Loads the data.
   */
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="safe-area">
      <Center>
        <MaxWidth>
          {error && <div>{error}</div>}

          {loading && <PageLoading/>}

          {!loading && (
            <>
              <Stack
                direction="column"
                spacing={3}
              >
                <Total entries={entries} onEntryAdded={newEntries => setEntries(newEntries)}/>

                <Divider/>

                <Entries entries={entries}/>
              </Stack>
            </>
          )}
        </MaxWidth>
      </Center>
    </div>
  )
}
