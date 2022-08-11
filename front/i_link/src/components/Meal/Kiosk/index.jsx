import React from "react";
import { axios, urls } from "../../../api/axios";
import { useEffect, useState } from "react";
import { getToday } from "../../../commonFuction";
import { ItemsList, KioskTitle } from "../../Common";

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
    const surveyDay = localStorage.getItem(
      localStorage.getItem("kidName") + "SurveyDay"
    );
    if (surveyDay === getToday()) {
      getMeal(localStorage.getItem("userCenter"), getToday(true));
    } else {
      getMeal(localStorage.getItem("userCenter"), getToday());
    }
  }, []);
  return (
    <div>
      <KioskTitle title="오늘의 식단" />
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
      <ItemsList items={meal}></ItemsList>
    </div>
  );
};

export default MealKioskSnack;
