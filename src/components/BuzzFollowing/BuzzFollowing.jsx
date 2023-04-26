import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";

// components
import NewBuzzItem from "../Items/NewBuzzItem";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";
import Post from "../Home/Post";

// Get buzzes
export default function BuzzFollowing() {
  const [buzzList, setBuzzList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getBuzzes = async () => {
    try {
      fetch(`${serverPath}/buzzes/follow?userid=${Cookies.get("BuzzerUser")}`)
        .then((response) => response.json())
        .then((responseData) => {
          setBuzzList(responseData);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  useEffect(() => {
    getBuzzes();
  }, []);

  return (
    <Box>
      <Typography align="center" marginTop={"20px"} fontSize={25}>
        Buzzes of Your Following
      </Typography>

      {!isLoaded && (
        <Box textAlign={"center"} marginTop={20}>
          <CircularProgress size={100} />
        </Box>
      )}
      {buzzList &&
        shuffleArray(buzzList).map((post) => (
          <NewBuzzItem key={post.buzzid} {...post} />
        ))}
    </Box>
  );
}
