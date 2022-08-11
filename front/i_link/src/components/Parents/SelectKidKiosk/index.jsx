import React from "react";
import { useState } from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { axios, urls } from "../../../api/axios";

const SelectKidKiosk = ({ kidName, setKidName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [kidsList, setKidsList] = useState(
    JSON.parse(localStorage.getItem("kidsList") || "[]")
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getKidsList = async () => {
    try {
      const response = await axios.get(
        urls.fetchParentKids + localStorage.getItem("userNo")
      );
      localStorage.setItem("kidsList", JSON.stringify(response.data));
      setKidsList(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSelect = (kidName, kidNo) => {
    setKidName(kidName);
    localStorage.setItem("kidName", kidName);
    localStorage.setItem("kidNo", kidNo);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="아이 선택">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 100, height: 100, fontSize: "2.8rem" }}>
              {kidName.slice(1) || "싸피"}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 100,
              height: 100,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {kidsList.map((kid) => (
          <MenuItem
            sx={{ fontSize: "3rem" }}
            key={kid.kid_name}
            onClick={() => handleSelect(kid.kid_name, kid.kid_no)}
          >
            <Avatar sx={{ width: 100, height: 100, fontSize: "2.8rem" }}>
              {kid.kid_name.slice(1)}
            </Avatar>
            {kid.kid_name}
          </MenuItem>
        ))}

        <Divider />
        <MenuItem sx={{ fontSize: "3rem" }} onClick={getKidsList}>
          <ListItemIcon>
            <PersonAdd sx={{ fontSize: "5rem", marginRight: 5 }} />
          </ListItemIcon>
          아이들 목록 가져오기
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default SelectKidKiosk;
