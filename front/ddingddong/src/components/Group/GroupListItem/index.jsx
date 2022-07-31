// 원장페이지>반관리>반 리스트 출력 컴포넌트
// create by 김국진

import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const GroupListItem = (props) => {
  const { classData, deleteClicked } = props;

  const deleteClickedHandler = () => {
    deleteClicked(classData.className);
  };

  return (
    <ListItemButton style={{ borderRadius: '5px' }}>
      <Grid container>
        <Grid item xs={4}>
          <ListItemText primary={classData.className} />
        </Grid>
        <Grid item xs={4}>
          <ListItemText primary={classData.studentNum} />
        </Grid>
        <Grid item xs={3}>
          <ListItemText primary={classData.teacherNum} />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="outlined"
            size="small"
            style={{ marginRight: '5%' }}
            onClick={deleteClickedHandler}
          >
            삭제
          </Button>
        </Grid>
      </Grid>
    </ListItemButton>
  );
};

export default GroupListItem;
