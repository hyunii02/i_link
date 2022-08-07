// 2022.08.05 김국진
// 1주치 달력 컴포넌트

import { Box, Grid, Card, Typography } from "@mui/material";
import CalendarDay from "../Day";

const CalendayWeek = (props) => {
  const { week, dateInfo } = props;
  return (
    <Box
      sx={{
        minWidth: "200px",
        width: "100%",
      }}
    >
      <Grid container sx={{ width: "100%" }} spacing={1}>
        {week.map((day, index) => (
          <Grid item key={day.id} xs={1.7}>
            <CalendarDay day={day} index={index} dateInfo={dateInfo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CalendayWeek;
