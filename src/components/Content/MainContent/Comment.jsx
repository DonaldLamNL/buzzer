import { Avatar, Card, Grid, IconButton, TextField } from '@mui/material'
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box } from '@mui/system'
import React from 'react'

const buzzComment = [
    {
        cid: 1,
        uid: 'irwinking124',
        uname: 'Irwin King',
        comment: 'This is so good'
    },
    {
        cid: 2,
        uid: 'irwinking124',
        uname: 'Irwin King',
        comment: 'This is so bad'
    },
    {
        cid: 3,
        uid: 'irwinking124',
        uname: 'Irwin King',
        comment: 'This is so nice'
    },
    {
        cid: 4,
        uid: 'michael123',
        uname: 'Michael Lyu',
        comment: 'This is so fancy'
    }
]

export default function Comment() {
    return (
        <Box>
            <Box
                elevation={5}
                sx={{
                    display: "flex",
                    width: "95%",
                    margin: " 20px auto",
                    position: "relative",
                }}
            >
                {/* Poster Icon */}
                <Box sx={{ width: "60px", margin: "auto" }}>
                    <Avatar sx={{ width: 40, height: 40, margin: "17px auto" }}>H</Avatar>
                </Box>

                <Grid container item sx={{ flexGrow: 1 }}>
                    {/* Buzz Input Block */}
                    <TextField
                        multiline
                        // rows={1}
                        placeholder="Comment..."
                        sx={{
                            fontSize: "16px",
                            borderRadius: "20px",
                            width: "90%",
                            margin: "10px 5px",
                            "&:focus": {
                                backgroundColor: "#ffffff !important",
                            },
                        }}
                        inputProps={{ rows: 4 }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <IconButton size="large">
                            <SendRoundedIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Box>

            {
                buzzComment.map((c, i) => {
                    return (
                        <Box
                            key={i}
                            elevation={5}
                            sx={{
                                display: "flex",
                                width: "95%",
                                margin: " 20px auto",
                                position: "relative",
                                backgroundColor: "#f4f4f4",
                            }}
                        >
                            {/* Poster Icon */}
                            <Box sx={{ width: "60px" }}>
                                <Avatar sx={{ width: 40, height: 40, margin: "10px" }}>
                                    {c.uname[0]}
                                </Avatar>
                            </Box>

                            <Grid container item sx={{ flexGrow: 1, lineHeight: "60px" }}>
                                <Box sx={{ flexDirection: "column" }}>
                                    <Box sx={{ mr: 2 }}>{c.uname}</Box>
                                    <Box>{c.comment}</Box>
                                </Box>
                            </Grid>
                        </Box>
                    )
                })
            }


        </Box>
    )
}
