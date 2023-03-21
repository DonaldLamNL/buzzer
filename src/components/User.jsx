import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function User() {
  const userStyle = {
    height: '100vh',
    width: '100%',
    backgroundColor: '#bfa'
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <section style={{
        display: 'flex',
        justiftContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        background: "url('../user_bg.jpeg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}>
        <div style={{
          margin: 'auto',
          position: 'relative',
          width: '400px',
          height: '500px',
          background: 'transparent',
          borderRadius: '20px',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(15px)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                <PersonOutlineOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Grid container justifyContent="flex-end">
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  Sign In
                </Button>

                <Grid container style={{ alignItems: "center" }}>
                  <Typography variant="body2">
                    {"New to Buzzer?"} &nbsp;
                  </Typography>
                  <Link href="#" variant="body2" color='secondary'>
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </section>
    </ThemeProvider>
  );
}
