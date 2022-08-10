import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState, useRef, useEffect } from "react";
import NoticeWriteForm from "./noticewriteform";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { baseURL, urls } from "../../api/axios";
import Modal from "@mui/material/Modal";
import { Box, Grid } from "@mui/material";
import NoticeDetail from "./noticedetail";

const notice = [
  //더미데이터
  {
    notice_no: 4,
    notice_title:
      "주말은 언제올까요 정말정말 배고프네요 저녁 추천좀 부탁드립니다.",
    notice_content:
      "폭우가 계속되고있습니다. 가정에서 다들 쉬시고 저녁 맛있는거 드시고 내일 조심히 출근하시고 화이팅입니다.",
    notice_date: "방가방가",
    notice_user: "배지우",
    hit: 5,
  },
  {
    notice_no: 3,
    notice_title:
      "9/1 일 지우원장님의 생일파티가 유치원에서 있습니다. 많은참여 부탁드립니다.",
    notice_content:
      "폭우가 계속되고있습니다. 가정에서 다들 쉬시고 저녁 맛있는거 드시고 내일 조심히 출근하시고 화이팅입니다.",
    notice_date: "포켓몬",
    notice_user: "강민재",
    hit: 4,
  },
  {
    notice_no: 2,
    notice_title:
      "계속 이어지는 폭우로 인해 가정에서 휴식을 취하시기 바랍니다.",
    notice_content:
      "폭우가 계속되고있습니다. 가정에서 다들 쉬시고 저녁 맛있는거 드시고 내일 조심히 출근하시고 화이팅입니다.",
    notice_date: "안녕",
    notice_user: "김국진",
    hit: 2,
  },
  {
    notice_no: 1,
    notice_title: "코로나 방역수칙으로 인한 가정에서 주의 요망",
    notice_content:
      "폭우가 계속되고있습니다. 가정에서 다들 쉬시고 저녁 맛있는거 드시고 내일 조심히 출근하시고 화이팅입니다.",
    notice_date: "반가워",
    notice_user: "배지우",
    hit: 3,
  },
];

export default function Notice(props) {
  
  
  const [notices, setNotices] = useState(notice);
  const [details, setDetails] = useState("");
  //게시글 넘버 받아오는 것
  let max_val = notices.map(o => o.notice_no).reduce((max, curr) => max < curr ? curr : max );
  
  const idCount = useRef(max_val);
  
  useEffect(() => {
    getNoticeList();
  }, []);

  const getNoticeList = (e) => {
    try {
      axios
        .get(baseURL + urls.fetchNotices + 1)
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

  const addNotice = (notice) => {
    notice.notice_no = idCount.current;
    setNotices([notice, ...notices]);

    idCount.current += 1;
  };

  const detailNotice = (notice) => {
    setDetails(notice);
  };

  const detailCount = (notice) => {
    notice.hit += 1;
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  //모달창 상태관리

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => setOpen1(false);

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
              <TableCell id="font_test" width="80px" align="center">
                작성인
              </TableCell>
              <TableCell id="font_test" width="110px" align="center">
                작성일
              </TableCell>
              <TableCell id="font_test" width="50px" align="center">
                조회
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
                <TableCell
                  onClick={() => {
                    handleOpen1();
                    detailNotice(notice);
                    detailCount(notice);
                  }}
                  align="center"
                >
                  {notice.notice_user}
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleOpen1();
                    detailNotice(notice);
                    detailCount(notice);
                  }}
                  align="center"
                >
                  {year}년{month}월{day}일
                </TableCell>
                <TableCell
                  onClick={() => {
                    handleOpen1();
                    detailNotice(notice);
                    detailCount(notice);
                  }}
                  align="center"
                >
                  {notice.hit}
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{ color: "red" }}
                    size="small"
                    onClick={() => onRemove(notice.notice_no)}
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
