import { Box, Typography } from '@mui/material'
import React from 'react'

const NotFound = ({text}) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" height="100%" >
    <Typography sx={{typography:{xs:"h5",sm:"h3",md:"h2",lg:"h1"}}} color="text.secondary">{text}</Typography>
    </Box>
  )
}

export default NotFound