import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
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

/**
 * The input value as a string.
 */
let value, setValue;

/**
 * Determines if this modal is open
 */
let open, setOpen;

/**
 * Opens this modal.
 */
export function openInputModal() {
  setOpen(true);
}

/**
 * Handles click event for Add or Spend button.
 *
 * @param {integer} sign This must be 1 or -1
 */
function onButtonClick(sign, onAddEntry) {
  let intValue = currency(value).intValue * sign;

  if (intValue && typeof intValue === 'number') {
    onAddEntry(intValue);
    setValue('');
    setOpen(false);

    // Scroll page to top
    window.scrollTo(0, 0);
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
 * @param {function} onAddEntry The callback to add a new entry.
 */
export default function InputModal({onAddEntry}) {
  [value, setValue] = useState('');
  [open, setOpen] = useState(false);

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

          <Stack direction="row" spacing={2}>
            <Button
              style={{
                flexGrow: 1,
                flexBasis: '50%'
              }}
              onClick={() => onButtonClick(1, onAddEntry)}
            >
              <Add/>
            </Button>

            <Button
              style={{
                flexGrow: 1,
                flexBasis: '50%'
              }}
              color="danger"
              onClick={() => onButtonClick(-1, onAddEntry)}
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
