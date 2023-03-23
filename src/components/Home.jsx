import React from "react";
import { useRoutes } from "react-router-dom";

// material-ui
import { Grid } from "@mui/material";

// components
import MainContent from "./Content/MainContent";
import BuzzSearch from "./Content/BuzzSearch";
import SideContent from "./Content/SideContent";
import Buzz from "./Content/Buzz";

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
    path: "/search",
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
];

export default function Home() {
  const element = useRoutes(routerConfig);

  return (
    <div style={{ width: "100%" }}>
      <Grid container>
        <Grid item xs={8}>
          {element}
        </Grid>
        <Grid item xs={3}>
          <SideContent />
        </Grid>
      </Grid>
    </div>
  );
}
