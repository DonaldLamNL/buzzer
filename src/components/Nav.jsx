import { Box, Card, IconButton, Stack, Button } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FaceIcon from "@mui/icons-material/Face";
import HiveIcon from "@mui/icons-material/Hive";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import NavItem from "./Items/NavItem";

const Image = styled.img`
  width: 100%;
  max-width: 50px;
  height: auto;
`;

export default function Nav({ isLogin }) {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);
  // const [isLogin, SetIsLogin] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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
          // alignItems: "center",
          height: "96%",
          // width: "100%",
          width: "100px",
          position: "fixed",
          transition: "0.5s",

          "&:hover": {
            backgroundColor: "#0069d9",
            // width: "14%",
            width: "200px",
            cursor: "pointer",
          },
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          marginTop={3}
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
            path="userprofile"
            name="user"
            component={FaceIcon}
          />

          <Stack direction="column" gap={15} justifyContent="center">
            <NavItem
              hovering={hovering}
              path="hive"
              name="hive"
              component={HiveIcon}
            />
            {isLogin ? (
              <NavItem
                hovering={hovering}
                path="login"
                name="login"
                component={LoginIcon}
              />
            ) : (
              <NavItem
                hovering={hovering}
                path="home"
                name="logout"
                component={LogoutIcon}
              />
            )}
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
