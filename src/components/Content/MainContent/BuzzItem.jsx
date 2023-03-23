import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import { Avatar, Card, Grid, IconButton, SvgIcon, Typography } from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Box } from "@mui/system";
import { useNavigate } from 'react-router-dom'

import React, { useState } from "react";

import Comment from './Comment'

export default function BuzzItem(props) {
    const navigate = useNavigate()
    const { pid, like, comment, icon, content, image, video, uid, uname } = props;
    const {displayComment = false} = props;

    const toBuzz = () => {
        navigate(`/buzz?buzzid=${pid}`)
    }

    return (
        <>
            {/* Post Block */}
            <Card
                elevation={5}
                sx={{
                    width: "90%",
                    margin: "20px auto",
                    borderRadius: 6,
                }}
                >
                <Box sx={{                    
                    display: "flex",
                    position: "relative",
                    width: "90%",
                }}>
                    {/* Poster Icon */}
                    <Box sx={{ width: "90px" }}>
                        <Avatar src={icon} sx={{ width: 50, height: 50, margin: "20px" }}>
                            {uname[0]}
                        </Avatar>
                    </Box>

                    {/* Content Part */}
                    <Grid container item sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {/* Poster Info */}
                            <Box sx={{ height: "60px", lineHeight: "60px" }}>
                                <Typography sx={{ fontSize: "18px", display: "inline-block" }}>
                                    {uname}{" "}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        color: "#7e7e7e",
                                        marginLeft: "20px",
                                        display: "inline-block",
                                    }}
                                >
                                    @{uid}
                                </Typography>
                            </Box>

                            {/* Content */}
                            <Box>
                                <Typography sx={{ fontSize: "14px", marginRight: "10px" }}>
                                    {content}
                                </Typography>
                            </Box>

                            {/* Media Block */}
                            {image !== null || video !== null ? (
                                <Box sx={{ margin: "20px auto" }}>
                                    {image !== null && (
                                        <img
                                            src={image}
                                            style={{
                                                maxWidth: "95%",
                                                maxHeight: "200px",
                                                display: "block",
                                            }}
                                        />
                                    )}
                                    {video !== null && (
                                        <video
                                            src={video}
                                            controls
                                            style={{
                                                maxWidth: "95%",
                                                maxHeight: "300px",
                                                display: "block",
                                            }}
                                        />
                                    )}
                                </Box>
                            ) : null}

                            {/* Tools */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <IconButton size="large" sx={{ marginLeft: "20px" }} onClick={toBuzz}>
                                    <ChatBubbleOutlineOutlined />
                                </IconButton>

                                <Box
                                    sx={{ display: "flex", alignItems: "center", margin: "auto" }}
                                >
                                    <IconButton size="large">
                                        <ThumbUpIcon />
                                    </IconButton>
                                    <div>{like}</div>
                                    <IconButton size="large">
                                        <ThumbDownIcon />
                                    </IconButton>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginRight: "50px",
                                    }}
                                >
                                    <IconButton size="large">
                                        <ReplyIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Box>

                {/* Comment */}
                <div style={{display: 'block'}}>
                    {displayComment ? (
                        <Comment />
                        ) : (
                        <></>
                    )}
                </div>
            </Card>
        </>
    );
}
