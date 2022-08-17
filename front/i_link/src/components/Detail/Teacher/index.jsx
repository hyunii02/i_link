// 2022.08.14 김국진 create
// 원장/선생>아이보기 페이지 통합 컴포넌트
import { useState, useContext, useEffect } from "react";

import { Box, Grid, Typography, Button, TextField } from "@mui/material";

import { colorPalette } from "../../../constants/constants.js";
import { UserContext } from "../../../context/user.js";
import { axios, baseURL, urls } from "../../../api/axios.jsx";
import { useLocation } from "react-router";
import QuizStampFrame from "../../Quiz/QuizStampFrame/index.jsx";
import StudentInfo from "./StudentInfo/index.jsx";
import StudentMemo from "./StudentMemo/index.jsx";
import StudentReport from "./StudentReport/index.jsx";
import KidQuiz from "../Parents/KidQuiz.jsx";

const KidsDetailInfo = ({ kidNo }) => {
  const { state } = useLocation();
  // 아이 정보 상태 관리
  const [kidInfo, setKidInfo] = useState([]);
  // 부모 정보 상태 관리
  const [parentInfo, setParentInfo] = useState([]);
  // 화면 리렌더링 플래그
  const [reRender, setReRender] = useState(false);
  // 칭찬도장 수정 컴포넌트 view 상태관리
  const [stampState, setStampState] = useState(false);
  // 칭찬도장 수정 갯수 상태 관리
  const [stampCount, setStampCount] = useState(0);
  useEffect(() => {
    getKidsData();
  }, [state]);

  useEffect(() => {
    getKidsData();
  }, [reRender]);

  // 아이 디테일 페이지에 표시할 정보들을 가져온다.
  const getKidsData = async () => {
    try {
      // kidNo를 기반으로 아이 정보를 가져옴
      const kidsResponse = await axios.get(urls.fetchKidsDelete + state.kidNo);

      // parentNo를 기반으로 부모님의 데이터를 가져옴
      const parentResponse = await axios.get(
        urls.fetchUsersDelete + kidsResponse.data.parents_no
      );
      setStampCount((stampCount) => kidsResponse.kid_stamp);
      setKidInfo(kidsResponse.data);
      setParentInfo(parentResponse.data);
    } catch (e) {}
  };

  // 퀴즈 스탬프 갯수 변경 axios
  const setQuizStampCount = () => {
    const body = {
      kidStamp: stampCount,
    };
    try {
      axios
        .put(urls.fetchStampUpdate, body)
        .then((response) => {
          if (response.status === 200) {
            setKidInfo(response.data);
          }
        })
        .catch((error) => console.log(error));
    } catch (e) {
      console.log(e);
    }
  };

  // 퀴즈 스탬프 수정/저장 버튼 클릭 시
  const quizStampSaveButtonClicked = () => {
    // 저장 버튼 클릭 시
    if (stampState) {
      setQuizStampCount();
    }
    // 수정 버튼 클릭 시
    else {
    }

    // 버튼 상태 Toggle
    setStampState((stampState) => !stampState);
  };

  return (
    <Box>
      <Grid container sx={{ justifyContent: "space-between" }}>
        {/* 아이디테일, 아이 기분 */}
        <Grid
          item
          xs={5.8}
          sx={{
            background: colorPalette.BACKGROUND_COLOR,
            boxShadow: 2,
            borderRadius: 2,
            p: 5,
          }}
        >
          <StudentInfo
            kidInfo={kidInfo}
            parentInfo={parentInfo}
            getKidsData={getKidsData}
          />
        </Grid>
        {/* 칭찬스티커 */}
        <Grid
          item
          xs={5.8}
          sx={{
            background: colorPalette.BACKGROUND_COLOR,
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", width: "100%", mb: 1.5 }}>
            <Box sx={{ width: "25%" }}></Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="h5"
                component="h2"
                id="font_test"
                textAlign="center"
                sx={{ mt: "5px", mb: "5px" }}
              >
                칭찬도장
              </Typography>
            </Box>
            <Box sx={{ width: "25%", display: "flex", mt: 1 }}>
              {stampState && (
                <Box sx={{ width: "50%" }}>
                  <TextField
                    id="font_test"
                    variant="outlined"
                    label="0~18"
                    size="small"
                    sx={{ background: "white", height: "80%" }}
                    value={stampCount}
                    fullWidth
                    //onChange={onChange}
                  />
                </Box>
              )}
              <Button
                variant="contained"
                size="small"
                sx={{ height: "90%" }}
                color="warning"
                onClick={quizStampSaveButtonClicked}
              >
                <Typography id="font_test" variant="body2">
                  {stampState ? "저장" : "수정"}
                </Typography>
              </Button>
            </Box>
          </Box>

          <QuizStampFrame stampCount={kidInfo.kid_stamp} />
        </Grid>
        {/* 아이 메모 */}
        <Grid
          item
          xs={5.8}
          sx={{
            background: colorPalette.BACKGROUND_COLOR,
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
            mt: 3,
          }}
        >
          <StudentMemo
            kidInfo={kidInfo}
            reRender={reRender}
            setReRender={setReRender}
          />
        </Grid>
        {/* 아이 특이사항 */}
        <Grid
          item
          xs={5.8}
          sx={{
            background: colorPalette.BACKGROUND_COLOR,
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
            mt: 3,
          }}
        >
          <StudentReport kidInfo={kidInfo} />
        </Grid>
      </Grid>
      {/* 마지막줄 => 키즈퀴즈 */}
      <Grid
        item
        xs={12}
        sx={{
          background: colorPalette.BACKGROUND_COLOR,
          boxShadow: 2,
          borderRadius: 2,
          p: 5,
          mt: 3,
          mb: 5,
        }}
      >
        {kidInfo.length !== 0 && <KidQuiz kidNo={kidInfo.kid_no} />}
      </Grid>
    </Box>
  );
};
export default KidsDetailInfo;
