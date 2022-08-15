// 2022.08.02 안정현 기본 페이지 구성 //
// 2022.08.04 ~ 08.05 안정현 디자인, 이미지 업로드 기능 수정 및 추가//
// 2022.08.09 안정현 axios //

import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getToday } from "../../../commonFuction";

import { urls, baseURL } from "../../../api/axios";
import axios from "axios";
import { UserContext } from "../../../context/user";
import { colorPalette } from "../../../constants/constants";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

//이미지 업로드
const Uploader = ({ image, setImage, sendImage, setSendImage }) => {
  let inputRef; //이미지 미리보기를 위해서 Ref를 사용

  //이미지 저장
  const saveImage = (event) => {
    //event.preventDefault();

    // 이미지를 가져 올 시
    if (event.target.files[0]) {
      setSendImage((sendImage) => event.target.files[0]);
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
      <Avatar
        onClick={() => inputRef.click()}
        alt="kids_picture"
        src={image.preview_URL}
        sx={{
          width: 200,
          height: 200,
          "&:hover": {
            backgroundColor: "#FFFEF4",
          },
        }}
        style={{ cursor: "pointer" }}
      ></Avatar>
    </Box>
  );
};

// 남여 성별 체크 버튼
const ColorToggleButton = ({ gender, setGender }) => {
  const handleChange = (event, newAlignment) => {
    setGender(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="warning"
      id="kidgender"
      name="kidgender"
      value={gender}
      exclusive
      onChange={handleChange}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      fullWidth
      sx={{ background: "white" }}
    >
      <ToggleButton value="M" id="font_test">
        <Typography id="font_test" component="h6" variant="h6">
          남자
        </Typography>
      </ToggleButton>
      <ToggleButton value="F" id="font_test">
        <Typography id="font_test" component="h6" variant="h6">
          여자
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const theme = createTheme();

export default function ParentsKids() {
  const navigate = useNavigate();
  const { userNo } = useContext(UserContext);
  // validation
  const initialValues = {
    kidname: "",
    date: getToday(),
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [gender, setGender] = useState("M");
  const [error, setError] = useState("");
  const [sendImage, setSendImage] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "/images/user.png",
  });

  // 에러메시지(아이 이름 미입력시)
  const validate = () => {
    const errors = {};
    if (!formValues.kidname) {
      alert("아이의 이름을 입력해주세요.");
      return false;
    }
    if (formValues.kidname.length >= 10) {
      alert("아이의 이름은 10글자를 넘길 수 없습니다.");
      return false;
    }
    return true;
  };

  // 아이 등록 버튼 클릭 시
  const handleSubmit = (event) => {
    event.preventDefault();
    // 유효성 검사 통과 시 axios 실행
    if (validate()) {
      // 서버에 요청보낼 Body
      const body = {
        kidName: formValues.kidname,
        kidBirth: formValues.date,
        kidGender: gender,
        kidProfile: image.image_file,
        userNo: userNo,
      };
      // 사진 전송을 위해 헤더에 Multi-part로 type 설정
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      try {
        axios
          .post(baseURL + urls.fetchKidsRegister, body, config)
          .then((response) => {
            // 응답 성공 시
            if (response.status === 200) {
              navigate("/parents/joincenter", {
                state: { kid_no: response.data.kid_no },
              });
            } else {
              // 응답 실패 시
              console.log("아이 등록 실패");
            }
          });
      } catch (err) {}
    }
  };

  //아이 등록 form 입력 시
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 아이등록 title */}
          <Typography id="font_test" component="h1" variant="h4">
            아이등록
          </Typography>
          <Typography
            id="font_test"
            component="h1"
            variant="body2"
            color="rgba(0, 0, 0, 0.4)"
          >
            유치원의 가입승인 후, 이용할 수 있습니다.
          </Typography>
          {/* 아이등록 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleChange}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              {/* 이미지 업로드 */}
              <Grid item xs={12} sm={12}>
                <Uploader
                  image={image}
                  setImage={setImage}
                  sendImage={sendImage}
                  setSendImage={setSendImage}
                ></Uploader>
              </Grid>
              {/* 아이 이름 입력창 */}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="kidname"
                  label="아이 이름"
                  name="kidname"
                  autoComplete="kidname"
                  autoFocus
                  value={formValues.kidname}
                  onChange={handleChange}
                  sx={{ background: "white", mt: 4 }}
                />
              </Grid>
              {/* 아이 생년월일 입력창 */}
              <Grid item xs={12} sm={12}>
                <p id="font_test" align="center">
                  아이의 생년월일을 입력해주세요
                </p>
                <TextField
                  required
                  fullWidth
                  id="date"
                  label=""
                  autoComplete="date"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  autoFocus
                  type="date"
                  sx={{ background: "white" }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <p id="font_test" align="center">
                  아이의 성별을 선택해주세요
                </p>
                {/* 남/여 성별 체크버튼 */}
                <ColorToggleButton gender={gender} setGender={setGender} />
              </Grid>
              {/* 유치원 등록 만들어야함! */}
              {/* 아이등록 버튼 */}
              <Grid item xs={12} sm={12}>
                <Button
                  id="font_test"
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ background: colorPalette.BUTTON_COLOR }}
                  sx={{ mt: 3, mb: 5 }}
                  onChange={handleChange}
                  size="large"
                >
                  <Typography id="font_test" component="h6" variant="h6">
                    아이등록
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
