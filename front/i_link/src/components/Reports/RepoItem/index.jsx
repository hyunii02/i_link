// 특이사항 하나하나
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

export default function RepoItem({ repo, onRemove }) {
  const { id, text, value } = repo;

  return (
    <Box>
      <Card>
        {text}
        {value}
        <Button onClick={() => onRemove(id)}>삭제</Button>
      </Card>
    </Box>
  );
}
