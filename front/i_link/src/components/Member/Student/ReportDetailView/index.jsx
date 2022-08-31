import { Box, ListItemButton, Typography, Badge, Grid } from "@mui/material";

// 특이사항 리스트를 props로 받아 특이사항 상세를 리스트로 보여주는 component
const ReportDetailView = ({ list }) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={7}>
          <Typography variant="body2" id="font_test">
            {list[1]}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography id="font_test">{list[0]}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportDetailView;
