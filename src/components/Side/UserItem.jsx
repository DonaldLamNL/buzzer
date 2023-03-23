import React from 'react'

// material-ui
import { Avatar, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

export default function UserItem(props) {
    const {uid, uname, icon} = props.userInfo

    return (
        <a href="https://www.google.com">
            <Box
            sx={{
                display: 'flex', 
                width: '90%',
                backgroundColor: '#f9f9f9',
                position: 'relative',
                margin: '20px auto',
                borderRadius: '20px',
            }}
        >

            {/* Poster Icon */}
            <Box sx={{ width: '70px' }}>
                <Avatar
                    src={icon}
                    sx={{ width: 40, height: 40, margin: '15px' }}
                    >
                {uname[0]}
                </Avatar>
            </Box>
            <Grid container item sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* User Info */}
                    <Box sx={{ height: '60px', }}>
                        <Typography sx={{ fontSize: '18px',lineHeight: '46px',  display: 'inline-block' }}>{uname} </Typography>
                        <Typography sx={{ fontSize: '14px',lineHeight: '14px',  color: '#7e7e7e' }}>@{uid}</Typography>
                    </Box>
                </Box>
            </Grid>
        </Box>
        </a>
    )
}
