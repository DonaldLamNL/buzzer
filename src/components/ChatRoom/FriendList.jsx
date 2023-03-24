import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Card, ListItemButton, Paper, Typography } from "@mui/material";

export default function FriendList() {
  return (
    <Card variant="outlined">
      {/* <List> */}
      <ListItem sx={{ backgroundColor: "#0069d9" }}>
        <ListItemText
          primary="Friends List"
          primaryTypographyProps={{ color: "white", align: "center" }}
        />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt="Michael" />
          </ListItemAvatar>
          <ListItemText primary="Michael" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt="Michael" />
          </ListItemAvatar>
          <ListItemText primary="Michael" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt="Michael" />
          </ListItemAvatar>
          <ListItemText primary="Michael" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt="Michael" />
          </ListItemAvatar>
          <ListItemText primary="Michael" />
        </ListItemButton>
      </ListItem>
      {/* </List> */}
    </Card>
  );
}
