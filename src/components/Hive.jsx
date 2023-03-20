import React from "react";
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern, Hex } from 'react-hexgrid';
import { TextField } from "@mui/material";
import HexGrids, { HexGridItem, HexGridList } from "react-hex-grids";

export default function Hive() {
  const hiveStyle = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f5ffaa",
    overflow:"auto",
  };

  const datalist = [{"context":"Hello"},{"context":"World"},{"context":"!!"}];
  const listItem = datalist.map(
    (d)=><HexGridItem>{d.context}</HexGridItem>
  );

  var hive = new Hex(); 
  

  const hexagons = GridGenerator.hexagon(3);

  return (
  <div style={hiveStyle}>
    <div className="bottomright" style={{width:'100%', height: '100%'}}>
        <div style={{overflow:"auto"}}>
          <HexGrid>
            <Layout size={{ x: 6, y: 6 }} spacing={1.1}>
              { 
                hexagons.map(
                  (hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s}>
                    <Text>{(i<datalist.length)?datalist[i].context:"Fuck"}</Text>
                  </Hexagon>
                ) 
              }
            </Layout>
          </HexGrid>
          <TextField label={'Put Down Your Honey'} id="fullWidth" color="warning"/>
        </div>
    </div>
  </div>
  );
}
