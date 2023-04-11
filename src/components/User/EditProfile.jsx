import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Button,
    CssBaseline,
    Grid,
    Box,
    Typography,
    Container,
    Stack,
    IconButton,
    Tooltip,
    TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewBuzzItem from "../Items/NewBuzzItem";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { CheckCircle } from "@mui/icons-material";
// import serverPath from "../../ServerPath";

const theme = createTheme();

export default function EditProfile() {
    const navigator = useNavigate();
    const { userid } = useParams();
    //   const [userInfo, setUserInfo] = useState(null);

    const userInfo = {
        username: "abc def",
        userid: "abc101",
        email: "abcdef@gmail.com",
        icon: "",
        description: "abcdefg",
        followingCount: 12,
        followersCount: 23,
        isVerify: false,
        isCurrentUser: true,
    }

    const handleSave = async () => {
        
    }

    const handleCancel = async () => {
        navigator(`/user/${userInfo.userid}`);
    }

    const handleResetPwd = async () => {
        navigator(`/resetpassword`)
    }

    //   const getUserInfo = async () => {
    //     try {
    //       const response = await fetch(
    //         `${serverPath}/users/userprofile?userid=${userid}&currentid=${Cookies.get(
    //           "BuzzerUser"
    //         )}`
    //       );
    //       const data = await response.json();
    //       setUserInfo(data.userInfo);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   useEffect(() => {
    //     getUserInfo();
    //   }, [userid]);

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
                            }}
                        >
                            <Stack>
                                <Container
                                    sx={{
                                        position: "relative",
                                        display: "flex",
                                        background: "#66ccff",
                                        borderRadius: "30px 30px 0 0",
                                        height: "fit-content",
                                        minHeight: "250px",
                                        width: "100%",
                                    }}
                                ></Container>
                                <Box
                                    sx={{
                                        position: "relative",
                                        padding: "10px",
                                        display: "flex",
                                        background: "#f7f9f9",
                                        width: "100%",
                                        height: "fit-content",
                                        borderBottom: "1px solid #DCDCDC",
                                        borderRadius: "0 0 30px 30px",
                                    }}
                                >
                                    <Container
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            // height: "1000px",
                                            width: "70%",
                                        }}
                                    >
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
                                            src={userInfo.icon}
                                        >
                                            {userInfo.username
                                                ? userInfo.username[0]
                                                : userInfo.username}
                                        </Avatar>

                                        <Box marginTop="20px">
                                            <Typography variant="h4">
                                                Edit Profile
                                            </Typography>
                                        </Box>

                                        <Box marginTop="10px">

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                marginY="30px">

                                                <Typography>
                                                    User ID
                                                </Typography>

                                                {/* <div style={{ height: "50px" }}></div> */}

                                                <TextField
                                                    margin="normal"
                                                    disabled
                                                    fullWidth
                                                    name="userid"
                                                    defaultValue={userInfo.userid}
                                                />

                                            </Grid>

                                            <hr style={{ opacity: "30%" }}></hr>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                marginY="30px">

                                                <Box>
                                                    <Grid container direction="row" alignItems="center">
                                                        <Typography>
                                                            First name
                                                        </Typography>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Required"
                                                            defaultValue={userInfo.username.substring(0, userInfo.username.indexOf(' '))}
                                                        />
                                                    </Grid>
                                                </Box>

                                                <Box>
                                                    <Grid container direction="row" alignItems="center">
                                                        <Typography>
                                                            Last name
                                                        </Typography>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <TextField
                                                            required
                                                            id="outlined-required"
                                                            label="Required"
                                                            defaultValue={userInfo.username.substring(userInfo.username.indexOf(' ') + 1)}
                                                        />
                                                    </Grid>
                                                </Box>


                                            </Grid>

                                            <hr style={{ opacity: "30%" }}></hr>

                                            {/* <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                marginY="30px">
                                                <Typography>
                                                    Icon
                                                </Typography>

                                                <Avatar
                                                    sx={{
                                                        fontSize: "400%",
                                                        color: "white",
                                                        background: "#1776d2",
                                                        width: "100px",
                                                        height: "100px",
                                                    }}
                                                    src={userInfo.icon}
                                                >
                                                    {userInfo.username
                                                        ? userInfo.username[0]
                                                        : userInfo.username}
                                                </Avatar>

                                                <Box container>
                                                    <Button variant="outlined" color="error">
                                                        Delete
                                                    </Button>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <Button variant="contained">
                                                        Upload
                                                    </Button>
                                                </Box>

                                            </Grid>

                                            <hr style={{ opacity: "30%" }}></hr> */}

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                // alignItems="center"
                                                marginY="30px">

                                                <Typography>
                                                    Category Preference
                                                </Typography>


                                            </Grid>

                                            <hr style={{ opacity: "30%" }}></hr>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                // alignItems="center"
                                                marginY="30px">

                                                <Typography>
                                                    Description
                                                </Typography>

                                                <div style={{ height: "50px" }}></div>

                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Multiline"
                                                    multiline
                                                    rows={2}
                                                    defaultValue={userInfo.description}
                                                    fullWidth
                                                />

                                            </ Grid>

                                            <hr style={{ opacity: "30%" }}></hr>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                marginY="30px">

                                                <Typography>
                                                    Email
                                                </Typography>

                                                <div style={{ height: "50px" }}></div>

                                                <TextField
                                                    margin="normal"
                                                    disabled
                                                    fullWidth
                                                    name="email"
                                                    defaultValue={userInfo.email}
                                                />

                                            </Grid>

                                            <hr style={{ opacity: "30%" }}></hr>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                marginY="30px">

                                                <Typography>
                                                    Password
                                                </Typography>

                                                <Button variant="contained" onClick={handleResetPwd}>
                                                    Reset Password
                                                </Button>

                                            </Grid>

                                            {/* <hr style={{ opacity: "30%" }}></hr> */}

                                        </Box>

                                    </Container>

                                    <Button
                                        variant="outlined"
                                        sx={{
                                            position: "absolute",
                                            right: "100px",
                                            borderRadius: "20px",
                                        }}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            position: "absolute",
                                            right: "20px",
                                            borderRadius: "20px",
                                        }}
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>


                                </Box>
                                {/* {
                                    <Box
                                        sx={{
                                            borderBottom: "0 30px",
                                            width: "100%",
                                            minHeight: "150px",
                                        }}
                                    >

                                    </Box>
                                } */}
                            </Stack>
                        </Grid>
                    </Grid>
                </section>
            )}
        </ThemeProvider>
    );
}
