import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'


export default function RebuzzContent(props) {
    const navigate = useNavigate();

    const { buzzid } = props;
    const [rebuzzContent, setRebuzzContent] = useState(null);

    const getRebuzzContent = async () => {
        try {
            fetch(`http://localhost:3000/buzzes?buzzid=${buzzid}&userid=${Cookies.get('BuzzerUser')}`)
                .then(response => response.json())
                .then(data => {
                    setRebuzzContent(data);
                })
        } catch (error) {
            console.log(error)
        }
    }
    
    const jumpToRebuzz = () => {
        window.scrollTo({ top: 0 });
        navigate(`/buzz/${buzzid}`);
    }

    useEffect(() => {
        getRebuzzContent();
    }, [buzzid]);

    return (
        <>
            {/* {rebuzzContent && <Box
                sx={{
                    width: "90%",
                    height: "50px",
                    bgcolor: '#bfa',
                    marginTop: '20px'
                }}
            >
                <Typography
                    onClick={() => { navigate(`/buzz/${rebuzz}`) }}
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                            // textDecoration: "underline",
                        },
                    }}
                >
                    {rebuzzContent.content}
                </Typography>
                <Button
                    onClick={() => { setRebuzz(null); }}
                >
                </Button>
            </Box>} */}

            {rebuzzContent &&
                <Box
                    sx={{
                        bgcolor: '#e0e0e0',
                        opacity: '0.7',
                        width: '90%',
                        // borderRadius: '20px',
                        display: "flex",
                        position: "relative",
                        marginTop: '20px',
                    }}
                >
                    < Box >
                        <Avatar
                            src={rebuzzContent.icon}
                            sx={{ width: 50, height: 50, margin: "20px", cursor: 'pointer' }}
                            onClick={() => { navigate(`/user/${rebuzzContent.userid}`) }}
                        >
                            {rebuzzContent.username[0]}
                        </Avatar>
                    </Box >

                    {/* Content Part */}
                    < Grid container item sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {/* Poster Info */}
                            <Box sx={{ height: "60px", lineHeight: "60px" }}>
                                <Typography
                                    sx={{ fontSize: "18px", display: "inline-block", cursor: 'pointer' }}
                                    onClick={() => { navigate(`/user/${rebuzzContent.userid}`) }}
                                >
                                    {rebuzzContent.username}
                                    {rebuzzContent.isVerify && (
                                        <CheckCircle sx={{ color: 'orange', ml: 1 }} />
                                    )}
                                    {" "}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        color: "#7e7e7e",
                                        marginLeft: "20px",
                                        display: "inline-block",
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => { navigate(`/user/${rebuzzContent.userid}`) }}
                                >
                                    @{rebuzzContent.userid}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    onClick={jumpToRebuzz}
                                    sx={{
                                        fontSize: "14px",
                                        marginRight: "10px",
                                        "&:hover": {
                                            cursor: "pointer",
                                            // textDecoration: "underline",
                                        },
                                    }}
                                >
                                    {rebuzzContent.content}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            }

        </>
    )
}
