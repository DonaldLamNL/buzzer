import React, { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton } from "@mui/material";

// components
import NewBuzzItem from "../Items/NewBuzzItem";
import Post from "./Post";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";
import AutorenewIcon from "@mui/icons-material/Autorenew";

// Get buzzes
export default function Home() {
  const [buzzList, setBuzzList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getBuzzes = async () => {
    try {
      fetch(`${serverPath}/buzzes/home?userid=${Cookies.get("BuzzerUser")}`)
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
    <div>
      <Post />
      {!isLoaded && (
        <Box textAlign={"center"} marginTop={20}>
          <CircularProgress size={100} />
        </Box>
      )}
      {buzzList &&
        shuffleArray(buzzList).map((post) => (
          <NewBuzzItem key={post.buzzid} {...post} />
        ))}
      {isLoaded &&
        <Box textAlign={"center"}>
          <IconButton
            onClick={() => {
              window.location.reload();
            }}
          >
            <AutorenewIcon fontSize="large" />
          </IconButton>
        </Box>
      }
    </div>
  );
}
