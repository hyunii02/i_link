// 2022.08.05 김국진
// 2022.08.06 김국진 식단 api get 작업
// 달력 통합 컴포넌트
import { useState, useEffect, useContext } from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarMonth from "../Month";
import {
  format,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { baseURL } from "../../../api/axios";
import axios from "axios";
import { urls } from "../../../api/axios";
import { UserContext } from "../../../context/user";

const days = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarMonthMove = () => {
  // 현재 달력 상태 관리
  const [searchDate, setSearchDate] = useState(new Date());
  // 서버에서 응답받은 달 단위 식단 데이터 상태 관리
  const [monthMenu, setMonthMenu] = useState([]);

  const { firstKid, userGroup, userCenter } = useContext(UserContext);

  // 하위 컴포넌트로 보낼 데이터 포매팅
  const dataSetting = (data) => {
    const array = [];
    let idIdx = 1;
    let dayIdx = 1;

    // 현재 달에서 1일이 되는 인덱스를 가져옴 0:일 1:월 2:화 3:수 4:목 5:금 6:토
    const startDay = startOfMonth(searchDate).getDay();
    // 현재 달에서 마지막날짜를 가져옴
    const endDay = endOfMonth(searchDate).getDate();

    // 주 기준으로 배열 관리
    for (let i = 0; i < (startDay + endDay) / 7; i++) {
      const week = [];
      // 하루 기준으로 객체 관리
      for (let j = 0; j < 7; j++) {
        const day = idIdx > startDay ? (dayIdx <= endDay ? dayIdx++ : 0) : 0;
        const filteredData = data.filter((item) => {
          return parseInt(item.meal_date.split("-")[2]) === day;
        });
        const obj = {
          id: idIdx,
          day: day,
          meal:
            filteredData[0] === undefined ? [] : filteredData[0].meal_content,
          snack:
            filteredData[0] === undefined ? [] : filteredData[0].snack_content,
          meal_no: filteredData[0] === undefined ? 0 : filteredData[0].meal_no,
        };
        idIdx++;
        week.push(obj);
      }
      array.push(week);
    }

    setMonthMenu((monthMenu) => array);
  };

  const refreshHandler = () => {
    getDietList();
  };

  const getDietList = () => {
    const subParams =
      (firstKid === null ? userCenter : firstKid.center_no) +
      "/" +
      // YYYY-MM-DD 문자열 포맷으로 변경
      searchDate.getFullYear() +
      "-" +
      (parseInt(searchDate.getMonth()) + 1 < 10
        ? "0" + (parseInt(searchDate.getMonth()) + 1)
        : parseInt(searchDate.getMonth()) + 1) +
      "-01";

    // [API] 현재 달의 급식 목록 get
    axios
      .get(baseURL + urls.fetchMealsList + subParams)
      .then((response) => dataSetting(response.data));
  };

  // 화면이 렌더링 될 때
  useEffect(() => {
    getDietList();
  }, [searchDate]);

  // 이전 달 보기 버튼 클릭 핸들러
  const prevButtonClickedHandler = () => {
    setSearchDate(subMonths(searchDate, 1));
  };

  // 다음 달 보기 버튼 클릭 핸들러
  const nextButtonClickedHandler = () => {
    setSearchDate(addMonths(searchDate, 1));
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: "10px",
        }}
      >
        <IconButton onClick={prevButtonClickedHandler}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h5" color="rgba(0, 0, 0, 0.6)">
          {searchDate.getFullYear()}-
          {searchDate.getMonth() + 1 < 10
            ? "0" + (searchDate.getMonth() + 1)
            : searchDate.getMonth() + 1}
        </Typography>
        <IconButton onClick={nextButtonClickedHandler}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box>
        <CalendarMonth
          monthMenu={monthMenu}
          dateInfo={searchDate}
          refreshHandler={refreshHandler}
        ></CalendarMonth>
      </Box>
    </Box>
  );
};

export default CalendarMonthMove;
