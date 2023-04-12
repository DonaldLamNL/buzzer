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

export default function Login() {
  const navigate = useNavigate();
  const [loginMsg, setLoginMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${serverPath}/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usermsg: input.get("usermsg"),
          password: input.get("password"),
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.state) {
        setLoginMsg(responseData.message);
        Cookies.set("BuzzerUser", responseData.token);
        navigate(`/home`);
      } else {
        setLoginMsg(responseData.message);
      }
    } catch (error) {
      console.error(error);
      setLoginMsg(responseData.message);
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
          // background: "url('../user_bg.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            margin: "auto",
            position: "relative",
            // width: '400px',
            // height: '500px',
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
                Log in
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
                  label="User Id / Email Address"
                  name="usermsg"
                  autoComplete="usermsg"
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

                <Box>
                  <Typography
                    variant="body3"
                    sx={{ fontSize: "0.9em", color: "red" }}
                  >
                    {loginMsg}
                  </Typography>
                </Box>

                <Grid container justifyContent="flex-end">
                  <Link href="#/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, borderRadius: 6 }}
                >
                  Sign In
                </Button>

                <Grid container style={{ alignItems: "center" }}>
                  <Typography variant="body2">
                    {"New to Buzzer?"} &nbsp;
                  </Typography>
                  <Link href="/#/signup" variant="body2" color="secondary">
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
