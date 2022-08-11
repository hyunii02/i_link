// 2022.07.27 배지우 //
// 2022.07.29 안정현 validation //
// 2022.08.02 강민재 axios, validation //

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

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

import { urls, baseURL } from "../../../api/axios";
import { colorPalette } from "../../../constants/constants";
import { UserContext } from "../../../context/user";

const theme = createTheme();

export default function Login() {
  // validation
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const {
    setUserName,
    setUserType,
    setUserNo,
    setUserPhone,
    setUserGroup,
    setUserCenter,
    setAccessToken,
    setRefreshToken,
  } = useContext(UserContext);

  // 에러메시지
  const validate = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "이메일을 입력해주세요.";
    }
    if (!formValues.password) {
      errors.password = "비밀번호를 입력해주세요.";
    }
    setFormErrors(errors);
    if (!(errors.email + errors.password)) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 에러가 없으면 로그인 함수 실행
    if (validate()) {
      handleLogin(formValues.email, formValues.password);
    }
  };

  // API서버에 로그인 폼을 전달하는 함수
  const handleLogin = async (email, password) => {
    const body = {
      userEmail: email,
      userPw: password,
    };
    try {
      const response = await axios.post(baseURL + urls.fetchLogin, body);
      const resUserType = response.data.data.user.user_type;
      const resUserName = response.data.data.user.user_name;
      const resUserNo = response.data.data.user.user_no;
      const resAccessToken = response.data.data.token.access_token;
      const resRefreshToken = response.data.data.token.refresh_token;
      const resUserPhone = response.data.data.user.user_phone;
      const resUserCenter = response.data.data.user.center_no;
      const resUserGroup = response.data.data.user.group_no;
      // 로그인 성공 시 유저 정보 세션에 저장
      setUserNo(resUserNo);
      setUserName(resUserName);
      setUserType(resUserType);
      setAccessToken(resAccessToken);
      setRefreshToken(resRefreshToken);
      setUserPhone(resUserPhone);
      setUserCenter(resUserCenter);
      setUserGroup(resUserGroup);

      // 로그인 성공 시 대응되는 페이지로 네비게이트
      if (response.data.message === "로그인 성공") {
        switch (resUserType) {
          case 1:
            navigate("/master/managemember");
            break;
          case 2:
            navigate("/teacher/management");
            break;
          case 3:
            navigate("/parents/home");
            break;
          default:
            console.log("알 수 없는 회원 유형");
            break;
        }
      }
    } catch (err) {
      // 로그인 실패 시
      console.log(err.response.data.message);
      switch (err.response.data.message) {
        case "비밀번호 오류":
          setFormErrors({ password: "잘못된 비밀번호 입니다." });
          break;
        case "아이디 없음":
          setFormErrors({ email: "등록되지 않은 이메일 입니다." });
          break;
        default:
          setFormErrors({ email: "회원 정보를 확인해주세요." });
          break;
      }
    }
  };

  //로그인 form 입력 시
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    //setFormErrors(validate(event.target));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 로고 이미지 */}
          <Typography
            id="font_test"
            component="h6"
            variant="h3"
            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            원과 가정을 잇다
          </Typography>
          <Avatar
            sx={{ width: 380, height: 350 }}
            alt="Academy"
            src="/images/logo.png"
            variant="square"
          ></Avatar>
          {/* 로그인 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                {/* 이메일 입력창 */}
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
                  sx={{ background: "white" }}
                />
                <p>{formErrors.email}</p>
              </Grid>
              {/* 비밀번호 입력창 */}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formValues.password}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.password}</p>
              </Grid>
            </Grid>
            {/* 로그인 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: colorPalette.BUTTON_COLOR }}
              sx={{ mt: 1, mb: 2 }}
              onChange={handleChange}
            >
              <Typography id="font_test" component="h6" variant="h6">
                로그인
              </Typography>
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* 회원가입 페이지로 연결 */}
                <Link
                  href="/user/signup"
                  variant="body2"
                  id="font_test"
                  style={{ color: "#808080", textDecoration: "none" }}
                >
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
