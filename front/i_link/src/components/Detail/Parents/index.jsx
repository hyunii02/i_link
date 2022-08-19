// 2022.08.05 김국진 create
// 2022.08.11 ~ 12 안정현
// 2022.08.14 김국진
// 부모>아이보기 페이지 통합 컴포넌트
import { useState, useContext } from "react";

import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import { colorPalette } from "../../../constants/constants.js";
import { UserContext } from "../../../context/user.js";

import KidFeel from "./KidFeel";
import MemoHome from "./MemoHome";
import NoticeHome from "./NoticeHome";
import MealHome from "./MealHome";
import KidQuiz from "./KidQuiz";
import QuizStampFrame from "../../Quiz/QuizStampFrame/";
import { useEffect } from "react";
import { baseURL, urls, axios } from "../../../api/axios.jsx";

// 학부모 home 페이지
export default function ParentsDetail() {
  const [feel, setFeel] = useState("4"); //아이 기분 default값으로 행복(4) 넣어줌
  const [centerName, setCenterName] = useState("");
  const [groupName, setGroupName] = useState("");

  const { firstKid } = useContext(UserContext);
  const [kidInfo, setKidInfo] = useState(firstKid);
  const [stampCount, setStampCount] = useState(0);
  const [kidState, setKidState] = useState(0);

  const getKidInfo = (kidno) => {
    try {
      const fullURL = baseURL + urls.fetchKidsDetail + kidno;
      axios.get(fullURL).then((response) => {
        setKidState((kidState) => parseInt(response.data.kid_state));
        setStampCount(parseInt(response.data.kid_stamp));
        setKidInfo(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setKidInfo(firstKid);
    getKidInfo(firstKid.kid_no);
  }, [firstKid]);

  return (
    <Box>
      {/* 첫줄 =>아이디테일, 아이 기분 칭찬스티커 */}
      <Grid container sx={{ justifyContent: "space-between" }}>
        {firstKid.group_no === null && (
          <Grid item xs={12}>
            <Typography
              id="font_test"
              variant="h5"
              color="rgba(0,0,0,0.5)"
              textAlign="center"
              mb="20px"
            >
              아직 유치원 반 배정이 되지 않았습니다.
              <br /> 반 배정이 완료되어야 정상적인 서비스 이용이 가능합니다.
            </Typography>
          </Grid>
        )}
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
          <KidFeel
            feel={feel}
            setFeel={setFeel}
            centerName={centerName}
            setCenterName={setCenterName}
            groupName={groupName}
            setGroupName={setGroupName}
            kidState={kidState}
            sx={{ justifyContent: "center" }}
          ></KidFeel>
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
          <Typography
            variant="h6"
            component="h2"
            id="font_test"
            textAlign="center"
            sx={{ mt: "5px", mb: "5px" }}
          >
            칭찬도장
          </Typography>
          <QuizStampFrame stampCount={stampCount} />
        </Grid>
        {/* 중간줄 =>공지사항, 알림장, 식단/간식 */}
        {/* 공지사항 */}
        <Grid
          item
          xs={4.5}
          sx={{
            background: colorPalette.BACKGROUND_COLOR,
            boxShadow: 2,
            borderRadius: 2,
            mt: 5,
          }}
        >
          <NoticeHome></NoticeHome>
        </Grid>
        {/* 알림장 */}
        <Grid
          item
          xs={2.5}
          sx={{
            background: colorPalette.BACKGROUND_COLOR,
            boxShadow: 2,
            borderRadius: 2,
            mt: 5,
          }}
        >
          <MemoHome></MemoHome>
        </Grid>
        {/* 식단 및 간식 */}
        <Grid
          item
          xs={4}
          sx={{
            background: colorPalette.BACKGROUND_COLOR,
            boxShadow: 2,
            borderRadius: 2,
            mt: 5,
            justifyContent: "space-between",
          }}
        >
          <MealHome></MealHome>
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
          <KidQuiz kidNo={kidInfo.kid_no} />
        </Grid>
      </Grid>
    </Box>
  );
}
