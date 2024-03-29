/*
Component Name: NewEditProfile.jsx
Description: The user profile edit interface.
*/

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CssBaseline, Grid, Box, Typography, Container, Stack, IconButton, Tooltip, TextField, } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import { CheckCircle } from "@mui/icons-material";
import serverPath from "../../ServerPath";

const theme = createTheme();

export default function NewEditProfile() {
    const navigator = useNavigate();
    const bgImageRef = useRef(null);
    const iconRef = useRef(null);
    const [userInfo, setUserInfo] = useState(null);
    const [username, setUsername] = useState(null);
    const [description, setDescription] = useState(null);
    const [bgImageDisplay, setBgImageDisplay] = useState(null);
    const [bgImage, setBgImage] = useState(null);
    const [onExecute, setOnExecute] = useState(false);
    const [icon, setIcon] = useState(null);
    const [iconDisplay, setIconDisplay] = useState(null);

    // Get user information
    const getUserInfo = async () => {
        try {
            const response = await fetch(`${serverPath}/users/userinfo?userid=${Cookies.get("BuzzerUser")}`);
            const data = await response.json();
            console.log(data)
            setUserInfo(data.userInfo);
            setUsername(data.userInfo.username);
            setDescription(data.userInfo.description);
            getImage(data.userInfo.bgimage);
            getIcon(data.userInfo.icon);
        } catch (error) {
            console.log(error);
        }
    };

    // Get Background image
    const getImage = async (imageName) => {
        if (imageName) {
            fetch(`${serverPath}/users/bgimage/${imageName}`)
                .then((response) => response.blob())
                .then((image) => {
                    setBgImageDisplay(URL.createObjectURL(image));
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setBgImageDisplay(null)
        }
    };

    // Get icon
    const getIcon = async (imageName) => {
        if (imageName) {
            console.log(imageName)
            fetch(`${serverPath}/users/icon/${imageName}`)
                .then((response) => response.blob())
                .then((image) => {
                    setIconDisplay(URL.createObjectURL(image));
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setIconDisplay(null)
        }
    };

    // Update user background image.
    const handleBgImageUpload = async (e) => {
        const file = e.target.files[0];
        setBgImageDisplay(URL.createObjectURL(file));
        setBgImage(file)
    };

    // Update user icon.
    const handleIconUpdate = async (e) => {
        const file = e.target.files[0];
        setIconDisplay(URL.createObjectURL(file));
        setIcon(file)
    };

    // Update the latest user information
    const handleSave = async () => {
        if (onExecute) {
            return
        } else {
            setOnExecute(true);
        }

        // Update bgImage
        const formData = new FormData();
        formData.append("userid", Cookies.get("BuzzerUser"));
        formData.append("image", bgImage);
        formData.append("icon", icon)
        try {
            const response = await fetch(`${serverPath}/users/bgimage`, {
                method: "POST",
                body: formData,
            });
        } catch (err) {
            console.error(err);
        }

        // Save
        try {
            const response = await fetch(`${serverPath}/users/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: Cookies.get("BuzzerUser"),
                    username: username,
                    description: description,
                }),
            });
            const data = await response.json();

            if (data.state) {
                window.scrollTo({ top: 0 });
                navigator(`/user/${userInfo.userid}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Navigate Reset Password
    const handleResetPwd = async () => {
        window.scrollTo({ top: 0 });
        navigator(`/resetpassword`);
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {userInfo && (
                <section
                    style={{
                        display: "block",
                        justiftContent: "center",
                        minHeight: "100vh",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                >
                    <CssBaseline />
                    <Grid container spacing={0}>
                        <Grid
                            item
                            sx={{
                                border: "1px solid #DCDCDC",
                                borderRadius: "30px",
                                width: "100%",
                                height: "fit-content",
                                margin: "20px",
                                overflow: 'hidden',
                            }}
                        >
                            <Stack>

                                {/* Profile Background Image */}
                                <img
                                    src={bgImageDisplay}
                                    style={{
                                        maxHeight: "400px",
                                        minHeight: "200px",
                                        width: "100%",
                                        position: "relative",
                                        display: "flex",
                                        background: "#66ccff",
                                        borderRadius: "30px 30px 0 0",
                                    }}
                                    onClick={() => {
                                        bgImageRef.current.click();
                                    }}
                                />
                                <input
                                    type="file"
                                    ref={bgImageRef}
                                    onChange={handleBgImageUpload}
                                    style={{ display: 'none' }}
                                />

                                {/* Profile Information */}
                                <Box
                                    sx={{
                                        position: "relative",
                                        padding: "10px",
                                        display: "flex",
                                        background: "#f7f9f9",
                                        width: "100%",
                                        height: "fit-content",
                                        borderBottom: "1px solid #DCDCDC",
                                    }}
                                >
                                    <Container
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {/* Avatar */}
                                        <Avatar
                                            sx={{
                                                fontSize: "400%",
                                                color: "white",
                                                background: "#1776d2",
                                                width: "100px",
                                                height: "100px",
                                                marginTop: "-64px",
                                                outline: "4px solid white",
                                            }}
                                            src={iconDisplay}
                                            onClick={() => { iconRef.current.click(); }}
                                        >
                                            {userInfo.username ? userInfo.username[0] : userInfo.username}
                                        </Avatar>
                                        <input
                                            type="file"
                                            ref={iconRef}
                                            onChange={handleIconUpdate}
                                            style={{ display: 'none' }}
                                        />

                                        {/* User Info */}
                                        <Box marginTop="10px">
                                            <Typography fontWeight="600" component="h1" variant="h6">
                                                {userInfo.username}
                                                {userInfo.isVerify && (
                                                    <CheckCircle sx={{ color: "orange", ml: 1 }} />
                                                )}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    opacity: "0.5",
                                                }}
                                            >
                                                @{userInfo.userid}
                                            </Typography>
                                        </Box>

                                        {/* Edition Area */}

                                        {/* Userinfo */}
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            marginTop="30px"
                                            marginBottom="30px"
                                        >
                                            <Box>
                                                <Grid container direction="row" alignItems="center">
                                                    <Typography>
                                                        User ID
                                                    </Typography>
                                                    <TextField
                                                        disabled
                                                        fullWidth
                                                        name="userid"
                                                        defaultValue={userInfo.userid}
                                                    />
                                                </Grid>
                                            </Box>
                                            <Box>
                                                <Grid container direction="row" alignItems="center">
                                                    <Typography>
                                                        Username
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        name="username"
                                                        defaultValue={username}
                                                        onChange={(e) => { setUsername(e.target.value) }}
                                                    />
                                                </Grid>
                                            </Box>
                                        </Grid>

                                        <div>
                                            <hr style={{ opacity: "30%" }}></hr>
                                        </div>

                                        {/* Email */}
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            marginTop="30px"
                                            marginBottom="30px"
                                        >
                                            <Typography>
                                                Email
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                disabled
                                                margin="normal"
                                                name="email"
                                                defaultValue={userInfo.email}
                                            />
                                        </Grid>

                                        <div>
                                            <hr style={{ opacity: "30%" }}></hr>
                                        </div>

                                        {/* Description */}
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            marginTop="30px"
                                            marginBottom="30px"
                                        >
                                            <Typography>
                                                Description
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={2}
                                                margin="normal"
                                                name="description"
                                                defaultValue={description}
                                                onChange={(e) => { setDescription(e.target.value) }}
                                            />
                                        </Grid>

                                        <div>
                                            <hr style={{ opacity: "30%" }}></hr>
                                        </div>

                                        {/* Category */}
                                        {/* <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            marginTop="30px"
                                        >

                                            <Typography>
                                                Category
                                            </Typography>

                                        </Grid> */}

                                        {/* Password */}
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            marginTop="30px"
                                            marginBottom="30px"
                                        >
                                            <Typography>Password</Typography>
                                            <Button
                                                variant="contained"
                                                onClick={handleResetPwd}
                                            >
                                                Reset Password
                                            </Button>
                                        </Grid>

                                        <div>
                                            <hr style={{ opacity: "30%" }}></hr>
                                        </div>

                                        <Button
                                            variant="contained"
                                            sx={{
                                                width: "fit-content",
                                                borderRadius: "20px",
                                                margin: "30px auto 10px auto"
                                            }}
                                            onClick={handleSave}
                                        >
                                            Save
                                        </Button>
                                    </Container>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </section>
            )}
        </ThemeProvider>
    );
}
