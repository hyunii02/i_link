// 2022.08.11 안정현
// 식단 날짜별로 가지고오는 컴포넌트
import Typography from "@mui/material/Typography";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../../../context/user";
import { urls, baseURL } from "../../../api/axios";
import { getToday } from "../../../commonFuction";
import TodayList from "./TodayList"

const MealHome = () => {
  const { userCenter } = useContext(UserContext);
  const [meal, setMeal] = useState("");
  useEffect(() => {
    getMeal(userCenter, getToday());
  }, []);

  const getMeal = async (centerNo, today) => {
    try {
      const response = await axios.get(
        baseURL + urls.fetchMealsList + centerNo + "/" + today
      );
      if (response.data.length === 0) {
        setMeal("오늘의 식단이 없습니다.")
      }
      else {
        const todaysMealArr = response.data.filter(
          (meal) => meal.meal_date === today
        );
        const todaysMeal = todaysMealArr[0].meal_content;
        setMeal(todaysMeal);
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      <Typography variant="h6" component="h2" id="font_test" align="center">
        식단
      </Typography>
      {!meal && <div>오늘의 식단이 아직 올라오지 않았어요</div>}
      <TodayList items={meal}></TodayList>
    </div>
  );
};

export default MealHome