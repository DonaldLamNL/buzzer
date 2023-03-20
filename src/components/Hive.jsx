import React from "react";
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import HexGrids, { HexGridItem, HexGridList } from "react-hex-grids";

export default function Hive() {
  const hiveStyle = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f5ffaa",
  };

  const datalist = [{"context":"hello"},{"context":"world"},{"context":"!!"}];
  const listItem = datalist.map(
    (d)=><HexGridItem>{d.context}</HexGridItem>
  );

  const hexagons = GridGenerator.hexagon(5);

  return (
  <div style={hiveStyle}>
    <div style={{overflow:"auto", width:'80%', height: '80%'}}>
        <HexGrid width={1200} height={1000}>
          <Layout size={{ x: 7, y: 7 }}>
            { hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s}/>) }
          </Layout>
        </HexGrid>
    </div>
  </div>
  );
}
