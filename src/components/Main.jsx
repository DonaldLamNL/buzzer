import React from "react";
import { useRoutes } from "react-router-dom";

// material-ui
import { Grid } from "@mui/material";

// components
import MainContent from "./Home/Home";
import BuzzSearch from "./Searching/BuzzSearch";
import SideContent from "./Side/SideContent";
import Buzz from "./BuzzPage/Buzz";
import UserList from "./UserList/UserList"
import AdminUserList from "./UserList/AdminUserList"

const routerConfig = [
  {
    path: "/home",
    element: (
      <>
        <MainContent />
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
    path: "/buzz",
    element: (
      <>
        <Buzz />
      </>
    ),
  },
  {
    path: "/userlist",
    element: (
      <>
        <UserList />
      </>
    ),
  },
  {
    path: "/admin-user",
    element: (
      <>
        <AdminUserList />
      </>
    ),
  },
];

export default function Home() {
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
