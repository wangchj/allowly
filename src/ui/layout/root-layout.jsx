import Menu from '@mui/icons-material/Menu';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React, { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import clearEntries from 'modules/clear-entries';
import Center from './center';
import MaxWidth from './max-width';

/**
 * React router navigate function.
 */
let navigate;

/**
 * Determines if the nav drawer is open.
 */
let drawerOpen, setDrawerOpen;

/**
 * Determines if the clear entry confirmation modal is shown.
 */
let modalOpen, setModalOpen;

/**
 * Handles draw item click event.
 *
 * @param {string} item Item name
 */
function onDrawerItemClick(item) {
  switch(item) {
    case 'entries':
      navigate('/');
      break;

    case 'settings':
      navigate('/settings');
      break;

    case 'about':
      navigate('/');
      break;

    case 'delete':
      setModalOpen(true);
      break;
  }

  setDrawerOpen(false);
}

/**
 * Handles delete all entries confirmed event.
 */
function onDeleteConfirmed() {
  setModalOpen(false);
  clearEntries();
  navigate('/');
}

/**
 * The root layout UI component.
 */
export default function RootLayout() {
  navigate = useNavigate();

  [drawerOpen, setDrawerOpen] = useState(false);
  [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          width: '100%',
          top: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          margin:0,
          paddingTop: 'env(safe-area-inset-top, 0)'
        }}
      >
        <Center>
          <MaxWidth>
            <Button variant="plain" color="neutral" onClick={() => setDrawerOpen(true)}>
              <Menu/>
            </Button>
          </MaxWidth>
        </Center>
      </div>

      <Drawer open={drawerOpen} anchor="bottom" onClose={() => setDrawerOpen(false)} size="sm">
        <List component="nav">
          <ListItemButton onClick={() => onDrawerItemClick('entries')}>Entries</ListItemButton>
          <ListItemButton onClick={() => onDrawerItemClick('settings')}>Settings</ListItemButton>
          <ListItemButton onClick={() => onDrawerItemClick('about')}>About</ListItemButton>
          <ListItemButton onClick={() => onDrawerItemClick('delete')} color="danger">Delete all entries</ListItemButton>
        </List>
      </Drawer>

      <Modal open={modalOpen}>
        <ModalDialog>
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Delete all entries?
          </Typography>

          <Stack direction="column" spacing={3}>
            <div>This cannot be undone.</div>

            <Stack direction="row" spacing={2}>
              <Button color="danger" onClick={() => onDeleteConfirmed()} sx={{flexGrow: 1}}>Yes, delete</Button>
              <Button onClick={() => setModalOpen(false)} sx={{flexGrow: 1}}>No, go back</Button>
            </Stack>
          </Stack>
        </ModalDialog>
      </Modal>

      <Center>
        <MaxWidth>
          <div
            style={{
              // 2.5rem is roughly the height of div that contains the hamburger button
              marginTop: 'calc(env(safe-area-inset-top, 0) + 2.5rem)'
            }}
          >
            <Outlet />
          </div>
        </MaxWidth>
      </Center>
    </div>
  );
}
