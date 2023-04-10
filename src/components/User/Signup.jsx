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

const theme = createTheme();

export default function Signup() {
  const navigate = useNavigate();
  const [signupMsg, setsignupMsg] = useState("");

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
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                />

                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  name="password confirm"
                  label="Password Confirm"
                  type="password"
                />

                <Box>{signupMsg}</Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, borderRadius: 6 }}
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
