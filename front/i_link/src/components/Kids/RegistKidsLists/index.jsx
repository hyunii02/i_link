// 2022.08.02 강민재
// 2022.08.05 김국진 컴포넌트 전체 수정
// 승인 요청한 목록을 띄워주는 컴포넌트
import { useState } from "react";
import Grid from "@mui/material/Grid";
import RegistKidsList from "../RegistKidsList";
import { Box, Typography } from "@mui/material";

// 신청자 목록 더미 데이터
const RegistKidsLists = (props) => {
  // RegistKids 컴포넌트에서 props로 받은 가입 승인 요청 명단을 가져옴
  const { datas, classList, submitListStateChange } = props;
  // 가입 승인 요청 명단을 useState로 관리
  //const [listItem, setListItem] = useState(datas);
  return (
    <Box>
      <Grid container spacing={1}>
        {datas?.map((data) => (
          <Grid item xs={3} key={data.no}>
            <RegistKidsList
              kid={data}
              classList={classList}
              submitListStateChange={submitListStateChange}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RegistKidsLists;
