import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../../context/user";
import NoticeWriteForm from "./noticewriteform";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { baseURL, urls } from "../../api/axios";
import Modal from "@mui/material/Modal";
import { Box, Grid } from "@mui/material";
import NoticeDetail from "./noticedetail";

export default function Notice(props) {
  const { userCenter } = useContext(UserContext);
  const [notices, setNotices] = useState([]);
  const [details, setDetails] = useState("");

  //게시글 넘버 받아오는 것

  useEffect(() => {
    getNoticeList();
  }, []);

  const getNoticeList = (e) => {
    try {
      axios
        .get(baseURL + urls.fetchNotices + userCenter)
        .then((response) => setNotices(response.data));
    } catch (e) {
      console.log(e);
    }
  };
  const style = {
    display: "flex",
    flexDirection: "column",
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

  const detailNotice = (notice) => {
    setDetails(notice);
  };

  //삭제
  const handleDelete = (event) => {
    console.log(event);

    try {
      axios
        .delete(baseURL + urls.fetchNoticesDelete + event)
        .then((response) => {
          if (response.status === 200) {
            getNoticeList();
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const detailCount = (notice) => {
    notice.hit += 1;
  };

  //공지사항 디테일 모달관리

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => setOpen1(false);

  //글작성 모달 관리
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  //삭제 함수

  const onRemove = (id) => {
    setNotices(notices.filter((notice) => notice.notice_no !== id));
  };
  return (
    <div id="font_test">
      <h2>공지사항</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#FF8A7B" }}>
              <TableCell id="font_test" width="30px" alingn="center">
                번호
              </TableCell>
              <TableCell id="font_test" width="700px" align="center">
                제목
              </TableCell>

              <TableCell id="font_test" width="110px" align="center">
                작성일
              </TableCell>

              <TableCell id="font_test" width="30px" align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((notice) => (
              <TableRow
                key={notice.notice_no}
                sx={{
                  cursor: "pointer",
                  background: "white",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  onClick={() => {
                    handleOpen1();
                    detailNotice(notice);
                    detailCount(notice);
                  }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {notice.notice_no}
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleOpen1();
                    detailNotice(notice);
                    detailCount(notice);
                  }}
                  id="font_test"
                  align="left"
                >
                  {notice.notice_title}
                </TableCell>
                {/* <TableCell
                  onClick={() => {
                    handleOpen1();
                    detailNotice(notice);
                    detailCount(notice);
                  }}
                  align="center"
                >
                  {notice.notice_user}
                </TableCell> */}
                <TableCell
                  onClick={() => {
                    handleOpen1();
                    detailNotice(notice);
                    detailCount(notice);
                  }}
                  align="center"
                >
                  {notice.notice_date.substr(0, 10)}
                </TableCell>

                <TableCell align="center">
                  <Button
                    sx={{ color: "red" }}
                    size="small"
                    onClick={() => handleDelete(notice.notice_no)}
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className="write-button"
        sx={{
          borderColor: "red",
          border: 1,
          color: "black",
          background: "#7FC3FD",
          display: "flex",
          justifyContent: "center",
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
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* 모달창 스타일 */}
        <Box sx={style}>
          <NoticeDetail detailNotice={details} />
          <div>
            <Button sx={{ ml: 90 }} onClick={handleClose1}>
              닫기
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* 모달창 스타일 */}
        <Box sx={style}>
          <NoticeWriteForm
            handleClose2={handleClose2}
            getNoticeList={getNoticeList}
          />
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
