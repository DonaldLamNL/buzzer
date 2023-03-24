import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

export default function NavItem(props) {
  const navigate = useNavigate();
  const { name, path, hovering, component: Component } = props;

  return (
    <>
      {hovering ? (
        <Button
          variant="text"
          sx={{ color: "#ffffff" }}
          // startIcon={<Component />}
          onClick={() => {
            navigate(`../${path}`);
          }}
        >
          {/* <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item> */}

          <Typography
            fontSize={40}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Component sx={{ fontSize: 40, color: "#ffffff", mr: 0.5 }} />
            {name}
          </Typography>
          {/* </Grid>
            <Grid item>
              <Typography>{name}</Typography>
            </Grid>
          </Grid> */}
        </Button>
      ) : (
        <IconButton
          size="large"
          onClick={() => {
            navigate(`../${path}`);
          }}
        >
          <Component sx={{ fontSize: 42, color: "#ffffff" }} />
        </IconButton>
      )}
    </>
  );
}
