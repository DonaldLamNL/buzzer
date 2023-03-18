import { Grid } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main";
import Nav from "./components/Nav";
import User from "./components/User";
import Hive from "./components/Hive";
import './index.css'

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Main />
        </>
      ),
    },
    {
      path: "/user",
      element: (
        <>
          <User />
        </>
      ),
    },
    {
      path: "/hive",
      element: (
        <>
          <Hive />
        </>
      ),
    },
  ]);

  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Nav/>
        </Grid>
        <Grid item xs={10}>
          <RouterProvider router={router} />
        </Grid>
      </Grid>
    </>
  );
}