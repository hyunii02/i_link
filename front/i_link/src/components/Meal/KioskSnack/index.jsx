import React from "react";
import { axios, urls } from "../../../api/axios";
import { useEffect, useState } from "react";
import { getToday } from "../../../commonFuction";
import { ItemsList, KioskTitle } from "../../Common";

const MealKioskSnack = () => {
  const [snack, setSnack] = useState("");

  const getSnack = async (centerNo, today) => {
    try {
      const response = await axios.get(
        urls.fetchMealsList + centerNo + "/" + today
      );
      const todaysSnackArr = response.data.filter(
        (snack) => snack.meal_date === today
      );
      const todaysSnack = todaysSnackArr[0].snack_content;
      setSnack(todaysSnack);
    } catch (err) {}
  };

  useEffect(() => {
    const surveyDay = localStorage.getItem(
      localStorage.getItem("kidName") + "SurveyDay"
    );
    if (surveyDay === getToday()) {
      getSnack(localStorage.getItem("kidCenter"), getToday(true));
    } else {
      getSnack(localStorage.getItem("kidCenter"), getToday());
    }
  }, []);
  return (
    <div>
      <KioskTitle title="오늘의 간식" />
      <div
        style={{
          listStyle: "none",
          fontFamily: "NanumGimYuICe",
          fontSize: "4vh",
          marginTop: "1vh",
          marginLeft: "1vh",
        }}
      >
        {!snack && <div>오늘은 뭘 먹을까요?</div>}
      </div>
      <ItemsList items={snack}></ItemsList>
    </div>
  );
};

export default MealKioskSnack;
