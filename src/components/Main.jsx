import React from "react";
import { useRoutes } from "react-router-dom";

// material-ui
import { Grid } from "@mui/material";

// components
import Home from "./Home/Home";
import BuzzSearch from "./Searching/BuzzSearch";
import SideContent from "./Side/SideContent";
import Buzz from "./BuzzPage/Buzz";
import UserList from "./UserList/UserList";
import Admin from "./UserList/Admin";
import UserProfile from "./User/UserProfile";
import NewEditProfile from "./User/NewEditProfile";
import BuzzFollowing from "./BuzzFollowing/BuzzFollowing";

const routerConfig = [
  {
    path: "/home",
    element: (
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/search/:search",
    element: (
      <>
        <BuzzSearch />
      </>
    ),
  },
  {
    path: "/buzz/:buzzid",
    element: (
      <>
        <Buzz />
      </>
    ),
  },
  {
    path: "/userlist/:userid/:type",
    element: (
      <>
        <UserList />
      </>
    ),
  },
  {
    path: "/admin",
    element: (
      <>
        <Admin />
      </>
    ),
  },
  {
    path: "/user/:userid",
    element: (
      <>
        <UserProfile />
      </>
    ),
  },
  {
    path: "/edit",
    element: (
      <>
        <NewEditProfile />
      </>
    ),
  },
  {
    path: "/buzzFowllowing",
    element: <BuzzFollowing />,
  },
];

export default function Main() {
  const element = useRoutes(routerConfig);

  return (
    <div style={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={8}>
          {element}
        </Grid>
        <Grid item xs={4}>
          <SideContent />
        </Grid>
      </Grid>
    </div>
  );
}
