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

import { axios, baseURL, urls } from "../../api/axios";
import Modal from "@mui/material/Modal";
import { Box, Grid } from "@mui/material";
import NoticeDetail from "./noticedetail";

export default function Notice(props) {
  const { userCenter, userType, firstKid } = useContext(UserContext);
  const [notices, setNotices] = useState([]);
  const [details, setDetails] = useState("");

  //게시글 넘버 받아오는 것
  let userCenterNumber = userCenter;

  useEffect(() => {
    getNoticeList();
  }, []);

  const getNoticeList = (e) => {
    try {
      axios
        .get(
          baseURL +
            urls.fetchNotices +
            (userCenter === null ? firstKid.center_no : userCenter)
        )
        .then((response) => setNotices(response.data));
    } catch (e) {
      console.log(e);
    }
  };
  const styleWrite = {
    display: "flex",
    flexDirection: "column",
    
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    height: 510,

    bgcolor: "white",
    border: "5px solid #FCE6D4",
    boxShadow: 24,
    p: 4,
    pl: 1,
  };

  const style = {
    display: "flex",
    
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 820,
    height: 600,
    overflow: "auto",
    bgcolor: "white",
    border: "5px solid #FCE6D4",
    boxShadow: 24,
    p: 4,
    pl: 1,
  };

  const detailNotice = (notice) => {
    setDetails(notice);
  };

  //삭제
  const handleDelete = (event) => {
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

  return (
    <div id="font_test">
      {/* <h2>공지사항</h2> */}

      <TableContainer sx={{ mt: 3 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#FF8A7B" }}>
              <TableCell id="font_test" width="30px" alingn="center">
                번호
              </TableCell>
              <TableCell
                sx={{ pl: 7 }}
                id="font_test"
                width="700px"
                align="left"
              >
                제목
              </TableCell>

              <TableCell
                sx={{ pr: 5 }}
                id="font_test"
                width="120px"
                align="right"
              >
                작성일
              </TableCell>
              {userType !== 3 && userType !== "3" && (
                <TableCell
                  id="font_test"
                  width="10px"
                  align="center"
                ></TableCell>
              )}
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
                  }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {notice.notice_no}
                </TableCell>
                <TableCell
                  sx={{ pl: 7 }}
                  onClick={() => {
                    handleOpen1();
                    detailNotice(notice);
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
                  }}
                  align="right"
                >
                  {notice.notice_date.substr(0, 10)}
                </TableCell>
                {userType !== 3 && userType !== "3" && (
                  <TableCell align="right">
                    <Button
                      id="font_test"
                      sx={{ height: 8, color: "red" }}
                      size="small"
                      onClick={() => handleDelete(notice.notice_no)}
                    >
                      삭제
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        {userType !== 3 && userType !== "3" && (
          <Button
            className="write-button"
            id="font_test"
            sx={{
              borderColor: "red",

              color: "black",
              background: "#7FC3FD",
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",

              width: 30,
              height: 40,
            }}
            onClick={handleOpen2}
          >
            글작성
          </Button>
        )}
      </Box>

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* 모달창 스타일 디테일페이지 닫기 */}
        <Box sx={style}>
          
          
          <NoticeDetail detailNotice={details} handleClose1={handleClose1} />
          
          

        </Box>
        
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* 모달창 스타일 글작성 페이지 닫기*/}
        <Box sx={styleWrite}>
          <NoticeWriteForm
            handleClose2={handleClose2}
            getNoticeList={getNoticeList}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          ></Box>
        </Box>
      </Modal>
    </div>
  );
}
