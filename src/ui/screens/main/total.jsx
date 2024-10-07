import Add from '@mui/icons-material/Add';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import currency from 'currency.js';
import React from 'react';
import InputModal, {openInputModal} from './input-modal.jsx';

/**
 * The UI component that shows the total amount.
 *
 * @param {array} entries The prop that contains the entries.
 * @param {function} onEntryAdded The callback function after a new entry has been added.
 */
export default function Total({entries, onEntryAdded}) {
  // Total value
  let total = entries && entries.length > 0 ? entries[0].total : 0;

  // The total value as a string
  let totalStr = currency(Math.abs(total), {fromCents: true, symbol: ''}).format();

  // Is total negative?
  let negative = total < 0;

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{
            fontSize: '3.5rem',
            fontWeight: 'normal',
            mt: 0,
            mb: 2.5,
            lineHeight: '1' // The default line-height of 1.5 has too much top padding
          }}
          startDecorator={
            <Typography
              textColor={negative ? 'danger': "text.secondary"}
              sx={{
                fontSize: '1.7rem',
                position: 'relative',
                top: '-0.5rem'
              }}
            >
              {negative &&<span>-</span>} $
            </Typography>
          }
          color={negative ? 'danger' : ''}
        >
          {totalStr}
        </Typography>

        <Button
          variant="soft"
          color="neutral"
          startDecorator={<Add/>}
          size="sm"
          onClick={() => openInputModal(entries)}
        >
          Add entry
        </Button>
      </Stack>

      <InputModal onEntryAdded={onEntryAdded}/>
    </>
  )
}
