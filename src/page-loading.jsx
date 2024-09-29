import CircularProgress from '@mui/joy/CircularProgress';
import React from 'react';

export default function PageLoading() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CircularProgress size="lg"/>
    </div>
  )
}
