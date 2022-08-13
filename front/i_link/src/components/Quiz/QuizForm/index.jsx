// 퀴즈 컴포넌트
// 2022.08.13 김국진
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import QuizFrame from "../QuizFrame.jsx";
import QuizInsertModal from "../QuizInsertModal/QuizInsertModal.jsx";
import axios from "axios";
import { baseURL, urls } from "../../../api/axios.jsx";
import { UserContext } from "../../../context/user.js";
import { colorPalette } from "../../../constants/constants.js";

const dummy = [
  {
    content: "인사",
    ans1: "안녕하세요",
    ans2: "이랏샤이마세",
    ans3: "니하오",
    ans4: "구텐탁",
  },
  {
    content: "인사",
    ans1: "안녕하세요",
    ans2: "이랏샤이마세",
    ans3: "니하오",
    ans4: "구텐탁",
  },
  {
    content: "인사",
    ans1: "안녕하세요",
    ans2: "이랏샤이마세",
    ans3: "니하오",
    ans4: "구텐탁",
  },
  {
    content: "인사",
    ans1: "안녕하세요",
    ans2: "이랏샤이마세",
    ans3: "니하오",
    ans4: "구텐탁",
  },
  {
    content: "인사",
    ans1: "안녕하세요",
    ans2: "이랏샤이마세",
    ans3: "니하오",
    ans4: "구텐탁",
  },
];

const QuizForm = () => {
  // 모달창 상태관리
  const [open, setOpen] = useState(false);
  // 퀴즈 리스트 관리
  const [quizList, setQuizList] = useState([]);
  // 오늘의 퀴즈 리스트 관리
  const [todayQuizList, setTodayQuizList] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { userGroup, userNo } = useContext(UserContext);

  // 퀴즈 리스트 get
  const getQuizData = () => {
    try {
      const fullURL = baseURL + urls.fetchQuizsList + userNo;
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

  // 오늘의 퀴즈 get
  const getTodayQuiz = () => {
    try {
      const fullURL = baseURL + urls.fetchQuizTodayList + userGroup;
      axios
        .get(fullURL)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setTodayQuizList(response.data);
          }
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuizData();
    getTodayQuiz();
  }, []);
  return (
    <Box>
      <Box
        sx={{
          background: colorPalette.BACKGROUND_COLOR,
          borderRadius: "20px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              id="font_test"
              variant="h4"
              textAlign="center"
              sx={{ mt: "10px", mb: "10px" }}
            >
              오늘의 퀴즈
            </Typography>
          </Grid>
          {isEmpty(todayQuizList) && (
            <Box sx={{ width: "100%", display: "flex" }}>
              <Grid item xs={3}></Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  fontFamily: "NanumGimYuICe",
                  marginBottom: "20px",
                }}
              >
                <QuizFrame
                  data={todayQuizList[0]}
                  getQuizData={getQuizData}
                  getTodayQuiz={getTodayQuiz}
                  state={1}
                />
              </Grid>
              <Grid item xs={3}></Grid>
            </Box>
          )}
        </Grid>
      </Box>
      <Box
        sx={{
          background: colorPalette.BACKGROUND_COLOR,
          borderRadius: "20px",
          mt: "30px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              id="font_test"
              variant="h4"
              textAlign="center"
              sx={{ mt: "10px", mb: "10px" }}
            >
              퀴즈 리스트
            </Typography>
          </Grid>
          {quizList.map((data, index) => (
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontFamily: "NanumGimYuICe",
                marginBottom: "20px",
              }}
              key={index}
            >
              <QuizFrame
                data={data}
                getQuizData={getQuizData}
                getTodayQuiz={getTodayQuiz}
                state={2}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ position: "fixed", bottom: "100px", right: "80px" }}>
        <Tooltip title="퀴즈 출제" placement="top">
          <IconButton onClick={handleOpen}>
            <AddCircleOutlineIcon
              fontSize="large"
              color="primary"
            ></AddCircleOutlineIcon>
          </IconButton>
        </Tooltip>
        <QuizInsertModal
          open={open}
          setOpen={setOpen}
          getQuizData={getQuizData}
        />
      </Box>
    </Box>
  );
};

export default QuizForm;
