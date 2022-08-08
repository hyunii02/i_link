import React from "react";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "../../../context/user";
import { colorPalette } from "../../../constants/constants";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const {
    setUserNo,
    setUserName,
    setUserType,
    setUserPhone,
    setUserCenter,
    setUserGroup,
    setAccessToken,
    setRefreshToken,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setUserNo(null);
    setUserName(null);
    setUserType(null);
    setUserPhone(null);
    setUserCenter(null);
    setUserGroup(null);
    setAccessToken(null);
    setRefreshToken(null);

    navigate("/");
  };

  return (
    <Button
      type="submit"
      variant="contained"
      style={{ background: colorPalette.BUTTON_COLOR }}
      onClick={handleLogout}
      sx={{ mx: 3, boxShadow: 0 }}
    >
      로그아웃
    </Button>
  );
};

export default Logout;
