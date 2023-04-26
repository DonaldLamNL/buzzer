/*
Component Name: Follower.jsx
Description: The ui of follower list of a specific user.
*/

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import UserPreview from "./UserPreview.jsx";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";

export default function Follower(props) {
  const { userid } = props;
  const [UserList, setUserList] = useState([]);

  // Get the follower list from server.
  const getFollowers = async () => {
    try {
      const response = await fetch(
        `${serverPath}/users/followlist?userid=${userid}&currentid=${Cookies.get(
          "BuzzerUser"
        )}&type=followers`
      );
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFollowers();
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
