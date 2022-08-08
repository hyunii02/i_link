import React from "react";
import { axios, urls } from "../../../api/axios";
import { useEffect, useState } from "react";
import { getToday } from "../../../commonFuction";

const MealKioskSnack = () => {
  const [meal, setMeal] = useState("");

  const getMeal = async (centerNo, today) => {
    try {
      const response = await axios.get(
        urls.fetchMealsList + centerNo + "/" + today
      );
      const todaysMealArr = response.data.filter(
        (meal) => meal.meal_date === today
      );
      const todaysMeal = todaysMealArr[0].meal_content;
      setMeal(todaysMeal);
    } catch (err) {}
  };

  useEffect(() => {
    getMeal("1", getToday());
  }, []);
  return (
    <div>
      <div
        style={{
          fontFamily: "NanumJangMiCe",
          fontSize: "5vh",
          paddingLeft: "1vh",
        }}
      >
        오늘의 식단
      </div>
      <div
        style={{
          listStyle: "none",
          fontFamily: "NanumGimYuICe",
          fontSize: "4vh",
          marginTop: "1vh",
          marginLeft: "1vh",
        }}
      >
        {!meal && <div>오늘은 뭘 먹을까요?</div>}
      </div>
      <ul
        style={{
          listStyle: "none",
          fontFamily: "NanumGimYuICe",
          fontSize: "4vh",
          marginTop: "1vh",
          marginLeft: "1vh",
          paddingLeft: "0",
        }}
      >
        {meal.split(",").map((food) => (
          <li key={food} style={{ marginLeft: "0px", marginBottom: "1vh" }}>
            {food}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealKioskSnack;
