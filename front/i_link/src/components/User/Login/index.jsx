// 2022.07.27 배지우 //
// 2022.07.29 안정현 validation //

import React from 'react';
import { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Login() {
  // validation
  const initialValues = { id: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // 에러메시지
  const validate = target => {
    console.log(target.name, target.value);
    const errors = {};
    if (target.name === 'id') {
      errors.id = '아이디를 입력해주세요.';
      if (target.value.length > 1) {
        errors.id = '';
      }
    }
    if (target.name === 'password') {
      errors.password = '비밀번호를 입력해주세요';
      if (target.value.length > 1) {
        errors.password = '';
      }
    }
    return errors;
  };

  const handleSubmit = event => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const data = new FormData(event.currentTarget);
  };

  //로그인 form 입력 시
  const handleChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(event.target);
    setFormErrors(validate(event.target));
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
