import { ChatBubbleOutlineOutlined } from "@mui/icons-material";
import {
  Avatar,
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

import React, { useEffect, useState } from "react";

import Comment from "../BuzzPage/Comment";
import Cookies from "js-cookie";

export default function BuzzItem(props) {
  const navigate = useNavigate();
  const {
    buzzid,
    like,
    icon,
    content,
    image,
    video,
    userid,
    username,
    isVerify,
  } = props;
  const { displayComment = false } = props;
  const [isLike, setIsLike] = useState(null);
  const [isDislike, setIsDislike] = useState(null);

  const handleLike = () => {
    if (isDislike != null) {
      setIsDislike(null);
    }
    setIsLike(!isLike);
  };

  const handleDislike = () => {
    if (isLike != null) {
      setIsLike(null);
    }

    setIsDislike(!isDislike);
  };

  const toBuzz = () => {
    navigate(`/buzz/${buzzid}`);
  };

  useEffect(() => {});

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
          <Box sx={{ width: "90px" }}>
            <Avatar src={icon} sx={{ width: 50, height: 50, margin: "20px" }}>
              {username[0]}
            </Avatar>
          </Box>

          {/* Content Part */}
          <Grid container item sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {/* Poster Info */}
              <Box sx={{ height: "60px", lineHeight: "60px" }}>
                <Typography sx={{ fontSize: "18px", display: "inline-block" }}>
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
                  }}
                >
                  @{userid}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{ fontSize: "14px", marginRight: "10px" }}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
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
                <IconButton
                  size="large"
                  sx={{ marginLeft: "20px" }}
                  onClick={toBuzz}
                >
                  <ChatBubbleOutlineOutlined />
                </IconButton>

                <Box
                  sx={{ display: "flex", alignItems: "center", margin: "auto" }}
                >
                  <IconButton size="large" onClick={handleLike}>
                    {isLike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                  </IconButton>
                  <div>{like}</div>
                  <IconButton size="large" onClick={handleDislike}>
                    {isDislike ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
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
        <div style={{ display: "block" }}>
          {displayComment ? (
            <Comment buzzid={buzzid} username={username} icon={icon} />
          ) : (
            <></>
          )}
        </div>
      </Card>
    </>
  );
}
