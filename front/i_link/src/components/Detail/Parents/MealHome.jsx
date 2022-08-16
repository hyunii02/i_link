// 2022.08.11 안정현
// 식단 날짜별로 가지고오는 컴포넌트
import Typography from "@mui/material/Typography";
import { useEffect, useContext, useState } from "react";

import { Box, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

import { UserContext } from "../../../context/user";
import { axios, urls, baseURL } from "../../../api/axios";
import { getToday } from "../../../commonFuction";
import TodayList from "./TodayList";
import SnackHome from "./SnackHome";

const MealHome = () => {
  const { userCenter, firstKid } = useContext(UserContext);
  const [meal, setMeal] = useState("");
  useEffect(() => {
    getMeal(firstKid.center_no, getToday());
  }, []);

  const getMeal = async (centerNo, today) => {
    try {
      const response = await axios.get(
        urls.fetchMealsList + centerNo + "/" + today,
      );
      if (response.data.length === 0) {
        setMeal("오늘의 식단이 없습니다.");
      } else {
        const todaysMealArr = response.data.filter(
          (meal) => meal.meal_date === today,
        );
        const todaysMeal = todaysMealArr[0].meal_content;
        setMeal(todaysMeal);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs sx={{ height: 200 }}>
          <Typography
            variant="h6"
            component="h2"
            id="font_test"
            align="center"
            sx={{ mt: 1, mb: 1 }}
          >
            🍴 식단 🍴
          </Typography>
          <Grid container sx={{ justifyContent: "center" }}>
            {!meal && (
              <Typography id="font_test" sx={{ marginLeft: 2 }}>
                오늘의 식단이 아직 올라오지 않았어요
              </Typography>
            )}
          </Grid>
          <TodayList items={meal}></TodayList>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs>
          <SnackHome></SnackHome>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MealHome;
