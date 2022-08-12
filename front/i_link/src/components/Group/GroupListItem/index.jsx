// 원장페이지>반관리>반 리스트 출력 컴포넌트
// create by 김국진
import { useState, React } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import GroupDetail from "../GroupDetail";
import axios from "axios";
import { baseURL, urls } from "../../../api/axios";

const GroupListItem = (props) => {
  // 반 상세 보기 컴포넌트 상태 관리
  const [childView, setChildView] = useState(false);
  const [student, setStudent] = useState([]);

  // 부모 컴포넌트로부터의 props
  const { classData, deleteClicked, getGroupList, getsubmitList } = props;

  // 리스트 버튼 클릭 핸들러 => 반 디테일 컴포넌트 표시
  const listClickedHandler = (e) => {
    axios
      .get(baseURL + urls.fetchKids + classData.group_no)
      .then((response) => setStudent((student) => response.data));
    setChildView((childView) => !childView);
  };

  // 삭제 버튼 클릭 핸들러
  const deleteClickedHandler = (e) => {
    const fullURL = baseURL + urls.fetchGroupsDelete + e.currentTarget.value;
    // axios delete를 이용하여 현재 classNo를 삭제
    axios.delete(fullURL).then(() => {
      getGroupList();
      getsubmitList();
    });
  };

  return (
    <Box>
      <ListItemButton
        style={{ borderRadius: "5px" }}
        onClick={listClickedHandler}
      >
        <Grid container>
          <Grid item xs={4}>
            <Typography id="font_test" color="rgba(0, 0, 0, 0.6)">
              {classData.group_name}
            </Typography>
            {/*<ListItemText primary={classData.className} /> */}
          </Grid>
          <Grid item xs={4}>
            <Typography id="font_test" color="rgba(0, 0, 0, 0.6)">
              {classData.kid_cnt}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography id="font_test" color="rgba(0, 0, 0, 0.6)">
              {classData.teacher_cnt}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              style={{ marginRight: "5%" }}
              onClick={deleteClickedHandler}
              value={classData.group_no}
            >
              <Typography variant="body2" id="font_test">
                삭제
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </ListItemButton>
      <Box style={{ display: "flex" }}>
        {childView && <GroupDetail key={classData.group_no} kid={student} />}
      </Box>
    </Box>
  );
};

export default GroupListItem;
