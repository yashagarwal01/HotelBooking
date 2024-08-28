import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" height="100%" >
      <CircularProgress />
    </Box>
  );
}