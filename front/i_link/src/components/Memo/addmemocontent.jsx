import { Box } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

// 메모 입력 컴포넌트
// index -> creatememo -> creatememoform -> addmemocomponent

const AddMemoContent = (props) => {
  const { content } = props;

  return (
    <Box >
      
      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}} variant="button" display="flex"  >
        🏳️‍🌈 {content.content}
        <Button sx={{ color:"red"}}>삭제</Button>
      </Box>

    </Box>
  );
};

export default AddMemoContent;
