import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CssBaseline, Grid, Box, Typography, Container, Stack, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NewBuzzItem from "../Items/NewBuzzItem";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";

const theme = createTheme();

const data = [
    {
        userid: "irwinking124",
        username: "Irwin King",
        buzzid: 123,
        like: 123,
        comment: 456,
        content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.",
        image: "https://p.ipic.vip/9j6cd6.png",
        video: null,
        isVerify: true,
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
        userid: "irwinking124",
        username: "Irwin King",
        buzzid: 124,
        like: 143,
        comment: 534,
        content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.",
        image: "https://p.ipic.vip/e72rar.png",
        video: null,
        isVerify: true,
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
    {
        userid: "irwinking124",
        username: "Irwin King",
        buzzid: 125,
        like: 324,
        comment: 635,
        content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.",
        image: "https://p.ipic.vip/phxapn.png",
        video: null,
        isVerify: true,
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    },
];


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
        try {
            fetch(`http://localhost:3000/buzzes/user?userid=${userid}`)
                .then(response => response.json())
                .then(responseData => {
                    setBuzzList(responseData);
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (err) {
            console.error(err);
        }
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
                                        <Typography fontWeight="600" component="h1" variant="h6"> {userInfo.username} </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                opacity: "0.5",
                                            }}
                                        >
                                            @{userInfo.userid}
                                        </Typography>
                                    </Box>

                                    <Typography margin="20px 0"> {userInfo.description} </Typography>

                                    <Box display={"flex"}>
                                        <Link
                                            to="/userlist"
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
                                            to="/userlist"
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
                                <Button
                                    variant="contained"
                                    sx={{
                                        position: "absolute",
                                        right: "20px",
                                        borderRadius: "20px",
                                    }}
                                    onClick={handleButton}
                                >
                                    {userInfo.isCurrentUser ? 'Edit' : isFollow ? 'Unfollow' : 'Follow'}
                                </Button>
                                {!userInfo.isAdmin &&
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
                                        User Management
                                    </Button>
                                }

                            </Box>
                            {
                                <Box
                                    sx={{
                                        borderBottom: "0 30px",
                                        width: '100%',
                                    }}
                                >
                                    {
                                        buzzList == [] ?
                                            buzzList.map((post) => (
                                                <NewBuzzItem key={post.buzzid} {...post} />
                                            ))
                                            :
                                            <Box
                                                sx={{
                                                    height: '150px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography fontSize={20} lineHeight={'150px'}>
                                                    This user is so lazy...
                                                </Typography>
                                            </Box>
                                    }
                                </Box>
                            }
                        </Stack>
                    </Grid>
                </Grid>
            </section>}
        </ThemeProvider>
    );
}
