// 원장>반관리>반관리 컴포넌트
// create by 김국진
import { useState } from "react";
import GroupListItem from "../GroupListItem/";
import GroupInsert from "../GroupInsert/";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// 테스트용 데이터
const subData = [
  {
    id: 1,
    className: "장미반",
    studentNum: 20,
    teacherNum: 2,
  },
  {
    id: 2,
    className: "햇살반",
    studentNum: 15,
    teacherNum: 1,
  },
  {
    id: 3,
    className: "양념반",
    studentNum: 15,
    teacherNum: 2,
  },
  {
    id: 4,
    className: "후라이드반",
    studentNum: 16,
    teacherNum: 2,
  },
  {
    id: 5,
    className: "배지우반",
    studentNum: 10,
    teacherNum: 1,
  },
];

const headerList = [
  {
    id: 1,
    text: "반 이름",
    length: 4,
  },
  {
    id: 2,
    text: "반 인원",
    length: 4,
  },
  {
    id: 3,
    text: "교사 수",
    length: 3,
  },
  {
    id: 4,
    text: "반 삭제",
    length: 1,
  },
];

let newId = 6;

const GroupManagement = () => {
  // 반 등록 컴포넌트에 대한 state 값
  const [insertFlag, setInsertFlag] = useState(false);
  // 통합 반 정보 state 값
  const [classData, setClassData] = useState(subData);

  // 반 등록 버튼 클릭 시 핸들러함수
  const insertClicked = () => {
    // 반 등록 컴포넌트에 대한 state값 toggle
    insertComponentToggle();
  };

  // 반 삭제 버튼 클릭 시 핸들러함수
  const deleteClicked = (className) => {
    // 현재 state에서 해당 반 삭제
    const newClass = classData.filter((data) => data.className !== className);
    setClassData(newClass);
  };

  // 반 추가하기 컴포넌트 toggle
  function insertComponentToggle() {
    setInsertFlag((insertFlag) => !insertFlag);
  }

  // props용 반 추가 함수
  const insertClass = (data) => {
    console.log(data, newId);
    const newClass = classData.concat({ id: newId, className: data });
    setClassData(newClass);
    newId = newId + 1;
    console.log(classData);
  };

  return (
    /* 화면 크게 감싸주는 Part */
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            id="font_test"
            sx={{ color: "rgba(0, 0, 0, 0.7)" }}
          ></Typography>
        </Box>
        <Box>
          {/* 반 추가하기 버튼*/}
          <Button variant="outlined" onClick={insertClicked} size="large">
            반 추가하기
          </Button>
        </Box>
      </Box>
      {/* 반 정보 그리드 시작 */}
      <List
        sx={{
          bgcolor: "#FAF1DA",
          border: "2px solid #ffe2e2",
          borderRadius: "20px",
        }}
      >
        <Grid
          container
          sx={{
            height: "50px",
            background: "#ffe2e2",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            marginTop: "-10px",
          }}
        >
          {headerList.map((list) => (
            <Grid
              item
              xs={list.length}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              key={list.id}
            >
              <ListItemText>
                <Typography variant="h6" style={{ color: "#000000" }}>
                  {list.text}
                </Typography>
              </ListItemText>
            </Grid>
          ))}
        </Grid>
        {/* state값에 맞게 반 등록 컴포넌트를 on/off */}
        {insertFlag && (
          <GroupInsert
            insertClass={insertClass}
            cancelClicked={insertComponentToggle}
          />
        )}
        {/* 반의 객체 갯수만큼 반 리스트 컴포넌트를 화면에 렌더링 */}
        {classData.map((sub) => (
          <GroupListItem
            classData={sub}
            className={sub.className}
            studentNum={sub.studentNum}
            teacherNum={sub.teacherNum}
            key={sub.className}
            deleteClicked={deleteClicked}
          ></GroupListItem>
        ))}
      </List>
      {/* 반 정보 그리드 종료 */}
    </Box>
  );
};

export default GroupManagement;
