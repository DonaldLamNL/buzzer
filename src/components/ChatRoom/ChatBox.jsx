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
        <ListItem>
          <ChatBubble
            message={"i love u"}
            isSentByMe={true}
            timestamp="23.59"
          ></ChatBubble>
        </ListItem>
        <Divider />
      </Card>
    </>
  );
}
