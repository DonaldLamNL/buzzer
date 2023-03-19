import { Grid } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Nav from "./components/Nav";
import './index.css'
import routerConfig from "./router";
    
export default function App() {
  const element = useRoutes(routerConfig);
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Nav/>
        </Grid>
        <Grid item xs={10}>
          {element}
        </Grid>
      </Grid>
    </>
  );
}
