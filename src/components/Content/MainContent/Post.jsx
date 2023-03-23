import { Box } from "@mui/system";
import { TextField, Button, Grid, Avatar, Card, MenuItem, FormControl, InputLabel } from "@mui/material";
import { PhotoCamera, VideoCall } from "@mui/icons-material";
import Select from '@mui/material/Select';

import React, { useState } from "react";

const categories = [
  "Food",
  "Music",
  "Movie",
  "News",
  "Gaming",
  "Business",
  "Sport",
  "Education",
  "Social",
  "Blog",
];

export default function Post() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [category, setCategory] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      {/* Post Block */}
      <Card
        elevation={5}
        // padding={100}
        sx={{
          display: "flex",
          width: "90%",
          // backgroundColor: '#f9f9f9',
          margin: "auto",
          position: "relative",
          marginTop: "20px",
          borderRadius: 6,
        }}
      >
        {/* Poster Icon */}
        <Box sx={{ width: "90px" }}>
          <Avatar sx={{ width: 50, height: 50, margin: "20px" }}>H</Avatar>
        </Box>

        <Grid container item sx={{ flexGrow: 1 }}>
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
            <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button variant="contained" sx={{ borderRadius: "20px" }}>
              Post
            </Button>
          </Box>

          {/* Image Preview */}
          {image && (
            <img src={image} style={{ maxWidth: "300px", marginTop: "10px" }} />
          )}
          {video && (
            <video controls style={{ maxWidth: "300px" }}>
              <source src={video} type="video/mp4" />
            </video>
          )}
        </Grid>
      </Card>
    </>
  );
}
