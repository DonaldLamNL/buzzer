import { Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PubSub from "pubsub-js";
import serverPath from "../../ServerPath";

export default function News() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    fetch(`${serverPath}/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getCategories();
    const token = PubSub.subscribe("newBuzzPosted", () => {
      getCategories();
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Card
        elevation={5}
        sx={{
          width: "80%",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{ lineHeight: "60px", fontSize: "20px", textAlign: "center" }}
        >
          Categories
        </h1>
        {categories
          .sort((a, b) => b.count - a.count) // sort categories by count in descending order
          .map((c) => {
            return (
              <Link
                id={`${c.name}-item`}
                key={c.name}
                to={`/search/*${c.name}`}
                onClick={() => {
                  window.scrollTo({ top: 0 });
                }}
                style={{
                  margin: "5px",
                  fontSize: "20px",
                  lineHeight: "20px",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  color: "inherit",
                }}
                onMouseOver={() => {
                  document.getElementById(
                    `${c.name}-item`
                  ).style.backgroundColor = "#f1f1f1";
                }}
                onMouseOut={() => {
                  document.getElementById(
                    `${c.name}-item`
                  ).style.backgroundColor = "transparent";
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      margin: "0 10px",
                      fontSize: "20px",
                    }}
                  >
                    # {c.name}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      margin: "5px 10px 0 10px",
                      fontSize: "15px",
                      color: "gray",
                    }}
                  >
                    {c.count} buzzes
                  </Box>
                </Box>
              </Link>
            );
          })}
      </Card>
    </Box>
  );
}
