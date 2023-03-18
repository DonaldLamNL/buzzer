import { Box } from '@mui/system'
import { TextField, Button, Grid } from '@mui/material';
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

    return (
        <>
            {/* Post Block */}
            <Box
                sx={{
                    width: '90%',
                    backgroundColor: '#f9f9f9',
                    margin: 'auto',
                    position: 'relative',
                    marginTop: '20px',
                    borderRadius: '20px'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        // backgroundColor: '#ff9191',
                        margin: 'auto',
                    }}
                >
                    <Grid container>
                        {/* User Icon */}
                        <Grid item xs={2}>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: '#d6d6d6',
                                    margin: '20px 40px',
                                }}
                            />
                        </Grid>

                        {/* Buzz Input Block */}
                        <Grid item xs={10}>
                        <TextField
                            multiline
                            rows={4}
                            // rowsMax={Infinity}
                            fullWidth
                            variant="outlined"
                            placeholder="Type something here"
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
                        </Grid>
                    </Grid>
                </Box>

                {/* Tools Area */}
                <Box 
                    sx={{ 
                        display: 'flex',
                        marginLeft: '30px',
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
            </Box>
        </>

    )
}
