import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";

const theme = createTheme();

export default function Signup() {
  const navigate = useNavigate();
  const [signupMsg, setsignupMsg] = useState("");

  const [userid, setUserid] = useState('');
  const [username, setUsername] = useState('');

  const handleUseridChange = (event) => {
    setUserid(event.target.value);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!event.target.value.includes('@')) {
      setEmailError(true);
      setEmailHelperText('Please enter a valid email');
    } else {
      setEmailError(false);
      setEmailHelperText('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (confirmPassword && event.target.value !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText('Passwords do not match');
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordHelperText('');
    }
    const strongPasswordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    if (!strongPasswordRegex.test(event.target.value)) {
      setPasswordError(true);
      setPasswordHelperText(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      );
    } else {
      setPasswordError(false);
      setPasswordHelperText('');
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setConfirmPasswordError(true);
      setConfirmPasswordHelperText('Passwords do not match');
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordHelperText('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${serverPath}/account/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: input.get("userid"),
          username: input.get("username"),
          email: input.get("email"),
          password: input.get("password"),
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.state == false) {
        setsignupMsg(responseData.message);
      } else {
        setsignupMsg(responseData.message);
        Cookies.set("BuzzerUser", responseData.token);
        navigate(`/home`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section
        style={{
          display: "flex",
          justiftContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            display: "flex",
            margin: "auto",
            position: "relative",
            paddingBottom: "30px",
            background: "transparent",
            borderRadius: "20px",
            border: "2px solid rgba(23, 118, 210, 0.5)",
            backdropFilter: "blur(15px)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#1776d2" }}>
                <PersonOutlineOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  label="User ID"
                  name="userid"
                  autoComplete="userid"

                  onChange={handleUseridChange}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  autoComplete="username"

                  onChange={handleUsernameChange}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"

                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailHelperText}
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"

                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={passwordHelperText}
                />

                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password confirm"
                  label="Password Confirm"
                  type="password"

                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                  helperText={confirmPasswordHelperText}
                />

                <Box>{signupMsg}</Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, borderRadius: 6 }}

                  disabled={!userid || !username || !email || !password || !confirmPassword || emailError || passwordError || confirmPasswordError}
                >
                  Sign Up
                </Button>

                <Grid container style={{ alignItems: "center" }}>
                  <Typography variant="body2">
                    {"Already have an account?"} &nbsp;
                  </Typography>
                  <Link href="#/login" variant="body2" color="primary">
                    {"Sign in"}
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
