import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { height } from '@mui/system';

const theme = createTheme();

export default function User() {
  const userStyle = {
    height: '100vh',
    width: '100%',
    backgroundColor: '#bfa'
  }

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

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
          // display: 'flex',
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
