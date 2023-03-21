import { Box, Card, IconButton, Stack } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FaceIcon from "@mui/icons-material/Face";
import HiveIcon from "@mui/icons-material/Hive";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "@emotion/styled";

const Image = styled.img`
  width: 100%;
  max-width: 50px;
  height: auto;
`;

export default function Nav() {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center">
      <Card
        elevation={5}
        sx={{
          backgroundColor: "#1ca1f0",
          borderRadius: 6,
          height: "97%",
          // width: "100%",
          display: "flex",
          position: "fixed",
          justifyContent: "center",
        }}
      >
        <Stack justifyContent="space-around">
          <Box textAlign={"center"}>
            <Image src="../bee_BG.svg"></Image>
          </Box>
          <IconButton
            size="large"
            onClick={() => {
              navigate("../home");
            }}
          >
            <HomeRoundedIcon sx={{ fontSize: 48, color: "#ffffff" }} />
          </IconButton>

          <IconButton
            size="large"
            onClick={() => {
              navigate("../user");
            }}
          >
            <FaceIcon sx={{ fontSize: 48, color: "#ffffff" }} />
          </IconButton>

          <IconButton
            size="large"
            onClick={() => {
              navigate("../hive");
            }}
          >
            <HiveIcon sx={{ fontSize: 48, color: "#ffffff" }} />
          </IconButton>
        </Stack>
      </Card>
    </Box>
  );
}
