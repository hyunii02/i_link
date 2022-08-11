// 안정현
// 특이사항 카드 하나

import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { reportTypes } from "../../../api/common";
import axios from "axios";
import { urls, baseURL } from "../../../api/axios";

export default function RepoItem({ repo, onRemove, getReportData }) {
  const { report_no, report_content, report_type } = repo;

  const types = reportTypes;

  const deleteReport = () => {
    axios
      .delete(baseURL + urls.fetchReportsDelete + report_no)
      .then((response) => getReportData());
  };

  return (
    <Card sx={{ mt: 2, mx: 3, height: 250, width: 250 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          id="font_test"
          gutterBottom
        >
          {types[report_type]}
        </Typography>
        <Typography variant="body3" component="div" id="font_test">
          {report_content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={deleteReport} id="font_test">
          삭제
        </Button>
      </CardActions>
    </Card>
  );
}
