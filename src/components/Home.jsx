import { Grid } from '@mui/material'
import React from 'react'
import MainContent from './Content/MainContent'
import BuzzSearch from './Content/BuzzSearch'
import SideContent from './Content/SideContent'
import { useRoutes } from "react-router-dom";

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
]

export default function Home(){
    const element = useRoutes(routerConfig);

    return (
        <div style={{width: '100%'}}>
            <Grid container>
                <Grid item xs={9}>
                    {element}
                </Grid>
                <Grid item xs={3}>
                    <SideContent/>
                </Grid>
            </Grid>
        </div>
    )
}
