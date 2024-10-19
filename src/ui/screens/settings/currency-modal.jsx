import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import countryToCurrency from 'country-to-currency';
import React, { useState } from 'react';
import { saveCustomCurrency, saveCurrencyConfig } from 'modules/currency';

/**
 * ISO 4217 currency codes.
 */
const currencies = new Set(Object.entries(countryToCurrency).map(entry => entry[1]));

/**
 * Example custom currency.
 */
const example = {
  name: 'Snack points',
  symbol: '🍩',
  precision: 2
};

/**
 * The state variable that determines if the modal is shown.
 */
let open, setOpen;

/**
 * The currency setting object.
 */
let currencyConfig, setCurrencyConfig;

/**
 * The custom currency settings object.
 */
let customCurrency, setCustomCurrency;

/**
 * The error message to shown on the UI.
 */
let error, setError;

/**
 * Callback function when currency settings has been updated.
 */
let callback;

/**
 * Handles type selection change event.
 *
 * @param {object} event The change event object.
 */
function onTypeChange(event) {
  let value = event.detail.value;

  setCurrencyConfig({
    ...currencyConfig,
    type: value
  });

  if (value === 'custom' && !customCurrency) {
    setCustomCurrency({...example});
  }
}

/**
 * Handles currency code input event.
 *
 * @param {object} event The event object.
 */
function onCodeInput(event) {
  let value = event.detail.value.toUpperCase();

  if (value.length > 3) {
    value = value.substring(0, 3);
  }

  setCurrencyConfig({
    ...currencyConfig,
    code: value
  });
}

/**
 * Handles custom currency name input event.
 *
 * @param {object} detail The input detail object.
 */
function onNameInput({detail}) {
  let value = detail.value;

  if (value.length > 20) {
    value = value.substring(0, 20);
  }

  setCustomCurrency({
    ...customCurrency,
    name: value
  });
}

/**
 * Handles custom currency symbol input event.
 *
 * @param {object} detail The input detail object.
 */
function onSymbolInput({detail}) {
  let value = detail.value;

  if (value.length > 5) {
    value = value.substring(0, 5);
  }

  setCustomCurrency({
    ...customCurrency,
    symbol: value
  });
}

/**
 * Handles custom currency precision change event.
 *
 * @param {object} detail The select change detail object.
 */
function onPrecisionChange({detail}) {
  let value = parseInt(detail.value);
  setCustomCurrency({
    ...customCurrency,
    precision: value
  });
}

/**
 * Handles confirm button click.
 */
async function onConfirmClick() {
  setError();
  if (currencyConfig.type === 'standard') {
    await onConfirmStandard();
  }
  else if (currencyConfig.type === 'custom') {
    await onConfirmCustom();
  }
}

/**
 * Saves currency config to storage.
 */
async function onConfirmStandard() {
  if (!currencies.has(currencyConfig.code)) {
    setError('Currency code is invalid.');
    return;
  }

  await saveCurrencyConfig(currencyConfig);
  callback(currencyConfig, customCurrency);
  setOpen(false);
}

/**
 * Saves custom currency settings to storage.
 */
async function onConfirmCustom() {
  if (!customCurrency.name) {
    setError('Currency name is required.');
    return;
  }

  if (!customCurrency.symbol) {
    setError('Currency symbol is required.');
    return;
  }

  if (typeof customCurrency.precision !== 'number') {
    setError('Currency precision is invalid.');
    return;
  }

  saveCurrencyConfig(currencyConfig);
  saveCustomCurrency(customCurrency);
  callback(currencyConfig, customCurrency);
  setOpen(false);
}


/**
 * The currency modal component.
 *
 * @param {function} onConfirm A callback function when the confirm button is clicked.
 */
export function CurrencyModal({onConfirm}) {
  [currencyConfig, setCurrencyConfig] = useState({});
  [customCurrency, setCustomCurrency] = useState();
  [open, setOpen] = useState(false);
  [error, setError] = useState();
  callback = onConfirm;

  return (
    <IonModal isOpen={open} onDidDismiss={() => setOpen(false)}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => setOpen(false)}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Currency</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={onConfirmClick}>
              Confirm
            </IonButton>
          </IonButtons>
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
          <IonItem>
            <IonLabel>Type</IonLabel>
            <IonSelect
              value={currencyConfig.type}
              onIonChange={onTypeChange}
              slot="end"
            >
              <IonSelectOption value="standard">Standard</IonSelectOption>
              <IonSelectOption value="custom">Custom</IonSelectOption>
            </IonSelect>
          </IonItem>

          {
            currencyConfig.type === 'standard' && (
              <IonItem>
                <IonLabel>Code</IonLabel>
                <IonInput
                  aria-label="code"
                  value={currencyConfig.code}
                  onIonInput={onCodeInput}
                  slot="end"
                  style={{textAlign: 'right'}}
                />
              </IonItem>
            )
          }

          {
            currencyConfig.type === 'custom' && (
              <>
                <IonItem>
                  <IonLabel>Name</IonLabel>
                  <IonInput
                    aria-label="name"
                    value={customCurrency.name}
                    onIonInput={onNameInput}
                    slot="end"
                    style={{textAlign: 'right'}}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel>Symbol</IonLabel>
                  <IonInput
                    aria-label="symbol"
                    value={customCurrency.symbol}
                    onIonInput={onSymbolInput}
                    slot="end"
                    style={{textAlign: 'right'}}
                  />
                </IonItem>

                <IonItem>
                  <IonLabel>Decimal precision</IonLabel>
                  <IonSelect
                    value={customCurrency.precision}
                    onIonChange={onPrecisionChange}
                    slot="end"
                  >
                    <IonSelectOption value={0}>0</IonSelectOption>
                    <IonSelectOption value={1}>1</IonSelectOption>
                    <IonSelectOption value={2}>2</IonSelectOption>
                    <IonSelectOption value={3}>3</IonSelectOption>
                    <IonSelectOption value={4}>4</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </>
            )
          }
        </IonList>
      </IonContent>
    </IonModal>
  )
}

/**
 * Allows parent component to open the modal.
 *
 * @param {object} config The currency config settings object.
 * @param {object} custom The custom currency config settings object.
 */
export function openCurrencyModal(config, custom) {
  setCurrencyConfig(config);
  setCustomCurrency(custom);
  setOpen(true);
}
