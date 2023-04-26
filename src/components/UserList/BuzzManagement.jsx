/*
Component Name: BuzzManagement.jsx
Description: The container for the admin buzz management interface.
*/

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import BuzzPreview from "./BuzzPreview";
import Cookies from "js-cookie";
import serverPath from "../../ServerPath";

export default function BuzzManagement() {
  const [buzzList, setBuzzList] = useState([]);

  // Render the component after a buzz is deleted in BuzzPreview.
  const deletedBuzz = (buzzId) => {
    setBuzzList(buzzList.filter((buzz) => buzz.buzzid !== buzzId));
  };

  // Get the buzz list from server
  const getBuzzList = async () => {
    try {
      fetch(
        `${serverPath}/buzzes/search?keywords=${""}&userid=${Cookies.get(
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
    getBuzzList();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        {buzzList.map((c) => {
          return (
            <BuzzPreview
              key={c.buzzid}
              {...c}
              deletedBuzz={deletedBuzz}
              isDelete={true}
            />
          );
        })}
      </Box>
    </Box>
  );
}
