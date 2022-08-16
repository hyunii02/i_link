import { Box } from "@mui/system";
import * as React from "react";
import { useState, useRef } from "react";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

// 메모 입력 컴포넌트
// index -> creatememo -> creatememoform -> addmemocomponent

const AddMemoContent = (props) => {
  const { content, onRemove2 } = props;
  const space = " "  // 한칸띄우기 용도

  return (
    <Box>
      <Box
        id="font_test"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        variant="button"
        display="flex"
      >
        🏳️‍🌈{space} {content.content}
        <Button id="font_test" onClick={() => onRemove2(content.id)} sx={{ color: "red" }}>
          삭제
        </Button>
      </Box>
    </Box>
  );
};

export default AddMemoContent;
