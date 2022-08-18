// 2022.08.11 안정현
// 공지사항 날짜별로 가지고 오는 컴포넌트
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/user";
import { axios, urls, baseURL } from "../../../api/axios";
import TodayList from "./TodayList";

import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const NoticeHome = () => {
  const { userCenter, firstKid } = useContext(UserContext);
  const [notice, setNotice] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getNotice(firstKid.center_no);
  }, []);

  const text = "더보기 >";

  const getNotice = async (centerNo) => {
    if (centerNo === null || centerNo === "") return;
    try {
      const response = await axios.get(urls.fetchNotices + centerNo);
      if (response.data.length === 0) {
        setNotice(["공지사항이 없습니다."]);
      } else {
        const newArray = [];
        const length = response.data.length < 2 ? response.data.length : 2;
        for (let i = 0; i < length; i++) {
          const newObj = {
            title: response.data[i].notice_title,
            date: response.data[i].notice_date,
          };
          newArray.push(newObj);
        }

        /*
        const newObj = {
          title: response.data
        };
        const todaysNotice = response.data;
        console.log(todaysNotice);
        const mainNotice =
          todaysNotice[0].notice_title +
          "," +
          todaysNotice[1].notice_title +
          "," +
          todaysNotice[2].notice_title;
          */
        setNotice(newArray); //최신 3개의 공지사항 title을 보여줌
      }
    } catch (err) {
      setNotice(["공지사항이 없습니다."]);
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        height: 200,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        id="font_test"
        align="center"
        sx={{ mt: 1 }}
      >
        ❗ 공지사항 ❗
      </Typography>
      <Box
        sx={{
          width: "90%",
          height: "100%",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography id="font_test">제목</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography id="font_test">작성일</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notice?.map((data, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="body2"
                      id="font_test"
                      sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                    >
                      {data.title}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      id="font_test"
                      sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                    >
                      {data.date}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography
          id="font_test"
          variant="body2"
          textAlign="right"
          onClick={() => {
            navigate("/parents/notice");
          }}
          sx={{
            cursor: "pointer",
            color: "rgba(0, 0, 0, 0.4)",
            mr: "10px",
            mb: "5px",
          }}
        >
          {text}
        </Typography>
      </Box>
      {/*
      <Grid container sx={{ justifyContent: "center" }}>
        {!notice && (
          <Typography id="font_test" sx={{ marginLeft: 2, mt: 1 }}>
            공지사항이 아직 올라오지 않았어요
          </Typography>
        )}
      </Grid>
      <TodayList items={notice} />
        */}
    </Box>
  );
};

export default NoticeHome;
