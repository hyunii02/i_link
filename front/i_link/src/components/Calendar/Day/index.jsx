// 2022.08.05 김국진
// 1일치 달력 컴포넌트

import { Box, Button, Modal, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user";

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

// 모달창 컴포넌트
const ModalForm = (props) => {
  const { open, setOpen } = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

const CalendarDay = (props) => {
  const { day, index, dateInfo } = props;
  console.log(dateInfo.getFullYear());

  const fullDate =
    dateInfo.getFullYear() +
    "년 " +
    (dateInfo.getMonth() < 10
      ? "0" + (dateInfo.getMonth() + 1)
      : dateInfo.getMonth + 1) +
    "월 " +
    (day.day < 10 ? "0" + day.day : day.day) +
    "일";

  // 모달창 상태관리
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    textAlign="center"
                  >
                    {fullDate}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    식단 등록
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    간식 등록
                  </Typography>
                </Box>
              </Modal>
            </Box>
          )}
        {/* 식단이 문자열 형태로 들어올 시 사용 */}
        {day.meal}
        {/* 식단이 배열 형태로 들어올 시 사용..
        {day.meal.map((meal, index) => (
          <Typography key={index} variant="body2">
            {meal}
          </Typography>
        ))}
        */}
        {userType !== 3 && !isEmptyArr(day.meal) && (
          <Box sx={{ textAlign: "right" }}>
            <IconButton>
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CalendarDay;
