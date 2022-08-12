// 2022.08.11 안정현
// 간식 날짜별로 가지고오는 컴포넌트
import Typography from "@mui/material/Typography";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../../../context/user";
import { urls, baseURL } from "../../../api/axios";
import { getToday } from "../../../commonFuction";
import TodayList from "./TodayList"

const SnackHome = () => {
  const {userCenter} = useContext(UserContext);
  const [snack, setSnack] = useState("");

  useEffect(() => {
    getSnack(userCenter, getToday());
  }, []);

  const getSnack = async (centerNo, today) => {
    try {
      const response = await axios.get(
        baseURL + urls.fetchMealsList + centerNo + "/" + today
      );
      if (response.data.length === 0) {
        setSnack("오늘의 간식이 없습니다.")
      }
      else {
        const todaysSnackArr = response.data.filter(
          (snack) => snack.meal_date === today
        );
        const todaysSnack = todaysSnackArr[0].snack_content;
        setSnack(todaysSnack);
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      <Typography variant="h6" component="h2" id="font_test" align="center">
        간식
      </Typography>
      <TodayList items={snack}></TodayList>
    </div>
  );
};

export default SnackHome