import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// material-ui
import { Box, Typography } from "@mui/material";

// components
import NewBuzzItem from "../Items/NewBuzzItem";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";

export default function BuzzSearch() {
  const { search } = useParams();
  const [buzzList, setBuzzList] = useState([]);
  const [isCatSearch, setIsCatSearch] = useState(false);

  const searchBuzz = async () => {
    try {
      fetch(
        `${serverPath}/buzzes/search?keywords=${search}&userid=${Cookies.get(
          "BuzzerUser"
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          setBuzzList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    searchBuzz();
    if (search[0] == "*") {
      setIsCatSearch(true);
    }
  }, [search]);

  return (
    <div>
      <h1
        style={{
          height: "40px",
          lineHeight: "40px",
          fontSize: "20px",
          textAlign: "center",
          marginTop: "20px",
        }}
        onClick={() => {
          console.log(buzzList);
        }}
      >
        Search for{" "}
        {search[0] === "*"
          ? `${search.slice(1).charAt(0).toUpperCase()}${search.slice(
              2
            )} Category`
          : ` ${search} buzzes ...`}
      </h1>

      {buzzList.length == 0 ? (
        <Typography variant="h6" align="center" mt={2}>
          No search results found.
        </Typography>
      ) : (
        <>
          {isCatSearch ? (
            <Box>
              {buzzList.map((post) => (
                <NewBuzzItem
                  key={post.buzzid}
                  {...post}
                  content={post.content.replace(
                    new RegExp(`(${search.slice(1)})`, "gi")
                  )}
                />
              ))}
            </Box>
          ) : (
            <Box>
              {buzzList.map((post) => (
                <NewBuzzItem
                  key={post.buzzid}
                  {...post}
                  content={post.content.replace(
                    new RegExp(`(${search})`, "gi"),
                    '<span style="background-color: #FFFF00;">$1</span>'
                  )}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </div>
  );
}
