// 2022.07.27 배지우 //
// 2022.07.29 안정현 validation //
// 2022.08.02 강민재 axios, validation //

import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

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

import { urls, baseURL, axios } from "../../../api/axios";
import { colorPalette } from "../../../constants/constants";
import { UserContext } from "../../../context/user";

const theme = createTheme();

export default function Login() {
  // validation
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  // 세션 스토리지에 write 후에 navigate를 실행시키기 위한 state
  const [changeState, setChangeState] = useState(false);
  const {
    setUserName,
    setUserType,
    setUserNo,
    setUserPhone,
    setUserGroup,
    setUserCenter,
    setAccessToken,
    setRefreshToken,
    setKidsList,
    setFirstKid,
    setUserProfileUrl,
  } = useContext(UserContext);

  useEffect(() => {
    if (changeState) {
      navigate("/parents/home", {});
    }
  }, [changeState]);

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
      const response = await Axios.post(baseURL + urls.fetchLogin, body);
      const resUserType = response.data.data.user.user_type;
      const resUserName = response.data.data.user.user_name;
      const resUserNo = response.data.data.user.user_no;
      const resAccessToken = response.data.data.token.access_token;
      const resRefreshToken = response.data.data.token.refresh_token;
      const resUserPhone = response.data.data.user.user_phone;
      const resUserCenter = response.data.data.user.center_no;
      const resUserGroup = response.data.data.user.group_no;
      const resUserProfileUrl = response.data.data.user.user_profile_url;

      // 로그인 성공 시 유저 정보 세션에 저장
      setUserNo(resUserNo);
      setUserName(resUserName);
      setUserType(resUserType);
      setAccessToken(resAccessToken);
      setRefreshToken(resRefreshToken);
      setUserPhone(resUserPhone);
      setUserCenter(resUserCenter);
      setUserGroup(resUserGroup);
      setUserProfileUrl(resUserProfileUrl);
      setKidsList("");
      setFirstKid("");
      sessionStorage.setItem("userType", resUserType);
      sessionStorage.setItem("userName", resUserName);
      sessionStorage.setItem("userNo", resUserNo);
      sessionStorage.setItem("accessToken", resAccessToken);
      sessionStorage.setItem("refreshToken", resRefreshToken);
      sessionStorage.setItem("userPhone", resUserPhone);
      sessionStorage.setItem("userCenter", resUserCenter);
      sessionStorage.setItem("userGroup", resUserGroup);
      sessionStorage.setItem("userProfileUrl", resUserProfileUrl);
      sessionStorage.setItem("kidList", "");
      sessionStorage.setItem("firstKid", "");

      // 로그인 성공 시 대응되는 페이지로 네비게이트
      if (response.data.message === "로그인 성공") {
        switch (resUserType) {
          // 원장 권한
          case 1:
            // 소속된 유치원이 없을 경우 유치원 등록 페이지로 이동
            if (resUserCenter === null) {
              navigate("/master/registacademy");
            } else {
              // 메인페이지로 이동
              navigate("/master/managemember");
            }
            break;
          // 선생 권한
          case 2:
            // 소속된 유치원이 없을 경우 유치원 등록 페이지로 이동
            if (resUserCenter === null) {
              navigate("/teacher/joincenter");
            } else {
              // 소속 유치원은 있지만 반 배정이 되어 있지 않을 경우, 대기 페이지로 이동
              if (resUserGroup === null) {
                navigate("/teacher/wait");
              } else {
                navigate("/teacher/management");
              }
            }
            break;
          // 부모 로그인 성공 시, 부모에 속해 있는 아이의 정보를 가져온 후 navigate
          case 3:
            {
              axios
                .get(urls.fetchParentKids + resUserNo, {
                  headers: { Authorization: `Bearer ${resAccessToken}` },
                })
                .then((response) => {
                  // 등록된 아이가 없을 시
                  if (response.data.length === 0) {
                    navigate("/parents/registkid");
                  } else {
                    if (response.status === 200) {
                      setKidsList(response.data);
                      setFirstKid(response.data[0]);
                      setChangeState(true);
                      navigate("/parents/home", { state: response.data[0] });
                    }
                  }
                });
            }
            break;
          default:
            console.log("알 수 없는 회원 유형");
            break;
        }
      }
    } catch (err) {
      // 로그인 실패 시
      
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 로고 이미지 */}
          <Typography
            id="font_test"
            component="h6"
            variant="h3"
            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            아이와 이어주다
          </Typography>
          <Avatar
            sx={{ width: 380, height: 350 }}
            alt="Academy"
            src="/images/logo.png"
            variant="square"
          ></Avatar>
          {/* 로그인 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
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
                  sx={{ background: "white" }}
                />
                <p>{formErrors.email}</p>
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
                  sx={{ background: "white" }}
                />
                <p>{formErrors.password}</p>
              </Grid>
            </Grid>
            {/* 로그인 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: colorPalette.BUTTON_COLOR }}
              sx={{ mt: 1, mb: 2 }}
              onChange={handleChange}
            >
              <Typography id="font_test" component="h6" variant="h6">
                로그인
              </Typography>
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* 회원가입 페이지로 연결 */}
                <Link
                  href="/user/signup"
                  variant="body2"
                  id="font_test"
                  style={{ color: "#808080", textDecoration: "none" }}
                >
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
