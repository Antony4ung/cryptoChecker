import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export default function Register() {
  return (
    <Box
      component="form"
      sx={{
        
      }}
      onSubmit={(e)=>{e.preventDefault();console.log('submitted')}}
      noValidate
      autoComplete="off"
    >
      <TextField fullWidth sx={{my:1}}  label="Email" variant="outlined" />
      <TextField fullWidth sx={{my:1}} label="Password" variant="outlined" />
      <TextField fullWidth sx={{my:1}} label="Confirm Password" variant="outlined" />
      <Button fullWidth variant="contained" sx={{my:1}} type="submit">Register</Button>

      

    </Box>
  )
}
