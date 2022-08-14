// 2022.08.11 안정현
// 알림장 날짜별로 가지고오는 컴포넌트
import React from "react";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../../../context/user";
import { getToday } from "../../../commonFuction";
import { urls, baseURL } from "../../../api/axios";

import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

import TodayList from "./TodayList";

const MemoHome = () => {
  const { userGroup, firstKid } = useContext(UserContext);
  const [memo, setMemo] = useState("");
  useEffect(() => {
    getMemo(firstKid.group_no, getToday(), []);
  });

  const getMemo = async (groupNo, today) => {
    try {
      const response = await axios.get(baseURL + urls.fetchMemosList + groupNo);
      if (response.data.length === 0) {
        setMemo("오늘의 알림장이 없습니다");
      } else {
        const todaysMemos = response.data.filter(
          (memos) => memos.memo_date === today,
        );
        setMemo(todaysMemos[0].memo_content);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        id="font_test"
        align="center"
        sx={{ mt: 1, mb: 1 }}
      >
        🔔 알림장 🔔
      </Typography>
      <Grid container sx={{ justifyContent: "center" }}>
        {!memo && (
          <Typography id="font_test">
            오늘의 알림장이 아직 올라오지 않았어요
          </Typography>
        )}
      </Grid>
      <TodayList items={memo} />
    </Box>
  );
};

export default MemoHome;
