//2022 08 03 배지우
// map으로 알림장 메인에서 뿌려주는 컴포넌트

import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateMemo from "./creatememo";

const card = [      //더미데이터
  { cards_id: 1, cards_title: "8/1", cards_content: "방가방가" },
  { cards_id: 2, cards_title: "7/30", cards_content: "포켓몬" },
  { cards_id: 3, cards_title: "7/20", cards_content: "안녕" },
  { cards_id: 4, cards_title: "7/15", cards_content: "반가워" },
  
];
let idCount = 5; //id 값 지정
const theme = createTheme();

export default function Album() {
  

  const [cards, setCards] = useState(card);          

  const addMemo = (card) => {
    
    card.cards_id = idCount++;     
    setCards([card, ...cards]);
    console.log(card);
  };

  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <CreateMemo addMemo={addMemo} idCount={idCount} /> 
            {cards.map((card) => (
              <Grid item key={card.cards_id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: 300, display: "flex", flexDirection: "column" }}
                >
                  <CardContent sx={{ flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.cards_title}
                    </Typography>
                    <Typography>
                      {card.cards_content}
                      </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
