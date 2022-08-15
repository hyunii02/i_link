import React from "react";
import { useNavigate } from "react-router";
import { Grid, Button } from "@mui/material";
import { axios, urls, baseURL } from "../../../api/axios";
import Square from "./styles";

const QuizKioskChoice = ({ sel, selUrl, quizNo, index }) => {
  const navigate = useNavigate();
  const handleChoice = async () => {
    try {
      const body = {
        quizAns: index + 1,
        kidNo: localStorage.getItem("kidNo"),
        quizNo: quizNo,
      };
      await axios.post(urls.fetchKidsAnswer, body);
      navigate("/kiosk/main");
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
        <Button
          className="content"
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
          {sel}
        </Button>
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
