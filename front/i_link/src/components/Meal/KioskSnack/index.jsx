import React from "react";
import { axios, urls } from "../../../api/axios";
import { useEffect, useState } from "react";
import { getToday } from "../../../commonFuction";

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
    getSnack("1", getToday());
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
        오늘의 간식
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
        {!snack && <div>오늘은 뭘 먹을까요?</div>}
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
        {snack.split(",").map((food) => (
          <li key={food} style={{ marginLeft: "0px", marginBottom: "1vh" }}>
            {food}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealKioskSnack;
