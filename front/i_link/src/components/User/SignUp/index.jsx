// 2022.07.27 배지우 //
// 2022.07.29 안정현 validation //
// 2022.08.01 안정현 select components //
// 2022.08.04 김국진 로고 변경, 컴포넌트 사이즈 수정, input box 배경색 하얀색으로 변경 //

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { urls, baseURL } from "../../../api/axios";

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
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// Select components
const BasicSelectCheck = ({ handleSelect }) => {
  const [value, setValue] = useState("3");
  const selectChange = (event) => {
    setValue((value) => event.target.value);
    handleSelect(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={selectChange}
        sx={{ background: "white" }}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="3">부모님</MenuItem>
        <MenuItem value="1">원장님</MenuItem>
        <MenuItem value="2">선생님</MenuItem>
      </Select>
    </FormControl>
  );
};

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  // validation
  const initialValues = {
    type: "",
    email: "",
    password: "",
    check_password: "",
    username: "",
    phone_number: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  // 에러메시지
  const validate = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "이메일을 입력해주세요.";
    }
    if (!formValues.password) {
      errors.password = "비밀번호를 입력해주세요.";
    }
    if (formValues.password.length < 6) {
      errors.password = "6자리 이상 입력해주세요.";
    }
    if (formValues.password !== formValues.check_password) {
      errors.check_password = "비밀번호가 일치하지 않습니다.";
    }
    if (!formValues.username) {
      errors.username = "이름을 입력해주세요.";
    }
    if (!formValues.phone_number) {
      errors.phone_number = "전화번호를 입력해주세요.";
    }

    setFormErrors(errors);
    if (!(errors.email + errors.password)) {
      return true;
    }
    return false;
  };
  // 드롭다운 값 변경
  const handleSelect = (val) => {
    setFormValues({ ...formValues, type: val });
  };

  //회원가입 버튼 클릭 시
  const handleSubmit = async (event) => {
    event.preventDefault();
    // 유효성검사 통과 시 axios 실행
    if (validate()) {
      const body = {
        userType: formValues.type,
        userEmail: formValues.email,
        userPw: formValues.password,
        userName: formValues.username,
        userPhone: formValues.phone_number,
      };
      try {
        const response = await axios.post(
          baseURL + urls.fetchUsersRegister,
          body,
        );
        navigate("/");
      } catch (err) {}
    }
  };

  //회원가입 form 입력 시
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 로고 이미지 */}
          <Avatar
            sx={{ width: 300, height: 300 }}
            alt="Academy"
            src="/images/logo.png"
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
                <BasicSelectCheck
                  handleSelect={handleSelect}
                ></BasicSelectCheck>
              </Grid>
              {/* 이메일 입력창*/}
              <Grid item xs={12} sm={12}>
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
                  sx={{ background: "white" }}
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
                  autoComplete="check_password"
                  value={formValues.check_password}
                  onChange={handleChange}
                  sx={{ background: "white" }}
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
                  sx={{ background: "white" }}
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
                  sx={{ background: "white" }}
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
                <Link href="/" variant="body2">
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
