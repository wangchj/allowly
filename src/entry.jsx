import React from 'react';
import $ from 'modules/format-currency';
import formatDateTime from 'modules/format-time';

/**
 * The UI component for a single transaction entry.
 *
 * @param {object} entry The transaction object.
 */
export default function Entry({entry}) {
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
