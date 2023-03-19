import { Box, Card, Container, IconButton, Stack } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FaceIcon from "@mui/icons-material/Face";
import HiveIcon from "@mui/icons-material/Hive";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  return (
    <Box
      minHeight="100vh"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        elevation={14}
        sx={{
          marginY: 2,
          backgroundColor: "#3666fa",
          borderRadius: 4,
          height: "97%",
          width: "40%",
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          marginY={10}
          spacing={10}
        >
          <Box>
            <IconButton
              size="large"
              onClick={() => {
                navigate("../home");
              }}
            >
              <HomeRoundedIcon sx={{ fontSize: 48 }} />
            </IconButton>
          </Box>
          <Box>
            <IconButton size="large">
              <FaceIcon
                sx={{ fontSize: 48 }}
                onClick={() => {
                  navigate("../user");
                }}
              />
            </IconButton>
          </Box>
          <Box>
            <IconButton size="large">
              <HiveIcon
                sx={{ fontSize: 48 }}
                onClick={() => {
                  navigate("../hive");
                }}
              />
            </IconButton>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
