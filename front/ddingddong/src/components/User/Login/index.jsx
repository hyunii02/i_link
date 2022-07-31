// 2022.07.27 배지우 //
// 2022.07.29 안정현 validation //

import * as React from 'react';
import { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

  const validate = target => {
    console.log(target.name, target.value);
    const errors = {};
    if (target.name === 'id') {
      errors.id = '아이디를 입력해주세요.';
    }
    if (target.name === 'password') {
      errors.password = '비밀번호를 입력해주세요';
    }
    return errors;
  };

  const handleSubmit = event => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const data = new FormData(event.currentTarget);
    // console.log({
    //   id: data.get('id'),
    //   password: data.get('password'),
    // });
  };

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
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar alt="Academy" src="/images/login.png"></Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="자동로그인"
            />

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
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  아이디찾기 | 비밀번호찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
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
