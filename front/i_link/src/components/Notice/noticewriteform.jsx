//2022 08 01 배지우작성

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { UserContext } from "../../context/user";
import axios from "axios";
import { baseURL, urls } from "../../api/axios";
export default function NoticeWriteForm(props) {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const { getNoticeList, handleClose2 } = props;
  const { userCenter } = useContext(UserContext);
  const [formErrors, setFormErrors] = useState({});

  
  // 정보를 보내는 함수
  const handleSubmit = (event) => {
    event.preventDefault();

    const noticeData = {
      centerNo: userCenter,
      noticeTitle: noticeTitle,
      noticeContent: noticeContent,
    };
    //제목 내용 유효성 검사
    const validate = () => {
      const errors = {};
      let flag = false;
      if (!noticeData.noticeTitle) {
        errors.noticeTitle = "제목을 입력해주세요";
        flag = true;
      }

      if (!noticeData.noticeContent) {
        errors.noticeContent = "내용을 입력해주세요";
        flag = true;
      }

      setFormErrors(errors);
      if (flag) {
        return false;
      }
      return true;
    };

    //유효성 검사 후 데이터 보낸다.

    if (validate()) {
      try {
        axios
          .post(baseURL + urls.fetchNoticsRegister, noticeData)
          .then((response) => {
            if (response.status === 200) {
              getNoticeList();
              handleClose2();
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mt: 2 }, // 텍스트필드마다 mt 5

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      autoComplete="off"
    >
      <Box>
        <h1>공지사항</h1>
      </Box>
      <TextField
        sx={{ background: "white", width: 500 }}
        onChange={(e) => setNoticeTitle(e.target.value)}
        label="제목을 작성하세요"
        id="title"
        name="title"
        multiline
        maxRows={4}
      />
      <p id="font_test">{formErrors.noticeTitle}</p>

      <TextField
        sx={{ background: "white", width: 500 }}
        onChange={(e) => setNoticeContent(e.target.value)}
        id="content"
        name="content"
        label="내용을 작성하세요"
        multiline
        rows={10}
      />
      <p id="font_test">{formErrors.noticeContent}</p>

      <Button
        onClick={handleSubmit}
        sx={{ mt: 1 }}
        type="submit"
        variant="contained"
        color="warning"
      >
        글 작성
      </Button>
    </Box>
  );
}
