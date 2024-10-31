import { IonChip } from '@ionic/react';
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
  const value = entry.value;
  const total = entry.total;

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
        <IonChip color={value > 0 ? 'success' : 'danger'}>
          {value > 0 ? '+' : ''}{$(value, currencyConfig, customCurrency)}
        </IonChip>
      </td>
      <td
        style={{
          textAlign: 'right'
        }}
      >
        <IonChip color={total == 0 ? '' : total > 0 ? 'success' : 'danger'}>
          {$(total, currencyConfig, customCurrency)}
        </IonChip>
      </td>
    </tr>
  )
}
