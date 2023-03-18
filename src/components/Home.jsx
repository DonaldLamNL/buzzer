import { Grid } from '@mui/material'
import React from 'react'
import MainContent from './Content/MainContent'
import SideContent from './Content/SideContent'


export default function Main(){
    const mainStyle = {
        height: '100vh',
        width: '100%',
        backgroundColor: '#87CEEB',
    }

    return (
        <div style={mainStyle}>
            <Grid container>
                <Grid item xs={8}>
                    <MainContent/>
                </Grid>
                <Grid item xs={4}>
                    <SideContent/>
                </Grid>
            </Grid>
        </div>
    )
}
