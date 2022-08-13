// 원생관리에 쓸 프로필
// create by 김국진
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import Report from "./Report";

import {
  Box,
  Grid,
  Modal,
  Badge,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { baseURL, urls } from "../../../api/axios";
import MailIcon from "@mui/icons-material/Mail";
import { Translate } from "@mui/icons-material";

// 알림 뱃지 스타일링
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 25,
    top: 25,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    width: 30,
    height: 30,
    cursor: "pointer",
  },
}));

// 모달창 스타일링
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// 특이사항 메뉴 텍스트 배열
const reportDefaultList = [
  "등하원",
  "교우관계",
  "알레르기(음식)",
  "약 복용",
  "수면",
  "기타",
];

// 특이사항을 관리할 배열
const reportForm = [
  { type: 1, content: [], count: 0 },
  { type: 2, content: [], count: 0 },
  { type: 3, content: [], count: 0 },
  { type: 4, content: [], count: 0 },
  { type: 5, content: [], count: 0 },
  { type: 6, content: [], count: 0 },
];

const MemberStudent = (props) => {
  // page에서 가져온 원생 정보, 원생 정보 다시 가져오는 메서드
  const { student, getKidList, selectedGroupNo } = props;
  // 모달창 open/close 상태관리
  const [open, setOpen] = useState(false);
  // 특이사항 객체배열 상태관리
  const [reportList, setReportList] = useState(reportForm);
  // 특이사항 상세보기 자식컴포넌트 view state
  const [childDetailView, setChildDetailView] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // 버튼에 넣어줘야 할 텍스트
  const buttonText = ["등원완료", "하원완료", "설문완료"];

  // 특이사항 디테일 리스트 toggle view
  const setViewChange = (index) => {
    const newArray = [...childDetailView];
    newArray[index] = !newArray[index];
    setChildDetailView(newArray);
  };

  // 버튼 클릭 이벤트 핸들러. 버튼 클릭에 따라 원생의 상태 변경
  const buttonClickHandler = (e) => {
    try {
      const fullURL =
        baseURL +
        urls.fetchKidsStateChange +
        student.kid_no +
        "/" +
        e.currentTarget.value;
      axios.put(fullURL).then((response) => {
        if (response.status === 200) {
          getKidList(selectedGroupNo);
        } else {
          console.log("데이터 response Error!! [", response.status, "]");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 우측 상단 뱃지 클릭 이벤트 핸들러
  const badgeClickHandler = (e) => {
    setOpen((open) => true);
    const fullURL = baseURL + urls.fetchKidsReport + student.kid_no;
    // 뱃지를 클릭했는지 유효성 검사
    axios.get(fullURL).then((response) => {
      const newReportForm = [
        { type: 1, content: [], count: 0 },
        { type: 2, content: [], count: 0 },
        { type: 3, content: [], count: 0 },
        { type: 4, content: [], count: 0 },
        { type: 5, content: [], count: 0 },
        { type: 6, content: [], count: 0 },
      ];

      response.data.map((data) => {
        let index = data.report_type - 1;
        newReportForm[index].count++;
        newReportForm[index].content.push([
          data.report_content,
          data.report_date,
        ]);
      });
      setReportList(newReportForm);
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* 모달창 표시 */}
      {open && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
            setChildDetailView([false, false, false, false, false, false]);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="font_test"
              variant="h4"
              component="h2"
              textAlign="center"
              sx={{ mb: 3 }}
            >
              {student.kid_name} 원아의 특이사항
            </Typography>
            {reportDefaultList.map((list, index) => (
              <Report
                key={index}
                idx={index}
                title={list}
                list={reportList[index]}
                setViewChange={setViewChange}
                viewState={childDetailView[index]}
              />
            ))}
          </Box>
        </Modal>
      )}

      <div
        style={{
          position: "absolute",
          right: "70px",
          top: "10px",
          zIndex: "100",
        }}
      >
        {student.kid_report === 0 || (
          <IconButton
            onClick={badgeClickHandler}
            style={{ transform: "translate(35deg)" }}
          >
            <Badge badgeContent={student.kid_report} color="primary">
              <MailIcon color="action" fontSize="large" />
            </Badge>
          </IconButton>
        )}
      </div>
      <Card
        sx={{
          maxWidth: 500,
          height: 200,
          border: "10px solid #fae2e2",
          background: "#FAF1DA",
          /* FAE6D7 */
        }}
      >
        <CardMedia
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {
            <Avatar
              src={baseURL + student.kid_profile_url}
              sx={{
                width: 112,
                height: 112,
                border: "3px solid #ffe2e2",
                marginTop: "10px",
              }}
            />
          }
        </CardMedia>
        {/* Card 사진 이미지 파트 */}
        {/*<CardMedia component="img" height="150" src={student.src} />*/}
        {/* Card 이름 파트 */}
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10px",
          }}
        >
          <Typography id="font_test" variant="h5">
            {student.kid_name}
          </Typography>
        </CardContent>
        {/* Card 버튼 파트 */}
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid container style={{ marginLeft: "2px" }}>
            {buttonText.map((text, index) => (
              <Grid item xs={4} key={index} sx={{ textAlign: "center" }}>
                <Button
                  variant={
                    parseInt(student.kid_state) === index + 1
                      ? "contained"
                      : "outlined"
                  }
                  value={index + 1}
                  size="small"
                  color="warning"
                  onClick={buttonClickHandler}
                >
                  <Typography variant="body2">{text}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default MemberStudent;
