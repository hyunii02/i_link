// 2022.07.27 배지우 //
// 2022.07.29 안정현 validation //

import * as React from 'react';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

// RadioButton
const RowRadioButtonsGroup = props => {
  const { handleRadio } = props;
  const RadioClick = e => {
    console.log(e.currentTarget.value);
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
  const handleRadio = data => {
    SetRadioState(data);
  };

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

  const validate = target => {
    console.log(target.name, target.value);
    const errors = {};
    if (target.name === 'id') {
      errors.id = '아이디를 입력해주세요.';
    }
    if (target.name === 'password') {
      errors.password = '비밀번호를 입력해주세요';
      if (target.value.length < 6) {
        errors.password = '비밀번호 6자리 이상 입력해주세요';
      }
    }
    if (target.name === 'check_password') {
      errors.check_password = '비밀번호를 다시 입력해주세요';
      if (target.value !== formValues.password) {
        errors.check_password = '비밀번호가 일치하지 않습니다';
      }
    }
    if (target.name === 'phone_number') {
      errors.phone_number = '휴대폰 번호를 입력해주세요';
    }
    if (target.name === 'username') {
      errors.username = '이름을 입력해주세요';
    }
    return errors;
  };

  const handleSubmit = event => {
    event.preventDefault();
    setFormErrors(passwordCheck());
    setIsSubmit(true);
    const data = new FormData(event.currentTarget);
    // console.log({
    //   id: data.get('id'),
    //   password: data.get('password'),
    //   username: data.get('username'),
    //   phone_number: data.get('phone_number'),
    //   type: radioState,
    // });
  };

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
          <Avatar alt="Academy" src="/images/login.png"></Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <RowRadioButtonsGroup handleRadio={handleRadio} />
          {/* 회원가입 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {/* 아이디 입력창*/}
            <Grid container spacing={2}>
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
