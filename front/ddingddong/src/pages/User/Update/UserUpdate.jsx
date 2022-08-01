import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UserUpdate = () => {
  return <Update />;
};

export default UserUpdate;

// 2022.07.27 배지우 //

const theme = createTheme();

const Update = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      new_password: data.get('new_password'),
      username: data.get('new_username'),
      new_phone_number: data.get('new_phone_number'),
    });
  };

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
          <Avatar
            sx={{ width: 96, height: 96 }}
            alt="Academy"
            src="/images/login.png"
          ></Avatar>
          <Typography component="h1" variant="h5">
            회원정보수정
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="아이디"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="현재비밀번호"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_password"
                  label="새로운 비밀번호"
                  type="password"
                  id="new_password"
                  autoComplete="new_password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_password2"
                  label="새로운 비밀번호 확인"
                  type="password"
                  id="new_password2"
                  autoComplete="new_password2"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_username" // 바꾸기전 이름 기본입력 필요
                  label="이름"
                  id="new_username"
                  autoComplete="new_username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_phone_number" // 바꾸기전 번호 기본입력 필요
                  label="전화번호"
                  id="new_phone_number"
                  autoComplete="phone_number"
                />
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
};
