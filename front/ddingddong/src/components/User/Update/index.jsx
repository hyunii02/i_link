// 2022.07.27 배지우 //
// 2022.08.01 안정현 validation //

import React from 'react';
import { useState, useEffect } from 'react';

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
  // validation
  const initialValues = {
    id: '',
    password: '',
    new_password: '',
    new_check_password: '',
    new_username: '',
    phone_number: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // 에러메시지
  const validate = target => {
    console.log(target.name, target.value);
    const errors = {};
    if (target.name === 'password') {
      errors.password = '비밀번호를 입력해주세요';
    }
    if (target.name === 'new_password') {
      errors.new_password = '새로운 비밀번호를 입력해주세요';
      if (target.value.length < 6) {
        errors.new_password = '새로운 비밀번호 6자리 이상 입력해주세요';
      }
    }
    if (target.name === 'new_check_password') {
      errors.new_check_password = '새로운 비밀번호를 다시 입력해주세요';
      if (target.value !== formValues.password) {
        errors.new_check_password = '새로운 비밀번호가 일치하지 않습니다';
      }
    }
    if (target.name === 'new_username') {
      errors.new_username = '이름을 입력해주세요';
    }
    if (target.name === 'new_phone_number') {
      errors.new_phone_number = '휴대폰 번호를 입력해주세요';
    }
    return errors;
  };

  const handleSubmit = event => {
    event.preventDefault();
    setFormErrors(passwordCheck());
    setIsSubmit(true);
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   new_password: data.get('new_password'),
    //   username: data.get('new_username'),
    //   new_phone_number: data.get('new_phone_number'),
    // });
  };

  const handleChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(event.target);
    setFormErrors(validate(event.target));
  };
  //submit 후 새로운 비밀번호 일치여부 확인 메시지
  const passwordCheck = () => {
    const errors = {};
    if (formValues.new_password === formValues.new_check_password)
      return errors;
    errors.new_check_password = '새로운 비밀번호가 일치하지 않습니다';
    return errors;
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* 로고 이미지 */}
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt="Academy"
            src="/images/login.png"
          ></Avatar>
          <Typography component="h1" variant="h5">
            회원정보수정
          </Typography>
          {/* 회원정보수정 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* 아이디창 => 기존의 아이디 값이 입력되어있어야한다! 어떻게 하지??? */}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="id"
                  name="id"
                  id="id"
                  label="아이디"
                  autoFocus
                />
              </Grid>
              {/* 기존 비밀번호 입력창 => 기존의 비밀번호 값이랑 일치여부 확인해야함! 어떻게 하지???*/}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="현재 비밀번호"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={formValues.password}
                  onChange={handleChange}
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
                />
                <p>{formErrors.new_check_password}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_username" // 바꾸기전 이름 기본입력 필요
                  label="이름"
                  id="new_username"
                  autoComplete="new_username"
                  value={formValues.new_username}
                  onChange={handleChange}
                />
              </Grid>
              <p>{formErrors.new_username}</p>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_phone_number" // 바꾸기전 번호 기본입력 필요
                  label="전화번호"
                  id="new_phone_number"
                  autoComplete="phone_number"
                  value={formValues.new_phone_number}
                  onChange={handleChange}
                />
                <p>{formErrors.new_phone_number}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              회원수정 완료
            </Button>
            <Grid container justifyContent="flex-end">
              <Button>뒤로가기</Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
