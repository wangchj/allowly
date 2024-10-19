import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { loadCustomCurrency, loadCurrencyConfig } from 'modules/currency';
import clearEntries from 'modules/clear-entries';
import { CurrencyModal, openCurrencyModal } from './currency-modal';

/**
 * The settings screen main UI component.
 */
export default function Settings() {
  const history = useHistory();

  /**
   * The currency setting object.
   */
  const [currencyConfig, setCurrencyConfig] = useState();

  /**
   * The custom currency settings object.
   */
  const [customCurrency, setCustomCurrency] = useState();

  /**
   * Loading currency settings form storage.
   */
  const [loading, setLoading] = useState(true);

  /**
   * The error message to show on the UI.
   */
  const [error, setError] = useState();

  /**
   * Inits the page.
   */
  useEffect(() => {
    loadCurrencySettings();
  }, []);

  /**
   * Loads currency settings from storage.
   */
  async function loadCurrencySettings() {
    setLoading(true);
    setError();

    try {
      setCurrencyConfig(await loadCurrencyConfig());
      setCustomCurrency(await loadCustomCurrency());
    }
    catch (error) {
      setError(JSON.stringify(error));
    }

    setLoading(false);
  }

  /**
   * Gets the currency label text to show on the UI.
   *
   * @return {string} The label.
   */
  function getCurrencyLabel() {
    return currencyConfig.type === 'standard' ? currencyConfig.code :
           currencyConfig.type === 'custom' ?
           `${customCurrency.symbol} ${customCurrency.name}` : '';
  }

  /**
   * Handles currency modal confirm click.
   */
  function onCurrencyModalConfirm(_currencyConfig, _customCurrency) {
    setCurrencyConfig(_currencyConfig);
    setCustomCurrency(_customCurrency);
  }

  /**
   * Handles delete entries click event.
   */
  async function onDeleteEntriesClick() {
    await clearEntries();
    history.goBack();
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" color="dark"/>
            </IonButtons>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>

          {
            error && (
              <IonCard color="danger">
                <IonCardContent>{error}</IonCardContent>
              </IonCard>
            )
          }

          <IonList>
            <IonItem
              aria-label="currency"
              button={!loading}
              onClick={() => openCurrencyModal(currencyConfig, customCurrency)}
            >
              <IonLabel>Currency</IonLabel>
              <IonLabel slot="end">
                {
                  loading ?
                    <IonSpinner name="dots"/> :
                    getCurrencyLabel()
                }
              </IonLabel>
            </IonItem>

            <IonItem onClick={onDeleteEntriesClick}>
              <IonLabel color="danger">Delete all entries</IonLabel>
            </IonItem>
          </IonList>

        </IonContent>
      </IonPage>

      <CurrencyModal onConfirm={onCurrencyModalConfirm}/>
    </>
  )
}
