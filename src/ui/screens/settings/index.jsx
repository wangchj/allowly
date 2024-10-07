// import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import React, {useEffect, useState} from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Currency from './currency';
// import {list} from 'api/aces.js';
// import DeleteAceModal, {openDeleteAceModal} from 'components/ace/delete-ace-modal.jsx'
// import NewAceModal, {openNewAceModal} from 'components/ace/new-ace-modal.jsx'
// import DeleteModal, {openDeleteModal} from 'components/habit/delete-modal.jsx'
// import UpdateHabitModal, {openUpdateHabitModal} from 'components/habit/update-modal.jsx';
// import Error from 'components/widgets/error.jsx';
// import PageSpinner from 'components/widgets/page-spinner.jsx';

/**
 * The settings screen main UI component.
 */
export default function Settings() {
  return (
    <div
      style={{margin: '0 1rem'}}
    >
      <Stack direction="column" spacing={3}>
        <Typography level='h2'>Settings</Typography>
        <Currency/>
      </Stack>
    </div>
  )
}
