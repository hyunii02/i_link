// 2022.08.11 안정현
// 공지사항 날짜별로 가지고 오는 컴포넌트
import { useEffect, useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../../../context/user";
import { urls, baseURL } from "../../../api/axios";
import TodayList from "./TodayList";

import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

const NoticeHome = () => {
  const {userCenter} = useContext(UserContext);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    getNotice(userCenter);
  }, []); 

  const getNotice = async (centerNo) => {
    try {
      const response = await axios.get( baseURL + urls.fetchNotices + centerNo );
      if (response.data.length === 0) {
        setNotice("공지사항이 없습니다.")
      }
      else {
        const todaysNotice = response.data;
        const lenNoticeArr = todaysNotice.length
        const noticeStr = todaysNotice[lenNoticeArr-1].notice_title + ',' + todaysNotice[lenNoticeArr-2].notice_title + ',' + todaysNotice[lenNoticeArr-3].notice_title
        setNotice(noticeStr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Box>
        <Typography variant="h6" component="h2" id="font_test" align="center">
          공지사항
        </Typography>
        <TodayList items={notice} />
      </Box>
  );
}

export default NoticeHome
