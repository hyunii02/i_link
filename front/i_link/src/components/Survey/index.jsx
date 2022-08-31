import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, CssBaseline } from "@mui/material";
import sad from "./sad.png";
import so_so from "./so_so.png";
import smile from "./smile.png";
import happy from "./happy.png";
import { axiosKiosk, urls } from "../../api/axios";
import { getToday } from "../../commonFuction";
import TTSButton from "../TTSButton";

const Survey = () => {
  const navigate = useNavigate();
  const kidName = localStorage.getItem("kidName");
  const handleClick = async (mood) => {
    const body = {
      kidNo: localStorage.getItem("kidNo"),
      surveyResult: mood,
    };
    try {
      await axiosKiosk.post(urls.fetchSurveysRegister, body);
      localStorage.setItem(kidName + "SurveyDay", getToday());
      navigate("/kiosk/quiz");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Grid container spacing={8} sx={{ height: "90vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45vh",
          }}
        >
          <div
            style={{
              fontFamily: "NanumJangMiCe",
              fontSize: "12vh",
              paddingLeft: "1vh",
              color: "white",
            }}
          >
            오늘 친구들과 보낸 '하루' 어땠나요?
            <TTSButton
              source="오늘 친구들과 보낸 하루 어땠나요?"
              fontSize="10vh"
            />
          </div>
        </Grid>

        <Grid item xs={3} sx={{ height: "45vh" }}>
          <Button
            variant="contained"
            color="success"
            sx={{
              width: "100%",
              height: "90%",
              backgroundColor: "#D6FABA",
              borderRadius: "2vh",
            }}
            onClick={() => handleClick("1")}
          >
            <img
              alt="슬퍼요"
              src={sad}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ height: "45vh" }}>
          <Button
            variant="contained"
            color="success"
            sx={{
              width: "100%",
              height: "90%",
              backgroundColor: "#D6FABA",
              borderRadius: "2vh",
            }}
            onClick={() => handleClick("2")}
          >
            <img
              alt="그저그래요"
              src={so_so}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ height: "45vh" }}>
          <Button
            variant="contained"
            color="success"
            sx={{
              width: "100%",
              height: "90%",
              backgroundColor: "#D6FABA",
              borderRadius: "2vh",
            }}
            onClick={() => handleClick("3")}
          >
            <img
              alt="좋아요"
              src={smile}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ height: "45vh" }}>
          <Button
            variant="contained"
            color="success"
            sx={{
              width: "100%",
              height: "90%",
              backgroundColor: "#D6FABA",
              borderRadius: "2vh",
            }}
            onClick={() => handleClick("4")}
          >
            <img
              alt="행복해요"
              src={happy}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Survey;
