import currency from 'currency.js';
import React, {useState} from 'react';

/**
 * The browser local storage object.
 */
const localStorage = window.localStorage;

/**
 * The local storage name.
 */
const storageKey = 'spending-state';

/**
 * Formats cents value as a currency string.
 *
 * @param {integer} cents The value in cents.
 * @returns {string} The currency formatted string (e.g., $99.99).
 */
function $(cents) {
  return currency(cents, {fromCents: true}).format();
}

/**
 * The main app component.
 */
export default function App() {

  /**
   * The app state object.
   */
  let [state, setState] = useState(
    localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {entries: []}
  );

  /**
   * The error text to show on the UI.
   */
  let [error, setError] = useState();

  /**
   * Adds a new transaction entry.
   *
   * @param {number} value The transaction value
   */
  function onAddEntry(value) {
    if (!value || typeof value !== 'number')
      return;

    setError();

    let entries = [...state.entries];

    // We only keep 20 entries
    if (entries.length === 20) {
      entries.pop();
    }

    // Add the new entry
    entries.splice(0, 0, {
      time: Date.now(),
      value: value,
      total: entries.length === 0 ? value : entries[0].total + value
    });

    let newState = {
      entries: entries
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(newState));
      setState(newState);
    }
    catch (error) {
      setError(JSON.stringify(error));
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <Total entries={state.entries}/>
      <Entries entries={state.entries}/>
      <Inputs onAddEntry={onAddEntry}/>
    </div>
  )
}

/**
 * The UI component that shows the total amount.
 *
 * @param {array} entries The prop that contains the transaction entries.
 */
function Total({entries}) {
  let total = entries && entries.length > 0 ? entries[0].total : 0
  return (
    <h1>
      {$(total)}
    </h1>
  )
}

/**
 * The UI component that shows the list of transaction entries.
 *
 * @param {array} entries The prop that contains the transaction entries.
 */
function Entries({entries}) {
  return (
    <table
      style={{
        width: '100%'
      }}
    >
      <tbody>
        {entries.map(entry => <Entry entry={entry}/>)}
      </tbody>
    </table>
  )
}

/**
 * The UI component for a single transaction entry.
 *
 * @param {object} entry The transaction object.
 */
function Entry({entry}) {
  return (
    <tr>
      <td>
        {(new Date(entry.time)).toLocaleString('en-us', {dateStyle: 'full'})}
      </td>
      <td
        style={{
          textAlign: 'right'
        }}
      >
        {$(entry.value)}
      </td>
      <td
        style={{
          textAlign: 'right'
        }}
      >
        {$(entry.total)}
      </td>
    </tr>
  )
}

/**
 * The component to input new transactions.
 *
 * @param {function} onAddEntry The callback for a new transaction.
 */
function Inputs({onAddEntry}) {
  let [value, setValue] = useState('');

  return (
    <div
      style={{
        marginTop: '2em',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around'
      }}
    >
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={event => setValue(event.target.value)}
        style={{
          flexGrow: '3'
        }}
      />

      <button
        onClick={() => {
          onAddEntry(currency(value).intValue);
          setValue('');
        }}
        style={{
          marginLeft: '1rem',
          flexGrow: '1'
        }}
      >
        Deposit
      </button>

      <button
        onClick={() => {
          onAddEntry(currency(value).intValue * -1);
          setValue('');
        }}
        style={{
          marginLeft: '1rem',
          flexGrow: '1'
        }}
      >
        Spend
      </button>
    </div>
  )
}
