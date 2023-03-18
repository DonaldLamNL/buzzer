import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { Grid, IconButton, SvgIcon, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { Box } from '@mui/system';

import React, { useState } from 'react';

export default function Buzz(props) {

    const { pid, like, comment, icon, content, image, video, uid, uname } = props;

    return (<>
        {/* Post Block */}
        <Box
            sx={{
                display: 'flex', 
                width: '90%',
                backgroundColor: '#f9f9f9',
                margin: 'auto',
                position: 'relative',
                margin: '20px auto',
                borderRadius: '20px',
            }}
        >
            {/* Poster Icon */}
            <Box sx={{ width: '90px' }}>
                <Box
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundImage: `url(${icon})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        margin: '20px',
                    }}
                />
            </Box>

            {/* Content Part */}
            <Grid container item sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    {/* Poster Info */}
                    <Box sx={{ height: '90px'}}>
                        <Typography sx={{ fontSize: '20px', lineHeight: '90px', display: 'inline-block' }}>{uname} </Typography>
                        <Typography sx={{ fontSize: '16px', color: '#7e7e7e', marginLeft: '20px', display: 'inline-block' }}>@{uid}</Typography>
                    </Box>

                    {/* Content */}
                    <Box >
                        <Typography sx={{ fontSize: '14px', marginRight: '10px' }}>
                            {content}
                        </Typography>
                    </Box>

                    {/* Media Block */}
                    {image !== null || video !== null ? (
                    <Box sx={{ margin: '20px auto' }}>
                        {image !== null && (
                        <img
                            src={image}
                            style={{ maxWidth: '95%', maxHeight: '300px', display: 'block' }}
                        />
                        )}
                        {video !== null && (
                        <video
                            src={video}
                            controls
                            style={{ maxWidth: '95%', maxHeight: '300px', display: 'block' }}
                        />
                        )}
                    </Box>
                    ) : null}

                    {/* Tools */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <IconButton size="large" sx={{ marginLeft: '20px' }}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>

                        <Box sx={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
                            <IconButton size="large">
                                <ThumbUpAltRoundedIcon />
                            </IconButton>
                            <div>{like}</div>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
                            <IconButton size="large">
                                <SendRoundedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box>
    </>);
}
