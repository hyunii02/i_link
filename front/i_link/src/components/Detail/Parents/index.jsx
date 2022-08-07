// 2022.08.05 김국진 create
// 부모>아이보기 페이지 통합 컴포넌트
import { Box, Grid } from "@mui/material";
import MemberStudent from "../../Member/Student";
const student = {
  id: 18,
  name: "이소영",
  src: "/images/avatar/gora.png",
  state: 2,
};
const ParentsDetail = () => {
  return (
    <Box sx={{ background: "black", height: "500px" }}>
      <Grid container>
        <Grid item xs={3}>
          <MemberStudent student={student} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParentsDetail;
