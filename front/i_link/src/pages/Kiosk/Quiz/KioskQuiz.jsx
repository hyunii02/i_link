import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/material";
import { axios, urls } from "../../../api/axios";

import QuizKioskQuestion from "../../../components/Quiz/KioskQuestion";
import QuizKioskChoices from "../../../components/Quiz/KioskChoices";

const KioskQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    quizNo: "",
    title: "",
    sel1: "",
    sel2: "",
    sel3: "",
    sel4: "",
    titleUrl: "",
    sel1Url: "",
    sel2Url: "",
    sel3Url: "",
    sel4Url: "",
  });

  useEffect(() => {
    const kidGroup = localStorage.getItem("kidGroup");
    const getQuiz = async () => {
      try {
        const response = await axios.get(urls.fetchQuizTodayList + kidGroup);
        // 오늘의 퀴즈가 없다면 메인으로 보냄
        if (Array.isArray(response.data) && response.data.length === 0) {
          navigate("/kiosk/main");
        }
        const quizData = {
          quizNo: response.data[0].quiz_no,
          title: response.data[0].quiz_content,
          sel1: response.data[0].quiz_sel_1,
          sel2: response.data[0].quiz_sel_2,
          sel3: response.data[0].quiz_sel_3,
          sel4: response.data[0].quiz_sel_4,
          titleUrl: response.data[0].quiz_content_url,
          sel1Url: response.data[0].quiz_sel_1_url,
          sel2Url: response.data[0].quiz_sel_2_url,
          sel3Url: response.data[0].quiz_sel_3_url,
          sel4Url: response.data[0].quiz_sel_4_url,
        };
        setQuiz(quizData);
      } catch (err) {
        navigate("/kiosk/main");
      }
    };
    getQuiz();
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        flexGrow: 1,
      }}
    >
      <Box sx={{ flexGrow: 1, display: "flex", height: "60%" }}>
        <QuizKioskQuestion quizTitle={quiz.title} quizUrl={quiz.titleUrl} />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", height: "40%" }}>
        <QuizKioskChoices quiz={quiz} />
      </Box>
    </Box>
  );
};

export default KioskQuiz;
