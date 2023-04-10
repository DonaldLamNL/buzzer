import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  TextField,
  Button,
  Grid,
  Avatar,
  Card,
  Typography,
} from "@mui/material";
import { PhotoCamera, VideoCall } from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import PubSub from "pubsub-js";
import RebuzzContent from "../Items/RebuzzContent";
import serverPath from "../../ServerPath";

export default function Post() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageDisplay, setImageDisplay] = useState(null);
  const [video, setVideo] = useState(null);
  const [buzzInput, setBuzzInput] = useState("");
  const [postCat, setPostCat] = useState("Others");
  const [username, setUsername] = useState("");
  const [icon, setIcon] = useState(null);
  const [rebuzz, setRebuzz] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleBuzzInputChange = (event) => {
    setBuzzInput(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageDisplay(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleCategoryChoose = (event) => {
    setPostCat(event.target.value);
  };

  const handlePost = async (event) => {
    event.preventDefault();

    if (!buzzInput) {
      return;
    }

    const formData = new FormData();
    formData.append("content", buzzInput);
    formData.append("category", postCat);
    formData.append("userid", Cookies.get("BuzzerUser"));
    formData.append("rebuzz", rebuzz);

    if (image) {
      console.log("uploaded iamge");
      formData.append("image", image);
    }
  
    if (video) {
      console.log("uploaded video");
      formData.append("video", video);
    }
    
    try {
      const response = await fetch(`${serverPath}/buzzes/post`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData.message);
      if (responseData.state) {
        PubSub.publish("newBuzzPosted");
        navigate(`/buzz/${responseData.buzzid}`);
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

  const getCategories = () => {
    fetch(`${serverPath}/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCurrentUser();
    getCategories();
    const token = PubSub.subscribe("REBUZZ", async (channel, buzzid) => {
      if (buzzid) {
        setRebuzz(buzzid);
      }
    });
  }, [rebuzz]);

  return (
    <>
      {/* Post Block */}
      <Card
        elevation={5}
        sx={{
          display: "flex",
          width: "90%",
          margin: "auto",
          position: "relative",
          marginTop: "20px",
          borderRadius: 6,
        }}
      >
        {/* Poster Icon */}
        <Box sx={{ width: "90px" }}>
          <Avatar sx={{ width: 50, height: 50, margin: "20px" }}>
            {username ? username[0] : username}
          </Avatar>
        </Box>

        <Grid container item sx={{ flexGrow: 1 }}>
          {/* Rebuzz */}
          {rebuzz && (
            <Box
              sx={{
                bgcolor: "#e0e0e0",
                opacity: "0.7",
                width: "90%",
                display: "flex",
                position: "relative",
                marginTop: "20px",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <RebuzzContent buzzid={rebuzz} />
            </Box>
          )}

          {/* Buzz Input Block */}
          <TextField
            multiline
            rows={4}
            placeholder="What's happening?"
            sx={{
              fontSize: "16px",
              backgroundColor: "transparent",
              borderRadius: "20px",
              padding: "0 10px",
              width: "90%",
              margin: "20px 0",
              "&:focus": {
                backgroundColor: "#ffffff !important",
              },
            }}
            inputProps={{ rows: 4 }}
            onChange={handleBuzzInputChange}
          />

          {/* Tools Area */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "90%",
            }}
          >
            {/* Function Buttons */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Upload Images Button */}
              <label htmlFor="image-upload">
                <Button startIcon={<PhotoCamera />} component="span" />
              </label>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              {/* Upload Videos Button */}
              <label htmlFor="video-upload">
                <Button startIcon={<VideoCall />} component="span" />
              </label>
              <input
                type="file"
                accept="video/*"
                id="video-upload"
                style={{ display: "none" }}
                onChange={handleVideoChange}
              />
            </Box>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={postCat}
                onChange={handleCategoryChoose}
                label="Category"
              >
                {categories.map((c) => {
                  return (
                    <MenuItem key={c.name} value={c.name}>
                      {c.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* Submit Button */}
            <Button
              onClick={handlePost}
              variant="contained"
              sx={{ borderRadius: "20px" }}
            >
              Post
            </Button>
          </Box>

          {/* Image Preview */}
          {image && (
            <img
              src={imageDisplay}
              style={{
                maxWidth: "300px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            />
          )}
          {video && (
            <video controls style={{ maxWidth: "300px", marginBottom: "10px" }}>
              <source src={video} type="video/mp4" />
            </video>
          )}
        </Grid>
      </Card>
    </>
  );
}
