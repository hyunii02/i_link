import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";



const NoticeDetail =(props) =>{
  const {detailNotice} = props; 
  
  
  
  

  return(
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mt: 5 }, // 텍스트필드마다 mt 5
        
        height:500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <Box>
        <h1>공지사항 디자인 수정 쌉 필요</h1>
      </Box>

      <Typography sx={{width:400,height:50}}>제목 : {detailNotice.notice_title}</Typography>


      <Typography>{detailNotice.notice_content}</Typography>
        
      

      
    </Box>


  )
};

export default NoticeDetail