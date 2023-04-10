import { ChatBubbleOutlineOutlined, Co2Sharp } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Grid,
  IconButton,
  SvgIcon,
  Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import PubSub from "pubsub-js";
import React, { useEffect, useState } from "react";
import Comment from "../BuzzPage/Comment";
import Cookies from "js-cookie";
import RebuzzContent from "./RebuzzContent";

export default function NewBuzzItem(props) {
  const navigate = useNavigate();
  const {
    buzzid,
    userLike,
    numOfLike,
    commentCount,
    icon,
    content,
    category,
    image,
    video,
    userid,
    username,
    isVerify,
    rebuzz,
    displayComment = false,
  } = props;
  const [isLike, setIsLike] = useState(null);
  const [isDislike, setIsDislike] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [buzzImage, setBuzzImage] = useState(null);

  const toBuzz = () => {
    navigate(`/buzz/${buzzid}`);
    window.scrollTo({ top: 0 });
  };

  const handleLike = async () => {
    if (isExecuting) {
      return;
    }
    setIsExecuting(true);
    try {
      const response = await fetch(`${serverPath}/buzzes/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buzzid,
          userid: Cookies.get("BuzzerUser"),
          isLike,
          isDislike,
        }),
      });
      const responseData = await response.json();
      if (responseData.state) {
        setIsLike(responseData.isLike);
        setIsDislike(responseData.isDislike);
        setLikeCount(responseData.likeCount);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDislike = async () => {
    if (isExecuting) {
      console.log("hi");
      return;
    }
    setIsExecuting(true);
    try {
      const response = await fetch(`${serverPath}/buzzes/dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buzzid,
          userid: Cookies.get("BuzzerUser"),
          isLike,
          isDislike,
        }),
      });
      const responseData = await response.json();
      if (responseData.state) {
        setIsLike(responseData.isLike);
        setIsDislike(responseData.isDislike);
        setLikeCount(responseData.likeCount);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleRebuzz = () => {
    PubSub.publish("REBUZZ", buzzid);
    window.scrollTo({ top: 0 });
    navigate("/home");
  };

  const jumpToUserprofile = () => {
    navigate(`/user/${userid}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getImage = async () => {
    if (image) {
      fetch(`${serverPath}/buzzes/image/${image}`)
        .then((response) => response.blob())
        .then((image) => {
          setBuzzImage(URL.createObjectURL(image));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const searchCategory = () => {
    navigate(`/search/*${category}`);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (userLike == 1) {
      setIsLike(true);
    } else if (userLike == -1) {
      setIsDislike(true);
    }
    setLikeCount(numOfLike);
    getImage();
  }, []);

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
        <Box
          sx={{
            display: "flex",
            position: "relative",
            width: "90%",
          }}
        >
          {/* Poster Icon */}
          <Box>
            <Avatar
              src={icon}
              sx={{ width: 50, height: 50, margin: "20px", cursor: "pointer" }}
              onClick={jumpToUserprofile}
            >
              {username[0]}
            </Avatar>
          </Box>

          {/* Content Part */}
          <Grid container item sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {/* Poster Info */}
              <Box sx={{ height: "45px", lineHeight: "60px" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  onClick={jumpToUserprofile}
                >
                  {username}
                  {isVerify && (
                    <CheckCircle sx={{ color: "orange", ml: 1 }} />
                  )}{" "}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#7e7e7e",
                    marginLeft: "20px",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  onClick={jumpToUserprofile}
                >
                  @{userid}
                </Typography>
              </Box>

              {/* Rebuzz */}
              {rebuzz != 0 && <RebuzzContent buzzid={rebuzz} />}

              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginRight: "10px",
                    whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{ __html: content }}
                ></Typography>
              </Box>

              {/* Media Block */}
              {buzzImage !== null || video !== null ? (
                <Box sx={{ margin: "20px auto" }}>
                  {buzzImage !== null && (
                    <img
                      src={buzzImage}
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

              <Typography
                sx={{
                  marginTop: "10px",
                  fontSize: "16px",
                  color: "#66a0ff",
                  display: "inline-block",
                  cursor: "pointer",
                }}
                onClick={searchCategory}
              >
                # {category}
              </Typography>

              {/* Tools */}
              <Box sx={{ width: "600px", marginTop: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="large"
                    sx={{ marginLeft: "20px" }}
                    onClick={toBuzz}
                  >
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <div>{commentCount}</div>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <IconButton size="large" onClick={handleLike}>
                      {isLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                    </IconButton>
                    <div>{likeCount}</div>
                    <IconButton size="large" onClick={handleDislike}>
                      {isDislike ? (
                        <ThumbDownAltIcon />
                      ) : (
                        <ThumbDownOffAltIcon />
                      )}
                    </IconButton>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "50px",
                    }}
                  >
                    <IconButton size="large" onClick={handleRebuzz}>
                      <ReplyIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>

        {/* Comment */}
        <div style={{ display: "block" }}>
          {displayComment ? <Comment buzzid={buzzid} /> : <></>}
        </div>
      </Card>
    </>
  );
}
