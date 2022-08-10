import React from "react";
import Button from "@mui/material/Button";
import { colorPalette } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";

const KioskLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("userType", null);
    localStorage.setItem("userName", null);
    localStorage.setItem("userNo", null);
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);
    localStorage.setItem("userPhone", null);
    localStorage.setItem("userCenter", null);
    localStorage.setItem("userGroup", null);
    navigate("/kiosk");
  };

  return (
    <Button
      type="submit"
      variant="contained"
      style={{ background: colorPalette.BUTTON_COLOR }}
      onClick={handleLogout}
      sx={{ boxShadow: 0, width: 1, fontSize: "2vh" }}
    >
      로그아웃
    </Button>
  );
};

export default KioskLogout;
