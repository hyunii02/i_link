// 2022.07.27 배지우 //
// 2022.07.29 안정현 validation //
// 2022.08.01 안정현 select components //
// 2022.08.03 강민재, 안정현 axios, validation //
// 2022.08.04 김국진 로고 변경, 컴포넌트 사이즈 수정, input box 배경색 하얀색으로 변경 //
// 2022.08.12 김국진 아이디 이메일형식 체크하는지 검사

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { urls, baseURL } from "../../../api/axios";
import { colorPalette } from "../../../constants/constants";

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

// Select components
const BasicSelectCheck = ({ handleSelect }) => {
  const [value, setValue] = useState("3");
  const selectChange = (event) => {
    setValue((value) => event.target.value);
    handleSelect(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={selectChange}
        sx={{ background: "white" }}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="3">부모님</MenuItem>
        <MenuItem value="1">원장님</MenuItem>
        <MenuItem value="2">선생님</MenuItem>
      </Select>
    </FormControl>
  );
};

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  // validation
  const initialValues = {
    type: "3",
    email: "",
    password: "",
    check_password: "",
    username: "",
    phone_number: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [sendImage, setSendImage] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "/images/user.png",
  });

  // 에러메시지
  const validate = () => {
    const errors = {};
    let flag = false;
    if (!formValues.email || formValues.email.indexOf(" ") >= 0) {
      errors.email = "이메일을 입력해주세요.";
      flag = true;
    }
    if (formValues.email.indexOf("@") === -1) {
      errors.email = "아이디 형식이 잘못되었습니다.";
      flag = true;
    }
    if (!formValues.password || formValues.password.indexOf(" ") >= 0) {
      errors.password = "비밀번호를 입력해주세요.";
      flag = true;
    }
    if (formValues.password.length < 6) {
      errors.password = "6자리 이상 입력해주세요.";
      flag = true;
    }
    if (formValues.password !== formValues.check_password) {
      errors.check_password = "비밀번호가 일치하지 않습니다.";
      flag = true;
    }
    if (!formValues.username) {
      errors.username = "이름을 입력해주세요.";
      flag = true;
    }
    if (!formValues.phone_number) {
      errors.phone_number = "전화번호를 입력해주세요.";
      flag = true;
    }
    setFormErrors(errors);
    if (flag) {
      return false;
    }
    return true;
  };
  // 드롭다운 값 변경
  const handleSelect = (val) => {
    setFormValues({ ...formValues, type: val });
  };

  //회원가입 버튼 클릭 시
  const handleSubmit = async (event) => {
    event.preventDefault();
    // 유효성검사 통과 시 axios 실행
    if (validate()) {
      const body = {
        userType: parseInt(formValues.type),
        userEmail: formValues.email,
        userPw: formValues.password,
        userName: formValues.username,
        userPhone: formValues.phone_number,
        userProfile: image.image_file,
      };
      console.log(body);
      // 사진 전송을 위해 헤더에 Multi-part로 type 설정
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      try {
        axios
          .post(baseURL + urls.fetchUsersRegister, body, config)
          .then((response) => {
            console.log("RES: ", response);
            // 응답 성공 시
            if (response.status === 200) {
              navigate("/");
            } else {
              // 응답 실패 시
              console.log("회원 등록 실패");
            }
          });
        /*
        const response = await axios.post(
          baseURL + urls.fetchUsersRegister,
          body,
          config,
        );
        console.log(response);
        if (response.status === 200) {
          navigate("/");
        }
        navigate("/");*/
      } catch (err) {
        const errors = {
          email: "이미 가입된 이메일입니다.",
        };
        setFormErrors(errors);
      }
    }
  };

  //회원가입 form 입력 시
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 로고 이미지 */}
          <Avatar
            sx={{ width: 250, height: 250 }}
            alt="Academy"
            src="/images/logo.png"
          ></Avatar>
          <Typography
            component="h1"
            variant="h5"
            id="font_test"
            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            회원가입
          </Typography>
          {/* 회원가입 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            <Grid container spacing={2}>
              {/* 이미지 업로드 */}
              <Grid item xs={12} sm={12}>
                <Uploader
                  image={image}
                  setImage={setImage}
                  sendImage={sendImage}
                  setSendImage={setSendImage}
                ></Uploader>
              </Grid>
              {/* 부모님, 원장님, 선생님 선택창 */}
              <Grid item xs={12} sm={12}>
                <BasicSelectCheck
                  handleSelect={handleSelect}
                ></BasicSelectCheck>
              </Grid>
              {/* 이메일 입력창*/}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formValues.email}
                  onChange={handleChange}
                  sx={{ background: "white", mt: 2.2 }}
                />
                <p>{formErrors.email}</p>
              </Grid>
              {/* 비밀번호 입력창*/}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.password}</p>
              </Grid>
              {/* 비밀번호 재입력창 */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="check_password"
                  label="비밀번호확인"
                  id="check_password"
                  type="password"
                  autoComplete="check_password"
                  value={formValues.check_password}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.check_password}</p>
              </Grid>
              {/* 이름 입력창 */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="이름"
                  id="username"
                  autoComplete="username"
                  value={formValues.username}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.username}</p>
              </Grid>
              {/* 전화번호 입력창 */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone_number"
                  label="전화번호"
                  id="phone_number"
                  autoComplete="phone_number"
                  value={formValues.phone_number}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.phone_number}</p>
              </Grid>
            </Grid>
            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: colorPalette.BUTTON_COLOR }}
              sx={{ mt: 3, mb: 2 }}
              onChange={handleChange}
            >
              <Typography id="font_test" component="h6" variant="h6">
                회원가입
              </Typography>
            </Button>
            <Grid container justifyContent="flex-end">
              {/* 로그인 페이지로 연결 */}
              <Grid item>
                <Link
                  href="/"
                  variant="body2"
                  id="font_test"
                  style={{ color: "#808080", textDecoration: "none" }}
                >
                  아이디가 있으신가요? 로그인하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
