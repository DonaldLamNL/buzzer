import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import MailLockIcon from '@mui/icons-material/MailLock';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function ForgotPassword() {
  // const userStyle = {
  //   height: '100vh',
  //   width: '100%',
  //   backgroundColor: '#bfa'
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      verificationCode: data.get('verificationCode'),
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
          width: '350px',
          // height: '500px',
          paddingBottom: '30px',
          background: 'transparent',
          borderRadius: '20px',
          border: '2px solid rgba(23, 118, 210, 0.5)',
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
              <Avatar sx={{ m: 1, bgcolor: '#1776d2' }}>
                <MailLockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>

              <Typography variant="body3"
              sx={{fontSize: "0.9em"}}>
                {"Please enter your email to receive a 6-digits verification code to reset password"}
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

                <Grid
                  container
                  spacing={2}
                >
                  <Grid item xs={5}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1, mb: 4,}}
                    >
                      Get Code
                    </Button>
                  </Grid>

                  <Grid item xs={7}>
                    <TextField
                      variant="standard"
                      required
                      name="verificationCode"
                      label="Verification Code"
                      id="verificationCode"
                      // sx={{ mt: 1, mb: 4}}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, borderRadius: 6 }}
                >
                  Reset Password
                </Button>

                <Grid container style={{ alignItems: "center" }}>
                  <Link href="/#/login" variant="body2" color='secondary'>
                    {"Back"}
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
