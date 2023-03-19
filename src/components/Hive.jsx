import React from 'react'
// import HexGrids, { HexGridItem, HexGridList } from "react-hex-grids"
import { GridGenerator, HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';

export default function Hive() {
    const hiveStyle = {
        height: '100vh',
        width: '100%',
        backgroundColor: '#f5ffaa'
      }
    const hiveText ={
        fontSize: '30%'
    }

    const hexagonSize = { x: 10, y: 10 };
    const data = [{"context":"Hello\n"},{"context":"World!\n"}];

    const moreHexas = GridGenerator.hexagon(3);

    const listItem = moreHexas.map(
        (hex,i) => 
         <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} fill='honey'>
            <Text style={hiveText}>{((i<data.length)?data[i].context:"")}{i}</Text>
         </Hexagon>
    );

    return (
        <div style={hiveStyle}>
            <HexGrid width={1200} height={window.innerHeight} viewBox="-50 -50 100 100">
          {/* Additional small grid, hexagons generated with generator */}
          <Layout size={hexagonSize} origin={{ x: -5, y: 0 }} spacing={1.05}>
            {listItem}
          </Layout>
          <Pattern id='honey' link='./image/Honey.png'/>
          {/* You can define multiple patterns and switch between them with "fill" prop on Hexagon */}
        </HexGrid>
        </div>
    )
}
