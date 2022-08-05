// 2022.08.05 김국진
// 1일치 달력 컴포넌트

import { Box, Grid, Card, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { UserContext } from "../../../context/user";

const CalendarDay = (props) => {
  const { day, index } = props;

  // 편집 권한 체크를 위한 Context 호출
  const { userType } = useContext(UserContext);

  // 배열에 값이 들어있는지 체크용
  function isEmptyArr(arr) {
    if (Array.isArray(arr) && arr.length === 0) {
      return true;
    }

    return false;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "170px",
        borderTop: "1px solid black",
        height: "120px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "10%",
          marginTop: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Typography
          variant="body2"
          color={index % 6 === 0 ? "red" : "rgba(0, 0, 0, 0.4)"}
        >
          {day.day === 0 ? " " : day.day}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "90%",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        {userType !== 3 &&
          day.day !== 0 &&
          index % 6 !== 0 &&
          isEmptyArr(day.meal) && (
            <IconButton>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          )}
        {day.meal.map((meal) => (
          <Typography variant="body2">{meal}</Typography>
        ))}
        {isEmptyArr(day.meal) ||
          (userType !== 3 && (
            <Box sx={{ textAlign: "right" }}>
              <IconButton>
                <RemoveCircleOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default CalendarDay;
