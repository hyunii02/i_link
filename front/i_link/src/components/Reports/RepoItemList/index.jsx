// 특이사항 목록으로 보여주기
import React from "react";
import RepoItem from "../RepoItem";

import Box from "@mui/material/Box";

export default function RepoItemList({ repos, onRemove }) {
  return (
    <Box>
      {repos.map((repo) => (
        <RepoItem repo={repo} key={repo.id} onRemove={onRemove}></RepoItem>
      ))}
    </Box>
  );
}
