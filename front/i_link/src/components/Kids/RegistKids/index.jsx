import React from "react";
import { Box } from "@mui/material";
import RegistMemberLists from "../RegistKidsLists";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const RegistKids = () => {
  return (
    <div>
      <Box sx={{ p: 1, maxWidth: 100 }}>가입승인대기</Box>
      <Box sx={{ p: 1, maxWidth: 100 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>One</Button>
          <Button>Two</Button>
        </ButtonGroup>
      </Box>
      <RegistMemberLists></RegistMemberLists>
    </div>
  );
};

export default RegistKids;
