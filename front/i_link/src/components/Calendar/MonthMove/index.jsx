// 2022.08.05 김국진
// 달력 통합 컴포넌트

import { Box, Grid, Card, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// 현재 시간 읽어들이기
let dateTime = new Date();
let year = dateTime.getFullYear();
let month = dateTime.getMonth() + 1;
let date = dateTime.getDate();

const CalendarMonthMove = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "10px",
      }}
    >
      <IconButton>
        <ArrowBackIosIcon />
      </IconButton>
      <Typography variant="h5" color="rgba(0, 0, 0, 0.6)">
        {year}-{month < 10 ? "0" + month : month}
      </Typography>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default CalendarMonthMove;
