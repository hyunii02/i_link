import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import MemoKiosk from "../../../components/Memo/Kiosk";
import Weather from "../../../components/Weather";
import MealKiosk from "../../../components/Meal/Kiosk";
import MealKioskSnack from "../../../components/Meal/KioskSnack";
import KioskLogout from "../../../components/User/KioskLogout";
import Clock from "../../../components/Weather/Clock";
import SelectKidKiosk from "../../../components/Parents/SelectKidKiosk";
import { getCurrentTime, getToday } from "../../../commonFuction";
import { useNavigate } from "react-router-dom";

const KioskMain = () => {
  const [kidName, setKidName] = useState(localStorage.getItem("kidName"));
  const navigate = useNavigate();
  useEffect(() => {
    const kidName = localStorage.getItem("kidName");
    const surveyDay = localStorage.getItem(kidName + "SurveyDay");
    if (
      surveyDay !== getToday() &&
      Number(getCurrentTime().slice(0, 2)) >= 12
    ) {
      navigate("/kiosk/survey");
    }
  }, [navigate, kidName]);
  return (
    <div style={{ color: "white" }}>
      <Grid
        container
        spacing={2}
        sx={{
          height: "45vh",
        }}
      >
        <Grid item xs={8}>
          <MemoKiosk />
        </Grid>
        <Grid item xs={3.5}>
          <Clock />
          <Weather />
        </Grid>
        <Grid item xs={0.5}>
          <KioskLogout />
          <SelectKidKiosk kidName={kidName} setKidName={setKidName} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          height: "45vh",
        }}
      >
        <Grid item xs={4}>
          <MealKiosk />
        </Grid>
        <Grid item xs={4}>
          <MealKioskSnack />
        </Grid>
      </Grid>
    </div>
  );
};

export default KioskMain;
