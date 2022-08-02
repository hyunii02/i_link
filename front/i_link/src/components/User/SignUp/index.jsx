// 2022.07.27 배지우 //
// 2022.07.29 안정현 validation //
// 2022.08.01 안정현 select components //

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
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


// Select components
const BasicSelectCheck = () => {
  const [value, setValue] = useState(10);
  const [position, setPosition] = React.useState('');

  const selectChange = event => {
    setPosition(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={selectChange}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value={10} style={{ selected: 'true' }}>
          부모님
        </MenuItem>
        <MenuItem value={20}>원장님</MenuItem>
        <MenuItem value={30}>선생님</MenuItem>
      </Select>
    </FormControl>
  );
};

const theme = createTheme();

export default function SignUp() {
  // validation
  const initialValues = {
    id: '',
    password: '',
    check_password: '',
    username: '',
    phone_number: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //에러 메시지
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
      if (target.value.length < 6) {
        errors.password = '비밀번호 6자리 이상 입력해주세요';
      }
      else {
        errors.password = '';
      }
    }
    if (target.name === 'check_password') {
      errors.check_password = '비밀번호를 다시 입력해주세요';
      if (target.value !== formValues.password) {
        errors.check_password = '비밀번호가 일치하지 않습니다';
      }
      else {
        errors.check_password = '';
      }
    }
    if (target.name === 'phone_number') {
      errors.phone_number = '휴대폰 번호를 입력해주세요';
      if (target.value.length > 1) {
        errors.phone_number = '';
      }
    }
    if (target.name === 'username') {
      errors.username = '이름을 입력해주세요';
      if (target.value.length > 1) {
        errors.username = '';
      }
    }
    return errors;
  };

  //회원가입 버튼 클릭 시
  const handleSubmit = event => {
    event.preventDefault();
    setFormErrors(passwordCheck());
    setIsSubmit(true);
    const data = new FormData(event.currentTarget);
  };

  //회원가입 form 입력 시
  const handleChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(event.target);
    setFormErrors(validate(event.target));
  };

  //submit 후 비밀번호 일치여부 확인 메시지
  const passwordCheck = () => {
    const errors = {};
    if (formValues.password === formValues.check_password) return errors;
    errors.check_password = '비밀번호가 일치하지 않습니다';
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
            회원가입
          </Typography>
          {/* 회원가입 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* 부모님, 원장님, 선생님 선택창 */}
              <Grid item xs={12} sm={12}>
                <BasicSelectCheck></BasicSelectCheck>
              </Grid>
              {/* 아이디 입력창*/}
              <Grid item xs={12} sm={12}>
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
                  autoComplete="new-password"
                  value={formValues.check_password}
                  onChange={handleChange}
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
                />
                <p>{formErrors.phone_number}</p>
              </Grid>
            </Grid>
            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              size="string"
              height="512px"
              sx={{ mt: 3, mb: 2 }}
              onChange={handleChange}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              {/* 로그인 페이지로 연결 */}
              <Grid item>
                <Link href="http://localhost:3000/" variant="body2">
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
