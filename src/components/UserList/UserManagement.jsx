/*
Component Name: UserManagement.jsx
Description: The container for the admin user management interface.
*/

import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import serverPath from "../../ServerPath";

import UserPreview from "./UserPreview.jsx";
import Cookies from "js-cookie";

export default function UserManagement() {
  const [userList, setUserList] = useState([]);

  const deletedUser = (userId) => {
    setUserList(userList.filter((user) => user.userid !== userId));
  };

  const getUserList = async () => {
    try {
      fetch(
        `${serverPath}/admin/all?userid=${Cookies.get("BuzzerUser")}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUserList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Box sx={{ width: "90%" }}>
      <Box>
        {userList.map((c) => {
          return (
            <UserPreview
              deletedUser={deletedUser}
              key={c.userid}
              {...c}
              isDelete={true}
            />
          );
        })}
      </Box>
    </Box>
  );
}
