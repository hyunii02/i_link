// 식단/간식 추가 리스트 view 컴포넌트
// 2022.08.08 김국진
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  ListItemButton,
} from "@mui/material";

const DietInsert = (props) => {
  const { listItem, deleteHandler } = props;

  // 삭제 버튼 클릭 핸들러
  const deleteButtonClickHandler = () => {
    deleteHandler(listItem.id);
  };

  return (
    <Box>
      <ListItemButton>
        <Grid container>
          <Grid item xs={10}>
            {listItem.content}
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              style={{ marginRight: "5%" }}
              onClick={deleteButtonClickHandler}
            >
              <Typography variant="body2" id="font_test">
                삭제
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </ListItemButton>
    </Box>
  );
};

export default DietInsert;
