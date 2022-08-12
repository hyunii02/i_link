// 2022.07.27 배지우 //
// 2022.08.01 안정현 validation //
// 2022.08.05 안정현 디자인 수정 //
// 2022.08.11 안정현 axios //

import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { urls, baseURL } from "../../../api/axios";
import { colorPalette } from "../../../constants/constants";
import { UserContext } from "../../../context/user"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function Update() {
  const navigate = useNavigate();
  const {
    setUserNo,
    setUserName,
    setUserType,
    setUserPhone,
    setUserCenter,
    setUserGroup,
    setAccessToken,
    setRefreshToken,
    userNo,
  } = useContext(UserContext);
  
  // validation
  const initialValues = {
    email: '',
    password: '',
    new_password: '',
    new_check_password: '',
    new_username: '',
    new_phone_number: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  // 에러메시지
  const validate = () => {
    const errors = {};
    let flag = false;
    if (!formValues.password) {
      errors.password = "비밀번호를 입력해주세요.";
      flag = true;
    }
    if (!formValues.new_password || formValues.new_password.indexOf(" ")>= 0) {
      errors.new_password = "새로운 비밀번호를 입력해주세요.";
      flag = true;
    }
    if (formValues.new_password.length < 6) {
      errors.new_password = "6자리 이상 입력해주세요.";
      flag = true;
    }
    if (formValues.new_password !== formValues.new_check_password) {
      errors.new_check_password = "비밀번호가 일치하지 않습니다.";
      flag = true;
    }
    if (!formValues.new_username) {
      errors.new_username = "이름을 입력해주세요.";
      flag = true;
    }
    if (!formValues.new_phone_number) {
      errors.new_phone_number = "전화번호를 입력해주세요.";
      flag = true;
    }
    setFormErrors(errors);
    if (flag) {
      return false;
    }
    return true;
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    // 유효성검사 통과 시 axios 실행
    if (validate()) {
      const body = {
        userNo: parseInt(userNo),
        userName: formValues.new_username,
        currentPw: formValues.password,
        userPw: formValues.new_password,
        userPhone: formValues.new_phone_number,
        userProfile: null,
        // userEmail: formValues.email,
      };
      try {
        const response = await axios.put(
          baseURL + urls.fetchUsersUpdate + userNo,
          body
        );
        setUserNo("");
        setUserName("");
        setUserType("");
        setUserPhone("");
        setUserCenter("");
        setUserGroup("");
        setAccessToken("");
        setRefreshToken("");
        navigate("/"); //회원정보 수정 시 다시 로그인페이지로 이동
      } catch (err) {
        const errors = {
          password: "비밀번호가 일치하지 않습니다.",
        };
        setFormErrors(errors);
      }
    }
  };

  // 회원정보 수정 form 입력 시
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
            회원정보수정
          </Typography>
          {/* 회원정보수정 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            <Grid container spacing={2}>
              {/* 아이디창 */}
              {/* <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="email" // 기존 이메일 입력 필요 => 이메일은 수정 못하게?
                  name="email"
                  id="email"
                  label="이메일"
                  autoFocus
                  sx={{ background: "white" }}
                />
              </Grid> */}
              {/* 기존 비밀번호 입력창 */}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="password" //기존의 비밀번호와 일치여부 확인 필요
                  label="현재 비밀번호"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={formValues.password}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.password}</p>
              </Grid>
              {/* 새로운 비밀번호 입력창 */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_password"
                  label="새로운 비밀번호"
                  type="password"
                  id="new_password"
                  autoComplete="new_password"
                  value={formValues.new_password}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.new_password}</p>
              </Grid>
              {/* 새로운 비밀번호 재입력창 */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_check_password"
                  label="새로운 비밀번호 확인"
                  type="password"
                  id="new_check_password"
                  autoComplete="new_check_password"
                  value={formValues.new_check_password}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.new_check_password}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_username" // 바꾸기전 이름 기본입력 필요???
                  label="이름"
                  id="new_username"
                  autoComplete="new_username"
                  value={formValues.new_username}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.new_username}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_phone_number" // 바꾸기전 번호 기본입력 필요???
                  label="전화번호"
                  id="new_phone_number"
                  autoComplete="phone_number"
                  value={formValues.new_phone_number}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.new_phone_number}</p>
              </Grid>
            </Grid>
            {/* 회원수정 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: colorPalette.BUTTON_COLOR }}
              size="large"
              sx={{ mt: 3, mb: 2 }}
              onChange={handleChange}
            >
              <Typography id="font_test" component="h6" variant="h6">
                회원수정
              </Typography>
            </Button>
            {/* 뒤로가기 버튼 */}
            <Grid container justifyContent="flex-end">
              <Button
                variant="body2" 
                id="font_test" 
                style={{ color: "#808080", textDecoration:"none" }}
                onClick={() => {navigate(-1)}}>
                  뒤로가기
                </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
