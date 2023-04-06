import { Box, Card, IconButton, Stack, Button } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FaceIcon from "@mui/icons-material/Face";
import HiveIcon from "@mui/icons-material/Hive";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import NavItem from "./Items/NavItem";
import Cookies from "js-cookie";

const Image = styled.img`
  width: 100%;
  max-width: 50px;
  height: auto;
`;

export default function Nav() {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  const [isLogin, SetIsLogin] = useState(true);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const getLoginState = () => {
    try {
      fetch(`http://localhost:3000/account?userid=${Cookies.get('BuzzerUser')}`)
        .then(response => response.json())
        .then(data => {
          SetIsLogin(data.isLogin);
        })
        .catch(error => {
        });
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogout = () => {
    Cookies.remove('BuzzerUser');
  }

  useEffect(() => {
    getLoginState();
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "20px",
        alignItems: "center",
        height: "100vh",
        position: "relative",
        zIndex: "3100",
      }}
    >
      <Card
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        elevation={5}
        sx={{
          backgroundColor: "#1babfe",
          borderRadius: 6,
          display: "flex",
          justifyContent: "center",
          height: "96%",
          width: "80px",
          position: "fixed",
          transition: "0.7s",

          "&:hover": {
            backgroundColor: "#0069d9",
            width: "175px",
            cursor: "pointer",
          },
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          marginTop={3}
          spacing={2}
        >
          <IconButton
            size="large"
            onClick={() => {
              navigate("../home");
            }}
          >
            <Image src="../buzz.svg"></Image>
          </IconButton>

          <NavItem
            hovering={hovering}
            path="home"
            name="home"
            component={HomeRoundedIcon}
          />

          <NavItem
            hovering={hovering}
            path="user/irwinking1242"
            name="user"
            component={FaceIcon}
          />

          <Stack direction="column" gap={18} justifyContent="center">
            <NavItem
              hovering={hovering}
              path="hive"
              name="hive"
              component={HiveIcon}
            />
            {!isLogin ? (
              <NavItem
                hovering={hovering}
                path="login"
                name="login"
                component={LoginIcon}
              />
            ) : (
              <div onClick={handleLogout}>
                <NavItem
                  hovering={hovering}
                  path="login"
                  name="logout"
                  component={LogoutIcon}
                />
              </div>
            )}
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}