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
            path && navigate(`../${path}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
            fontSize={23}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Component sx={{ fontSize: 50, color: "#ffffff" }} />
            {name}
          </Typography>
          {/* </Grid>
            <Grid item>
              <Typography>{name}</Typography>
            </Grid>
          </Grid> */}
        </Button>
      ) : (
        <Button
          // size="large"
          variant="text"
          onClick={() => {
            navigate(`../${path}`);
          }}
        >
          <Component sx={{ fontSize: 50, color: "#ffffff" }} />
        </Button>
      )}
    </>
  );
}
