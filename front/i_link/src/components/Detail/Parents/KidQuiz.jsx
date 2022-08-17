// 아이 퀴즈
import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

import { axios, urls } from "../../../api/axios";
import { useState, useEffect } from "react";
import QuizFrame from "../../Quiz/QuizFrame.jsx";

const KidQuiz = ({ kidNo }) => {
  // 퀴즈 리스트 관리
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    getQuizData();
  }, [kidNo]);

  // 퀴즈 리스트 get
  const getQuizData = () => {
    try {
      axios
        .get(urls.fetchQuizKidsDetail + kidNo)
        .then((response) => {
          if (response.status === 200) {
            setQuizList(response.data);
          }
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  };

  const isEmpty = (array) => {
    if (array.length === 0) return false;
    return true;
  };

  return (
    <div
      sx={{
        // background: colorPalette.BACKGROUND_COLOR,
        borderRadius: "20px",
      }}
    >
      <Typography
        id="font_test"
        variant="h5"
        textAlign="center"
        sx={{ mt: "10px", mb: "30px", flexDirection: "column" }}
      >
        🧡 아이가 푼 퀴즈 🧡
      </Typography>
      <Grid container spacing={1}>
        {quizList?.map((list, index) => (
          <Grid item xs={6} key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <QuizFrame data={list} state={3} />
            </Box>
          </Grid>
        ))}
      </Grid>
      {isEmpty(quizList) || (
        <Typography id="font_test" variant="h5" textAlign="center">
          최근 푼 문제가 없어요.
        </Typography>
      )}
    </div>
  );
};

export default KidQuiz;
