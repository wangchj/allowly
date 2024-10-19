import React from 'react';
import {format as $} from 'modules/currency';
import formatDateTime from 'modules/format-time';

/**
 * The UI component for a single transaction entry.
 *
 * @param {object} entry The transaction object.
 * @param {object} currencyConfig The currency settings object.
 * @param {object} customCurrency The custom currency settings object.
 */
export default function Entry({entry, currencyConfig, customCurrency}) {
  return (
    <tr>
      <td>
        {formatDateTime(entry.time)}
      </td>
      <td
        style={{
          textAlign: 'right'
        }}
      >
        {$(entry.value, currencyConfig, customCurrency)}
      </td>
      <td
        style={{
          textAlign: 'right'
        }}
      >
        {$(entry.total, currencyConfig, customCurrency)}
      </td>
    </tr>
  )
}
