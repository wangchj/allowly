import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import currency from 'currency.js';
import React, {useState} from 'react';
import addEntry from 'modules/add-entry';

/**
 * The current entries passed in from the component that opened this model.
 */
let entries;

/**
 * The input value as a string.
 */
let value, setValue;

/**
 * Determines if this modal is open
 */
let open, setOpen;

/**
 * The error message shown on the UI.
 */
let error, setError;

/**
 * Opens this modal.
 *
 * @param {array} _entries The current entries.
 */
export function openInputModal(_entries) {
  entries = _entries
  setOpen(true);
}

/**
 * Handles click event for Add or Spend button.
 *
 * @param {integer} sign This must be 1 or -1
 * @param {function} onEntryAdded The callback function after a new entry has been added.
 */
async function onButtonClick(sign, onEntryAdded) {
  let intValue = currency(value).intValue * sign;

  if (intValue && typeof intValue === 'number') {

    try {
      // Add the new entry
      const res = await addEntry(entries, intValue);

      // Notify the parent a new entry has been added
      onEntryAdded(res);

      // Reset modal input
      setValue('');
      setOpen(false);

      // Scroll page to top
      window.scrollTo(0, 0);
    }
    catch (error) {
      setError(error.message ?? JSON.stringify(error));
    }
  }
}

/**
 * Handles modal close event.
 */
function onClose() {
  setOpen(false);

  // Scroll page to top
  window.scrollTo(0, 0);
}

/**
 * The input modal UI component.
 *
 * @param {function} onEntryAdded The callback function after a new entry has been added.
 */
export default function InputModal({onEntryAdded}) {
  [value, setValue] = useState('');
  [open, setOpen] = useState(false);
  [error, setError] = useState();

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <ModalDialog>
      <Stack spacing={2}>
        <div>
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Add entry
          </Typography>

        </div>

        <Stack spacing={2}>
          <FormControl>
            <Input
              type="number"
              inputMode="decimal"
              startDecorator="$"
              value={value}
              onChange={event => setValue(event.target.value)}
              autoFocus
              required
            />
          </FormControl>

          {error && <Alert color="danger">{error}</Alert>}

          <Stack direction="row" spacing={2}>
            <Button
              style={{
                flexGrow: 1,
                flexBasis: '50%'
              }}
              onClick={() => onButtonClick(1, onEntryAdded)}
            >
              <Add/>
            </Button>

            <Button
              style={{
                flexGrow: 1,
                flexBasis: '50%'
              }}
              color="danger"
              onClick={() => onButtonClick(-1, onEntryAdded)}
            >
              <Remove/>
            </Button>
          </Stack>
        </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
