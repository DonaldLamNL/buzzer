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
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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
                  onChange={(event) => setEmail(event.target.value)}
                />

                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1, mb: 1 }}
                      onClick={() => getVerificationCode()}
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
                      onChange={(event) =>
                        setVerificationCode(event.target.value)
                      }
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
                  onChange={(event) => setPassword(event.target.value)}
                />

                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password confirm"
                  label="New Password Confirm"
                  type="password"
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, borderRadius: 6 }}
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
