import React from "react";
import { IconButton } from "@mui/material";
import { colorPalette } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const KioskLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("userType", "");
    localStorage.setItem("userName", "");
    localStorage.setItem("userNo", "");
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    localStorage.setItem("userPhone", "");
    localStorage.setItem("userCenter", "");
    localStorage.setItem("userGroup", "");
    navigate("/kiosk");
  };

  return (
    <IconButton onClick={handleLogout}>
      <LogoutIcon sx={{ fontSize: "600%" }} />
    </IconButton>
  );
};

export default KioskLogout;
