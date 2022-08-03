import { Box } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";


const AddMemoContent = (props) => {
  const {content} = props;
  // const handleUpload = () =>{
  //   setContent((prevState)) => {
  //     return [input,...prevState]
  //   }
  // }
  return (
    <Box sx={{ display: "flex" }}>
      <Typography variant="button" display="block" gutterBottom>
        * {content.content}
      </Typography>
      <Button variant="outlined">삭제</Button>
    </Box>
  );
};

export default AddMemoContent;
