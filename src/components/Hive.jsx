import React, { useState }from "react";
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
  const [dumyValue, setDum] = useState("");
  const [value, setValue] = useState("");
  const [showList, setShowList] = useState([]);
  const [datalist, setDataList] = useState([
    { context: "Hello", uid:0, uname:"Chuck-jee Chau", likes:1},
    { context: "World", uid:1, uname:"Tien Chi Chen", likes:"" },
    { context: "!!", uid:2,uname:"Jacky", likes:"" },
    { context: "Fuck", uid:3, uname:"King", likes:"" },
    { context: "Fuck", uid:4,uname:"QQ", likes:"" },
    { context: "Fuck", uid:5, unmae:"QiDouQi", likes:"" },
    { context: "Fuck", uid:6, uname:"SiuOn_9", likes:"" },
    { context: "Fuck", uid:7, uname:"Tao Yufei", likes:"" },
    { context: "Fuck", uid:8, uname:"Henry", likes:"" },
    { context: "Fuck", uid:9, uname:"Lyu_3100", likes:"" },
    { context: "Fuck", uid:10, uname:"TsungYi_Ho", likes:"" },
    { context: "Fuck", uid:11, uname:"Zhen", likes:"" },
    { context: "Fuck", uid:12, uname:"HoFun_g", likes:"" },
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
      setInfo(userInfo.tdhive=true,userInfo.hiveposition = temp.length);
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
    setDum(prop+Math.random());
    console.log(temp);
  };

  const likeContent = (index)=>{
    const temp = JSON.parse(JSON.stringify(datalist));
    temp[index].likes ++;
    setDataList(temp);
    console.log(datalist[index].uname+" has "+datalist[index].likes + "like");
  };

  // const hexagons = GridGenerator.hexagon(3);

  return (
    <div style={hiveStyle}>
      <Grid container style={{height : "100%"}}>
        <Grid item xs={8} className="bottomright" style={{ height: "100%"}}>
            <Card
              sx={
                {
                  display: "flex",
                  width: "90%",
                  height: "95%",
                  position: "relative",
                  margin: "20px auto",
                  borderRadius: 6,
                  overflow: "auto"
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
                            {(checkOnShow(i) === false)?"":<CardHeader titleTypographyProps={{variant:'subtitle2'}} title={data.uname}/>}
                            <CardContent style={{padding:"0"}}  onClick={(e)=>showContent(i)}>
                              {(checkOnShow(i) === false)?<AccountCircleIcon sx={{fontSize:130}}/>:<Typography style={{fontSize:"1.5rem"}}>{data.context}</Typography>} 
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
              height: "95%",
              position: "relative",
              margin: "20px auto",
              borderRadius: 6,}
            }
          >
            <div style={{ width: "100%", padding:"1rem"}}>
            <HexGridItem>
              <Paper className="hex-grid__content__inside">
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
        </Grid>
      </Grid>
    </div>
  );


  // <HexGrid>
  //           <Layout size={{ x: 6, y: 6 }} spacing={1.1}>
  //             <div style={{ overflowX: "scroll", width:"200%"}}>
  //             {hexagons.map((hex, i) => (
  //               <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s}>
  //                 <Text>
  //                   {i < datalist.length ? datalist[i].context : "Fuck"}
  //                 </Text>
  //               </Hexagon>
  //             ))}
  //             </div>
  //           </Layout>
  //         </HexGrid>
  //         <TextField
  //           label={"Put Down Your Honey"}
  //           id="fullWidth"
  //           color="warning"
  //         />
}
