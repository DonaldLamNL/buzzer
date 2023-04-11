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
import { useEffect } from "react";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";

const theme = createTheme();

export default function ResetPassword() {
  const handleSubmit = async(event) => {
    event.preventDefault();
    // const input = new FormData(event.currentTarget);
    var temp = "";
    try {
      await fetch(
        `${serverPath}/users/currentuser?userid=${Cookies.get("BuzzerUser")}`
      )
        .then((_response) => _response.json())
        .then((data) => {
          // SetIsLogin(data.isLogin);
          temp = data.userid;
          console.log(temp);
        })
        .catch((error) => { });
      // console.log("z abc");
      const response = await fetch(`${serverPath}/account/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: temp,
          password: password,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      // console.log("zzz");
      // return data;
    } catch (error) {
      console.error(error);
    }
    console.log("password = ", password);
    // const data = new FormData(event.currentTarget);
    // console.log("abc");
    // console.log({
    // email: data.get("email"),
    // verificationCode: data.get("verificationCode"),
    // password: data.get("password"),
    // });
  };

  const [oldPassword, setOldPassword] = useState('');

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  }

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');

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

  const [userInfo, setUserInfo] = useState(null);
  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `${serverPath}/users/currentuser?userid=${Cookies.get("BuzzerUser")}`
      );
      const data = await response.json();
      setUserInfo(data.userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  async function resetPassword() {
    event.preventDefault();
    try {
      fetch(
        `${serverPath}/users/currentuser?userid=${Cookies.get("BuzzerUser")}`
      )
        .then((_response) => _response.json())
        .then((data) => {
          // SetIsLogin(data.isLogin);
          const username = data.username;
          console.log(username)
        })
        .catch((error) => { });
      const response = await fetch(`${serverPath}/account/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // email,
          // verificationCode,
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

  useEffect(() => {
    getUserInfo();
  })

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

                  value={oldPassword}
                  onChange={handleOldPasswordChange}
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
                  name="confirmpassword"
                  label="New Password Confirm"
                  type="password"
                  id="confirmpassword"

                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                  helperText={confirmPasswordHelperText}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2, borderRadius: 6 }}

                  // onClick={() => resetPassword()}
                  disabled={!oldPassword || !password || !confirmPassword || passwordError}
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
