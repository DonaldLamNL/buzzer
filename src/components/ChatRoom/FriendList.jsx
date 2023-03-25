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
            <Avatar>A</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Amy Lam" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>C</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Chris Wong" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>J</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Jimmy Lau" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem sx={{backgroundColor: '#3577CB'}}>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>I</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Irwin King" />
        </ListItemButton>
      </ListItem>
      {/* </List> */}
    </Card>
  );
}
