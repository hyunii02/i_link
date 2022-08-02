//2022 08 02 배지우

import * as React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function CreateMemo() {
  return (
    <Grid xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: 300,
          display: "flex",
          flexDirection: "column",
          background: "yellow",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          <Fab color="secondary" aria-label="add">
            <AddIcon></AddIcon>
          </Fab>
        </Box>
      </Card>
    </Grid>
  );
}
