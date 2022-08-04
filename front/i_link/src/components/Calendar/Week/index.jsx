import { Box, Grid, Card, Typography } from "@mui/material";
import CalendarDay from "../Day";

const CalendayWeek = (props) => {
  const { week } = props;
  return (
    <Box
      sx={{
        minWidth: "200px",
        width: "100%",
      }}
    >
      <Grid container sx={{ width: "100%" }} spacing={1}>
        {week.map((day, index) => (
          <Grid item key={day.id} xs="1.7">
            <CalendarDay day={day} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CalendayWeek;
