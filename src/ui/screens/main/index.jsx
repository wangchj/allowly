// import '@fontsource/inter';
import { menuOutline } from 'ionicons/icons'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonToolbar
} from '@ionic/react';
import Alert from '@mui/joy/Alert';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Entries from './entries.jsx';
import PageLoading from 'ui/layout/page-loading.jsx';
import Total from './total.jsx';
import { loadCustomCurrency, loadCurrencyConfig } from 'modules/currency';
import loadEntries from 'modules/load-entries.js';

/**
 * The entries data.
 */
let entries, setEntries;

/**
 * The currency settings object.
 */
let currencyConfig, setCurrencyConfig;

/**
 * The custom currency settings object.
 */
let customCurrency, setCustomCurrency;

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
  setLoading(true);
  setError();

  try {
    setEntries(await loadEntries());
    setCustomCurrency(await loadCustomCurrency());
    setCurrencyConfig(await loadCurrencyConfig());
  }
  catch (error) {
    setError(`${error.name}: ${error.message} ${error.stack}`);
  }

  setLoading(false);
}

/**
 * The main screen component.
 */
export default function Main() {
  const location = useLocation();

  [entries, setEntries] = useState([]);
  [currencyConfig, setCurrencyConfig] = useState();
  [customCurrency, setCustomCurrency] = useState();
  [loading, setLoading] = useState(true);
  [error, setError] = useState();

  /**
   * Loads the data.
   */
  useEffect(() => {
    init();
  }, [location]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/settings" routerDirection="forward" color="dark">
              <IonIcon icon={menuOutline} size="large"/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {error && <Alert color="danger">{error}</Alert>}

        {loading && <PageLoading/>}

        {!loading && (
          <>
            <Stack
              direction="column"
              spacing={3}
            >
              <Total
                entries={entries}
                currencyConfig={currencyConfig}
                customCurrency={customCurrency}
                onEntryAdded={newEntries => setEntries(newEntries)}
              />

              <Divider/>

              <Entries
                entries={entries}
                currencyConfig={currencyConfig}
                customCurrency={customCurrency}
              />
            </Stack>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}
