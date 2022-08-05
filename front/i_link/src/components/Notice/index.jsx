import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState, useRef } from "react";
import NoticeWriteForm from "./noticewriteform";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { Box, Grid } from "@mui/material";
import NoticeDetail from "./noticedetail";


const notice = [
  //더미데이터
  {
    notice_id: 4,
    notice_title: "8/1",
    notice_date: "방가방가",
    notice_user: "배지우",
    notice_count: "2",
  },
  {
    notice_id: 3,
    notice_title: "7/30",
    notice_date: "포켓몬",
    notice_user: "배지우",
    notice_count: "2",
  },
  {
    notice_id: 2,
    notice_title: "7/20",
    notice_date: "안녕",
    notice_user: "배지우",
    notice_count: "2",
  },
  {
    notice_id: 1,
    notice_title: "7/15",
    notice_date: "반가워",
    notice_user: "배지우",
    notice_count: "2",
  },
];



export default function Notice() {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // 모달창 스타일 지정
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    height: 600,
    bgcolor: "#F8FAD7",
    border: "5px solid #FCE6D4",
    boxShadow: 24,
    p: 4,
  };
  
  const idCount = useRef(5);
  const [notices, setNotices] = useState(notice);

  const addNotice = (notice) => {
    notice.notice_id = idCount.current
    setNotices([notice, ...notices]);
    console.log(notice);
    idCount.current+=1;
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  //모달창 상태관리 

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);


  //삭제 함수

  const onRemove = (id) => {
    console.log(id);
    setNotices(notices.filter((notice) => notice.notice_id !== id));
    

    
  };
  return (
    <div className="Notice-page">
      <h2>공지사항</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            
            <TableRow sx={{ background: "#FA7C0F" }}>
              <TableCell aling="left">번호</TableCell>
              <TableCell align="left">제목</TableCell>
              <TableCell align="left">작성인</TableCell>
              <TableCell align="left">작성일</TableCell>
              <TableCell align="left">조회</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {notices.map((notice) => (
              <TableRow
                
                key={notice.notice_id}
                sx={{
                  background: "white",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {notice.notice_id}
                </TableCell>
                <TableCell align="left">{notice.notice_title}</TableCell>
                <TableCell align="left">{notice.notice_user}</TableCell>
                <TableCell align="left">
                  {year}년{month}월{day}일
                </TableCell>
                <TableCell align="left">{notice.notice_count}</TableCell>
                <TableCell align="left"><button onClick={() => onRemove(notice.notice_id)}>삭제</button></TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* 글작성 버튼 */}
      <Button
        className="write-button"
        style={{
          background: "#C5EDFD",
          marginTop: "15px",
          marginLeft: "1080px",
          width: 30,
          height: 40,
        }}
        onClick={handleOpen2}
      >
        글작성
      </Button>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* 모달창 스타일 */}
        <Box sx={style}>
          <NoticeWriteForm idCount={idCount.current} addNotice={addNotice} />
          <div>
            <Button sx={{ ml: 90 }} onClick={handleClose2}>
              닫기
            </Button>
          </div>
        </Box>
      </Modal>
      
    </div>
  );
}
