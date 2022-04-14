import { Box, Button, TextField } from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
export default function Login({googleLogin}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <Box
      component="form"
      sx={{}}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField fullWidth sx={{ my: 1 }} label="Email" variant="outlined" />
      <TextField fullWidth sx={{ my: 1 }} label="Password" variant="outlined" />
      <Button fullWidth variant="contained" sx={{ my: 1 }} type="submit">
        Login
      </Button>

      <h5 style={{ textAlign: "center", margin: "20px 0" }}>Or</h5>

      <Box sx={{ mt: 2, justifyContent: "center", display: "flex" }}>
        <Button onClick={googleLogin}>
          <GoogleIcon />
        </Button>
        <Button >
          <FacebookIcon />
        </Button>
      </Box>
    </Box>
  );
}
