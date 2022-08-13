import { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Modal,
  TextField,
  Avatar,
} from "@mui/material";
import { baseURL } from "../../../api/axios";

const QuizSolForm = ({ solText, solUrl }) => {
  // 텍스트, url 둘다 있는지 체크
  const isNullData = (data) => {
    if (data === null) return true;
    if (data.length === 0) return true;

    return false;
  };
  return (
    <Box sx={{ height: "100%" }}>
      {/* 텍스트가 비어있을 시 사진으로 전환 */}
      {isNullData(solText) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <Avatar
            src={baseURL + solUrl}
            sx={{ width: "100%", height: "100%" }}
            variant="square"
          ></Avatar>
        </Box>
      )}
      {/* 사진이 비어있을 시 텍스트로 전환 */}
      {isNullData(solUrl) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: "100%",
          }}
        >
          <Typography id="font_test" variant="h6">
            {solText}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default QuizSolForm;
