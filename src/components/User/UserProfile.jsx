import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CssBaseline, Grid, Box, Typography, Container, Stack, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewBuzzItem from "../Items/NewBuzzItem";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { CheckCircle } from "@mui/icons-material";

const theme = createTheme();

export default function UserProfile() {
    const navigator = useNavigate();
    const { userid } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [isExecuting, setIsExecuting] = useState(false);
    const [isFollow, setIsFollow] = useState(null);
    const [followersCount, setFollowersCount] = useState(null);
    const [buzzList, setBuzzList] = useState([]);

    const handleButton = async () => {
        if (userInfo.isCurrentUser) {
            navigator(`/useredit`)
        } else {
            handleFollow();
        }
    }

    const handleFollow = async () => {
        if (isExecuting) {
            return;
        }
        setIsExecuting(true);
        try {
            const response = await fetch('http://localhost:3000/users/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetid: userid,
                    userid: Cookies.get('BuzzerUser'),
                    isFollow,
                    followersCount,
                }),
            });
            const responseData = await response.json();
            if (responseData.state) {
                setIsFollow(responseData.follow);
                setFollowersCount(responseData.numOfFollowers);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsExecuting(false);
        }
    }

    const getUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/userprofile?userid=${userid}&currentid=${Cookies.get('BuzzerUser')}`);
            const data = await response.json();
            setUserInfo(data.userInfo);
            setIsFollow(data.userInfo.isFollow)
            setFollowersCount(data.userInfo.followersCount)
        } catch (error) {
            console.log(error);
        }
    };

    const getBuzzes = async () => {
        fetch(`http://localhost:3000/buzzes/user?userid=${userid}&currentid=${Cookies.get('BuzzerUser')}`)
            .then(response => response.json())
            .then(responseData => {
                setBuzzList(responseData);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUserInfo();
        getBuzzes();
    }, [userid, isFollow]);


    return (
        <ThemeProvider theme={theme}>
            {userInfo && <section
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
                            border: '1px solid #DCDCDC',
                            borderRadius: "30px",
                            width: '100%',
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
                                    width: '100%',
                                }}
                            ></Container>
                            <Box
                                sx={{
                                    position: "relative",
                                    padding: "10px",
                                    display: "flex",
                                    background: "#f7f9f9",
                                    width: '100%',
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
                                    <Avatar
                                        sx={{
                                            fontSize: "400%",
                                            color: "white",
                                            background: "#1776d2",
                                            width: '100px',
                                            height: '100px',
                                            marginTop: '-64px',
                                            outline: "4px solid white",
                                        }}
                                        src={userInfo.icon}
                                    >
                                        {userInfo.username ? userInfo.username[0] : userInfo.username}
                                    </Avatar>

                                    <Box marginTop='10px' >
                                        <Typography fontWeight="600" component="h1" variant="h6">
                                            {userInfo.username}
                                            {userInfo.isVerify &&
                                                <CheckCircle sx={{ color: 'orange', ml: 1 }} />
                                            }
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

                                    <Typography margin="20px 0" whiteSpace="pre-wrap" > {userInfo.description} </Typography>

                                    <Box display={"flex"}>
                                        <Link
                                            to={`/userlist/${userid}/0`}
                                            onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}}
                                            underline="hover"
                                            sx={{
                                                display: "flex",
                                                color: "#000",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "800",
                                                }}
                                            >
                                                {userInfo.followingCount} Following
                                            </Typography>
                                        </Link>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link
                                            to={`/userlist/${userid}/1`}
                                            onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'})}}
                                            underline="hover"
                                            sx={{
                                                display: "flex",
                                                color: "#000",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "800",
                                                }}
                                            >
                                                {userInfo.followersCount} Followers
                                            </Typography>
                                        </Link>
                                    </Box>
                                </Container>
                                {/* <Tooltip title="Send Message" placement="top" arrow>
                                    <IconButton
                                        variant="outlined"
                                        sx={{
                                            position: "absolute",
                                            right: "130px",
                                            outline: "1px solid #DCDCDC",
                                        }}
                                    >
                                        <MailOutlineIcon></MailOutlineIcon>
                                    </IconButton>
                                </Tooltip> */}
                                {
                                    userInfo.isCurrentUser &&
                                    <Button
                                        variant="contained"
                                        sx={{ position: "absolute", right: "20px", borderRadius: "20px" }}
                                        onClick={handleButton}
                                    >
                                        Edit
                                    </Button>
                                }
                                {
                                    !userInfo.isCurrentUser && (isFollow ?
                                        <Button
                                            variant="contained"
                                            sx={{ position: "absolute", right: "20px", borderRadius: "20px" }}
                                            onClick={handleButton}
                                        >
                                            Unfollow
                                        </Button>
                                        :
                                        <Button
                                            variant="contained"
                                            sx={{ position: "absolute", right: "20px", borderRadius: "20px" }}
                                            onClick={handleButton}
                                        >
                                            Follow
                                        </Button>
                                    )
                                }

                                {userInfo.isCurrentUser && userInfo.isAdmin &&
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#ff6383',
                                            position: "absolute",
                                            bottom: "10px",
                                            right: "20px",
                                            borderRadius: "20px",
                                            '&:hover': { bgcolor: '#e14161' }
                                        }}
                                        onClick={() => { navigator(`/admin`) }}
                                    >
                                        Management
                                    </Button>
                                }

                            </Box>
                            {
                                <Box
                                    sx={{
                                        borderBottom: "0 30px",
                                        width: '100%',
                                        minHeight: '150px'

                                    }}
                                >
                                    {buzzList.length != 0 ?
                                        buzzList.map((post) => (
                                            <NewBuzzItem key={post.buzzid} {...post} />
                                        ))
                                        :
                                        <Typography fontSize={20} lineHeight={'150px'} textAlign={'center'}>
                                            This user is so lazy...
                                        </Typography>}
                                </Box>
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </section>}
        </ThemeProvider >
    );
}
