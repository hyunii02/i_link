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
  Grid,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { UserContext } from "../../../context/user";
import { axios, baseURL, urls } from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const SelectKidWeb = ({ kidName, setKidName }) => {
  const {
    userType,
    firstKid,
    setFirstKid,
    kidsList,
    userName,
    userCenter,
    userGroup,
    userProfileUrl,
    setUserCenter,
    setUserGroup,
  } = useContext(UserContext);

  const navigate = useNavigate();

  /*
  const [totalkidsList, setTotalKidsList] = useState(
    JSON.parse(sessionStorage.getItem("kidsList") || "[]"),
  );*/
  const [totalkidsList, setTotalKidsList] = useState(kidsList);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // 유치원명, 반 명
  const [centerName, setCenterName] = useState("");
  const [centerNo, setCenterNo] = useState("");
  const [groupName, setGroupName] = useState("");

  // 서버에 현재 속해있는 유치원 이름을 요청
  const getCenterName = async () => {
    const fullURL = urls.fetchCentersDetial + userCenter;
    try {
      const response = await axios.get(fullURL);
      if (response.status === 200) {
        setCenterName((centerName) => response.data.center_name);
        setCenterNo((centerNo) => response.data.center_no);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 서버에 현재 속해있는 반 이름을 요청
  const getGroupName = async () => {
    const fullURL = urls.fetchGroupsDetail + userGroup;
    try {
      const response = await axios.get(fullURL);
      if (response.status === 200) {
        setGroupName((groupName) => response.data.group_name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    if (parseInt(userType) === 1) {
      getCenterName();
    } else if (parseInt(userType) === 2) {
      getCenterName();
      getGroupName();
    }
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
    setUserCenter(kidsList[e.currentTarget.value].center_no);
    setUserGroup(kidsList[e.currentTarget.value].group_no);
    setAnchorElUser(null);
    navigate("/parents/home", { state: kidsList[e.currentTarget.value] });
  };

  // 회원정보수정 클릭
  const profileUpdateClicked = () => {
    if (userType == 1) {
      navigate("/master/profileupdate");
    } else if (userType == 2) {
      navigate("/teacher/profileupdate");
    } else if (userType == 3) {
      navigate("/parents/profileupdate");
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="프로필관리">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0, border: "3px solid #ffe2e2" }}
        >
          <Avatar
            alt={firstKid.length === 0 ? userName : firstKid.kid_name.slice(1)}
            src={
              baseURL +
              (firstKid.length === 0
                ? userProfileUrl
                : firstKid.kid_profile_url)
            }
            sx={{ background: "rgba(0, 0, 0, 0.2)" }}
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
        <MenuItem
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.5)" }}
          onClick={profileUpdateClicked}
        >
          <Typography id="font_test" textAlign="center">
            회원 프로필 수정
          </Typography>
        </MenuItem>
        {parseInt(userType) == 3 &&
          kidsList !== "" &&
          kidsList?.map((list, index) => (
            <MenuItem key={index} onClick={menuItemClicked} value={index}>
              <Typography id="font_test" textAlign="center">
                {list.kid_name}
              </Typography>
            </MenuItem>
          ))}
        {parseInt(userType) == 2 && (
          <Box ml={2} mt={2} sx={{ width: "150px" }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography id="font_test" variant="body2">
                  {centerName} [{centerNo}]
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography id="font_test" variant="body2">
                  {groupName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography id="font_test" variant="body2">
                  {userName} 선생님
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        {parseInt(userType) == 1 && (
          <Box ml={2} mt={2}>
            <Grid container>
              <Grid item xs={12}>
                <Typography id="font_test">
                  {centerName} [{centerNo}]
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography id="font_test">{userName} 원장님</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default SelectKidWeb;
