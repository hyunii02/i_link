// 아이 퀴즈
import React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

import { urls, baseURL } from "../../../api/axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context/user";
import { colorPalette } from "../../../constants/constants.js";
import QuizFrame from "../../Quiz/QuizFrame.jsx";

const KidQuiz = ({ kidNo }) => {
  // 퀴즈 리스트 관리
  const [quizList, setQuizList] = useState([]);

  const [kid, setKid] = useState(kidNo);
  // 오늘의 퀴즈 리스트 관리
  const [todayQuizList, setTodayQuizList] = useState([]);

  const { userGroup, userNo, firstKid } = useContext(UserContext);

  useEffect(() => {
    getQuizData();
  }, [kidNo]);

  // 퀴즈 리스트 get
  const getQuizData = () => {
    try {
      const fullURL = baseURL + urls.fetchQuizKidsDetail + kidNo;
      axios
        .get(fullURL)
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

  useEffect(() => {
    getQuizData();
  }, []);

  return (
    <Box
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
        {isEmpty(quizList) &&
          quizList.map((list, index) => (
            <Grid item xs={6} key={index}>
              <QuizFrame data={list} state={3} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default KidQuiz;
