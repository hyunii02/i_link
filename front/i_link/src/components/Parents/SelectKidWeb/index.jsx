import React from "react";
import { useState, useContext } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { axios, urls } from "../../../api/axios";
import { UserContext } from "../../../context/user";
import { baseURL } from "../../../api/axios";

const SelectKidWeb = ({ kidName, setKidName }) => {
  const [kidsList, setKidsList] = useState(
    JSON.parse(sessionStorage.getItem("kidsList") || "[]"),
  );
  const { firstKid, setFirstKid } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // 하단 메뉴 아이템 상태 close
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // 아이를 클릭해서 대표아이 변경
  const menuItemClicked = (e) => {
    setFirstKid((firstKid) => kidsList[e.currentTarget.value]);
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="아이 선택">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={firstKid.kid_name.slice(1)}
            src={baseURL + firstKid.kid_profile_url}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {kidsList.map((list, index) => (
          <MenuItem key={index} onClick={menuItemClicked} value={index}>
            <Typography textAlign="center">{list.kid_name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SelectKidWeb;
