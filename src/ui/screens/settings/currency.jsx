import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import React, {useEffect, useState} from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

/**
 * The component is loading currency data from storage.
 */
let loading, setLoading;

export default function Currency() {
  [loading, setLoading] = useState(true);

  return (
    <Card
      variant="outlined"
      sx={{boxShadow: 'none'}}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}
      >
        <Typography level="h5">Currency</Typography>
      </div>

      <Divider/>

      <Stack direction="column" spacing={2}>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select>
            <Option>World</Option>
            <Option>Custom</Option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Currency</FormLabel>
          <Select>
            <Option>U.S. Dollar</Option>
          </Select>
        </FormControl>
      </Stack>
    </Card>
  )
}