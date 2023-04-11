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
import MailLockIcon from "@mui/icons-material/MailLock";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import serverPath from "../../ServerPath";

const theme = createTheme();

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState("");

  const [verificationCode, setVerificationCode] = useState("");

  async function getVerificationCode() {
    event.preventDefault();
    try {
      const response = await fetch(`${serverPath}/account/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const responseData = await response.json();
      console.log(responseData);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function resetPassword() {
    event.preventDefault();
    try {
      const response = await fetch(`${serverPath}/account/forgot/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          verificationCode,
          password,
          // confirmPassword,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <section
        style={{
          display: "flex",
          justiftContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          // background: "url('../user_bg.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            margin: "auto",
            position: "relative",
            width: "350px",
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
                <MailLockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>

              <Typography variant="body3" sx={{ fontSize: "0.9em" }}>
                {
                  "Please enter your email to receive a 6-digits verification code to reset password"
                }
              </Typography>

              <Box
                component="form"
                // onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
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
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (!event.target.value.includes("@")) {
                      setEmailError(true);
                      setEmailHelperText("Please enter a valid email");
                    } else {
                      setEmailError(false);
                      setEmailHelperText("");
                    }
                  }}
                  error={emailError}
                  helperText={emailHelperText}
                />

                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1, mb: 1 }}
                      onClick={() => getVerificationCode()}
                      disabled={!email || emailError}
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
                      value={verificationCode}
                      onChange={(event) =>
                        setVerificationCode(event.target.value)
                      }
                      disabled={!email || emailError}
                      // sx={{ mt: 1, mb: 4}}
                    />
                  </Grid>
                </Grid>

                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (
                      confirmPassword &&
                      event.target.value !== confirmPassword
                    ) {
                      setConfirmPasswordError(true);
                      setConfirmPasswordHelperText("Passwords do not match");
                    } else {
                      setConfirmPasswordError(false);
                      setConfirmPasswordHelperText("");
                    }
                    const strongPasswordRegex = new RegExp(
                      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
                    );
                    if (!strongPasswordRegex.test(event.target.value)) {
                      setPasswordError(true);
                      setPasswordHelperText(
                        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                      );
                    } else {
                      setPasswordError(false);
                      setPasswordHelperText("");
                    }
                  }}
                  error={passwordError}
                  helperText={passwordHelperText}
                />

                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password confirm"
                  label="New Password Confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    if (event.target.value !== password) {
                      setConfirmPasswordError(true);
                      setConfirmPasswordHelperText("Passwords do not match");
                    } else {
                      setConfirmPasswordError(false);
                      setConfirmPasswordHelperText("");
                    }
                  }}
                  error={confirmPasswordError}
                  helperText={confirmPasswordHelperText}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, borderRadius: 6 }}
                  onClick={() => resetPassword()}
                  disabled={
                    !email ||
                    !password ||
                    !confirmPassword ||
                    !verificationCode ||
                    emailError ||
                    passwordError ||
                    confirmPasswordError
                  }
                >
                  Reset Password
                </Button>

                <Grid container style={{ alignItems: "center" }}>
                  <Link href="/#/login" variant="body2" color="secondary">
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
