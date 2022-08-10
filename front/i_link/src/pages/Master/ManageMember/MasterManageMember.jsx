// 2022-08-10 김국진 학생/선생 목록 axios 작업. 등원/하원/설문완료 상태 관리
import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import MemberStudent from "../../../components/Member/Student";
import MemberTeacher from "../../../components/Member/Teacher";
import axios from "axios";
import { baseURL, urls } from "../../../api/axios";
import { UserContext } from "../../../context/user";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

// Select components
const BasicSelectCheck = ({ groupList, getTotalList }) => {
  const [value, setValue] = useState(groupList[0].value);

  const selectChange = (event) => {
    setValue((value) => event.target.value);
  };

  // selectedBox의 선택 값이 바뀌게 될 시, 선생/원아 목록을 다시 불러들임
  useEffect(() => {
    getTotalList(value);
  }, [value]);

  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={selectChange}
        sx={{ background: "white" }}
        inputProps={{ "aria-label": "Without label" }}
      >
        {groupList.map((list, index) => (
          <MenuItem value={list.value} key={index}>
            <Typography id="font_test" variant="h5">
              {list.content}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const MasterManageMember = () => {
  // 원생 목록 상태 관리
  const [student, setStudent] = useState([]);
  // 선생 목록 상태 관리
  const [teacher, setTeacher] = useState([]);
  // 조회 선택한 groupNo 상태 관리
  const [selectedGroupNo, setSelectedGroupNo] = useState(0);
  // 반 목록 저장
  const [groupList, setGroupList] = useState([]);

  // 전역 상태에서 현재 회원의 소속 유치원
  const { userCenter } = useContext(UserContext);

  // 빈 배열인지 체크
  const arrayIsEmpty = (arr) => {
    if (!Array.isArray(arr)) {
      return false;
    }
    return arr.length == 0;
  };

  // 서버에서 선생 목록을 가져옴
  const getTeacherList = (value) => {
    // 요청할 URL 포매팅
    const fullURL = baseURL + urls.fetchMemberTeacherList + userCenter;
    // axios.get으로 현재 반의 선생 목록을 가져옴
    try {
      axios
        .get(fullURL, {
          params: { centerNo: userCenter, groupNo: value },
        })
        .then((response) => setTeacher(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  // 서버에서 원생 목록을 가져옴
  const getKidList = (value) => {
    // 요청할 URL 포매팅
    const fullURL = baseURL + urls.fetchMemberKidsList + userCenter;
    // axios.get으로 현재 반의 선생 목록을 가져옴
    try {
      axios
        .get(fullURL, {
          params: { centerNo: userCenter, groupNo: value },
        })
        .then((response) => setStudent(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  // 서버에서 반 목록을 가져옴
  const getGroupList = () => {
    const fullURL = baseURL + urls.fetchGroupsList + userCenter;
    const newArray = [];
    axios.get(fullURL).then((response) => {
      response.data.map((data) => {
        const newObj = {
          value: data.group_no,
          content: data.group_name,
        };
        newArray.push(newObj);
      });
      setGroupList(newArray);
    });
  };

  // 반 목록 선택 시 반에 맞는 정보
  const getTotalList = (value) => {
    getTeacherList(value);
    getKidList(value);
  };

  useEffect(() => {
    getGroupList();
  }, []);

  useEffect(() => {
    console.log(groupList);
  }, [groupList]);

  return (
    <Box>
      <div>
        {arrayIsEmpty(groupList) || (
          <BasicSelectCheck groupList={groupList} getTotalList={getTotalList} />
        )}
      </div>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: "30px",
        }}
        spacing={0.5}
      >
        {teacher?.map((tea, index) => (
          <Grid item xs={4} key={index}>
            <MemberTeacher teacher={tea} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={0.5}>
        {student?.map((stu, index) => (
          <Grid item xs={3} key={index} style={{ marginBottom: "10px" }}>
            <MemberStudent student={stu} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MasterManageMember;
