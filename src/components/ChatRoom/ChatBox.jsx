import {
  Avatar,
  Box,
  Paper,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import ChatBubble from "./ChatBubble";

export default function ChatBox() {
  return (
    <>
      <Card variant="outlined">
        <ListItem sx={{ backgroundColor: "#0069d9" }}>
          <ListItemAvatar>
            <Avatar alt="Michael" />
          </ListItemAvatar>
          <ListItemText
            primary="Michael"
            primaryTypographyProps={{ color: "white" }}
          />
        </ListItem>
        <ListItem sx={{ justifyContent: "flex-end" }}>
          <ChatBubble
            message={"i love u"}
            sentByMe={true}
            timestamp="10:30 AM"
          ></ChatBubble>
        </ListItem>
        <ListItem>
          <ChatBubble
            message="Hello, how are you?"
            sentByMe={false}
            timestamp="10:30 AM"
          />
        </ListItem>{" "}
        <ListItem>
          <ChatBubble
            message="Hello, how are you?"
            sentByMe={false}
            timestamp="10:30 AM"
          />
        </ListItem>{" "}
        <ListItem>
          <ChatBubble
            message="Hello, how are you?"
            sentByMe={false}
            timestamp="10:30 AM"
          />
        </ListItem>{" "}
        <ListItem>
          <ChatBubble
            message="Hello, how are you?"
            sentByMe={false}
            timestamp="10:30 AM"
          />
        </ListItem>
        {/* <Divider /> */}
      </Card>
    </>
  );
}
