import { Box } from '@mui/system'
import { TextField, Button, Grid, Avatar } from '@mui/material';
import { PhotoCamera, VideoCall } from '@mui/icons-material';
import React, { useState } from 'react'

export default function Post() {
    const [image, setImage, inputRef] = useState(null);

    // const handleImageChange = (event) => {
    //     const file = inputRef.current.files[0];
    //     if (file) {
    //         setImage(URL.createObjectURL(file));
    //     }
    //     // setImage(URL.createObjectURL(event.target.files[0]));
    // };

    return (<>
        {/* Post Block */}
        <Box
            sx={{
                display: 'flex', 
                width: '90%',
                backgroundColor: '#f9f9f9',
                margin: 'auto',
                position: 'relative',
                marginTop: '20px',
                borderRadius: '20px'
            }}
        >
            {/* Poster Icon */}
            <Box sx={{ width: '90px' }}>
                <Avatar
                    sx={{ width: 50, height: 50, margin: '20px' }}
                >
                H
                </Avatar>
            </Box>

            <Grid container item sx={{ flexGrow: 1 }}>
                {/* Buzz Input Block */}
                <TextField
                    multiline
                    rows={4}
                    placeholder="What's happening?"
                    sx={{
                        fontSize: '16px',
                        backgroundColor: 'transparent',
                        borderRadius: '20px',
                        padding: '0 10px',
                        width: '90%',
                        margin: '20px 0',
                        '&:focus': {
                        backgroundColor: '#ffffff !important',
                        },
                    }}
                    inputProps={{ rows: 4 }}
                />

                {/* Tools Area */}
                <Box 
                    sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '90%'
                    }}
                >
                    {/* Function Buttons */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Upload Images Button */}
                        <Button
                            startIcon={<PhotoCamera />}
                        >
                            <input type="file" hidden />
                        </Button>

                        {/* Upload Videos Button */}
                        <Button
                            startIcon={<VideoCall />}
                        >
                            <input type="file" hidden />
                        </Button>
                    </Box>
                    {/* Submit Button */}
                    <Button sx={{ borderRadius: '20px' }}>Post</Button>
                </Box>
            </Grid>

        </Box>
    </>)
}
