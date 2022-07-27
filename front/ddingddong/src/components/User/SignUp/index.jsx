// 2022.07.27 배지우 //

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

const RowRadioButtonsGroup = (props) => {
  const { handleRadio } = props;
  const RadioClick = (e) => {
    //console.log(e.currentTarget.value);
    handleRadio(e.currentTarget.value);
  };
  const [radioState, SetRadioState] = useState(0);
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="Master"
          control={<Radio value="Master" onChange={RadioClick} />}
          label="원장님"
        />
        <FormControlLabel
          value="Teacher"
          control={<Radio value="Teacher" onChange={RadioClick} />}
          label="선생님"
        />
        <FormControlLabel
          value="Parents"
          control={<Radio value="Parents" onChange={RadioClick} />}
          label="부모님"
        />
      </RadioGroup>
    </FormControl>
  );
};

const theme = createTheme();

export default function SignUp() {
  const [radioState, SetRadioState] = useState(0);
  const handleRadio = (data) => {
    SetRadioState(data);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
      phone_number: data.get('phone_number'),
      type: radioState,
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
          <Avatar alt="Academy" src="/images/login.png"></Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <RowRadioButtonsGroup handleRadio={handleRadio} />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="아이디"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="check_password"
                  label="비밀번호확인"
                  name="check_password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="이름"
                  id="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone_number"
                  label="전화번호"
                  id="phone_number"
                  autoComplete="phone_number"
                />
              </Grid>
              {/* <Grid item xs={9}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="광고성 메일에 수신 동의합니까 ?  "
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              size="string"
              height="512px"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
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
