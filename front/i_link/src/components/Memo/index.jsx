//2022 08 03 배지우
// map으로 알림장 메인에서 뿌려주는 컴포넌트
// index -> creatememo -> creatememoform -> addmemocomponent

import * as React from "react";
import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, keyframes, ThemeProvider } from "@mui/material/styles";
import CreateMemo from "./creatememo";
import Box from "@mui/material/Box";

const card = [
  //더미데이터
  { cards_id: 1, cards_title: "8/1", cards_content: ["손수건", "실로폰"] },
  {
    cards_id: 2,
    cards_title: "7/30",
    cards_content: ["찰흙", "마스크", "노트북"],
  },
  { cards_id: 3, cards_title: "7/29", cards_content: ["실내화", "색연필"] },
  {
    cards_id: 4,
    cards_title: "7/28",
    cards_content: ["체온계", "가방", "연필"],
  },
];

const theme = createTheme();

export default function Album() {
  const [cards, setCards] = useState(card);
  const idCount = useRef(5); // id값지정

  const addMemo = (card) => {
    card.cards_id = idCount.current
    setCards([card, ...cards]);
    console.log(card);
    idCount.current+=1;
  };

  //삭제 함수
  
  const onRemove = (id) => {
    console.log(id);
    setCards(card.filter((card) => card.cards_id !== id));
  
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
                  sx={{ height: 240, display: "flex", flexDirection: "column" }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      sx={{ background: "#F2FADC", mb: 4 }}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {card.cards_title}
                    </Typography>
                    {card.cards_content.map((card, key) => (
                      <Typography key={key}>🏳️‍🌈 {card}</Typography>
                    ))}
                  </CardContent>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    
                    <Button onClick={() => onRemove(card.cards_id)}
                      sx={{
                        background: "#C5EDFD",
                        width: 20,
                        height: 20,
                        color: "#591E59",
                      }}
                    >
                      삭제
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
