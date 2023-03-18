import { ChatBubbleOutlineOutlined } from '@mui/icons-material';
import { Grid, IconButton, SvgIcon, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { Box } from '@mui/system';

import React, { useState } from 'react';

export default function Buzz() {
    // Demonstrate data
    const data = {
        pid: 123,
        like: 123,
        comment: 456,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi voluptate exercitationem molestiae sunt, esse, officia saepe reiciendis id odio error eveniet dolorem consequuntur natus, optio temporibus accusamus quae aut alias eos eius adipisci deleniti pariatur suscipit minus? At laboriosam labore voluptas consectetur fugiat nostrum. Dolor laborum nostrum quas eos a.',
        image: 'https://p.ipic.vip/9j6cd6.png',
        video: null,
        uid: 'michaellyu123',
        uname: 'Michael Lyu',
    };

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
                        backgroundImage: `url(${data.icon})`,
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
                        <Typography sx={{ fontSize: '20px', lineHeight: '90px', display: 'inline-block' }}>{data.uname} </Typography>
                        <Typography sx={{ fontSize: '16px', color: '#7e7e7e', marginLeft: '20px', display: 'inline-block' }}>@{data.uid}</Typography>
                    </Box>

                    {/* Content */}
                    <Box >
                        <Typography sx={{ fontSize: '14px', marginRight: '10px' }}>
                            {data.content}
                        </Typography>
                    </Box>

                    {/* Media Block */}
                    {data.image !== null || data.video !== null ? (
                    <Box sx={{ margin: '20px auto' }}>
                        {data.image !== null && (
                        <img
                            src={data.image}
                            style={{ maxWidth: '95%', maxHeight: '300px', display: 'block' }}
                        />
                        )}
                        {data.video !== null && (
                        <video
                            src={data.video}
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
                            <div>{data.like}</div>
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
