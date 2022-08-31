// 2022.07.27 배지우 //
// 2022.08.01 안정현 validation //
// 2022.08.05 안정현 디자인 수정 //
// 2022.08.11 안정현 axios //

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axios, urls, baseURL } from "../../../api/axios";
import { colorPalette } from "../../../constants/constants";
import { UserContext } from "../../../context/user";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

//이미지 업로드
const Uploader = ({
  defaultImage,
  image,
  setImage,
  sendImage,
  setSendImage,
}) => {
  let inputRef; //이미지 미리보기를 위해서 Ref를 사용
  //이미지 저장
  const saveImage = (event) => {
    //event.preventDefault();

    // 이미지를 가져 올 시
    if (event.target.files[0]) {
      setSendImage((sendImage) => event.target.files[0]);
      // 새로운 이미지를 올리면 createObjectURL()을 통해 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(event.target.files[0]);
      setImage(() => ({
        image_file: event.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* 이미지 삽입 */}
      <input
        id="kidprofileurl"
        type="file"
        accept="image/*"
        onChange={saveImage}
        onClick={(event) => (event.target.value = null)} // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      {/* 이미지 창 */}
      <Avatar
        onClick={() => inputRef.click()}
        alt="kids_picture"
        src={
          image.preview_URL === "" ? baseURL + defaultImage : image.preview_URL
        }
        sx={{
          width: 200,
          height: 200,
          "&:hover": {
            backgroundColor: "#FFFEF4",
          },
        }}
        style={{ cursor: "pointer" }}
      ></Avatar>
    </Box>
  );
};

export default function Update() {
  const navigate = useNavigate();
  const {
    setUserNo,
    setUserName,
    setUserType,
    setUserPhone,
    setUserCenter,
    setUserGroup,
    setAccessToken,
    setRefreshToken,
    userNo,
  } = useContext(UserContext);

  // validation
  const initialValues = {
    email: "",
    password: "",
    new_password: "",
    new_check_password: "",
    new_username: "",
    new_phone_number: "",
    new_user_profile: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [sendImage, setSendImage] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "",
  });

  // 화면이 렌더링 될 때 유저 정보를 입력받음
  useEffect(() => {
    try {
      axios
        .get(urls.fetchUsersDetail + userNo)
        .then((response) => {
          if (response.status === 200) {
            const newObj = {
              ...formValues,
              email: response.data.user_email,
              new_username: response.data.user_name,
              new_phone_number: response.data.user_phone,
              new_user_profile: response.data.user_profile_url,
            };
            setFormValues(newObj);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  // 에러메시지
  const validate = () => {
    const errors = {};
    let flag = false;
    if (!formValues.password) {
      errors.password = "비밀번호를 입력해주세요.";
      flag = true;
    }
    if (!formValues.new_password || formValues.new_password.indexOf(" ") >= 0) {
      errors.new_password = "새로운 비밀번호를 입력해주세요.";
      flag = true;
    }
    if (formValues.new_password.length < 6) {
      errors.new_password = "6자리 이상 입력해주세요.";
      flag = true;
    }
    if (formValues.new_password !== formValues.new_check_password) {
      errors.new_check_password = "비밀번호가 일치하지 않습니다.";
      flag = true;
    }
    if (!formValues.new_username) {
      errors.new_username = "이름을 입력해주세요.";
      flag = true;
    }
    if (!formValues.new_phone_number) {
      errors.new_phone_number = "전화번호를 입력해주세요.";
      flag = true;
    }
    setFormErrors(errors);
    if (flag) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 유효성검사 통과 시 axios 실행
    if (validate()) {
      const body = {
        userNo: parseInt(userNo),
        userName: formValues.new_username,
        currentPw: formValues.password,
        userPw: formValues.new_password,
        userPhone: formValues.new_phone_number,
        userProfile: image.image_file,
        // userEmail: formValues.email,
      };
      // 사진 전송을 위해 헤더에 Multi-part로 type 설정
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      try {
        const response = await axios.put(
          urls.fetchUsersUpdate + userNo,
          body,
          config,
        );
        setUserNo("");
        setUserName("");
        setUserType("");
        setUserPhone("");
        setUserCenter("");
        setUserGroup("");
        setAccessToken("");
        setRefreshToken("");
        navigate("/"); //회원정보 수정 시 다시 로그인페이지로 이동
      } catch (err) {
        const errors = {
          password: "비밀번호가 일치하지 않습니다.",
        };
        setFormErrors(errors);
      }
    }
  };

  // 회원정보 수정 form 입력 시
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
            mb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 로고 이미지 */}
          <Avatar
            sx={{ width: 250, height: 250 }}
            alt="Academy"
            src="/images/logo.png"
          ></Avatar>
          <Typography
            component="h1"
            variant="h4"
            id="font_test"
            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            회원정보수정
          </Typography>
          {/* 회원정보수정 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
          >
            <Grid container spacing={2}>
              {/* 아이디창 */}
              {/* <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="email" // 기존 이메일 입력 필요 => 이메일은 수정 못하게?
                  name="email"
                  id="email"
                  label="이메일"
                  autoFocus
                  sx={{ background: "white" }}
                />
              </Grid> */}
              {/* 이미지 업로드 */}
              <Grid item xs={12} sm={12}>
                <Uploader
                  defaultImage={formValues.new_user_profile}
                  image={image}
                  setImage={setImage}
                  sendImage={sendImage}
                  setSendImage={setSendImage}
                ></Uploader>
              </Grid>
              {/* 기존 비밀번호 입력창 */}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="password" //기존의 비밀번호와 일치여부 확인 필요
                  label="현재 비밀번호"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={formValues.password}
                  onChange={handleChange}
                  sx={{ background: "white" }}
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
                  sx={{ background: "white" }}
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
                  sx={{ background: "white" }}
                />
                <p>{formErrors.new_check_password}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_username" // 바꾸기전 이름 기본입력 필요???
                  label="이름"
                  id="new_username"
                  autoComplete="new_username"
                  value={formValues.new_username}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.new_username}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_phone_number" // 바꾸기전 번호 기본입력 필요???
                  label="전화번호"
                  id="new_phone_number"
                  autoComplete="phone_number"
                  value={formValues.new_phone_number}
                  onChange={handleChange}
                  sx={{ background: "white" }}
                />
                <p>{formErrors.new_phone_number}</p>
              </Grid>
            </Grid>
            {/* 회원수정 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: colorPalette.BUTTON_COLOR }}
              size="large"
              sx={{ mt: 3, mb: 2 }}
              onChange={handleChange}
            >
              <Typography id="font_test" component="h6" variant="h6">
                회원수정
              </Typography>
            </Button>
            {/* 뒤로가기 버튼 */}
            <Grid container justifyContent="flex-end">
              <Button
                variant="body2"
                id="font_test"
                style={{ color: "#808080", textDecoration: "none" }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                뒤로가기
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
