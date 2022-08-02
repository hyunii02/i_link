// 2022.07.27 배지우 //
// 2022.07.29 안정현 validation //
// 2022.08.02 강민재

import React from "react";
import { useState, useEffect } from "react";

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
import { postApiData, urls } from "../../../api/axios";

const theme = createTheme();

export default function Login() {
  // validation
  const initialValues = { id: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // 에러메시지
  const validate = () => {
    const errors = {};
    if (!formValues.id) {
      errors.id = "아이디를 입력해주세요.";
    }
    if (!formValues.password) {
      errors.password = "비밀번호를 입력해주세요.";
    }
    setFormErrors(errors);
    if (!(errors.id + errors.password)) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(true);
    validate();

    // 에러가 없으면 로그인 함수 실행
    handleLogin(formValues.id, formValues.password);
  };

  // API서버에 로그인 폼을 전달하는 함수
  const handleLogin = (id, password) => {
    const request = postApiData(urls.fetchLogin);
    //console.log(request);
  };

  //로그인 form 입력 시
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    //setFormErrors(validate(event.target));
  };

  // 로그인 버튼을 눌렀을때 에러 체크
  useEffect(() => {}, [isSubmit]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 로고 이미지 */}
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt="Academy"
            src="/images/login.png"
          ></Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          {/* 로그인 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                {/* 아이디 입력창 */}
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="아이디"
                  name="id"
                  autoComplete="id"
                  autoFocus
                  value={formValues.id}
                  onChange={handleChange}
                />
                <p>{formErrors.id}</p>
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
                />
                <p>{formErrors.password}</p>
              </Grid>
            </Grid>
            {/* 로그인 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
              onChange={handleChange}
            >
              로그인
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* 회원가입 페이지로 연결 */}
                <Link href="http://localhost:3000/user/signup" variant="body2">
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
