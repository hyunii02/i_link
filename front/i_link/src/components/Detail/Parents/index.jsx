// 2022.08.05 김국진 create
// 2022.08.11 ~ 12 안정현
// 부모>아이보기 페이지 통합 컴포넌트
import { useState } from "react";

import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

import KidCard from "./KidCard";
import KidFeel from "./KidFeel";
import MemoHome from "./MemoHome";
import NoticeHome from "./NoticeHome";
import MealHome from "./MealHome";
import SnackHome from "./SnackHome";

// 학부모 home 페이지
export default function ParentsDetail() {
  const [feel, setFeel] = useState('4'); //아이 기분 default값으로 행복(4) 넣어줌
  const [centerName, setCenterName] = useState('')
  const [groupName, setGroupName] = useState('')

  return (
    <Box>
      {/* 첫줄 =>아이디테일, 아이정보, 칭찬스티커 */}
      <Grid container sx={{ justifyContent:"space-between"}}>
        <Grid item xs={3.5} sx={{ p:5 }}>
          <KidCard/>
        </Grid>
        <Grid 
          item xs={4}
          sx={{   
          bgcolor: '#fff',
          boxShadow: 1,
          borderRadius: 2,
          p:5 }}>
          <KidFeel feel={feel} setFeel={setFeel} centerName={centerName} setCenterName={setCenterName} groupName={groupName} setGroupName={setGroupName} sx={{ justifyContent:"center"}}></KidFeel>
        </Grid>
        <Grid item xs={4} sx={{
          bgcolor: '#fff',
          boxShadow: 1,
          borderRadius: 2,
          p:5}}>
          <Typography variant="h6" component="h2">
            칭찬스티커
          </Typography>
        </Grid>
      {/* 중간줄 =>공지사항, 알림장, 식단/간식 */}
        {/* 공지사항 */}
        <Grid item xs={3.5} sx={{
          border: 3,
          borderColor: '#FAD573',
          bgcolor: '#fff',
          boxShadow: 1,
          borderRadius: 2,
          mt:5}}>
          <NoticeHome></NoticeHome>
        </Grid>
        {/* 알림장 */}
        <Grid item xs={3.5} sx={{
          bgcolor: '#fff',
          boxShadow: 1,
          borderRadius: 2,
          mt:5}}>
          <MemoHome></MemoHome>
        </Grid>
        {/* 식단 */}
        <Grid item xs={2} sx={{
          bgcolor: '#fff',
          boxShadow: 1,
          borderRadius: 2,
          mt:5}}>
          <MealHome></MealHome>
        </Grid>
        {/* 간식 */}
        <Grid item xs={2} sx={{
          bgcolor: '#fff',
          boxShadow: 1,
          borderRadius: 2,
          mt:5}}>
          <SnackHome></SnackHome>
        </Grid>
        {/* 마지막줄 => 키즈퀴즈(순서대로 2개씩) */}
        <Grid item xs={5.7} sx={{
          bgcolor: '#fff',
          boxShadow: 1,
          borderRadius: 2,
          p:5,
          mt:3,
          mb:5}}>
          <Typography variant="h6" component="h2">
            키즈퀴즈 1
          </Typography>
        </Grid>
        <Grid item xs={5.7} sx={{
          bgcolor: '#fff',
          boxShadow: 1,
          borderRadius: 2,
          p:5,
          mt:3,
          mb:5}}>
          <Typography variant="h6" component="h2">
            키즈퀴즈 2
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
