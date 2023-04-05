import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CssBaseline, Grid, Box, Typography, Container, Stack, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Buzz from "../Items/BuzzItem";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useParams } from 'react-router-dom';
const users = [
  {
    uid: 'johnlui001',
    uname: 'John Lui',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMVxTCb03CByfk6S2yGQJLpyrARrPJofuRg&usqp=CAUU',
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
  {
    uid: 'amywong124',
    uname: 'Amy Wong',
    icon: null,
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
  {
    uid: 'amychan001',
    uname: 'Amy Chan',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabrl2VTWfpp7MbwZp6gVKWPv5C_3Xkx-VlQ&usqp=CAU',
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
  {
    uid: 'tomlui002',
    uname: 'Tom Lui',
    icon: null,
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
  {
    uid: 'michaellam331',
    uname: 'Michael Lam',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
  {
    uid: 'chriswong123',
    uname: 'Chris Wong',
    icon: null,
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
  {
    uid: 'jimmylau342',
    uname: 'Jimmy Lau',
    icon: null,
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
  {
    uid: 'irwinking1242',
    uname: 'Irwin King',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
  {
    uid: 'johnlui4',
    uname: 'John Lui',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
  {
    uid: "elonmusk103",
    uname: "Elon Musk",
    icon: "ElonMusk.jpg",
    postsCount: 123,
    followersCount: 456,
    followingCount: 789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, se do eiusmod tempor incididunt ut labore et dolore magnaaliqua.",
  },
]

const theme = createTheme();

const userProfileData = users;

const data = [
  {
    uid: "irwinking124",
    uname: "Irwin King",
    pid: 123,
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
    uid: "irwinking124",
    uname: "Irwin King",
    pid: 124,
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
    uid: "irwinking124",
    uname: "Irwin King",
    pid: 125,
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

function searchUserIdx(userid, userProfileData) {
  for (let i = 0; i < userProfileData.length; i++) {
    if (userProfileData[i]["uid"] == userid) {
      return i;
    }
  }
  return -1;
}


export default function UserProfile() {
  const { userid } = useParams();

  let userIdx = searchUserIdx(userid, userProfileData)

  return (
    <ThemeProvider theme={theme}>
      <section
        style={{
          display: "flex",
          justiftContent: "center",
          // alignItems: 'center',
          minHeight: "100vh",
          // width: '10%',
          background: "#FFFFFF",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <CssBaseline />
        <Grid container spacing={0}>
          <Grid
            item
            // xs={8}
            // md={8}
            sx={{
              borderLeft: "1px solid #DCDCDC",
              borderRight: "1px solid #DCDCDC",
              borderBottom: "1px solid #DCDCDC",
              borderRadius: "30px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Stack>
              <Box
                height="30"
                sx={{
                  display: "flex",
                  padding: "3px",
                  background: "#1776d2",
                  borderTopRightRadius: "30px",
                  borderTopLeftRadius: "30px",
                }}
              >
                <IconButton href="/#/home" aria-label="back">
                  <ArrowBackIcon
                    sx={{
                      color: "#FFF",
                    }}
                  />
                </IconButton>
                <Box sx={{ marginLeft: "20px" }}>
                  <Typography
                    fontWeight="600"
                    component="h1"
                    variant="h6"
                    sx={{
                      color: "#FFF",
                    }}
                  >
                    {userProfileData[userIdx]["uname"]}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.75em",
                      color: "#FFF",
                    }}
                  >
                    {userProfileData[userIdx]["postsCount"]} Posts
                  </Typography>
                </Box>
              </Box>
              <Container
                sx={{
                  position: "relative",
                  display: "flex",
                  background: "#66ccff",
                  height: "200px",
                }}
              ></Container>
              <Box
                sx={{
                  position: "relative",
                  padding: "10px",
                  display: "flex",
                  // flexDirection: 'column',
                  // alignItems: 'center',
                  // background: '#FFF',
                  background: "#f7f9f9",
                  height: "220px",
                  borderBottom: "1px solid #DCDCDC",
                }}
              >
                <Container
                  sx={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    top: "-50px",
                    // height: '200px',
                    // bgcolor: '#999',
                    // opacity: '0.5',
                  }}
                >
                  <Avatar
                    sx={{
                      // m: 1,
                      fontSize: "400%",
                      color: "white",
                      background: "#1776d2",
                      width: 100,
                      height: 100,
                      outline: "4px solid white",
                    }}
                    src={userProfileData[userIdx]["icon"]}
                  >
                    {userProfileData[userIdx]["uname"][0]}
                  </Avatar>
                  <Typography fontWeight="600" component="h1" variant="h6">
                    {userProfileData[userIdx]["uname"]}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      // display: "inline-block",
                      opacity: "0.5",
                      // top: -80,
                    }}
                  >
                    @{userProfileData[userIdx]["uid"]}
                  </Typography>
                  <br></br>
                  <Typography>
                    {userProfileData[userIdx]["description"]}
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      display: "flex",
                      bottom: -40,
                      // flexDirection: 'column',
                      // alignItems: 'center',
                      // background: '#999',
                    }}
                  >
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
                        {userProfileData[userIdx]["followingCount"]} Following
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
                        {userProfileData[userIdx]["followersCount"]} Followers
                      </Typography>
                    </Link>
                  </Box>
                </Container>
                <Tooltip title="Send Message" placement="top" arrow>
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
                </Tooltip>
                <Button
                  variant="contained"
                  sx={{
                    position: "absolute",
                    right: "20px",
                    borderRadius: "20px",
                  }}
                >
                  Follow
                </Button>

              </Box>
              <Box
                sx={
                  {
                    // background: '#f7f9f9',
                    borderBottomLeftRadius: "30px",
                    borderBottomRightRadius: "30px",
                  }
                }
              >
                {data.map((post) => (
                  <Buzz key={post.pid} {...post} />
                ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </section>
    </ThemeProvider>
  );
}
