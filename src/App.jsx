import { Grid, Fab } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Nav from "./components/Nav";
import "./index.css";
import routerConfig from "./router";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

export default function App() {
  const element = useRoutes(routerConfig);
  return (
    <>
      <Fab
        color="primary"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <ChatBubbleOutlineRoundedIcon />
      </Fab>
      <Grid container>
        <Grid xs={2}>
          <Nav />
        </Grid>
        <Grid xs>{element}</Grid>
      </Grid>
    </>
  );
}
