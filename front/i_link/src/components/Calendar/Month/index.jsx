// 2022.08.05 김국진
// 1달치 달력 컴포넌트

import { Box, Grid, Typography } from "@mui/material";
import CalendayWeek from "../Week";

const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarMonth = (props) => {
  const { monthMenu, dateInfo, refreshHandler } = props;

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
          <Grid item key={index} xs={1.7}>
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
        {monthMenu?.map((week, index) => (
          <CalendayWeek
            key={index}
            week={week}
            dateInfo={dateInfo}
            refreshHandler={refreshHandler}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default CalendarMonth;
