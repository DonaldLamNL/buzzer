import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Avatar,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import FriendList from "./FriendList";
import ChatBox from "./ChatBox";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";

const ChatRoom = () => {
  return (
    <>
      <Grid container spacing={10}>
        <Grid item>
          <FriendList />
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          <ChatBox />
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems="flex-end"
          >
            <TextField label="write message" variant="standard" />
            <IconButton color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatRoom;
