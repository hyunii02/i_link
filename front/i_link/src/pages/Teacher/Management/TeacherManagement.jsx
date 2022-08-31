import React, { useState, useContext, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import MemberStudent from "../../../components/Member/Student";
import MemberTeacher from "../../../components/Member/Teacher";
import { axios, baseURL, urls } from "../../../api/axios";
import { UserContext } from "../../../context/user";

const TeacherManagement = () => {
  // 원생 목록 상태 관리
  const [student, setStudent] = useState([]);

  // 전역 상태에서 현재 회원의 소속 유치원
  const { userCenter, userGroup } = useContext(UserContext);

  // 빈 배열인지 체크
  const arrayIsEmpty = (arr) => {
    if (!Array.isArray(arr)) {
      return false;
    }
    return arr.length == 0;
  };

  // 서버에서 원생 목록을 가져옴
  const getKidList = () => {
    // 요청할 URL 포매팅
    const fullURL = urls.fetchMemberKidsList + userCenter;
    // axios.get으로 현재 반의 선생 목록을 가져옴
    try {
      axios
        .get(fullURL, {
          params: { centerNo: userCenter, groupNo: userGroup },
        })
        .then((response) => setStudent(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getKidList();
  }, []);

  return (
    <Box>
      <Box>
        <Box>
          <Grid container spacing={0.5}>
            {student.length === 0 && (
              <Box>
                <Typography
                  id="font_test"
                  color="rgba(0, 0, 0, 0.5)"
                  variant="h5"
                >
                  현재 반에 등록된 원아가 없습니다.
                </Typography>
              </Box>
            )}
            {student?.map((stu, index) => (
              <Grid item xs={3} key={index} style={{ marginBottom: "10px" }}>
                <MemberStudent student={stu} getKidList={getKidList} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherManagement;
