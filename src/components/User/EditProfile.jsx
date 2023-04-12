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
import serverPath from "../../ServerPath";

const theme = createTheme();

export default function EditProfile() {
    const navigator = useNavigate();
    // const userid = "admin"; // needs debugging to get the correct uid
    // console.log(userid);
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [userInfo, setUserInfo] = useState("");

    const getUserInfo = async () => {
        try {
            // const response = await fetch(`${serverPath}/users/userprofile?userid=${userid}&currentid=${Cookies.get("BuzzerUser")}`);
            const response = await fetch(`${serverPath}/account/user?userid=${Cookies.get("BuzzerUser")}`);
            const data = await response.json();
            console.log(data);
            setUserInfo(data);
            setDescription(userInfo.description);
            setUsername(userInfo.username);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);


    const [message, setMessage] = useState("");
    const handleSave = async () => {
        try {
            const response = await fetch(`${serverPath}/account/updateProfile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: userInfo.userid,
                    username: username,
                    description: description,
                }),
            });
            const data = await response.json();

            if (data.state) {
                setMessage("Profile updated successfully.");
                setTimeout(() => {
                    navigator(`/user/${userInfo.userid}`);
                }, 2000);
            } else {
                setMessage(data.message);
            }
            console.log(message);
        } catch (error) {
            setMessage("Error updating profile.");
            console.log(error);
        }
    };

    const handleCancel = async () => {
        navigator(`/user/${userInfo.userid}`);
    }

    const handleResetPwd = async () => {
        navigator(`/resetpassword`);
    }


    return (
        <ThemeProvider theme={theme}>
            {userInfo && (
                <section
                    style={{
                        display: "block",
                        justifyContent: "center",
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
                                            {userInfo.username ? userInfo.username[0] : userInfo.username}
                                        </Avatar>

                                        <Box marginTop="20px">
                                            <Typography variant="h4">Edit Profile</Typography>
                                        </Box>

                                        <Box marginTop="10px">
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                marginY="30px"
                                            >
                                                <Typography>User ID</Typography>

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
                                                marginY="30px"
                                            >
                                                <Typography>Username</Typography>
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Required"
                                                    defaultValue={userInfo.username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </Grid>

                                            <hr style={{ opacity: "30%" }}></hr>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                // alignItems="center"
                                                marginY="30px"
                                            >
                                                <Typography>Description</Typography>

                                                <div style={{ height: "50px" }}></div>

                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Multiline"
                                                    multiline
                                                    rows={2}
                                                    defaultValue={userInfo.description}
                                                    fullWidth
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </Grid>

                                            <hr style={{ opacity: "30%" }}></hr>

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                marginY="30px"
                                            >
                                                <Typography>Email</Typography>

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
                                                marginY="30px"
                                            >
                                                <Typography>Password</Typography>
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