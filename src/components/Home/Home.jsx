import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

// components
import NewBuzzItem from "../Items/NewBuzzItem";
import Post from "./Post";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";

// Get buzzes
export default function Home() {
  const [buzzList, setBuzzList] = useState([]);

  const getBuzzes = async () => {
    try {
      fetch(`${serverPath}/buzzes/follow?userid=${Cookies.get("BuzzerUser")}`)
        .then((response) => response.json())
        .then((responseData) => {
          setBuzzList(responseData);
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
      {buzzList &&
        shuffleArray(buzzList).map((post) => (
          <NewBuzzItem key={post.buzzid} {...post} />
        ))}
      {/* <LinearProgress /> */}
    </div>
  );
}