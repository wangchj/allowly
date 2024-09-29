import Table from '@mui/joy/Table';
import React from 'react';
import Entry from './entry.jsx';

/**
 * The UI component that shows the list of transaction entries.
 *
 * @param {array} entries The prop that contains the transaction entries.
 */
export default function Entries({entries}) {

  console.log('entries', entries);
  return (
    <Table>
    <thead>
      <tr>
        <th>Time</th>
        <th style={{textAlign: 'right'}}>Amount</th>
        <th style={{textAlign: 'right'}}>Total</th>
      </tr>
    </thead>

      <tbody>
        {entries.map((entry, index) => <Entry key={index} entry={entry}/>)}
      </tbody>
    </Table>
  )
}