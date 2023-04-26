/*
  


*/

import { Grid } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Nav from "./components/Nav";
import "./index.css";
import routerConfig from "./router";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import serverPath from "./ServerPath";

export default function App() {
  const [isLogin, SetIsLogin] = useState(true);

  // Get the login state from server
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
