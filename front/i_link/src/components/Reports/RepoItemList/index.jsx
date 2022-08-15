// 안정현
// 특이사항 목록으로 보여주기

import React from "react";
import RepoItem from "../RepoItem";

import Grid from "@mui/material/Grid";

export default function RepoItemList({ repos, onRemove, getReportData }) {
  return (
    <Grid
      container
      flexWrap={'wrap'}
      ml='150px' //중앙정렬처럼 보이게 해놓은 것(수정필요)
    >
      {repos.map((repo) => (
        <RepoItem
          repo={repo}
          key={repo.report_no}
          onRemove={onRemove}
          getReportData={getReportData}
        ></RepoItem>
      ))}
    </Grid>
  );
}
