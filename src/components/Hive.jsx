/*
Component Name: Hive.jsx
Description: The hive page
*/

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  GridGenerator,
  HexUtils,
  Pattern,
  Hex,
} from "react-hexgrid";
import { Card, Grid, TextField, CardHeader, Avatar, CardContent, Box, Typography, CardActions, IconButton, Paper, Button } from "@mui/material";
import HexGrids, { HexGridItem, HexGridList } from "react-hex-grids";
import { Image, ResetTv } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import serverPath from "./../ServerPath";
import Cookies from "js-cookie";
import { json } from "react-router-dom";


/* 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 
'subtitle2', 'body1', 'body2', 'caption', 'button', 
'overline', 'srOnly', 'inherit', "display4", 'display3', 
'display2', 'display1', 'headline', 'title', 'subheading'*/


export default function Hive() {
  const hiveStyle = {
    height: "100vh",
    width: "100%",
  };
  const [userInfo, setInfo] = useState({});
  const inputCellCardRef = useRef(null);
  const [cardHeight, setHeight] = useState(0);
  const [dumyValue, setDum] = useState("");
  const [value, setValue] = useState("");
  const [iconDisplay, setIconDisplay] = useState(null);
  const [showList, setShowList] = useState([]);
  const [datalist, setDataList] = useState([{cellid:0,content:"There are no cell or have bug...",like:69,username:":(",_id:"6434e5f09bfd6db1f747169c"}]);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const getIcon = async (imageName) => {
    if (imageName) {
        fetch(`${serverPath}/users/icon/${imageName}`)
            .then((response) => response.blob())
            .then((image) => {
                setIconDisplay(URL.createObjectURL(image));
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        setIconDisplay(null);
    }
};

  const postCell = async (content) => {
    if(!userInfo.posted){
      const temp = {
        userid: userInfo.userid,
        username: userInfo.username,
        posted: true
      };
      setInfo(temp);
      try {
        const response = await fetch(`${serverPath}/hive/post?content=${content}&userid=${Cookies.get("BuzzerUser")}`, {
          method: "POST",
        });
        const responseData = await response.json();
        if (responseData) {
          getHive();
          getUserInfo()
        }
        setDum(Math.random());
      } catch (err) {
        console.error(err);
      }
    }else{
      alert("You Have Update Hive Today!");
    }
  }

  const likeButton = async (cellid) => {
    try {
      console.log(cellid);
      const response = await fetch(`${serverPath}/hive/like?cellid=${cellid}`, {
        method: "POST",
      });

      const responseData = await response.json();
      console.log(responseData.message);
      if (responseData) {
        getHive();
      }
      setDum(Math.random());
    } catch (err) {
      console.error(err);
    }
  }

  const getHive = async () => {
    try {
      fetch(`${serverPath}/hive/`)
        .then((response) =>
          response.json()
        )
        .then((responseData) => {
          setDataList(responseData)
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const getUserInfo = async () => {
    try {
      fetch(`${serverPath}/hive/user?userid=${Cookies.get("BuzzerUser")}`)
        .then((response) => response.json())
        .then((responseData) => {
          const temp = {
            userid: responseData.userid,
            username: responseData.username,
            posted: responseData.posted
          };
          setInfo(temp);
          console.log(temp);
        })
    } catch(err){
      console.error(err);
    }
  }

  const handleChange = e => {
    setValue(e.target.value);
  };

  const checkOnShow = (prop) => {
    for (let i = 0; i < showList.length; i++) {
      if (prop == showList[i]) return true;
    }
    return false;
  }

  const showContent = (prop) => {
    console.log(prop);
    var temp = showList;
    if (checkOnShow(prop) === true) {
      let index = temp.indexOf(prop);
      delete temp[index];
    } else {
      temp.push(prop);
    }
    setShowList(temp);
    setDum(Math.random());
    console.log(temp);
  };

  const getTopNCells = (n) => {
    const temp = JSON.parse(JSON.stringify(datalist));
    temp.sort((a, b) => b.like - a.like);
    console.log(temp);
    return temp.slice(0, n);
  };

  useEffect(() => {
    getHive();
    getUserInfo();
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useLayoutEffect(() => {
    setHeight(inputCellCardRef.current.offsetHeight);
  }, []);

  return (
    <div style={hiveStyle}>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={8} className="bottomright" sx={{ height: "100%", display: "flex", alignItems: "center" }}>
          <Card
            sx={
              {
                display: "flex",
                width: "100%",
                height: "96%",
                position: "relative",
                borderRadius: 6,
                overflow: "auto",
                margin: "20px auto"
              }
            }

            className="horny_background_color"
          >
            <Grid container sx={{ margin: "20px auto", justifyContent: "center"}}>
              {/* <CardHeader title="Hive" sx={{justifyContent:"center", width:"100%", textAlign:"center", fontSize:"3rem"}}/> */}
              <HexGridList>
                {datalist.map((data, i) => (
                  (data.username != undefined || data.userid != undefined) ?
                    <HexGridItem>
                      <Card className="hex-grid__content__inside" key={i}>
                        {(checkOnShow(i) === false) ? "" : <CardHeader titleTypographyProps={{ variant: 'subtitle2', display: 'flex', alignItems: 'center', justifyContent: 'start' }} title={(data.username != undefined)?data.username:data.userid} onClick={(e) => showContent(i)} />}
                        <CardContent style={{ padding: "0" }} onClick={(e) => showContent(i)} sx={{ width: "100%" }}>
                          {(checkOnShow(i) === false) ? 
                          <img src = "./bee.svg" alt="My Happy SVG" style={{width:"-webkit-fill-available"}}/>
                          :<Typography sx={{ fontSize: "1.5rem", wordWrap: "break-word", lineHeight: "0.95", overflowY: "scroll", maxHeight: "70px"}}>{data.content}</Typography>}
                        </CardContent>
                        {(checkOnShow(i) === false) ? "" : <CardActions>
                          <Typography>{data.like}</Typography>
                          <IconButton aria-label="add to favorites" onClick={(e) => likeButton(data._id)}>
                            <FavoriteIcon />
                          </IconButton>
                        </CardActions>}
                      </Card>
                    </HexGridItem> : ""
                ))}
              </HexGridList>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={4} width={"100%"}>
          <Card
            variant="outlined"
            sx={
              {
                display: "flex",
                width: "90%",
                // height: "95%",
                position: "relative",
                margin: "20px auto",
                borderRadius: 6,
                listStyleType: "none"
              }
            }
            ref={inputCellCardRef}
          >
            <div style={{ width: "100%", padding: "1rem" }}>
              <HexGridItem className="ex">
                <Paper className="hex-grid__content__inside">
                  <CardHeader titleTypographyProps={{ vartgriant: 'h6' }} title={userInfo.username} />
                  <TextField
                    id="fullWidth"
                    style={
                      {
                        width: "80%",
                        padding: "0rem"
                      }
                    }
                    value={value}
                    onChange={handleChange}
                  />
                  <Button variant="contained" sx={{ margin: "10px", alignContent: "end" }} endIcon={<SendIcon />} onClick={(e) => postCell(value)}>post</Button>
                </Paper>
              </HexGridItem>
            </div>
          </Card>
          <Card
            variant="outlined"
            sx={
              {
                display: "flex",
                width: "90%",
                height: windowSize[1]-cardHeight-56,
                position: "relative",
                margin: "20px auto",
                borderRadius: 6,
              }
            }
          >
            <div style={{ width: "100%", height: "100%", overflowY: "scroll" }}>
              <CardHeader titleTypographyProps={{ variant: 'h4', textAlign: "center", paddingTop: "20px" }} title={"Top Cells"} onClick={(e) => showContent(i)} />
              <CardContent>
                <Box
                  sx={{
                    bgcolor: 'background.default',
                    display: 'grid',
                    gap: 2
                  }}
                >
                  {
                    getTopNCells(10).map((data, i) =>
                      (data.content != undefined)?
                      <Paper sx={{ padding: "20px", fontSize: "headline" }}>
                        <Grid container>
                          <Grid item><Typography>{(i + 1) + ". " + ((data.username != undefined)?data.username:data.userid)}</Typography></Grid>
                          <Grid item style={{ flexGrow: "1" }}></Grid>
                          <Grid item xs={3}><Typography sx={{ display: "flex", float: "right" }}><FavoriteIcon />{data.like}</Typography></Grid>
                        </Grid>
                      </Paper>:"There are no cell in Hive!"
                    )
                  }
                </Box>
              </CardContent>
            </div>
          </Card>
          
        </Grid>
      </Grid>
    </div>
  );


}
