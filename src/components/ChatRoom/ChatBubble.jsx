import React from "react";
import Paper from "@mui/material";
import Typography from "@mui/material";

const ChatBubble = ({ message, isSentByMe, timestamp }) => {
  const bubbleStyle = {
    backgroundColor: isSentByMe ? "purple" : "blue",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "80%",
    marginBottom: "10px",
    alignSelf: isSentByMe ? "flex-end" : "flex-start",
  };

  return (
    <Paper sx={bubbleStyle}>
      <Typography variant="body1">{message}</Typography>
      <Typography variant="caption" sx={{ textAlign: "right" }}>
        {timestamp}
      </Typography>
    </Paper>
  );
};

export default ChatBubble;
