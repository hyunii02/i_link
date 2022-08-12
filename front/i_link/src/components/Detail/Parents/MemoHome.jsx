// 2022.08.11 안정현
// 알림장 날짜별로 가지고오는 컴포넌트
import React from "react";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../../../context/user";
import { getToday } from "../../../commonFuction";
import { urls, baseURL } from "../../../api/axios";

import Typography from "@mui/material/Typography";

import TodayList from "./TodayList";

const MemoHome = () => {
    const { userGroup } = useContext(UserContext);
    const [memo, setMemo] = useState('');
    useEffect(() => {
      getMemo(userGroup, getToday(), []);
    });
  
    const getMemo = async (groupNo, today) => {
      try {
        const response = await axios.get(baseURL + urls.fetchMemosList + groupNo);
        if (response.data.length === 0) {
          setMemo("오늘의 알림장이 없습니다")
        }
        else {
          const todaysMemos = response.data.filter(
          (memos) => memos.memo_date === today);
          setMemo(todaysMemos[0].memo_content);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div>
        <div>
          <Typography variant="h6" component="h2" id="font_test" align="center">
            알림장
          </Typography>
          <TodayList items={memo} />
        </div>
      </div>
    );
  }

export default MemoHome