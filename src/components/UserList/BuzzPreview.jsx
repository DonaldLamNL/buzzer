import { CheckCircle } from "@mui/icons-material";
import { Avatar, Typography, Button, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import React from "react";
import serverPath from "../../ServerPath";

export default function BuzzPreview(props) {
  const { userid, username, icon, buzzid, content, isVerify, deletedBuzz } =
    props;

  const deleteBuzzConfirm = async (e) => {
    const result = window.confirm(
      `Are you sure to delete the post @${buzzid}?`
    );
    if (result) {
      try {
        const response = await fetch(`${serverPath}/admin/deletebuzz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: Cookies.get("BuzzerUser"), buzzid }),
        });

        const data = await response.json();

        deletedBuzz(buzzid);

        if (data.state) {
          alert("User deleted successfully");
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while deleting user");
      }
    }
  };

  return (
    <>
      {/* Post Block */}
      <Card
        elevation={5}
        sx={{
          width: "100%",
          margin: "20px auto",
          paddingBottom: "20px",
          borderRadius: 6,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
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
                  sx={{ fontSize: "14px", marginRight: "90px" }}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </Box>
            </Box>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: "18px",
              bgcolor: "error.main",
              "&:hover": { bgcolor: "error.dark" },
            }}
            onClick={deleteBuzzConfirm}
          >
            Delete
          </Button>
        </Box>
      </Card>
    </>
  );
}
