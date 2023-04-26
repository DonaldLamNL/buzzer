/*
CSCI3100 Software Enigeering Group Project in the 2022-2023 2nd semester

Project Name: Buzzer

Project Group: A1

Authors:
  LAM Man Ho    1155159171@link.cuhk.edu.hk
  MA Yu Ying    1155157879@link.cuhk.edu.hk
  CHEUNG Ka Ho  1155158622@link.cuhk.edu.hk
  FUNG Ngai Man 1155158312@link.cuhk.edu.hk
  LI Eric John  1155159116@link.cuhk.edu.hk

Project Description:
  Buzzer is a microblogging and social networking service that allows users to share their thoughts,
  opinions, and ideas in real-time. Inspired by the popular platform Twitter, Buzzer boasts a sleek 
  and intuitive interface that allows users to easily engage with their friends, family, and followers.
  
  With Buzzer, users can create profiles, post updates, share photos and videos, follow other users,
  and engage in conversations on a variety of topics. The platform features a powerful search function
  that allows users to discover new content and find others with similar interests.

Source material acknowledgements:
  1. Material UI (https://mui.com)
*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <CssBaseline />
    <App />
  </HashRouter>
);
