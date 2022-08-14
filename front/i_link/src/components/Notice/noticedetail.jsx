import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { baseURL, urls } from "../../api/axios";
import axios from "axios";
import { useState, useEffect } from "react";
import { eventWrapper } from "@testing-library/user-event/dist/utils";


const NoticeDetail = (props) => {
  const { detailNotice } = props;
  const [detailNotice2, setDetailNotice2] = useState({});

  useEffect(() => {
    getNoticeDetail();
  }, []);

  const getNoticeDetail = (e) => {
    try {
      axios
        .get(baseURL + urls.fetchNoticesDetail + detailNotice.notice_no)
        .then((response) => {setDetailNotice2(response.data)
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
        className="a"
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
      <Box sx={{display:"flex",justifyContent:"flex-end",mr:6,}}>
        <Typography  id="font_test">작성일 : {detailNotice2.notice_date}</Typography>
      </Box>
      <Box sx={{ height: 370, width: 790 }}>
        {/* <TextareaAutosize
          maxRows={4}
          defaultValue={detailNotice.notice_content}
          
          > */}

        <Typography
          fontSize="15px"
          id="font_test"
          minrows={3}
          fullwidth="true"
          sx={{
            height: 310,
            width: 730,
            background: "white",
            border: "3px solid white",
            p: 4,
          }}
        >
          {detailNotice2.notice_content}
        </Typography>

        <Typography
          fontSize="15px"
          id="font_test"
          minrows={3}
          fullwidth="true"
          whiteSpace="pre-wrap"
          sx={{
            whiteSpace:"pre-wrap",
            height: 30,
            width: 795,
            background: "white",
            border: "3px solid red",
            
          }}
        >
          첨부파일 : 
        </Typography>
        {/* </TextareaAutosize> */}
      </Box>
    </Box>
  );
};

export default NoticeDetail;
