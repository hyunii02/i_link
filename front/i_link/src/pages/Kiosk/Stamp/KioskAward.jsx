import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";
import Square from "./styles";

const KioskStamp = () => {
  const [stampArr, setStampArr] = useState([]);
  const [emptyArr, setEmptyArr] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("kidStamp", Number(localStorage.getItem("kidStamp")));
    let stamp = Number(localStorage.getItem("kidStamp")) + 1;
    stamp = stamp <= 18 ? stamp : 18;
    const stampArr = [...Array(Number(stamp)).keys()];
    const emptyArr = [...Array(18 - stamp).keys()];
    setStampArr(stampArr);
    setEmptyArr(emptyArr);
  }, []);

  const navToMain = () => {
    navigate("/kiosk/main");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        flexGrow: 1,
      }}
      onClick={navToMain}
    >
      <Box
        sx={{
          fontFamily: "NanumGimYuICe",
          fontSize: "10vh",
          textAlign: "center",
          color: "white",
        }}
      >
        칭찬 스티커
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {stampArr.map((stamp) => (
            <Grid item xs={2} key={stamp}>
              <Square>
                <Button
                  className="content"
                  variant="contained"
                  color="success"
                  sx={{
                    backgroundColor: "#D6FABA",
                    borderRadius: "2vh",
                  }}
                >
                  <img
                    className="content"
                    src="/images/heart.png"
                    alt="칭찬도장 이미지"
                  />
                </Button>
              </Square>
            </Grid>
          ))}
          {emptyArr.map((stamp) => (
            <Grid item xs={2} key={stamp}>
              <Square>
                <Button
                  className="content"
                  variant="contained"
                  color="success"
                  sx={{
                    backgroundColor: "#D6FABA",
                    borderRadius: "2vh",
                  }}
                ></Button>
              </Square>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default KioskStamp;
