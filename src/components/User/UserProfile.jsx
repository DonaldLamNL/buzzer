import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, Stack, Tabs, Tab, AppBar, IconButton } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Buzz from '../Items/BuzzItem';

const theme = createTheme();

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const data = [
    {
        pid: 123,
        like: 123,
        comment: 456,
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
        image: 'https://p.ipic.vip/9j6cd6.png',
        video: null,
        uid: 'michaellyu123',
        uname: 'Michael Lyu',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        pid: 124,
        like: 143,
        comment: 534,
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
        image: 'https://p.ipic.vip/e72rar.png',
        video: null,
        uid: 'irwinking124',
        uname: 'Irwin King',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
    {
        pid: 125,
        like: 324,
        comment: 635,
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
        image: 'https://p.ipic.vip/phxapn.png',
        video: null,
        uid: 'johnlui',
        uname: 'John Lui',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    },
]

export default function UserProfile() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <ThemeProvider theme={theme}>
            <section style={{
                display: 'flex',
                justiftContent: 'center',
                // alignItems: 'center',
                minHeight: '100vh',
                // width: '10%',
                background: '#FFFFFF',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>

                {/* <Container component="main" maxWidth="lg"> */}
                <CssBaseline />
                <Grid container spacing={0}>
                    <Grid item xs={8} md={8}
                        sx={{
                            borderLeft: '1px solid #DCDCDC',
                            borderRight: '1px solid #DCDCDC',
                        }}>
                        <Stack>
                            <Box
                                height='30'
                                sx={{
                                    display: 'flex',
                                    padding: '3px',
                                    background: '#1776d2',
                                }}>
                                <IconButton
                                    href="/#/home"
                                    aria-label="back">
                                    <ArrowBackIcon
                                        sx={{
                                            color: '#FFF',
                                        }} />
                                </IconButton>
                                <Box
                                    sx={{ marginLeft: '20px' }}>
                                    <Typography
                                        fontWeight="600"
                                        component="h1"
                                        variant="h6"
                                        sx={{
                                            color: '#FFF',
                                        }}
                                    >
                                        Irwin King
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '0.75em',
                                            color: '#FFF',
                                        }}>
                                        123 Posts
                                    </Typography>
                                </Box>
                            </Box>
                            <Container
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    background: '#66ccff',
                                    height: '200px',
                                }}
                            >

                            </Container>
                            <Box
                                sx={{
                                    position: 'relative',
                                    padding: '10px',
                                    display: 'flex',
                                    // flexDirection: 'column',
                                    // alignItems: 'center',
                                    // background: '#FFF',
                                    background: '#f7f9f9',
                                    height: '220px',
                                    borderBottom: '1px solid #DCDCDC',
                                }}>
                                <Container
                                    sx={{
                                        position: 'absolute',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        top: '-60px',
                                        // height: '200px',
                                        // bgcolor: '#999',
                                        // opacity: '0.5',
                                    }}>
                                    <Avatar
                                        sx={{
                                            // m: 1,
                                            bgcolor: '#1776d2',
                                            width: 100,
                                            height: 100,
                                            outline: '4px solid white'
                                        }}>
                                        <PersonOutlineOutlinedIcon />
                                    </Avatar>
                                    <Typography
                                        fontWeight="600"
                                        component="h1"
                                        variant="h6"
                                    >
                                        Irwin King
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            // display: "inline-block",
                                            opacity: "0.5",
                                            // top: -80,
                                        }}>
                                        @irwinking124
                                    </Typography>
                                    <br></br>
                                    <Typography>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </Typography>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            display: 'flex',
                                            bottom: -50,
                                            // flexDirection: 'column',
                                            // alignItems: 'center',
                                            // background: '#999',
                                        }}>
                                        <Link
                                            to="/userlist"
                                            underline="hover"
                                            sx={{
                                                display: 'flex',
                                                color: '#000',
                                            }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: '800',
                                                }}>
                                                789 Following
                                            </Typography>
                                        </Link>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link
                                            to="/userlist"
                                            underline="hover"
                                            sx={{
                                                display: 'flex',
                                                color: '#000',
                                            }}>
                                            <Typography
                                                sx={{
                                                    fontWeight: '800',
                                                }}>
                                                456k Followers
                                            </Typography>
                                        </Link>
                                    </Box>

                                </Container>
                                <Button
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: '20px',
                                        borderRadius: '20px',
                                    }}>
                                    Follow
                                </Button>

                            </Box>
                            {/* <Box sx={{ bgcolor: 'background.paper', width: maxWidth }}>
                                <AppBar position="static">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="secondary"
                                        textColor="inherit"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="Buzzers" {...a11yProps(0)} />
                                        <Tab label="Replies" {...a11yProps(1)} />
                                        <Tab label="Media" {...a11yProps(2)} />
                                        <Tab label="Likes" {...a11yProps(3)} />
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={value} index={0}>
                                    {data.map((post) => (
                                        <Buzz key={post.pid} {...post} />
                                    ))}
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    Replies
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    Media
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    Likes
                                </TabPanel>
                            </Box> */}
                            <Box
                                sx={{
                                    // background: '#f7f9f9',
                                }}>
                                {data.map((post) => (
                                    <Buzz key={post.pid} {...post} />
                                ))}
                            </Box>

                        </Stack>
                    </Grid>
                    <Grid item xs={4} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <div className="side">
                            <Stack spacing={8}>
                                <Typography component="h1" variant="h5" color="#000">
                                    You may also like
                                </Typography>
                                <div className="card">
                                    <div className="imgBx">
                                        <img src='ElonMusk.jpg'></img>
                                    </div>
                                    <div className="content">
                                        <div className="details">
                                            <h2>Elon Musk<br></br><span>@elonmusk</span></h2>
                                            <div className="data">
                                                <h3>123<br></br><span>Posts</span></h3>
                                                <h3>456k<br></br><span>Followers</span></h3>
                                                <h3>789<br></br><span>Following</span></h3>
                                            </div>
                                            <div className="actionBtn">
                                                <button>Follow</button>
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="imgBx">
                                        <img src='ElonMusk.jpg'></img>
                                    </div>
                                    <div className="content">
                                        <div className="details">
                                            <h2>Elon Musk<br></br><span>@elonmusk</span></h2>
                                            <div className="data">
                                                <h3>123<br></br><span>Posts</span></h3>
                                                <h3>456k<br></br><span>Followers</span></h3>
                                                <h3>789<br></br><span>Following</span></h3>
                                            </div>
                                            <div className="actionBtn">
                                                <button>Follow</button>
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="imgBx">
                                        <img src='ElonMusk.jpg'></img>
                                    </div>
                                    <div className="content">
                                        <div className="details">
                                            <h2>Elon Musk<br></br><span>@elonmusk</span></h2>
                                            <div className="data">
                                                <h3>123<br></br><span>Posts</span></h3>
                                                <h3>456k<br></br><span>Followers</span></h3>
                                                <h3>789<br></br><span>Following</span></h3>
                                            </div>
                                            <div className="actionBtn">
                                                <button>Follow</button>
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
                {/* </Container> */}
            </section>
        </ThemeProvider>
    );
}
