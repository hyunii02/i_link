// 원장페이지>반관리>반 리스트 출력 컴포넌트
// create by 김국진
import { useState, React } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import GroupDetail from "../GroupDetail";

const GroupListItem = (props) => {
  // 반 상세 보기 컴포넌트 상태 관리
  const [childView, setChildView] = useState(false);

  // 부모 컴포넌트로부터의 props
  const { classData, deleteClicked } = props;

  // 리스트 버튼 클릭 핸들러 => 반 디테일 컴포넌트 표시
  const listClickedHandler = () => {
    setChildView((childView) => !childView);
  };

  // 삭제 버튼 클릭 핸들러
  const deleteClickedHandler = () => {
    // 현재 컴포넌트의 키값을 파라미터로 넣어서 부모 컴포넌트의 메서드를 호출
    deleteClicked(classData.className);
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
              {classData.className}
            </Typography>
            {/*<ListItemText primary={classData.className} /> */}
          </Grid>
          <Grid item xs={4}>
            <Typography id="font_test" color="rgba(0, 0, 0, 0.6)">
              {classData.studentNum}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography id="font_test" color="rgba(0, 0, 0, 0.6)">
              {classData.teacherNum}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              style={{ marginRight: "5%" }}
              onClick={deleteClickedHandler}
            >
              <Typography variant="body2" id="font_test">
                삭제
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </ListItemButton>
      <Box style={{ display: "flex" }}>
        {childView && <GroupDetail key={classData.className} />}
      </Box>
    </Box>
  );
};

export default GroupListItem;
