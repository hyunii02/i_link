import React from "react";
import { Grid } from "@mui/material";
import QuizKioskChoice from "../KioskChoice";

const QuizKioskChoices = ({ quiz }) => {
  const selArr = [
    {
      sel: quiz.sel1,
      selUrl: quiz.sel1Url,
    },
    {
      sel: quiz.sel2,
      selUrl: quiz.sel2Url,
    },
    {
      sel: quiz.sel3,
      selUrl: quiz.sel3Url,
    },
    {
      sel: quiz.sel4,
      selUrl: quiz.sel4Url,
    },
  ];

  return (
    <Grid container sx={{ flexGrow: 1 }} spacing={2}>
      {selArr.map(({ sel, selUrl }, index) => (
        <QuizKioskChoice
          sel={sel}
          selUrl={selUrl}
          quizNo={quiz.quizNo}
          index={index}
          key={index}
        />
      ))}
    </Grid>
  );
};

export default QuizKioskChoices;
