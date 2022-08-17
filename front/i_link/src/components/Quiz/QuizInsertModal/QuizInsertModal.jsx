import { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Modal,
  TextField,
  Avatar,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { baseURL, axios, urls } from "../../../api/axios";
import { UserContext } from "../../../context/user";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const defaultState = {
  questionText: "",
  answerText1: "",
  answerText2: "",
  answerText3: "",
  answerText4: "",
};

//이미지 업로드
const Uploader = ({ image, setImage }) => {
  let inputRef; //이미지 미리보기를 위해서 Ref를 사용

  //이미지 저장
  const saveImage = (event) => {
    //event.preventDefault();

    // 이미지를 가져 올 시
    if (event.target.files[0]) {
      //setSendImage((sendImage) => event.target.files[0]);
      // 새로운 이미지를 올리면 createObjectURL()을 통해 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(event.target.files[0]);
      setImage(() => ({
        image_file: event.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* 이미지 삽입 */}
      <input
        id="kidprofileurl"
        type="file"
        accept="image/*"
        onChange={saveImage}
        onClick={(event) => (event.target.value = null)} // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      {/* 이미지 창 */}
      <Button onClick={() => inputRef.click()} style={{ cursor: "pointer" }}>
        사진첨부
      </Button>
    </Box>
  );
};
const defaultImageState = {
  image_file: "",
  preview_URL: "",
};

const QuizInsertModal = ({ open, setOpen, getQuizData }) => {
  // 폼 입력 상태
  const [formValues, setFormValues] = useState(defaultState);
  // 사진
  const [questionImage, setQuestionImage] = useState(defaultImageState);
  const [answerImage1, setAnswerImage1] = useState(defaultImageState);
  const [answerImage2, setAnswerImage2] = useState(defaultImageState);
  const [answerImage3, setAnswerImage3] = useState(defaultImageState);
  const [answerImage4, setAnswerImage4] = useState(defaultImageState);
  // 체크박스 입력 상태
  const [checkValue, setCheckValue] = useState("");

  const { userNo, userGroup } = useContext(UserContext);

  // 에러메세지
  let errorMsg = "";

  //회원가입 form 입력 시
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCheckValue("");
  };

  // 입력상태 Clear
  const inputClear = () => {
    setFormValues(defaultState);
    setQuestionImage(defaultImageState);
    setAnswerImage1(defaultImageState);
    setAnswerImage2(defaultImageState);
    setAnswerImage3(defaultImageState);
    setAnswerImage4(defaultImageState);
  };

  // 입력상태 유효성 체크
  const validate = () => {
    errorMsg = "";
    // 문제가 입력되었는지
    if (formValues.questionText.length === 0) {
      errorMsg = "문제를 입력하세요.";
      return errorMsg;
    }

    // 정답 체크박스를 체크했는지
    if (checkValue === "") {
      errorMsg = "정답을 체크하세요.";
    }
    // 둘중에 하나만 입력 가능하게
    if (
      formValues.answerText1.length !== 0 &&
      answerImage1.image_file.length !== 0
    ) {
      errorMsg = "답을 한 종류만 입력 해 주세요.";
    } else if (
      formValues.answerText2.length !== 0 &&
      answerImage2.image_file.length !== 0
    ) {
      errorMsg = "답을 한 종류만 입력 해 주세요.";
    } else if (
      formValues.answerText3.length !== 0 &&
      answerImage3.image_file.length !== 0
    ) {
      errorMsg = "답을 한 종류만 입력 해 주세요.";
    } else if (
      formValues.answerText4.length !== 0 &&
      answerImage4.image_file.length !== 0
    ) {
      errorMsg = "답을 한 종류만 입력 해 주세요.";
    }

    // 둘중에 하나만 입력 가능하게
    if (
      formValues.answerText1.length === 0 &&
      answerImage1.image_file.length === 0
    ) {
      errorMsg = "1번 문항 답을 입력 해 주세요.";
    } else if (
      formValues.answerText2.length === 0 &&
      answerImage2.image_file.length === 0
    ) {
      errorMsg = "2번 문항 답을 입력 해 주세요.";
    } else if (
      formValues.answerText3.length === 0 &&
      answerImage3.image_file.length === 0
    ) {
      errorMsg = "3번 문항 답을 입력 해 주세요.";
    } else if (
      formValues.answerText4.length === 0 &&
      answerImage4.image_file.length === 0
    ) {
      errorMsg = "4번 문항 답을 입력 해 주세요.";
    }
    return errorMsg;
  };

  const quizInsertButtonClicked = () => {
    // 유효성 검사 실행
    const error = validate();
    if (error.length !== 0) {
      alert(error);
      return;
    }

    try {
      const body = {
        quizWriter: userNo,
        groupNo: userGroup,
        quizContent: formValues.questionText,
        quizContentUrl: questionImage.image_file,
        quizSel1: formValues.answerText1,
        quizSel1Url: answerImage1.image_file,
        quizSel2: formValues.answerText2,
        quizSel2Url: answerImage2.image_file,
        quizSel3: formValues.answerText3,
        quizSel3Url: answerImage3.image_file,
        quizSel4: formValues.answerText4,
        quizSel4Url: answerImage4.image_file,
        quizDate: "",
      };

      // 사진 전송을 위해 헤더에 Multi-part로 type 설정
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      axios
        .post(urls.featchQuizRegister, body, config)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            handleClose();
            getQuizData();
            inputClear();
          }
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                id="font_test"
                variant="h4"
                component="h2"
                textAlign="center"
              >
                퀴즈 출제
              </Typography>
            </Grid>

            {/* 질문 Part Start */}
            <Grid item xs={12}>
              <Typography id="font_test" variant="h6" sx={{ mt: "20px" }}>
                질문
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="questionText"
                size="small"
                autoFocus
                value={formValues.questionText}
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={3}>
              <Uploader
                image={questionImage}
                setImage={setQuestionImage}
                checkValue={checkValue}
                setCheckValue={setCheckValue}
              />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography id="font_test">
                {questionImage.image_file.name}
              </Typography>
            </Grid>
            {/* 질문 Part End */}

            {/* 정답1 Part Start */}
            <Grid item xs={12} sx={{ mt: "20px", display: "flex" }}>
              <Typography id="font_test" variant="h6">
                정답1
              </Typography>
              <Checkbox
                {...label}
                checked={checkValue === "1"}
                value={1}
                sx={{ bottom: "5px" }}
                onClick={(e) => {
                  setCheckValue(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="answerText1"
                size="small"
                autoFocus
                value={formValues.answerText1}
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={3}>
              <Uploader image={answerImage1} setImage={setAnswerImage1} />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography id="font_test">
                {answerImage1.image_file.name}
              </Typography>
            </Grid>
            {/* 정답1 Part End */}
            {/* 정답2 Part Start */}
            <Grid item xs={12} sx={{ mt: "20px", display: "flex" }}>
              <Typography id="font_test" variant="h6">
                정답2
              </Typography>
              <Checkbox
                {...label}
                checked={checkValue === "2"}
                value={2}
                sx={{ bottom: "5px" }}
                onClick={(e) => {
                  setCheckValue(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="answerText2"
                size="small"
                autoFocus
                value={formValues.answerText2}
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={3}>
              <Uploader image={answerImage2} setImage={setAnswerImage2} />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography id="font_test">
                {answerImage2.image_file.name}
              </Typography>
            </Grid>
            {/* 정답2 Part End */}
            {/* 정답3 Part Start */}
            <Grid item xs={12} sx={{ mt: "20px", display: "flex" }}>
              <Typography id="font_test" variant="h6">
                정답3
              </Typography>
              <Checkbox
                {...label}
                checked={checkValue === "3"}
                value={3}
                sx={{ bottom: "5px" }}
                onClick={(e) => {
                  setCheckValue(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="answerText3"
                size="small"
                autoFocus
                value={formValues.answerText3}
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={3}>
              <Uploader image={answerImage3} setImage={setAnswerImage3} />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography id="font_test">
                {answerImage3.image_file.name}
              </Typography>
            </Grid>
            {/* 정답3 Part End */}
            {/* 정답4 Part Start */}
            <Grid item xs={12} sx={{ mt: "20px", display: "flex" }}>
              <Typography id="font_test" variant="h6">
                정답4
              </Typography>
              <Checkbox
                {...label}
                checked={checkValue === "4"}
                value={4}
                sx={{ bottom: "5px" }}
                onClick={(e) => {
                  setCheckValue(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="answerText4"
                size="small"
                autoFocus
                value={formValues.answerText4}
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>
            <Grid item xs={3}>
              <Uploader image={answerImage4} setImage={setAnswerImage4} />
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography id="font_test">
                {answerImage4.image_file.name}
              </Typography>
            </Grid>
            {/* 정답4 Part End */}
          </Grid>
          <Grid item xs={12} textAlign="right" sx={{ marginTop: "20px" }}>
            <Button variant="outlined" onClick={inputClear}>
              CLEAR
            </Button>
            <Button
              variant="contained"
              sx={{ ml: "10px" }}
              onClick={quizInsertButtonClicked}
            >
              퀴즈등록
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default QuizInsertModal;
