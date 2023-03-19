import React from "react";
import HexGrids, { HexGridItem, HexGridList } from "react-hex-grids";

export default function Hive() {
  const hiveStyle = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#f5ffaa",
  };

  return (
  <div style={hiveStyle}>
    <HexGridList>
        <HexGridItem>{"Hello"}</HexGridItem>
    </HexGridList>
  </div>
  );
}
