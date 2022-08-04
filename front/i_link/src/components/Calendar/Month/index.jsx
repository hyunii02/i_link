import { Box, Grid, Card, Typography } from "@mui/material";
import { useState } from "react";
import CalendayWeek from "../Week";

const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const month = [
  //
  [
    { id: 1, day: 0, meal: [], snack: [] },
    { id: 2, day: 0, meal: [], snack: [] },
    {
      id: 3,
      day: 1,
      meal: ["카레라이스", "야채스프", "마늘빵"],
      snack: ["과자1"],
    },
    {
      id: 4,
      day: 2,
      meal: ["흑미밥", "육개장", "미니돈까스"],
      snack: ["과자2"],
    },
    { id: 5, day: 3, meal: ["잡곡밥", "숭늉", "가지무침"], snack: ["과자3"] },
    { id: 6, day: 4, meal: ["잡채밥", "계란국", "총각김치"], snack: ["과자4"] },
    {
      id: 7,
      day: 5,
      meal: [],
      snack: [],
    },
  ],
  [
    {
      id: 8,
      day: 6,
      meal: [],
      snack: [],
    },
    {
      id: 9,
      day: 7,
      meal: ["카레라이스", "소고기스프", "배추김치"],
      snack: ["과자6"],
    },
    {
      id: 10,
      day: 8,
      meal: ["백미밥", "소고기미역국", "비엔나소시지"],
      snack: ["과자8"],
    },
    {
      id: 11,
      day: 9,
      meal: ["잡곡밥", "해물비빔소스", "우엉조림"],
      snack: ["과자9"],
    },
    {
      id: 12,
      day: 10,
      meal: ["현미밥", "가지냉국", "오이무침"],
      snack: ["과자10"],
    },
    {
      id: 13,
      day: 11,
      meal: ["코코팝스", "서울우유", "귤"],
      snack: ["과자11"],
    },
    { id: 14, day: 12, meal: [], snack: [] },
  ],
  [
    { id: 16, day: 13, meal: [], snack: [] },
    { id: 17, day: 14, meal: [], snack: [] },
    { id: 15, day: 15, meal: [], snack: [] },
    { id: 18, day: 16, meal: [], snack: [] },
    { id: 19, day: 17, meal: [], snack: [] },
    { id: 20, day: 18, meal: [], snack: [] },
    { id: 21, day: 19, meal: [], snack: [] },
  ],
  [
    { id: 22, day: 20, meal: [], snack: [] },
    { id: 23, day: 21, meal: [], snack: [] },
    { id: 24, day: 22, meal: [], snack: [] },
    { id: 25, day: 23, meal: [], snack: [] },
    { id: 26, day: 24, meal: [], snack: [] },
    { id: 27, day: 25, meal: [], snack: [] },
    { id: 28, day: 26, meal: [], snack: [] },
  ],
  [
    { id: 29, day: 27, meal: [], snack: [] },
    { id: 30, day: 28, meal: [], snack: [] },
    { id: 31, day: 29, meal: [], snack: [] },
    { id: 32, day: 30, meal: [], snack: [] },
    { id: 33, day: 31, meal: [], snack: [] },
    { id: 34, day: 0, meal: [], snack: [] },
    { id: 35, day: 0, meal: [], snack: [] },
  ],
];

const CalendarMonth = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {date.map((da, index) => (
          <Grid item xs={1.7}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Typography
                variant="body2"
                color={index % 6 === 0 ? "red" : "rgba(0, 0, 0, 0.4)"}
              >
                {da}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {month.map((week, index) => (
          <CalendayWeek key={index} week={week} />
        ))}
      </Grid>
    </Box>
  );
};

export default CalendarMonth;
