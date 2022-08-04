import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import NoticeWriteForm from "./noticewriteform";

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

// 글작성 버튼 만들려다맘
const WriteButton = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "end", marginRight: "40px" }}
    >
      <Button style={{ background: "#C5EDFD", margin: "10px" , width:30,height:40 }}>글작성</Button>
    </div>
  );
};

let idCount = 5; //id 값 지정

export default function Notice() {
  const [notices, setNotices] = useState(notice);

  const addNotice = (notice) => {
    notice.cards_id = idCount++;
    setNotices([notice, ...notices]);
    console.log(notice);
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className="Notice-page">
      <h2>공지사항</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#FAFAAA" }}>
              <TableCell>번호</TableCell>
              <TableCell align="left">제목</TableCell>
              <TableCell align="left">작성인</TableCell>
              <TableCell align="left">작성일</TableCell>
              <TableCell align="left">조회</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((notice) => (
              <TableRow
                key={notice.notice_id}
                sx={{
                  background: "#FAF7D7",
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <WriteButton />
      <NoticeWriteForm idCount={idCount} addNotice={addNotice} />
    </div>
  );
}
