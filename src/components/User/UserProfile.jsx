import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  Tabs,
  Tab,
  AppBar,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Buzz from "../Items/BuzzItem";
import ProfileCardItem from "../Items/ProfileCardItem";
import SideContent from "../Side/SideContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const theme = createTheme();

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
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
];

export default function UserProfile() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
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
        {/* <Container component="main" maxWidth="lg"> */}
        <CssBaseline />
        <Grid container spacing={0}>
          <Grid
            item
            xs={8}
            md={8}
            sx={{
              borderLeft: "1px solid #DCDCDC",
              borderRight: "1px solid #DCDCDC",
            }}
          >
            <Stack>
              <Box
                height="30"
                sx={{
                  display: "flex",
                  padding: "3px",
                  background: "#1776d2",
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
                    Irwin King
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.75em",
                      color: "#FFF",
                    }}
                  >
                    123 Posts
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
                    top: "-60px",
                    // height: '200px',
                    // bgcolor: '#999',
                    // opacity: '0.5',
                  }}
                >
                  <Avatar
                    sx={{
                      // m: 1,
                      bgcolor: "#1776d2",
                      width: 100,
                      height: 100,
                      outline: "4px solid white",
                    }}
                  >
                    <PersonOutlineOutlinedIcon />
                  </Avatar>
                  <Typography fontWeight="600" component="h1" variant="h6">
                    Irwin King
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      // display: "inline-block",
                      opacity: "0.5",
                      // top: -80,
                    }}
                  >
                    @irwinking124
                  </Typography>
                  <br></br>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      display: "flex",
                      bottom: -50,
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
                        789 Following
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
                        456k Followers
                      </Typography>
                    </Link>
                  </Box>
                </Container>
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
                <Tooltip title="Send Message" placement="top" arrow>
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: "50px",
                      // marginTop: "10",
                      top: "160px",
                    }}
                  >
                    <MailOutlineIcon></MailOutlineIcon>
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                sx={
                  {
                    // background: '#f7f9f9',
                  }
                }
              >
                {data.map((post) => (
                  <Buzz key={post.pid} {...post} />
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* <Grid item xs={4} md={4} sx={{ display: { xs: 'none', md: 'block' } }}> */}
          <Grid item xs={4} md={4}>
            {/* <div className="side">
                            <Stack spacing={8}>
                                <Typography component="h1" variant="h5" color="#000">
                                    You may also like
                                </Typography>
                                {userData.map((item) => (
                                    <ProfileCardItem key={item.uid} {...item} />
                                ))}
                            </Stack>
                        </div> */}
            <SideContent />
          </Grid>
        </Grid>
        {/* </Container> */}
      </section>
    </ThemeProvider>
  );
}
