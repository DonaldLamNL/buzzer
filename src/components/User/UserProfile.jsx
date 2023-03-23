import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Stack, Tabs, Tab, AppBar, IconButton } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { maxWidth } from '@mui/system';

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

export default function UserProfile() {

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
                    <Grid item xs={8} md={8}>
                        <Stack>
                            <Box
                                height={50}
                                sx={{
                                    padding: '5px',
                                    background: '#1776d2',
                                }}>
                                <IconButton aria-label="back">
                                    <ArrowBackIcon color='action' />
                                </IconButton>

                            </Box>
                            <Box
                                sx={{
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: '#66ccff',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: '#1776d2', width: 100, height: 100 }}>
                                    <PersonOutlineOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Irwin King
                                </Typography>
                            </Box>
                            <Box sx={{ bgcolor: 'background.paper', width: maxWidth }}>
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
                                    Buzzers
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
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <div class="side">
                            <Stack spacing={8}>
                                <Typography component="h1" variant="h5" color="#fff">
                                    You may also like
                                </Typography>
                                <div class="card">
                                    <div class="imgBx">
                                        <img src='ElonMusk.jpg'></img>
                                    </div>
                                    <div class="content">
                                        <div class="details">
                                            <h2>Elon Musk<br></br><span>@elonmusk</span></h2>
                                            <div class="data">
                                                <h3>123<br></br><span>Posts</span></h3>
                                                <h3>456k<br></br><span>Followers</span></h3>
                                                <h3>789<br></br><span>Following</span></h3>
                                            </div>
                                            <div class="actionBtn">
                                                <button>Follow</button>
                                                <button>Message</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="imgBx">
                                        <img src='ElonMusk.jpg'></img>
                                    </div>
                                    <div class="content">
                                        <div class="details">
                                            <h2>Elon Musk<br></br><span>@elonmusk</span></h2>
                                            <div class="data">
                                                <h3>123<br></br><span>Posts</span></h3>
                                                <h3>456k<br></br><span>Followers</span></h3>
                                                <h3>789<br></br><span>Following</span></h3>
                                            </div>
                                            <div class="actionBtn">
                                                <button>Follow</button>
                                                <button>Message</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="imgBx">
                                        <img src='ElonMusk.jpg'></img>
                                    </div>
                                    <div class="content">
                                        <div class="details">
                                            <h2>Elon Musk<br></br><span>@elonmusk</span></h2>
                                            <div class="data">
                                                <h3>123<br></br><span>Posts</span></h3>
                                                <h3>456k<br></br><span>Followers</span></h3>
                                                <h3>789<br></br><span>Following</span></h3>
                                            </div>
                                            <div class="actionBtn">
                                                <button>Follow</button>
                                                <button>Message</button>
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
