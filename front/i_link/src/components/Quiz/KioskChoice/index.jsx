import React from "react";
import { useNavigate } from "react-router";
import { Grid, Button, Box } from "@mui/material";
import { axios, urls, baseURL } from "../../../api/axios";
import Square from "./styles";
import TTSButton from "../../TTSButton";

const QuizKioskChoice = ({ sel, selUrl, quizNo, index }) => {
  const navigate = useNavigate();
  const handleChoice = async () => {
    try {
      const body = {
        quizAns: index + 1,
        kidNo: localStorage.getItem("kidNo"),
        quizNo: quizNo,
      };
      axios.post(urls.fetchKidsAnswer, body);
      navigate("/kiosk/stamp");
    } catch (err) {
      console.log(err);
    }
  };

  let choice;
  if (selUrl) {
    choice = (
      <Square>
        <Button
          className="content"
          variant="contained"
          color="success"
          sx={{
            backgroundColor: "#D6FABA",
            borderRadius: "2vh",
          }}
          onClick={handleChoice}
        >
          <img
            alt="선택지"
            style={{
              height: "90%",
              width: "90%",
              objectFit: "contain",
            }}
            src={baseURL + selUrl}
          />
        </Button>
      </Square>
    );
  } else {
    choice = (
      <Square>
        <Box
          className="content"
          sx={{
            backgroundColor: "#D6FABA",
            borderRadius: "2vh",
          }}
        >
          <TTSButton
            className="content"
            source={sel}
            fontSize="12vh"
            color="black"
          />

          <Button
            variant="contained"
            color="success"
            sx={{
              backgroundColor: "#D6FABA",
              borderRadius: "2vh",
              fontFamily: "NanumGimYuICe",
              fontSize: "12vh",
              color: "black",
            }}
            onClick={handleChoice}
          >
            <div>{sel}</div>
          </Button>
        </Box>
      </Square>
    );
  }
  return (
    <Grid item xs={3} sx={{ textAlign: "center" }}>
      {choice}
    </Grid>
  );
};

export default QuizKioskChoice;
