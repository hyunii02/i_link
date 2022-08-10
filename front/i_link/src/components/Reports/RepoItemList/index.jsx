// 특이사항 목록으로 보여주기
import React from "react";
import RepoItem from "../RepoItem";

import Grid from '@mui/material/Grid';


export default function RepoItemList({ repos, onRemove }) {
  return (
    <Grid container
    justifyContent={"center"}
      // alignItems={"center"}
      // textAlign= {'center'}
      >
      {repos.map((repo) => (
        <RepoItem repo={repo} key={repo.id} onRemove={onRemove}></RepoItem>
      ))}
    </Grid>
  );
}
