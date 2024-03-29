/*
Component Name: RebuzzContent.jsx
Description: The ui of rebuzz content in Post interface.
*/

import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { CheckCircle } from "@mui/icons-material";
import serverPath from "../../ServerPath";
import BuzzIcon from "./BuzzIcon";

export default function RebuzzContent(props) {
  const navigate = useNavigate();

  const { buzzid } = props;
  const [rebuzzContent, setRebuzzContent] = useState(null);

  // request for the rebuzz content from server
  const getRebuzzContent = async () => {
    try {
      fetch(
        `${serverPath}/buzzes?buzzid=${buzzid}&userid=${Cookies.get(
          "BuzzerUser"
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          setRebuzzContent(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // navigate to buzz page
  const jumpToRebuzz = () => {
    window.scrollTo({ top: 0 });
    navigate(`/buzz/${buzzid}`);
  };

  useEffect(() => {
    if (buzzid != -1) {
      getRebuzzContent();
    }
  }, []);

  return (
    <>
      {buzzid == -1 && (
        <Box
          sx={{
            bgcolor: "#e0e0e0",
            opacity: "0.7",
            width: "90%",
            display: "flex",
            position: "relative",
            marginBottom: "10px",
            height: "50px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                marginRight: "10px",
                lineHeight: "50px",
                fontStyle: "italic",
                marginLeft: "20px",
                whiteSpace: "pre-wrap",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              This buzz is deleted.
            </Typography>
          </Box>
        </Box>
      )}

      {rebuzzContent && (
        <Box
          sx={{
            bgcolor: "#e0e0e0",
            opacity: "0.7",
            width: "90%",
            display: "flex",
            position: "relative",
            marginBottom: "10px",
          }}
        >
          <Box>
            <BuzzIcon userid={rebuzzContent.userid} username={rebuzzContent.username} icon={rebuzzContent.icon} />
          </Box>

          {/* Content Part */}
          <Grid container item sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {/* Poster Info */}
              <Box sx={{ height: "60px", lineHeight: "60px" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(`/user/${rebuzzContent.userid}`);
                  }}
                >
                  {rebuzzContent.username}
                  {rebuzzContent.isVerify && (
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
                  onClick={() => {
                    navigate(`/user/${rebuzzContent.userid}`);
                  }}
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
                    },
                  }}
                >
                  <Box
                    sx={{ whiteSpace: "pre-wrap", marginBottom: "15px" }}
                    dangerouslySetInnerHTML={{
                      __html: rebuzzContent.content.replace(
                        /%@(\w+)%/g,
                        `<a href="${window.location.origin}/#/user/$1">@$1</a>`
                      )
                    }}
                  />
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
}
