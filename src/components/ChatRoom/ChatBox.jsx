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
            <Avatar
              sx={{ width: 40, height: 40, margin: '15px' }}
            >
              {'I'}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Irwin King"
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
            timestamp="10:31 AM"
          />
        </ListItem>{" "}
        <ListItem sx={{ justifyContent: "flex-end" }}>
          <ChatBubble
            message="I'm fine, thank you, and you?"
            sentByMe={true}
            timestamp="10:40 AM"
          />
        </ListItem>{" "}
        <ListItem>
          <ChatBubble
            message="I go to school by bus"
            sentByMe={false}
            timestamp="10:45 AM"
          />
        </ListItem>{" "}
        <ListItem sx={{ justifyContent: "flex-end" }}>
          <ChatBubble
            message="I go to school by rocket"
            sentByMe={true}
            timestamp="10:50 AM"
          />
        </ListItem>
        {/* <Divider /> */}
      </Card>
    </>
  );
}
