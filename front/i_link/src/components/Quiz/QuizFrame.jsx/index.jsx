// 퀴즈 컴포넌트
// 2022.08.13 김국진
import { Box, Typography, IconButton, Tooltip, Avatar } from "@mui/material";
import QuizSolForm from "../QuizSolForm";
import AddTaskIcon from "@mui/icons-material/AddTask";
import RemoveIcon from "@mui/icons-material/Remove";
import { axios, baseURL, urls } from "../../../api/axios";

const QuizFrame = (props) => {
  const { data, getQuizData, getTodayQuiz, state } = props;
  // state : 오늘의 퀴즈/퀴즈 리스트 구분해주는 변수. 1:오늘의 퀴즈  2:퀴즈 리스트. 3:아이가 푼 퀴즈

  // 오늘의 퀴즈 등록
  const todayQuizButtonClicked = () => {
    try {
      const fullURL = urls.fetchQuizTodaySet + data.quiz_no;
      axios.put(fullURL).then((response) => {
        if (response.status === 200) {
          getTodayQuiz();
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 퀴즈 삭제 버튼 클릭 핸들러
  const removeButtonClicked = () => {
    try {
      const fullURL = urls.fetchQuizDelete + data.quiz_no;
      axios.delete(fullURL).then((response) => {
        if (response.status === 200) {
          getQuizData();
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // 퀴즈 프레임 틀
    <Box
      sx={{
        position: "relative",
        boxSizing: "border-box",
        background: "#4ca761",
        width: "90%",
        height: "300px",
        border: "1.5vw solid #cda352",
        padding: "1vw",
      }}
    >
      {/* 퀴즈 문제 틀 */}
      <Box
        sx={{
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {data.quiz_content_url !== null && (
          <Box
            sx={{
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={baseURL + data.quiz_content_url}
              sx={{
                maxWidth: 100,
                maxHeight: 100,
                width: "auto",
                height: "auto",
              }}
              variant="square"
            ></Avatar>
            <Typography id="font_test" variant="h6">
              {data.quiz_content}
            </Typography>
          </Box>
        )}
        {data.quiz_content_url === null && (
          <Box>
            <Typography id="font_test" variant="h6">
              {data.quiz_content}
            </Typography>
          </Box>
        )}
      </Box>

      {/* 퀴즈 정답 틀 */}
      <Box
        sx={{
          height: "40%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* 1번 정답 */}
        <Box
          sx={{
            width: "20%",
            height: "90%",
            background: "#D6FABA",
            border: state === 3 && data.kid_ans === 1 ? "3px solid red" : "",
          }}
        >
          <QuizSolForm solText={data.quiz_sel_1} solUrl={data.quiz_sel_1_url} />
        </Box>
        {/* 2번 정답 */}
        <Box
          sx={{
            width: "20%",
            height: "90%",
            background: "#D6FABA",
            border: state === 3 && data.kid_ans === 2 ? "3px solid red" : "",
          }}
        >
          <QuizSolForm solText={data.quiz_sel_2} solUrl={data.quiz_sel_2_url} />
        </Box>
        {/* 3번 정답 */}
        <Box
          sx={{
            width: "20%",
            height: "90%",
            background: "#D6FABA",
            border: state === 3 && data.kid_ans === 3 ? "3px solid red" : "",
          }}
        >
          <QuizSolForm solText={data.quiz_sel_3} solUrl={data.quiz_sel_3_url} />
        </Box>
        {/* 4번 정답 */}
        <Box
          sx={{
            width: "20%",
            height: "90%",
            background: "#D6FABA",
            border: state === 3 && data.kid_ans === 4 ? "3px solid red" : "",
          }}
        >
          <QuizSolForm solText={data.quiz_sel_4} solUrl={data.quiz_sel_4_url} />
        </Box>
      </Box>

      {state === 2 && (
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tooltip title="오늘의 퀴즈 등록" placement="right-start">
            <IconButton onClick={todayQuizButtonClicked}>
              <AddTaskIcon fontSize="large" color="primary"></AddTaskIcon>
            </IconButton>
          </Tooltip>

          <Tooltip title="퀴즈 삭제" placement="right-start">
            <IconButton onClick={removeButtonClicked}>
              <RemoveIcon fontSize="large" color="primary"></RemoveIcon>
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default QuizFrame;
