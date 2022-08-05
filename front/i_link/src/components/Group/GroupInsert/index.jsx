// 원장>반관리>반 추가하기 컴포넌트
// create by 김국진
import { useState, useCallback, React } from "react";
import TextField from "@mui/material/TextField";
import { Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const GroupInsert = (props) => {
  // 부모의 props 함수 가져오기
  const { insertClass, cancelClicked } = props;

  // 새로운 반 이름 State
  const [newClass, setNewClass] = useState("");

  // 텍스트 Change Event
  const onChange = (e) => {
    setNewClass((newClass) => e.target.value);
  };

  // 반 추가 시 동작 함수
  const insertClicked = () => {
    if (newClass.length === 0) return;
    insertClass(newClass);
    setNewClass("");
  };

  return (
    <Box>
      <Grid
        container
        display="flex"
        justifyContent="flex-start"
        flexDirection="row"
        alignItems="center"
      >
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="반을 입력해 주세요"
            variant="outlined"
            size="small"
            value={newClass}
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Button
              onClick={insertClicked}
              variant="outlined"
              size="medium"
              sx={{ marginLeft: "10px" }}
            >
              <Typography variant="body2" id="font_test">
                추가
              </Typography>
            </Button>
            <Button
              onClick={cancelClicked}
              variant="outlined"
              size="medium"
              sx={{ marginLeft: "10px" }}
            >
              <Typography variant="body2" id="font_test">
                취소
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroupInsert;
