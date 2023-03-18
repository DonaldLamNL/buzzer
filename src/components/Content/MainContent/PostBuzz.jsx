import { Box } from '@mui/system'
import { TextField, Button, Grid } from '@mui/material';
import { PhotoCamera, VideoCall } from '@mui/icons-material';
import React, { useState } from 'react'
export default function PostBuzz() {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
      setImage(URL.createObjectURL(event.target.files[0]));
    };
    return (
        <>
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
                        // height: 200,
                        // backgroundColor: '#ff9191',
                        margin: 'auto',
                        // transition: 'height 0.3s ease',
                        // '&:hover': {
                        //     height: 300,
                        // },
                    }}
                >
                    <Grid container>
                        <Grid item xs={2}>
                            <Box
                                sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: '#d6d6d6',
                                    margin: '20px',
                                    // position: 'absolute'
                                }}
                            />
                        </Grid>

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

                <Box 
                    sx={{ 
                        display: 'flex',
                        marginLeft: '30px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '90%'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            startIcon={<PhotoCamera />}
                        >
                        <input type="file" hidden />
                        </Button>
                        <Button
                            startIcon={<VideoCall />}
                        >
                            <input type="file" hidden />
                        </Button>
                    </Box>
                    <Button sx={{ borderRadius: '20px' }}>Submit</Button>
                </Box>
            </Box>
        </>

    )
}
