import { Avatar, Card, Grid, IconButton, TextField } from '@mui/material'
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'


const buzzComment = [
    {
        cid: 1,
        userid: 'irwinking124',
        username: 'Irwin King',
        content: 'This is so good'
    },
    {
        cid: 2,
        userid: 'irwinking124',
        username: 'Irwin King',
        content: 'This is so bad'
    },
    {
        cid: 3,
        userid: 'irwinking124',
        username: 'Irwin King',
        content: 'This is so nice'
    },
    {
        cid: 4,
        userid: 'michael123',
        username: 'Michael Lyu',
        content: 'This is so fancy'
    }
]

export default function Comment(props) {
    const navigate = useNavigate()
    const { buzzid } = props;
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [postedComment, setPostedComment] = useState(0);

    const getComments = async () => {
        try {
            fetch(`http://localhost:3000/comments?buzzid=${buzzid}`)
                .then(response => response.json())
                .then(data => {
                    setComments(data)
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (err) {
            console.error(err);
        }
    };

    const handleCommentInputChange = (event) => {
        setCommentInput(event.target.value)
    }

    const handlePostComment = async (event) => {
        event.preventDefault();

        if (!commentInput) {
            return;
        }

        const formData = new FormData();
        formData.append('content', commentInput);
        formData.append('userid', Cookies.get('BuzzerUser'));
        formData.append('buzzid', buzzid);

        try {
            const response = await fetch('http://localhost:3000/comments/post', {
                method: 'POST',
                body: formData,
            });

            const responseData = await response.json();
            console.log(responseData.message);
            if (responseData) {
                setPostedComment(responseData.newCommentid);
                getComments();
                setCommentInput('');
                document.getElementById("comment-input").value = "";
            }

        } catch (err) {
            console.error(err);
        }
    }

    const jumpToUserprofile = (uid) => {
        navigate(`/user/${uid}`);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        getComments();
    }, [buzzid, postedComment]);

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
                        inputProps={{ rows: 4, id: "comment-input" }}
                        onChange={handleCommentInputChange}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <IconButton 
                            size="large"
                            onClick={handlePostComment}
                        >
                            <SendRoundedIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Box>
            {
                comments.map((c, i) => {
                    return (
                        <Box
                            key={i}
                            elevation={5}
                            sx={{
                                borderRadius: '15px',
                                display: "flex",
                                width: "95%",
                                margin: " 20px auto",
                                position: "relative",
                                backgroundColor: postedComment == c.commentid ? "#fff0c2" : "#f4f4f4" 
                            }}
                        >
                            {/* Poster Icon */}
                            <Box sx={{ width: "60px" }}>
                                <Avatar 
                                    sx={{ width: 40, height: 40, margin: "10px", cursor: 'pointer' }}
                                    onClick={() => {jumpToUserprofile(c.userid)}}
                                >
                                    {c.username[0]}
                                </Avatar>
                            </Box>

                            <Grid container item sx={{ flexGrow: 1 }}>
                                <Box sx={{ flexDirection: "column" }}>
                                    <Box sx={{ mr: 2, cursor: 'pointer', marginTop: '15px', fontSize: '16px', lineHeight: "30px" }} onClick={() => {jumpToUserprofile(c.userid)}}>{c.username}</Box>
                                    <Box sx={{ lineHeight: "40px", whiteSpace: "pre-wrap" }}>{c.content}</Box>
                                </Box>
                            </Grid>
                        </Box>
                    )
                })
            }
        </Box>
    )
}
