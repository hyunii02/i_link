// 2022-08-10 김국진 학생/선생 목록 axios 작업. 등원/하원/설문완료 상태 관리
import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography, AppBar, Tabs, Tab } from "@mui/material";
import MemberStudent from "../../../components/Member/Student";
import MemberTeacher from "../../../components/Member/Teacher";
import { axios, baseURL, urls } from "../../../api/axios";
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
        sx={{
          background: "white",
          height: "60px",
          border: "6px solid #fae2e2",
          background: "#FAF1DA",
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        {groupList.map((list, index) => (
          <MenuItem
            value={list.value}
            key={index}
            sx={{ background: "#FAF1DA" }}
          >
            <Typography id="font_test" variant="h6">
              {list.content}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const AppBarTab = (props) => {
  const { groupList, getTotalList } = props;

  const [value, setValue] = useState(groupList[0].value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // selectedBox의 선택 값이 바뀌게 될 시, 선생/원아 목록을 다시 불러들임
  useEffect(() => {
    getTotalList(value);
  }, [value]);
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="inherit"
            textColor="inherit"
        variant="fullWidth"
        aria-label="action tabs example"
        TabIndicatorProps={{
          style: {
            height:"3px",
            
            background: "#FF8A7B",
            fontColor: "#D97D54",
          },
        }}
        
      >
        {groupList.map((list) => (
          <Tab
            label={
              <Typography id="font_test" fontSize="20px">
                {list.content}
              </Typography>
            }
            value={list.value}
            key={list.value}
            sx={{ background: "#FDFDF6" }}
          />
        ))}
      </Tabs>
    </AppBar>
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
    const fullURL = urls.fetchMemberTeacherList + userCenter;
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
        .then((response) => {
          const newData = [...response.data];
          setStudent((student) => newData);
        });
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
    setSelectedGroupNo(value);
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <Box>
      {/* 셀렉트박스 
      <div style={{ marginBottom: "30px" }}>
        {arrayIsEmpty(groupList) || (
          <BasicSelectCheck groupList={groupList} getTotalList={getTotalList} />
        )}
      </div>
        */}
      <div style={{ marginBottom: "30px" }}>
        {arrayIsEmpty(groupList) || (
          <AppBarTab groupList={groupList} getTotalList={getTotalList} />
        )}
      </div>
      <Box>
        <Box>
          <Grid container spacing={0.5}>
            {teacher.length === 0 && (
              <Box sx={{ width: "100%", height: "200px" }}>
                <Typography
                  id="font_test"
                  textAlign="center"
                  variant="h5"
                  color="rgba(0, 0, 0, 0.5)"
                >
                  현재 반에 등록된 교사가 없습니다.
                </Typography>
              </Box>
            )}
            {teacher?.map((tea, index) => (
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginBottom: "30px",
                }}
                item
                xs={4}
                key={index}
              >
                <MemberTeacher teacher={tea} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={0.5}>
            {student.length === 0 && (
              <Box sx={{ width: "100%", height: "200px" }}>
                <Typography
                  id="font_test"
                  textAlign="center"
                  variant="h5"
                  color="rgba(0, 0, 0, 0.5)"
                >
                  현재 반에 등록된 원아가 없습니다.
                </Typography>
              </Box>
            )}
            {student?.map((stu, index) => (
              <Grid item xs={3} key={index} style={{ marginBottom: "10px" }}>
                <MemberStudent
                  student={stu}
                  getKidList={getKidList}
                  selectedGroupNo={selectedGroupNo}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default MasterManageMember;
