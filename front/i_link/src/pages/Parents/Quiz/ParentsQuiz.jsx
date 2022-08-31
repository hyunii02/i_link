import React from "react";
import KidQuiz from "../../../components/Detail/Parents/KidQuiz";
import { UserContext } from "../../../context/user";
import { useContext } from "react";
import { Box, Grid } from "@mui/material";
import { colorPalette } from "../../../constants/constants";

const ParentsQuiz = () => {
  const { firstKid } = useContext(UserContext);
  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            background: colorPalette.BACKGROUND_COLOR,
            boxShadow: 2,
            borderRadius: 2,
            p: 5,
            mt: 3,
            mb: 5,
          }}
        >
          <KidQuiz kidNo={firstKid.kid_no} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParentsQuiz;
