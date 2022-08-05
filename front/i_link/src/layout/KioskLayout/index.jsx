import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const KioskLayout = () => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100vw",
        height: "100vh",
        bgcolor: "#4CA761",
        border: 70,
        borderColor: "#B87C35",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default KioskLayout;
