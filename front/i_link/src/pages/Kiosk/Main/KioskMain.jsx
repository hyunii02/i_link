import React from "react";
import { Grid } from "@mui/material";
import MemoKiosk from "../../../components/Memo/Kiosk";
import Weather from "../../../components/Weather";
import MealKiosk from "../../../components/Meal/Kiosk";
import MealKioskSnack from "../../../components/Meal/KioskSnack";
import KioskLogout from "../../../components/User/KioskLogout";

const KioskMain = () => {
  return (
    <div style={{ color: "white" }}>
      <Grid
        container
        spacing={2}
        sx={{
          height: "50vh",
        }}
      >
        <Grid item xs={8}>
          <MemoKiosk />
        </Grid>
        <Grid item xs={3}>
          <Weather />
        </Grid>
        <Grid item xs={1}>
          <KioskLogout />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          height: "50vh",
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
