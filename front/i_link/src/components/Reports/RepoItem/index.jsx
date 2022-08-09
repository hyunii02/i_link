// 특이사항 하나하나
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

export default function RepoItem({ repo, onRemove }) {
  const { id, text, type } = repo;

  const types = {
    '1':'등하원',
    '2':'교우관계',
    '3':'알레르기(음식)',
    '4':'약복용',
    '5':'수면',
    '6':'기타',
  }

  return (
      <Card sx={{ mt:2, mx:3, height:250, width:250}}>
        <CardContent>
          <Typography sx={{ fontSize: 14}} color="text.secondary">
            {types[type]}
          </Typography>
          <Typography variant="h6" component="div" sx={{p:3}} id="font_test">
            {text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onRemove(id)} id="font_test">삭제</Button>
        </CardActions>
      </Card>
  );
}
