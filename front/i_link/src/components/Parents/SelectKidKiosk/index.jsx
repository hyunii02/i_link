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
import { axios, urls, baseURL } from "../../../api/axios";

const SelectKidKiosk = ({ kidName, setKidName, kidUrl, setKidUrl }) => {
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
  const handleSelect = (kidName, kidNo, kidUrl, kidGroup) => {
    setKidName(kidName);
    setKidUrl(kidUrl);
    localStorage.setItem("kidName", kidName);
    localStorage.setItem("kidNo", kidNo);
    localStorage.setItem("kidUrl", kidUrl);
    localStorage.setItem("kidGroup", kidGroup);
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
            <Avatar
              sx={{ width: 100, height: 100, fontSize: "2.8rem" }}
              src={baseURL + kidUrl || "/images/user.png"}
            ></Avatar>
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
            onClick={() =>
              handleSelect(
                kid.kid_name,
                kid.kid_no,
                kid.kid_profile_url,
                kid.group_no
              )
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, fontSize: "2.8rem" }}
              src={baseURL + kid.kid_profile_url || "/images/user.png"}
            ></Avatar>
            {kid.kid_name}
          </MenuItem>
        ))}

        <Divider />
        <MenuItem sx={{ fontSize: "3rem" }} onClick={getKidsList}>
          <ListItemIcon>
            <PersonAdd sx={{ fontSize: "5rem", marginRight: 5 }} />
          </ListItemIcon>
          목록 새로고침
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default SelectKidKiosk;
