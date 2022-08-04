//2022 08 01 배지우작성

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function NoticeWriteForm(props) {


  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const { addNotice, idCount } = props;
  
  // 정보를 보내는 함수
  const handleSubmit = (event) => {
    event.preventDefault();
    const noticeData = {
      notice_id: idCount,
      notice_title: noticeTitle,
      notice_content: noticeContent,
    };
    addNotice(noticeData);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mt: 5 }, // 텍스트필드마다 mt 5

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          onChange={(e) => setNoticeTitle(e.target.value)}
          fullWidth
          label="제목"
          id="title"
          name="title"
          multiline
          maxRows={4}
        />

        <TextField
          onChange={(e) => setNoticeContent(e.target.value)}
          fullWidth
          id="content"
          name="content"
          label="내용"
          multiline
          rows={10}
        />
      </div>
      <Button
        onClick={handleSubmit}
        sx={{ mt: 5 }}
        type="submit"
        variant="contained"
        color="warning"
      >
        글 작성
      </Button>
    </Box>
  );
}
