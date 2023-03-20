import { Box, Card, IconButton, Stack } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FaceIcon from "@mui/icons-material/Face";
import HiveIcon from "@mui/icons-material/Hive";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="100vh"
      height="100vh"
      width="17%"
      // marginLeft={30}
      position="fixed"
      display="flex"
      // justifyContent="center"
      // alignItems="center"
    >
      <Card
        elevation={5}
        sx={{
          margin: "auto",
          backgroundColor: "#1ca1f0",
          borderRadius: 6,
          height: "97%",
          width: "30%",
          display: "flex",
          // position: "fixed",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Stack justifyContent="space-around" alignItems="center">
          <Box>
            <IconButton
              size="large"
              onClick={() => {
                navigate("../home");
              }}
            >
              <HomeRoundedIcon sx={{ fontSize: 48, color: "#ffffff" }} />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              size="large"
              onClick={() => {
                navigate("../user");
              }}
            >
              <FaceIcon sx={{ fontSize: 48, color: "#ffffff" }} />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              size="large"
              onClick={() => {
                navigate("../hive");
              }}
            >
              <HiveIcon sx={{ fontSize: 48, color: "#ffffff" }} />
            </IconButton>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
