// 선생/아이 유치원 가입 페이지
// 2022.08.11 김국진
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Avatar,
} from "@mui/material/";
import { colorPalette } from "../../../constants/constants";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseURL, urls } from "../../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/user";

const TeacherJoinCenter = () => {
  const [centerNo, setCenterNo] = useState("");
  const [center, setCenter] = useState({});
  const [error, setError] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");

  const { userNo } = useContext(UserContext);

  const location = useLocation();

  const navigate = useNavigate();

  const getCenterData = (centerId) => {
    try {
      axios
        .get(baseURL + urls.fetchCentersDetial + centerId)
        .then((response) => {
          // 응답 성공 시
          if (response.status === 200) {
            const newObj = {
              center_name: response.data.center_name,
              center_addr: response.data.center_addr,
              center_tel: response.data.center_tel,
            };
            console.log("응답성공");
            console.log(newObj);
            setError((error) => "");
            setCenter(newObj);
            setSelectedCenter(centerId);
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            setError((error) => "해당 유치원이 존재하지 않습니다.");
            setCenter({});
            setSelectedCenter("");
          }
        });
    } catch (e) {
      setError((error) => "해당 유치원이 존재하지 않습니다.");
    }
  };

  // 유치원 검색 버튼 클릭 시 핸들러
  const buttonClickedHandler = () => {
    // 데이터 유효성 검사
    let no = centerNo.replace(/ /g, "");
    if (no === "") {
      setError((error) => "유치원 번호를 입력해 주세요.");
      return;
    }
    if (no !== centerNo) {
      setError((error) => "공백을 제거해주세요.");
      return;
    }

    getCenterData(centerNo);
  };

  // 유치원 등록 버튼 클릭 시 핸들러
  const registButtonClicked = () => {
    if (selectedCenter === "") {
      setError((error) => "등록할 유치원을 입력하세요");
      return;
    }

    const body = {
      centerNo: parseInt(selectedCenter),
      userNo: userNo,
    };
    const fullURL = baseURL + urls.fetchTeacherCenterSet;
    console.log(fullURL);
    try {
      axios
        .put(fullURL, body)
        .then((response) => {
          console.log(response.data);
          navigate("/teacher/wait");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 로고 이미지 */}
          <Typography
            id="font_test"
            component="h6"
            variant="h5"
            sx={{ color: "rgba(0, 0, 0, 0.6)", textAlign: "center" }}
          >
            등록된 유치원이 없습니다.
            <br />
            소속 유치원을 등록 해 주세요.
          </Typography>
          <Box sx={{ marginTop: "50px" }}>
            {/* 아이등록 title */}
            <Typography
              id="font_test"
              component="h1"
              variant="h4"
              sx={{ textAlign: "center" }}
            >
              유치원 등록
            </Typography>
            {/* 아이등록 form */}
            <Box noValidate sx={{ mt: 3 }}>
              <Grid container spacing={1}>
                {/* 아이 이름 입력창 */}
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label={<Typography id="font_test">유치원 ID</Typography>}
                    autoFocus
                    value={centerNo}
                    onChange={(e) => setCenterNo(e.target.value)}
                    sx={{ background: "white" }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    style={{ background: colorPalette.BUTTON_COLOR }}
                    size="large"
                    onClick={buttonClickedHandler}
                  >
                    <Typography id="font_test" component="h6" variant="h6">
                      검색
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography id="font_test" component="h6" variant="body1">
                    {error}
                    {selectedCenter !== "" && (
                      <Box>
                        유치원명:{center.center_name}
                        <br />
                        유치원주소:{center.center_addr}
                        <br />
                        전화번호:{center.center_tel}
                        <br />
                      </Box>
                    )}
                  </Typography>
                </Grid>
                {/* 아이등록 버튼 */}
                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ background: colorPalette.BUTTON_COLOR }}
                    sx={{ mt: 3, mb: 5 }}
                    size="large"
                    onClick={registButtonClicked}
                  >
                    <Typography id="font_test" component="h6" variant="h6">
                      유치원 등록
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TeacherJoinCenter;
