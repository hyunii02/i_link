import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { axios,baseURL, urls } from "../../api/axios";
import { useState, useEffect } from "react";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { maxWidth } from "@mui/system";

const NoticeDetail = (props) => {
  const { detailNotice, handleClose1 } = props;
  const [detailNotice2, setDetailNotice2] = useState([]);

  // 빈배열 체크
  const isEmptyArray = (array) => {
    if (Array.isArray(array) && array.length === 0) {
      return true;
    }

    return false;
  };

  // 빈 파일 체크
  const isEmptyFile = (array) => {
    if (isEmptyArray(array)) return true;

    
    if (isEmptyArray(array.files)) return true;

    return false;
  };

  useEffect(() => {
    getNoticeDetail();
  }, []);

  useEffect(() => {}, [detailNotice2]);

  const getNoticeDetail = (e) => {
    try {
      axios
        .get(baseURL + urls.fetchNoticesDetail + detailNotice.notice_no)
        .then((response) => {
          setDetailNotice2(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ width: 800, height: 1000, background: "white" }}>
      {" "}
      {/*#F8FAD7*/}
      <Box
        sx={{
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // border: "3px solid black",

          p: 0.5,
        }}
      >
        <Typography
          id="font_test"
          variant="h5"
          sx={{
            mt: 3,
            width: 700,
            height: 50,
            background: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderBottom: "2px solid #8E8F91",
          }}
        >
          {detailNotice2.notice_title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 6 }}>
        <Typography id="font_test">
          작성일 : {detailNotice2.notice_date}
        </Typography>
      </Box>
      <div sx={{ height: 790, width: 790 }}>
        {isEmptyFile(detailNotice2) ||
          detailNotice2.files.map((file, index) => (
            
            <Avatar
              sx={{ mt: 3, ml: 4, minWidth:750, height:"auto" }}
              key={index}
              src={baseURL + file.file_location}
              variant="square"
            ></Avatar>
            
          ))}
        <Box sx={{ml:3}}>
          <Typography
            sx={{pl:2,mt:3}}
            fontSize="15px"
            id="font_test"
            minrows={3}
            fullwidth="true"
          >
            {detailNotice2.notice_content}
          </Typography>
        </Box>

        <Button id="font_test" sx={{ ml: 90,mt:5 }} onClick={handleClose1}>
          닫기
        </Button>
        {/* </TextareaAutosize> */}
      </div>
    </Box>
  );
};

export default NoticeDetail;
