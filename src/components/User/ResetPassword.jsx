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

const theme = createTheme();

export default function ResetPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      verificationCode: data.get("verificationCode"),
    });
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
                Reset Password
              </Typography>

              <Typography variant="body3" sx={{ fontSize: "0.9em", textJustify: "auto" }}>
                {
                  "Please enter your new password and confirmed password to reset password"
                }
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
                  name="oldpassword"
                  label="Original Password"
                  type="password"
                  id="oldpassword"
                />

                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="newpassword"
                  label="New Password"
                  type="password"
                  id="newpassword"
                />

                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmpassword"
                  label="New Password Confirm"
                  type="password"
                  id="confirmpassword"
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
                  <Link href="/#/edit" variant="body2" color="secondary">
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
