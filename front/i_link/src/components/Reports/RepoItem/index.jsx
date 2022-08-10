// 특이사항 하나하나
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { reportTypes } from "../../../api/common";
export default function RepoItem({ repo, onRemove }) {
  const { id, text, type } = repo;

  const types = reportTypes;

  return (
    <Card sx={{ mt: 2, mx: 3, height: 250, width: 250 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {types[type]}
        </Typography>
        <Typography variant="h6" component="div" sx={{ p: 3 }} id="font_test">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onRemove(id)} id="font_test">
          삭제
        </Button>
      </CardActions>
    </Card>
  );
}
