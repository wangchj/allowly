import '@fontsource/inter';
import Alert from '@mui/joy/Alert';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Entries from './entries.jsx';
import PageLoading from 'ui/layout/page-loading.jsx';
import Total from './total.jsx';
import loadEntries from 'modules/load-entries.js';

/**
 * React router location object.
 */
let location;

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
 * The main screen component.
 */
export default function Main() {
  [entries, setEntries] = useState([]);
  [loading, setLoading] = useState(true);
  [error, setError] = useState();
  location = useLocation();

  /**
   * Loads the data.
   */
  useEffect(() => {console.log('main screen useEffect');
    init();
  }, [location]);

  return (
    <div>
      {error && <Alert color="danger">{error}</Alert>}

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
    </div>
  )
}
