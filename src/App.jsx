import { Grid, Fab, MenuItem, Card, Input, Paper } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Nav from "./components/Nav";
import "./index.css";
import routerConfig from "./router";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
// import * as React from "react";
import serverPath from "./ServerPath";

// import * as React from "react";

import Slide from "@mui/material/Slide";
import ChatButton from "./components/ChatButton";

export default function App() {
  const [isLogin, SetIsLogin] = useState(true);

  const getLoginState = () => {
    try {
      fetch(
        `${serverPath}/users/currentuser?userid=${Cookies.get("BuzzerUser")}`
      )
        .then((response) => response.json())
        .then((data) => {
          SetIsLogin(data.isLogin);
        })
        .catch((error) => {});
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLoginState();
  });

  const element = useRoutes(routerConfig(isLogin));

  return (
    <>
      {/* <ChatButton /> */}
      <Grid container>
        <Grid item xs={2}>
          <Nav />
        </Grid>
        <Grid item xs>
          {element}
        </Grid>
      </Grid>
    </>
  );
}
