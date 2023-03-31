import React, { useLayoutEffect, useRef, useState, useEffect}from "react";
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
import { Image} from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from'@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


/* 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 
'subtitle2', 'body1', 'body2', 'caption', 'button', 
'overline', 'srOnly', 'inherit', "display4", 'display3', 
'display2', 'display1', 'headline', 'title', 'subheading'*/


export default function Hive() {
  const hiveStyle = {
    height: "100vh",
    width: "100%",
  };

  // const [datalist, setList] = useState("");
  // const listItem = datalist.map((d) => <HexGridItem>{d.context}</HexGridItem>);

  const [userInfo, setInfo] = useState({
    uid:13,
    uname:"HopeSave",
    tdhive:false,
    hiveposition:""
  });


  const inputCellCardRef = useRef(null);
  const [cardWidth, setWidth] = useState(0);
  const [cardHeight, setHeight] = useState(0);
  const [dumyValue, setDum] = useState("");
  const [value, setValue] = useState("");
  const [showList, setShowList] = useState([]);
  const [datalist, setDataList] = useState([
    { context: "Hello", uid:0, uname:"Chuck-jee Chau", likes:1},
    { context: "World", uid:1, uname:"Tien Chi Chen", likes:0 },
    { context: "!!", uid:2,uname:"Jacky", likes:0 },
    { context: "Fuck", uid:3, uname:"King", likes:0 },
    { context: "Fuck", uid:4,uname:"QQ", likes:0 },
    { context: "Fuck", uid:5, unmae:"QiDouQi", likes:0 },
    { context: "Fuck", uid:6, uname:"SiuOn_9", likes:0 },
    { context: "Fuck", uid:7, uname:"Tao Yufei", likes:0 },
    { context: "Fuck", uid:8, uname:"Henry", likes:0 },
    { context: "Fuck", uid:9, uname:"Lyu_3100", likes:0 },
    { context: "Fuck", uid:10, uname:"TsungYi_Ho", likes:0 },
    { context: "Fuck", uid:11, uname:"Zhen", likes:0 },
    { context: "Fuck", uid:12, uname:"HoFun_g", likes:0 },
  ]);
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const handleChange = e => {
    console.log(`typed => ${e.target.value}`);
    setValue(e.target.value);
    // setList(temp);
    // const listItem = datalist.map((d) => <HexGridItem>{d.context}</HexGridItem>);
  };

  const postHive = (value) => {
    const temp = JSON.parse(JSON.stringify(datalist));
    // console.log(userInfo);
    console.log(temp);
    console.log(userInfo.tdhive === null);
    if(userInfo.tdhive === false){
      temp.push({
        context:value,
        uid:userInfo.uid,
        uname:userInfo.uname,
        likes: ""
      });
      setInfo({uid:userInfo.uid,
              uname:userInfo.uname,
              tdhive:true,
              hivepositio: temp.length});
    }else{
      // temp[userInfo.hiveposition].context = value;
    }
    console.log(userInfo);
    setDataList(temp);
  }

  const checkOnShow = (prop)=>{
    // console.log("new return");
    for(let i = 0; i < showList.length; i++){
      if(prop == showList[i])return true;
    }
    return false;
  }

  const showContent = (prop) =>{
    console.log(prop);
    var temp = showList;
    if(checkOnShow(prop) === true){
      let index = temp.indexOf(prop);
      delete temp[index];
    }else{
      temp.push(prop);
    }
    setShowList(temp);
    setDum(Math.random());
    console.log(temp);
  };

  const likeContent = (index)=>{
    const temp = JSON.parse(JSON.stringify(datalist));
    temp[index].likes ++;
    setDataList(temp);
    console.log(datalist[index].uname+" has "+datalist[index].likes + "like");
  };

  const getTopNCells = (n)=>{
    const temp = JSON.parse(JSON.stringify(datalist));
    temp.sort((a,b) => b.likes - a.likes);
    console.log(temp);
    return temp.slice(0,n);
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  useLayoutEffect(() => {
    setWidth(inputCellCardRef.current.offsetWidth);
    setHeight(inputCellCardRef.current.offsetHeight);
  }, []);

  return (
    <div style={hiveStyle}>
      <Grid container style={{height : "100%"}}>
        <Grid item xs={8} className="bottomright" sx={{ height: "100%", display: "flex", alignItems:"center"}}>
            <Card
              sx={
                {
                  display: "flex",
                  width: "100%",
                  height: "96%",
                  position: "relative",
                  borderRadius: 6,
                  overflow: "auto",
                  margin:"20px auto"
                }
              }

              className="horny_background_color"
            >
              <Grid container sx={{margin: "20px auto"}}>
                {/* <CardHeader title="Hive" sx={{justifyContent:"center", width:"100%", textAlign:"center", fontSize:"3rem"}}/> */}
                <HexGridList>
                  {datalist.map((data, i) => (
                        (data.context != "")?
                        <HexGridItem>
                          <Card className="hex-grid__content__inside" key={i}>
                            {(checkOnShow(i) === false)?"":<CardHeader titleTypographyProps={{variant:'subtitle2',display:'flex',alignItems:'center',justifyContent:'start'}} title={data.uname} onClick={(e)=>showContent(i)}/>}
                            <CardContent style={{padding:"0"}}  onClick={(e)=>showContent(i)} sx={{width:"100%"}}>
                              {(checkOnShow(i) === false)?<AccountCircleIcon sx={{fontSize:130}}/>:<Typography sx={{fontSize:"1.5rem", wordWrap: "break-word", lineHeight: "0.95", overflowY: "scroll"}}>{data.context}</Typography>} 
                            </CardContent>
                            {(checkOnShow(i) === false)?"":<CardActions>
                              <Typography>{data.likes}</Typography>
                              <IconButton aria-label="add to favorites" onClick={(e)=>likeContent(i)}>
                                <FavoriteIcon/>
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
              {display: "flex",
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
            <div style={{ width: "100%", padding:"1rem"}}>
            <HexGridItem>
              <Paper className="hex-grid__content__inside">
                <CardHeader titleTypographyProps={{vartgriant:'h6'}}  title={userInfo.uname}/>
                <TextField
                    id="fullWidth"
                    style={
                      {
                        width:"80%",
                        padding:"0rem"
                      }
                    }
                    value={value} 
                    onChange={handleChange}
                  />
                <Button variant="contained" sx={{margin:"10px", alignContent:"end"}} endIcon={<SendIcon />} onClick={(e) => postHive(value)}>post</Button>
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
                alignItems:'center',
                margin: "20px auto",
                borderRadius: 6,
                bottom:0
              }
            }
          >
            <div style={{width:"100%", height:"100%", overflowY:"scroll"}}>
              <CardHeader titleTypographyProps={{variant:'h4', textAlign:"center",paddingTop:"20px"}} title={"Top Cells"} onClick={(e)=>showContent(i)}/>
                <CardContent>
                  <Box
                    sx={{
                      bgcolor: 'background.default',
                      display: 'grid',
                      gap: 2
                    }}
                  >
                    {
                      getTopNCells(10).map((data,i)=>
                        <Paper sx={{padding:"20px", fontSize:"headline"}}>
                          <Grid container>
                            <Grid item><Typography>{(i+1)+". "+data.context}</Typography></Grid>
                            <Grid item style={{flexGrow: "1"}}></Grid>
                            <Grid item xs={3}><Typography sx={{display:"flex", float:"right"}}><FavoriteIcon/>{data.likes}</Typography></Grid>
                          </Grid>
                        </Paper>        
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
