import { Grid, Fab, MenuItem, Card, Input, Paper } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Nav from "./components/Nav";
import "./index.css";
import routerConfig from "./router";

import * as React from "react";

// import * as React from "react";

import Slide from "@mui/material/Slide";
import ChatButton from "./components/ChatButton";

export default function App() {
  const element = useRoutes(routerConfig);

  return (
    <>
      <ChatButton />
      <Grid container>
        <Grid item xs={2}>
          <Nav isLogin={true} />
        </Grid>
        <Grid item xs={10}>
          {element}
        </Grid>
      </Grid>
    </>
  );
}
