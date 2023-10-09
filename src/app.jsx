import '@fontsource/inter';
import Add from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import currency from 'currency.js';
import React, {useState} from 'react';
import MaxWidth from './max-width.jsx';
import Center from './center.jsx';
import InputModal, {openInputModal} from './input-modal.jsx';

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
    <Center>
      <MaxWidth>
        {error && <div>{error}</div>}

        <Stack
          direction="column"
          spacing={3}
        >
          <Total entries={state.entries}/>

          <Divider/>

          <Entries entries={state.entries}/>
        </Stack>
        <InputModal onAddEntry={onAddEntry}/>
      </MaxWidth>
    </Center>
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
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>{$(total)}</h1>

        <Button
          variant="soft"
          color="neutral"
          startDecorator={<Add/>}
          size="sm"
          onClick={() => openInputModal()}
        >
          Add entry
        </Button>
      </Stack>
  )
}

/**
 * The UI component that shows the list of transaction entries.
 *
 * @param {array} entries The prop that contains the transaction entries.
 */
function Entries({entries}) {
  return (
    <Table
      // style={{
      //   width: '100%'
      // }}
    >
    <thead>
      <tr>
        <th>Date</th>
        <th style={{textAlign: 'right'}}>Amount</th>
        <th style={{textAlign: 'right'}}>Total</th>
      </tr>
    </thead>

      <tbody>
        {entries.map(entry => <Entry entry={entry}/>)}
      </tbody>
    </Table>
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
