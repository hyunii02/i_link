// 가입 승인 통합 컴포넌트
// 2022.08.05 김국진 전체 수정

import { useState, useContext, useEfect } from "react";
import { Box, Typography } from "@mui/material";
import RegistMemberLists from "../RegistKidsLists";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import { baseURL, urls } from "../../../api/axios";
import { UserContext } from "../../../context/user";
import { useEffect } from "react";

const RegistKids = (props) => {
  // 상위 컴포넌트에서 반 목록을 가져옴
  const {
    classList,
    getGroupList,
    listItem,
    setListItem,
    submitList,
    setSubmitList,
    getKidsList,
    getTeacherList,
  } = props;
  // 원아/선생님 선택 버튼 상태 관리용
  const [selectedItem, setSelectedItem] = useState("1");

  const { userType } = useContext(UserContext);

  // 가입 승인 리스트에서 반을 선택했을 경우 상태 변경
  const submitListStateChange = (id, group) => {
    let newArray = null;
    if (selectedItem === "1") {
      newArray = submitList.map((list) =>
        list.kidNo === id ? { ...list, groupNo: group } : list
      );
    } else if (selectedItem === "2") {
      newArray = submitList.map((list) =>
        list.userNo === id ? { ...list, groupNo: group } : list
      );
    }
    setSubmitList(newArray);
  };

  // 가입승인 버튼 시 put 처리
  const onSubmitButtonClickHandler = () => {
    // 가입 승인 상태(원아/선생)에 따라 URL을 다르게 설정
    const fullURL =
      baseURL +
      (selectedItem === "1" ? urls.fetchSubmitKids : urls.fetchSubmitTeacher) +
      userType;

    let kidsList;
    let teacherList;
    selectedItem === "1" ? (kidsList = submitList) : (teacherList = submitList);
    axios
      .put(fullURL, selectedItem === "1" ? { kidsList } : { teacherList })
      .then((response) => {
        // 데이터가 바뀔 시 새로운 리스트 읽어들임
        selectedItem === "1" ? getKidsList() : getTeacherList();
        // 반 목록도 새로 읽어들임
        getGroupList();
      });
  };

  // 원아/선생님 선택 버튼 상태 변경 동작부
  const buttonClickHandler = (e) => {
    setSelectedItem((selectedItem) => e.currentTarget.value);
    if (e.currentTarget.value === "1") getKidsList();
    else if (e.currentTarget.value === "2") getTeacherList();
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
            variant={selectedItem === "1" ? "contained" : "outlined"}
            color="warning"
            value="1"
            onClick={buttonClickHandler}
          >
            <Typography id="font_test"> 원아 </Typography>
          </Button>
          <Button
            variant={selectedItem === "2" ? "contained" : "outlined"}
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
        <RegistMemberLists
          datas={listItem}
          classList={classList}
          submitListStateChange={submitListStateChange}
        ></RegistMemberLists>
      </Box>
      {/* 가입 승인 버튼 표시 */}
      <Box textAlign="right" sx={{ marginRight: "10px", marginBottom: "10px" }}>
        <Button
          variant="contained"
          color="warning"
          onClick={onSubmitButtonClickHandler}
        >
          <Typography id="font_test">가입승인</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default RegistKids;
