import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";
import FriendList from "./UserList";
import ChatBox from "./ChatBox";

const ChatRoom = () => {
  return (
    <>
      <Grid container spacing={10}>
        <Grid item>
          <FriendList />
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          <ChatBox />
        </Grid>
      </Grid>
    </>
  );
};

export default ChatRoom;
