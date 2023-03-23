import React from "react";
import { Grid, Paper, TextField, Avatar, Typography } from "@mui/material";

const ChatBox = () => {
  return (
    <Grid container direction="column">
      <Grid item container>
        <Typography variant="h5">Chat with Friend A</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item>
          <Avatar alt="User Avatar" src="/avatar.jpg" />
        </Grid>
        <Grid item xs>
          <Paper variant="outlined">
            <Typography variant="subtitle1">Username</Typography>
            <Typography variant="body1">Hello, how are you?</Typography>
            <Typography variant="caption">10:30 AM</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs>
          <Paper variant="outlined">
            <Typography variant="subtitle1">Friend A</Typography>
            <Typography variant="body1">
              I'm good, thanks for asking. How about you?
            </Typography>
            <Typography variant="caption">10:32 AM</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Avatar alt="Friend A Avatar" src="/friendA.jpg" />
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs>
          <TextField label="Type your message" fullWidth />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatBox;
