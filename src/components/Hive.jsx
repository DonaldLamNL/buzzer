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
import { Card, Grid, TextField, CardHeader, Avatar, CardContent, Box } from "@mui/material";
import HexGrids, { HexGridItem, HexGridList } from "react-hex-grids";
import { Image } from "@mui/icons-material";

export default function Hive() {
  const hiveStyle = {
    height: "100vh",
    width: "100%",
  };

  // const [datalist, setList] = useState("");
  // const listItem = datalist.map((d) => <HexGridItem>{d.context}</HexGridItem>);

  const [dumyValue, setDum] = useState("");
  const [value, setValue] = useState("");
  const [showList, setShowList] = useState([]);

  const handleChange = e => {
    console.log(`typed => ${e.target.value}`);
    setValue(e.target.value);
    const temp = datalist.push("context",e.target.value);
    // setList(temp);
    // const listItem = datalist.map((d) => <HexGridItem>{d.context}</HexGridItem>);
  };

  const checkOnShow = (prop)=>{
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

  const datalist = [
    { context: "Hello", uid:"0"},
    { context: "World", uid:"1" },
    { context: "!!", uid:"2" },
    { context: "Fuck", uid:"3" },
    { context: "Fuck", uid:"4" },
    { context: "Fuck", uid:"5" },
    { context: "Fuck", uid:"6" },
    { context: "Fuck", uid:"7" },
    { context: "Fuck", uid:"8" },
    { context: "Fuck", uid:"9" },
    { context: "Fuck", uid:"10" },
    { context: "Fuck", uid:"11" },
    { context: "Fuck", uid:"12" },
    { context: value}
  ];

  // const hexagons = GridGenerator.hexagon(3);

  return (
    <div style={hiveStyle}>
      <Grid container style={{height : "100%"}}>
        <Grid item xs={8} className="bottomright" style={{ height: "100%"}}>
            <Card
              sx={
                {display: "flex",
                width: "90%",
                height: "95%",
                position: "relative",
                margin: "20px auto",
                borderRadius: 6,}
              }

              className="horny_background_color"
            >
              <Grid container>
                {/* <CardHeader title="Hive" sx={{justifyContent:"center", width:"100%", textAlign:"center", fontSize:"3rem"}}/> */}
                <HexGridList>
                  {datalist.map((data, i) => (
                        (data.context != "")?
                        <HexGridItem>
                          {/* <div className="hex-grid__content__inside">
                            {data.context}
                          </div> */}
                          <div className="hex-grid__content__inside" onClick={(e)=>showContent(i)}>
                            {(checkOnShow(i) === false)?<img src="./image/icon.png" style={{width:"90%", height:"auto"}}/>:data.context}
                          </div>
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
            <div style={{ width: "100%", padding:"1rem", alignItems:"end"}}>
            <TextField
                label={"Put Down Your Honey"}
                id="fullWidth"
                color="warning"
                style={
                  {
                    width:"100%",
                    padding:"0rem"
                  }
                }
                value={value} 
                onChange={handleChange}
              />
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
