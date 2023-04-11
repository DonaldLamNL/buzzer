import React, { useContext, useEffect, useState } from "react";

// material-ui
import { Box, width } from "@mui/system";

// components
import ProfileCardItem from "../Items/ProfileCardItem";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";

export default function UserSearch(props) {
  const [userList, setUserList] = useState(null);
  let input = props.input;

  const searchUser = async () => {
    try {
      fetch(
        `${serverPath}/users/search?keywords=${input}&userid=${Cookies.get(
          "BuzzerUser"
        )}`
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
    searchUser();
  }, [input]);

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
      }}
    >
      {input != "" && (
        <Box
          sx={{
            width: "100%",
            lineHeight: "20px",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Search for '{input.slice(0, 15)}
          {input.length > 15 ? "..." : ""}'
        </Box>
      )}
      {input == "" && (
        <Box
          sx={{
            width: "100%",
            lineHeight: "20px",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Recommand for you
        </Box>
      )}

      {userList &&
        userList.map((item) => <ProfileCardItem key={item.userid} {...item} />)}

      <Box
        sx={{
          height: "100px",
        }}
      ></Box>
    </Box>
  );
}
