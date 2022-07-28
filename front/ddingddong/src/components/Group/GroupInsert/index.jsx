// 원장>반관리>반 추가하기 컴포넌트
// create by 김국진
import { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';

const GroupInsert = (props) => {
  // 부모의 props 함수 가져오기
  const { insertClass } = props;

  // 새로운 반 이름 State
  const [newClass, setNewClass] = useState('');

  // 텍스트 Change Event
  const onChange = (e) => {
    setNewClass((newClass) => e.target.value);
    console.log(newClass);
  };

  // 반 추가 시 동작 함수
  const insertClicked = () => {
    insertClass(newClass);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="반을 입력 해 주세요"
            variant="outlined"
            size="small"
            fullWidth
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={insertClicked}
            variant="outlined"
            size="medium"
            style={{ marginLeft: '3%' }}
          >
            추가
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroupInsert;
