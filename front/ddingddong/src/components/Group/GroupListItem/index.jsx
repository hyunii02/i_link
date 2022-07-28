// 원장페이지>반관리>반 리스트 출력 컴포넌트
// create by 김국진

import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const GroupListItem = (props) => {
  const { className, studentNum, teacherNum } = props;

  return (
    <ListItemButton style={{ borderRadius: '20px' }}>
      <Grid container>
        <Grid item xs={4}>
          <ListItemText primary={className} />
        </Grid>
        <Grid item xs={4}>
          <ListItemText primary={studentNum} />
        </Grid>
        <Grid item xs={3}>
          <ListItemText primary={teacherNum} />
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined" size="small" style={{ marginRight: '5%' }}>
            삭제
          </Button>
        </Grid>
      </Grid>
    </ListItemButton>
  );
};

export default GroupListItem;
