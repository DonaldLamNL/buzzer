/*
Component Name: Following.jsx
Description: The ui of following list of a specific user.
*/

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import UserPreview from "./UserPreview.jsx";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";

export default function Following(props) {
  const { userid } = props;
  const [UserList, setUserList] = useState([]);

  // Get the following list from server.
  const getFollowing = async () => {
    try {
      const response = await fetch(
        `${serverPath}/users/followlist?userid=${userid}&currentid=${Cookies.get(
          "BuzzerUser"
        )}&type=${"following"}`
      );
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowing();
  }, []);

  return (
    <Box>
      {UserList &&
        UserList.map((c) => {
          return <UserPreview key={c.userid} {...c} />;
        })}
    </Box>
  );
}
