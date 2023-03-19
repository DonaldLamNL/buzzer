import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import React from 'react'
import { Link } from "react-router-dom"
import { positions } from "@mui/system"

export default function index() {
  return (
    <div 
      style={{
        height: '100%',
        backgroundColor: '#f4aaff',
        // position: 'fixed'
      }}
    >
      <ul>
        <li>
            <Link to="/home">Home</Link>
        </li>
        <li>
            <Link to="/user">User</Link>
        </li>
        <li>
            <Link to="/hive">Hive</Link>
        </li>
      </ul>
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  )
}