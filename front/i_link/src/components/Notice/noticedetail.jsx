import { Typography } from "@mui/material";
import React from "react";
import Notice from ".";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";


//글 상세페이지
const Noticedetail = () => {
  return (
    <Box>
      {/*아래위 나누는 박스*/}
      <Box sx={{ background: "red", width: 1152, height: 300 }}>
      
      </Box>
      <Notice />
    </Box>
  );
};

export default Noticedetail;
