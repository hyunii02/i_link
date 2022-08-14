// 2022.08.11 안정현
// 공지사항 날짜별로 가지고 오는 컴포넌트
import { useEffect, useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../../../context/user";
import { urls, baseURL } from "../../../api/axios";
import TodayList from "./TodayList";

import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";

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
        console.log(todaysNotice)
        const mainNotice = todaysNotice[0].notice_title + ',' + todaysNotice[1].notice_title + ',' + todaysNotice[2].notice_title;
        setNotice(mainNotice); //최신 3개의 공지사항 title을 보여줌
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Box sx={{ height: 200 }}>
        <Typography variant="h6" component="h2" id="font_test" align="center" sx={{ mt:1 }}>
          ❗ 공지사항 ❗
        </Typography>
        <Grid container sx={{justifyContent:"center"}}>
          {!notice && <Typography id="font_test" sx={{ marginLeft:2, mt:1 }}>공지사항이 아직 올라오지 않았어요</Typography>}
        </Grid>
        <TodayList items={notice} />
      </Box>
  );
}

export default NoticeHome
