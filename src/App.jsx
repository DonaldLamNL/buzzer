import './index.css'
import routerConfig from "./router"

// material-ui
import { Grid } from "@mui/material"
import { useRoutes } from "react-router-dom"

// components
import Nav from "./components/Nav"
    
export default function App() {
  const element = useRoutes(routerConfig)
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
  )
}
