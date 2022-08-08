// 2022.08.05 김국진
// 1일치 달력 컴포넌트

import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user";
import DietInsert from "../DietInsert";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { axios, baseURL, urls } from "../../../api/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

let dietIdx = 1; // 식단 추가 시 id
let snackIdx = 1; // 식단 추가 시 id

const CalendarDay = (props) => {
  const { day, index, dateInfo, refreshHandler } = props;
  const [dayData, setDayData] = useState(day);

  const fullDateLatter =
    dateInfo.getFullYear() +
    "년" +
    (dateInfo.getMonth() < 10
      ? "0" + (dateInfo.getMonth() + 1)
      : dateInfo.getMonth + 1) +
    "월" +
    (dayData.day < 10 ? "0" + dayData.day : dayData.day) +
    "일";

  const fullDate =
    dateInfo.getFullYear() +
    "- " +
    (dateInfo.getMonth() < 10
      ? "0" + (dateInfo.getMonth() + 1)
      : dateInfo.getMonth + 1) +
    "- " +
    (dayData.day < 10 ? "0" + dayData.day : dayData.day) +
    "-";

  // 모달창 상태관리
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDiet("");
    setDietList([]);
  };
  // 식단 추가
  const [diet, setDiet] = useState("");
  const [dietList, setDietList] = useState([]);

  // 간식 추가
  const [snack, setSnack] = useState("");
  const [snackList, setSnackList] = useState([]);

  // 편집 권한 체크를 위한 Context 호출
  const { userType, userCenter } = useContext(UserContext);

  // 모달창 > 식단 추가 시
  const dietInsertHandler = (e) => {
    if (e.key === "Enter") {
      const obj = {
        id: dietIdx++,
        content: diet,
      };
      setDietList((dietList) => [...dietList, obj]);
      setDiet("");
    }
  };

  // 모달창 > 식단 삭제 시
  const dietDeleteHandler = (id) => {
    // 기존 삭제할 id값을 뺀 객체를 새로 생성한다
    const newArray = dietList.filter((item) => {
      return item.id !== id;
    });
    setDietList(newArray);
  };

  // 모달창 > 스낵 추가 시
  const snackInsertHandler = (e) => {
    if (e.key === "Enter") {
      const obj = {
        id: snackIdx++,
        content: snack,
      };
      setSnackList((snackList) => [...snackList, obj]);
      setSnack("");
    }
  };

  // 모달창 > 스낵 삭제 시
  const snackDeleteHandler = (id) => {
    // 기존 삭제할 id값을 뺀 객체를 새로 생성한다
    const newArray = snackList.filter((item) => {
      return item.id !== id;
    });
    setSnackList(newArray);
  };

  // 식단 등록 버튼 핸들러..
  // 서버에 POST로 Data 전송
  const insertButtonClickHandler = () => {
    // 서버에 보낼 하루치 식단/간식 객체를 생성
    const newObj = {
      centerNo: 1,
      snackContent: snackList
        .map((list) => {
          return list.content;
        })
        .join(","),
      mealContent: dietList
        .map((list) => {
          return list.content;
        })
        .join(","),
      mealDate: fullDate,
    };
    try {
      // Data부에 객체를 담아 POST 전송
      axios
        .post(urls.fetchMealsRegister, newObj)
        .then((response) => console.log(response));
      handleClose();
      const obj = {
        ...day,
        meal: dietList
          .map((list) => {
            return list.content;
          })
          .join(","),
        snack: snackList
          .map((list) => {
            return list.content;
          })
          .join(","),
      };
      setDayData((dayData) => obj);
      refreshHandler();
    } catch (e) {
      console.log(e);
    }
  };

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
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "10%",
          marginTop: "2px",
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
          {dayData.day === 0 ? " " : dayData.day}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        {userType !== 3 &&
          dayData.day !== 0 &&
          index % 6 !== 0 &&
          isEmptyArr(dayData.meal) && (
            <Box>
              <Button onClick={handleOpen}>
                <AddCircleOutlineIcon fontSize="large"></AddCircleOutlineIcon>
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="font_test"
                    variant="h5"
                    component="h2"
                    textAlign="center"
                  >
                    {fullDateLatter}
                  </Typography>
                  <Typography id="font_test" variant="h6" sx={{ mt: 2 }}>
                    식단 등록
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="식단을 입력하세요"
                    variant="outlined"
                    size="small"
                    value={diet}
                    fullWidth
                    sx={{ marginTop: "10px" }}
                    onChange={(e) => {
                      setDiet((diet) => e.target.value);
                    }}
                    onKeyDown={dietInsertHandler}
                  />
                  {dietList.map((list) => (
                    <DietInsert
                      listItem={list}
                      key={list.id}
                      deleteHandler={dietDeleteHandler}
                    />
                  ))}
                  <Typography id="font_test" variant="h6" sx={{ mt: 2 }}>
                    간식 등록
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="간식을 입력하세요"
                    variant="outlined"
                    size="small"
                    value={snack}
                    fullWidth
                    sx={{ marginTop: "10px" }}
                    onChange={(e) => {
                      setSnack((snack) => e.target.value);
                    }}
                    onKeyDown={snackInsertHandler}
                  />
                  {snackList.map((list) => (
                    <DietInsert
                      listItem={list}
                      key={list.id}
                      deleteHandler={snackDeleteHandler}
                    />
                  ))}
                  <Box sx={{ marginTop: "20px" }}>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      fullWidth
                      style={{ marginRight: "5%" }}
                      onClick={insertButtonClickHandler}
                    >
                      <Typography variant="h6" id="font_test">
                        등록하기
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          )}
        {/* 식단이 문자열 형태로 들어올 시 사용 */}
        <Box sx={{ marginRight: "5px", marginLeft: "10px" }}>
          <Typography id="font_test" variant="body2">
            {dayData.meal}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "5px" }}>
          <Typography id="font_test" variant="body2">
            {dayData.snack}
          </Typography>
        </Box>
        {/* 식단이 배열 형태로 들어올 시 사용..
        {day.meal.map((meal, index) => (
          <Typography key={index} variant="body2">
            {meal}
          </Typography>
        ))}
        */}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "5%",
          textAlign: "center",
          marginTop: "10px",
          position: "absolute",
          top: "110px",
        }}
      >
        {userType !== 3 && !isEmptyArr(dayData.meal) && (
          <Box sx={{ textAlign: "right" }}>
            <IconButton>
              <RemoveCircleOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CalendarDay;
