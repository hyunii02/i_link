// 가입 승인 통합 컴포넌트
// 2022.08.05 김국진 전체 수정

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import RegistMemberLists from "../RegistKidsLists";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

// Dummy Data
const kids = [
  {
    id: 1123,
    name: "김국진",
    group: "자바반",
  },
  {
    id: 21252,
    name: "강민재",
    group: "파이썬반",
  },
  {
    id: 22346,
    name: "강민재",
    group: "파이썬반",
  },
  {
    id: 212,
    name: "강민재",
    group: "파이썬반",
  },
  {
    id: 237,
    name: "강민재",
    group: "파이썬반",
  },
  {
    id: 123,
    name: "강민재",
    group: "파이썬반",
  },
];

const RegistKids = () => {
  // 서버로부터 응답된 가입승인 명단 관리
  const [listItem, setListItem] = useState(kids);
  // 원아/선생님 선택 버튼 상태 관리용
  const [selectedItem, setSelectedItem] = useState(1);

  // 원아/선생님 선택 버튼 상태 변경 동작부
  const buttonClickHandler = (e) => {
    setSelectedItem((selectedItem) => e.currentTarget.value);
  };

  return (
    <Box
      sx={{
        background: "#FAF1DA",
        border: "2px solid #ffe2e2",
        borderRadius: "20px",
      }}
    >
      {/* 가입승인대기 Label 표시 */}
      <Box
        sx={{
          p: 1,
          maxWidth: "100%",
          background: "#ffe2e2",
          borderTopLeftRadius: "17px",
          borderTopRightRadius: "17px",
        }}
      >
        <Typography
          id="font_test"
          component="h6"
          variant="h6"
          sx={{
            color: "rgba(0, 0, 0, 0.7)",
          }}
        >
          가입승인대기
        </Typography>
      </Box>
      {/* 원아/선생님 버튼 표시 */}
      <Box sx={{ p: 1 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            variant={parseInt(selectedItem) === 1 ? "contained" : "outlined"}
            color="warning"
            value="1"
            onClick={buttonClickHandler}
          >
            <Typography id="font_test"> 원아 </Typography>
          </Button>
          <Button
            variant={parseInt(selectedItem) === 2 ? "contained" : "outlined"}
            color="warning"
            value="2"
            onClick={buttonClickHandler}
          >
            <Typography id="font_test">선생님</Typography>
          </Button>
        </ButtonGroup>
      </Box>
      {/* 가입 승인 요청 리스트 표시 */}
      <Box
        sx={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }}
      >
        <RegistMemberLists datas={listItem}></RegistMemberLists>
      </Box>
      {/* 가입 승인 버튼 표시 */}
      <Box textAlign="right" sx={{ marginRight: "10px", marginBottom: "10px" }}>
        <Button variant="contained" color="warning">
          <Typography id="font_test">가입승인</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default RegistKids;
