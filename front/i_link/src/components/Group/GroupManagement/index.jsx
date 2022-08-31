// 원장>반관리>반관리 컴포넌트
// create by 김국진
import { useState, useEffect, useContext } from "react";
import GroupListItem from "../GroupListItem/";
import GroupInsert from "../GroupInsert/";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { UserContext } from "../../../context/user";

const headerList = [
  {
    id: 1,
    text: "반 이름",
    length: 4,
    ml: 2,
  },
  {
    id: 2,
    text: "반 인원",
    length: 4,
    ml: -2,
  },
  {
    id: 3,
    text: "교사 수",
    length: 3,
    ml: -1,
  },
  {
    id: 4,
    text: "반 삭제",
    length: 1,
    ml: 0,
  },
];

let newId = 6;

const GroupManagement = (props) => {
  const { getGroupList, classData, setClassData, getsubmitList } = props;
  // 반 등록 컴포넌트에 대한 state 값
  const [insertFlag, setInsertFlag] = useState(false);

  // 유치원 search를 위한 useContext
  const { userType } = useContext(UserContext);

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
          <Button
            variant="outlined"
            color="warning"
            onClick={insertClicked}
            size="large"
          >
            <Typography id="font_test">추가</Typography>
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
              ml={list.ml}
              key={list.id}
            >
              <ListItemText>
                <Typography
                  variant="h6"
                  id="font_test"
                  style={{ color: "rgba(0, 0, 0, 0.7)" }}
                >
                  {list.text}
                </Typography>
              </ListItemText>
            </Grid>
          ))}
        </Grid>
        {/* state값에 맞게 반 등록 컴포넌트를 on/off */}
        {insertFlag && (
          <Box
            sx={{ marginTop: "10px", marginBottom: "10px", marginLeft: "10px" }}
          >
            <GroupInsert
              cancelClicked={insertComponentToggle}
              getGroupList={getGroupList}
            />
          </Box>
        )}
        {/* 반의 객체 갯수만큼 반 리스트 컴포넌트를 화면에 렌더링 */}
        {classData.map((data) => (
          <GroupListItem
            classData={data}
            className={data.group_name}
            key={data.group_no}
            deleteClicked={deleteClicked}
            getGroupList={getGroupList}
            getsubmitList={getsubmitList}
          ></GroupListItem>
        ))}
      </List>
      {/* 반 정보 그리드 종료 */}
    </Box>
  );
};

export default GroupManagement;
