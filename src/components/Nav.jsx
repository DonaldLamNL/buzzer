import { Box, Card, IconButton, Stack, Button } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FaceIcon from "@mui/icons-material/Face";
import HiveIcon from "@mui/icons-material/Hive";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";

const Image = styled.img`
  width: 100%;
  max-width: 50px;
  height: auto;
`;

export default function Nav() {
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);

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
          position: "fixed",
          transition: "1.5s",

          "&:hover": {
            backgroundColor: "#0069d9",
            width: "10%",
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
              navigate("../");
            }}
          >
            <Image src="../buzz.svg"></Image>
          </IconButton>
          {hovering ? (
            <Button
              variant="text"
              sx={{ fontSize: 20, color: "#ffffff" }}
              startIcon={<HomeRoundedIcon />}
              onClick={() => {
                navigate("../home");
              }}
            >
              Home
            </Button>
          ) : (
            <IconButton
              size="large"
              onClick={() => {
                navigate("../home");
              }}
            >
              <HomeRoundedIcon sx={{ fontSize: 48, color: "#ffffff" }} />
            </IconButton>
          )}
          {hovering ? (
            <Button
              variant="text"
              sx={{ fontSize: 20, color: "#ffffff" }}
              startIcon={<FaceIcon />}
              onClick={() => {
                navigate("../login");
              }}
            >
              User
            </Button>
          ) : (
            <IconButton
              size="large"
              onClick={() => {
                navigate("../user");
              }}
            >
              <FaceIcon sx={{ fontSize: 48, color: "#ffffff" }} />
            </IconButton>
          )}
          <Stack direction="column" gap={15} justifyContent="center">
            {hovering ? (
              <Button
                variant="text"
                sx={{ fontSize: 20, color: "#ffffff" }}
                startIcon={<HiveIcon />}
                onClick={() => {
                  navigate("../hive");
                }}
              >
                Hive
              </Button>
            ) : (
              <IconButton
                size="large"
                onClick={() => {
                  navigate("../hive");
                }}
              >
                <HiveIcon sx={{ fontSize: 48, color: "#ffffff" }} />
              </IconButton>
            )}
            {hovering ? (
              <Button
                variant="text"
                sx={{ fontSize: 20, color: "#ffffff" }}
                startIcon={<LogoutIcon />}
                onClick={() => {
                  navigate("../hive");
                }}
              >
                LOGOUT
              </Button>
            ) : (
              <IconButton
                size="large"
                onClick={() => {
                  navigate("../hive");
                }}
              >
                <LogoutIcon sx={{ fontSize: 48, color: "#ffffff" }} />
              </IconButton>
            )}
          </Stack>
          {/* <Button startIcon={<LogoutIcon />}>LOGOUT</Button> */}
        </Stack>
      </Card>
    </Box>
  );
}
