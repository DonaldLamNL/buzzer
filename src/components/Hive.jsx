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
import { TextField } from "@mui/material";
import HexGrids, { HexGridItem, HexGridList } from "react-hex-grids";

export default function Hive() {
  const hiveStyle = {
    height: "100vh",
    width: "100%",
    // backgroundColor: "#f5ffaa",
    // overflow:"auto",
  };

  // const [datalist, setList] = useState("");
  // const listItem = datalist.map((d) => <HexGridItem>{d.context}</HexGridItem>);

  const [value, setValue] = useState("");
  const handleChange = e => {
    console.log(`typed => ${e.target.value}`);
    setValue(e.target.value);
    const temp = datalist.push("context",e.target.value);
    // setList(temp);
    // const listItem = datalist.map((d) => <HexGridItem>{d.context}</HexGridItem>);

  };

  const datalist = [
    { context: "Hello" },
    { context: "World" },
    { context: "!!" },
    { context: "Fuck" },
    { context: "Fuck" },
    { context: "Fuck" },
    { context: "Fuck" },
    { context: "Fuck" },
    { context: "Fuck" },
    { context: "Fuck" },
    { context: "Fuck" },
    { context: "Fuck" },
    { context: "Fuck" },
    { context: value}
  ];

  // const hexagons = GridGenerator.hexagon(3);

  return (
    <div style={hiveStyle}>
      <div className="bottomright" style={{ width: "100%", height: "90%", overflow:"scroll"}}>
        <HexGridList>
          {datalist.map((data, i) => (
                (data.context != "")?<HexGridItem>
                  {data.context}
                </HexGridItem>:""
          ))}
        </HexGridList>
      </div>
      <div style={{ width: "100%"}}>
        <TextField
            label={"Put Down Your Honey"}
            id="fullWidth"
            color="warning"
            style={
              {width:"100%",
                // paddingTop:rem"
              }
            }
            value={value} 
            onChange={handleChange}
          />
      </div>
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
