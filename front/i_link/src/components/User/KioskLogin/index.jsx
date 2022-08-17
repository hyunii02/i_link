// 2022.08.08 강민재 //
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { urls, baseURL, axiosKiosk } from "../../../api/axios";
import { colorPalette } from "../../../constants/constants";

export default function KioskLogin() {
  // validation
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/kiosk/main");
    }
  }, [navigate]);

  // 에러메시지
  const validate = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "이메일을 입력해주세요.";
    }
    if (!formValues.password) {
      errors.password = "비밀번호를 입력해주세요.";
    }
    setFormErrors(errors);
    if (!(errors.email + errors.password)) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 에러가 없으면 로그인 함수 실행
    if (validate()) {
      handleLogin(formValues.email, formValues.password);
    }
  };

  // API서버에 로그인 폼을 전달하는 함수
  const handleLogin = async (email, password) => {
    const body = {
      userEmail: email,
      userPw: password,
    };
    try {
      const response = await axios.post(baseURL + urls.fetchLogin, body);
      const resUserType = response.data.data.user.user_type;
      const resUserName = response.data.data.user.user_name;
      const resUserNo = response.data.data.user.user_no;
      const resUserPhone = response.data.data.user.user_phone;
      const resUserCenter = response.data.data.user.center_no;
      const resUserGroup = response.data.data.user.group_no;
      const resAccessToken = response.data.data.token.access_token;
      const resRefreshToken = response.data.data.token.refresh_token;
      // 로그인 성공 시 유저 정보 세션에 저장
      localStorage.setItem("userType", resUserType);
      localStorage.setItem("userName", resUserName);
      localStorage.setItem("userNo", resUserNo);
      localStorage.setItem("accessToken", resAccessToken);
      localStorage.setItem("refreshToken", resRefreshToken);
      localStorage.setItem("userPhone", resUserPhone);
      localStorage.setItem("userCenter", resUserCenter);
      localStorage.setItem("userGroup", resUserGroup);
      const kidResponse = await axiosKiosk.get(
        urls.fetchParentKids + resUserNo
      );
      localStorage.setItem("kidsList", JSON.stringify(kidResponse.data));
      localStorage.setItem("kidName", kidResponse.data[0].kid_name);
      localStorage.setItem("kidNo", kidResponse.data[0].kid_no);
      localStorage.setItem("kidUrl", kidResponse.data[0].kid_profile_url);
      localStorage.setItem("kidGroup", kidResponse.data[0].group_no);
      localStorage.setItem("kidCenter", kidResponse.data[0].center_no);
      localStorage.setItem("kidStamp", kidResponse.data[0].kid_stamp);

      navigate("/kiosk/main");
    } catch (err) {
      // 로그인 실패 시
      console.log(err.response.data.message);
      switch (err.response.data.message) {
        case "비밀번호 오류":
          setFormErrors({ password: "잘못된 비밀번호 입니다." });
          break;
        case "아이디 없음":
          setFormErrors({ email: "등록되지 않은 이메일 입니다." });
          break;
        default:
          setFormErrors({ email: "회원 정보를 확인해주세요." });
          break;
      }
    }
  };

  //로그인 form 입력 시
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    //setFormErrors(validate(event.target));
  };

  return (
    <Box
      sx={{
        marginTop: "5vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "80vh",
        flexShrink: 1,
      }}
    >
      <CssBaseline />
      {/* 로고 이미지 */}
      <Typography
        id="font_test"
        component="h6"
        variant="h1"
        sx={{
          color: "rgba(0, 0, 0, 0.6)",
          flexGrow: 0.1,
          flexShrink: 1,
          verticalAlign: "bottom",
          fontSize: "8vh",
        }}
      >
        원과 가정을 잇다
      </Typography>
      {/* 로고 */}
      <img
        alt="logo"
        src="images/logo.png"
        style={{ objectFit: "scale-down", width: "20vw", flexShrink: 1 }}
      />
      {/* 로그인 form */}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          flexGrow: 1,
          width: 0.6,
          flexShrink: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 이메일 입력창 */}
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
          sx={{ background: "white", width: "50vw" }}
          size="large"
        />
        <p>{formErrors.email}</p>
        {/* 비밀번호 입력창 */}
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
          sx={{ background: "white", width: "50vw" }}
        />
        <p>{formErrors.password}</p>
        {/* 로그인 버튼 */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ background: colorPalette.BUTTON_COLOR }}
          sx={{ width: "50vw" }}
          onChange={handleChange}
        >
          <Typography id="font_test" component="h6" variant="h6">
            로그인
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
