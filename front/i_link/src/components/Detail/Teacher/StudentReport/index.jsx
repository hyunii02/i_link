import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, urls } from "../../../../api/axios";
import ReportDetailView from "../../../Member/Student/ReportDetailView";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// 특이사항 메뉴 텍스트 배열
const reportDefaultList = [
  "등하원",
  "교우관계",
  "알레르기(음식)",
  "약 복용",
  "수면",
  "기타",
];

const StudentReport = ({ kidInfo }) => {
  const [reportList, setReportList] = useState([]);
  const textMessage = "최근 등록된 특이사항이 없습니다.";

  const getReportList = () => {
    try {
      const fullURL = baseURL + urls.fetchKidsReport + kidInfo.kid_no;
      axios.get(fullURL).then((response) => {
        if (response.status === 200) {
          setReportList(response.data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getReportList();
  }, [kidInfo]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography id="font_test" variant="h6">
            {kidInfo.kid_name} 특이사항
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            borderTop: "1px solid rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box sx={{ mt: "10px" }}>
            {reportList.length === 0 ? (
              <Typography id="font_test">{textMessage}</Typography>
            ) : (
              <TableContainer sx={{ background: "white" }}>
                <Table
                  sx={{ minWidth: 300 }}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "20%" }}>
                        <Typography id="font_test">분류</Typography>
                      </TableCell>
                      <TableCell sx={{ width: "65%" }}>
                        <Typography id="font_test">내용</Typography>
                      </TableCell>
                      <TableCell sx={{ width: "15%" }}>
                        <Typography id="font_test">작성일</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportList?.map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography
                            variant="body2"
                            id="font_test"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            {reportDefaultList[data.report_type - 1]}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            id="font_test"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            {data.report_content}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            id="font_test"
                            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
                          >
                            {data.report_date.slice(5, 10)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentReport;
