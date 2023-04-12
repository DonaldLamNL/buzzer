import { Avatar, Card, Grid, IconButton, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";
import ReplyIcon from "@mui/icons-material/Reply";
import { Link, useNavigate } from "react-router-dom";

export default function Comment(props) {
  const navigate = useNavigate();
  const { buzzid } = props;
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [postedComment, setPostedComment] = useState(0);
  const [username, setUsername] = useState("");
  const [icon, setIcon] = useState(null);
  const [atUser, setAtUser] = useState(null);

  const getComments = async () => {
    try {
      fetch(`${serverPath}/comments?buzzid=${buzzid}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handlePostComment = async (event) => {
    event.preventDefault();

    if (!commentInput) {
      return;
    }

    const formData = new FormData();
    formData.append("content", commentInput);
    formData.append("userid", Cookies.get("BuzzerUser"));
    formData.append("buzzid", buzzid);

    try {
      const response = await fetch(`${serverPath}/comments/post`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData.message);
      if (responseData) {
        setPostedComment(responseData.newCommentid);
        getComments();
        setCommentInput("");
        document.getElementById("comment-input").value = "";
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentUser = async () => {
    fetch(`${serverPath}/users/currentuser?userid=${Cookies.get("BuzzerUser")}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.isLogin) {
          setUsername(data.username);
          setIcon(data.icon);
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const searchUser = (targetid) => {
    const response = fetch(`${serverPath}/users/search?keywords=@${targetid}&userid=${Cookies.get("BuzzerUser")}`);
    return response
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };


  const jumpToUserprofile = (uid) => {
    navigate(`/user/${uid}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getComments();
    getCurrentUser();
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
          <Avatar
            src={icon}
            sx={{ width: 40, height: 40, margin: "17px auto" }}
          >
            {username ? username[0] : ""}
          </Avatar>
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
            <IconButton size="large" onClick={handlePostComment}>
              <SendRoundedIcon />
            </IconButton>
          </Box>
        </Grid>
      </Box>
      {comments.map((c, i) => {
        return (
          <Box
            key={i}
            elevation={5}
            sx={{
              borderRadius: "15px",
              display: "flex",
              width: "95%",
              margin: " 20px auto",
              position: "relative",
              backgroundColor:
                postedComment == c.commentid ? "#fff0c2" : "#f4f4f4",
            }}
          >
            {/* Poster Icon */}
            <Box sx={{ width: "60px" }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  margin: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  jumpToUserprofile(c.userid);
                }}
              >
                {c.username[0]}
              </Avatar>
            </Box>
            <Grid container item sx={{ flexGrow: 1 }}>
              <Box sx={{ flexDirection: "column" }}>
                <Box
                  sx={{
                    mr: 2,
                    cursor: "pointer",
                    margin: "15px 0",
                    fontSize: "16px",
                    lineHeight: "30px",
                  }}
                  onClick={() => {
                    jumpToUserprofile(c.userid);
                  }}
                >
                  {c.username}
                </Box>
                <Box sx={{ whiteSpace: "pre-wrap", marginBottom: "15px" }}>
                  <Box
                    sx={{ whiteSpace: "pre-wrap", marginBottom: "15px" }}
                    dangerouslySetInnerHTML={{
                      __html: c.content.replace(
                        /%@(\w+)%/g,
                        `<a href="http://127.0.0.1:5173/#/user/$1">@$1</a>`
                      )
                    }}
                  />
                </Box>
                {/* <IconButton
                    size="large"
                    sx={{
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                    }}
                    onClick={handleReply(c.userid)}
                  >
                    <ReplyIcon />
                  </IconButton> */}
              </Box>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}
