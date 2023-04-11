import { Paper, Typography } from "@mui/material";

const ChatBubble = ({ message, sentByMe, timestamp }) => {
  return (
    <Paper
      sx={{
        backgroundColor: sentByMe ? "#9c27b0" : "#2196f3",
        color: "white",
        borderRadius: "15px",
        padding: "10px",
        margin: "10px",
      }}
    >
      <Typography>{message}</Typography>
      <Typography fontSize={12}>{timestamp}</Typography>
    </Paper>
  );
};

export default ChatBubble;
