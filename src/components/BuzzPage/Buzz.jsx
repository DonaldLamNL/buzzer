import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewBuzzItem from "../Items/NewBuzzItem";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";
import { CssBaseline } from "@mui/material";
// import serverPath from "../ServerPath";

export default function Buzz() {
  const { buzzid } = useParams();
  const [buzzData, setBuzzData] = useState(null);

  const getBuzz = async () => {
    fetch(
      `${serverPath}/buzzes?buzzid=${buzzid}&userid=${Cookies.get(
        "BuzzerUser"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBuzzData(data);
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBuzz();
  }, [buzzid]);

  return <>{buzzData && <NewBuzzItem {...buzzData} displayComment={true} />}</>;
}
