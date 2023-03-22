import { Grid, Fab, MenuItem, Card, Input, Paper } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Nav from "./components/Nav";
import "./index.css";
import routerConfig from "./router";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import * as React from "react";
import Tooltip from "@mui/material/Tooltip";

// import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function App() {
  const element = useRoutes(routerConfig);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (open == true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Tooltip title="Chat">
        <Fab
          onClick={handleClick}
          color="primary"
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            borderRadius: "25px 25px 0 25px",
          }}
        >
          <PhoneInTalkRoundedIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        // keepMounted
        hideBackdrop
        // disableBackdropClick
        // disableEnforceFocus // Let the user focus on elements outside the dialog
        disableScrollLock
        // style={{ position: "initial" }}
        // onClose={handleClose}
      >
        <DialogTitle>Chat Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>leave</Button>
          {/* <Button onClick={handleClick}></Button> */}
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid xs={2}>
          <Nav />
        </Grid>
        <Grid xs>{element}</Grid>
      </Grid>
    </>
  );
}
