import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import Tooltip from "@mui/material/Tooltip";
import Slide from "@mui/material/Slide";
import { Fab, Button, Dialog, Card } from "@mui/material";
import ChatBox from "./ChatRoom/ChatRoom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Chat">
        <Fab
          onClick={handleClickOpen}
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
        TransitionComponent={Transition}
        hideBackdrop // Disable the backdrop color/image
        disableScrollLock
      >
        <DialogTitle>Chat Room</DialogTitle>
        <DialogContent>
          <ChatBox></ChatBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>leave</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
