"use client";

import { Button, TextField, Typography } from "@mui/material";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    alert("Hi");
  };

  return (
    <main>
      <Typography variant="h3" fontWeight={600} margin={2}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="dense"
          required
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          margin="dense"
          required
        />
        <Button variant="contained" color="success" size="large" style={{margin:"10px"}}>
          Sign Up
        </Button>
      </form>
    </main>
  );
};

export default SignUp;
