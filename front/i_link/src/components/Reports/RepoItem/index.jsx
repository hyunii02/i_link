// 안정현
// 특이사항 카드 하나

import * as React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { reportTypes } from "../../../api/common";
import { axios, urls, baseURL } from "../../../api/axios";

export default function RepoItem({ repo, onRemove, getReportData }) {
  const { report_no, report_content, report_type, report_date } = repo;

  const types = reportTypes;

  const repoDate = report_date.slice(0, 10);

  const deleteReport = () => {
    axios
      .delete(urls.fetchReportsDelete + report_no)
      .then((response) => getReportData());
  };

  return (
    <Card
      sx={{
        mt: 2,
        mx: 3,
        height: 250,
        width: 250,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* 등하원 */}
        {types[report_type] === "등하원" && (
          <Typography
            sx={{
              fontSize: 14,
              maxWidth: "80px",
              textAlign: "center",
              borderRadius: "10px",
            }}
            color="text.secondary"
            id="font_test"
            gutterBottom
            bgcolor="#def7ff"
          >
            {types[report_type]}
          </Typography>
        )}
        {/* 교우관계 */}
        {types[report_type] === "교우관계" && (
          <Typography
            sx={{
              fontSize: 14,
              maxWidth: "80px",
              textAlign: "center",
              borderRadius: "10px",
            }}
            color="text.secondary"
            id="font_test"
            gutterBottom
            bgcolor="#fff6d9"
          >
            {types[report_type]}
          </Typography>
        )}
        {/* 알레르기(음식) */}
        {types[report_type] === "알레르기(음식)" && (
          <Typography
            sx={{
              fontSize: 14,
              maxWidth: "110px",
              textAlign: "center",
              borderRadius: "10px",
            }}
            color="text.secondary"
            id="font_test"
            gutterBottom
            bgcolor="#edffd9"
          >
            {types[report_type]}
          </Typography>
        )}
        {/* 약복용 */}
        {types[report_type] === "약복용" && (
          <Typography
            sx={{
              fontSize: 14,
              maxWidth: "80px",
              textAlign: "center",
              borderRadius: "10px",
            }}
            color="text.secondary"
            id="font_test"
            gutterBottom
            bgcolor="#ffdfde"
          >
            {types[report_type]}
          </Typography>
        )}
        {/* 수면 */}
        {types[report_type] === "수면" && (
          <Typography
            sx={{
              fontSize: 14,
              maxWidth: "80px",
              textAlign: "center",
              borderRadius: "10px",
            }}
            color="text.secondary"
            id="font_test"
            gutterBottom
            bgcolor="#f3deff"
          >
            {types[report_type]}
          </Typography>
        )}
        {/* 기타 */}
        {types[report_type] === "기타" && (
          <Typography
            sx={{
              fontSize: 14,
              maxWidth: "80px",
              textAlign: "center",
              borderRadius: "10px",
            }}
            color="text.secondary"
            id="font_test"
            gutterBottom
            bgcolor="#f2f2f0"
          >
            {types[report_type]}
          </Typography>
        )}
        <Typography
          variant="body2"
          component="div"
          id="font_test"
          color="text.secondary"
          sx={{ textAlign: "right" }}
        >
          {repoDate}
        </Typography>
        <Typography
          variant="body3"
          component="div"
          id="font_test"
          sx={{ mt: 2 }}
        >
          {report_content}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          size="small"
          onClick={deleteReport}
          id="font_test"
          sx={{ color: "#FF8A7B" }}
        >
          삭제
        </Button>
      </Box>
    </Card>
  );
}
