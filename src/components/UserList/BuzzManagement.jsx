import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import BuzzPreview from "./BuzzPreview";
import Cookies from "js-cookie";

export default function BuzzManagement() {
  const [buzzList, setBuzzList] = useState([]);

  const deletedBuzz = (buzzId) => {
    setBuzzList(buzzList.filter((buzz) => buzz.buzzid !== buzzId));
  };

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
