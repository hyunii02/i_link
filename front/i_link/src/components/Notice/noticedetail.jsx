import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const NoticeDetail = (props) => {
  const { detailNotice } = props;
  

  return (
    <Box sx={{ width: 800, height: 1000, background: "#F8FAD7" }}>
      <Box
        sx={{
          background: "#FCEBF6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "3px solid #DFC5FC",
          p: 0.5,
        }}
      >
        <Typography
          id="font_test"
          fullwidth="true"
          variant="h5"
          sx={{
            height: 50,
            background: "#FCEBF6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {detailNotice.notice_title}
        </Typography>
      </Box>
      <Box sx={{ height: 370, width: 790, mt: 10, background: "blue" }}>
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
            background: "#FCEBF6",
            border: "3px solid #DFC5FC",
            p: 4,
          }}
        >
          {detailNotice.notice_content}
        </Typography>
        {/* </TextareaAutosize> */}
      </Box>
    </Box>
  );
};

export default NoticeDetail;
