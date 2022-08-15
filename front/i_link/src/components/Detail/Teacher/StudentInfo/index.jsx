import { Box, Grid, Typography, Divider, Avatar, Button } from "@mui/material";
import { baseURL, urls } from "../../../../api/axios";
import { useEffect, useState } from "react";
import axios from "axios";

// 버튼에 넣어줘야 할 텍스트
const buttonText = ["등원완료", "하원완료", "설문완료"];

const StudentInfo = ({ kidInfo, parentInfo, getKidsData }) => {
  const [groupName, setGroupName] = useState("");
  // 서버에 현재 속해있는 반 이름을 요청
  const getGroupName = async () => {
    const fullURL = baseURL + urls.fetchGroupsDetail + kidInfo.group_no;
    try {
      const response = await axios.get(fullURL);
      if (response.status === 200) {
        setGroupName((groupName) => response.data.group_name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (kidInfo.length === 0) return;
    getGroupName();
  }, [kidInfo]);

  const buttonClickHandler = (e) => {
    try {
      const fullURL =
        baseURL +
        urls.fetchKidsStateChange +
        kidInfo.kid_no +
        "/" +
        e.currentTarget.value;
      axios.put(fullURL).then((response) => {
        if (response.status === 200) {
          getKidsData();
        } else {
          console.log("데이터 response Error!! [", response.status, "]");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Grid container item sx={{ justifyContent: "space-between" }}>
        <Grid item xs>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "90%",
                height: "90%",
                justifyContent: "center",
              }}
            >
              <Avatar
                src={baseURL + kidInfo.kid_profile_url}
                variant="square"
                sx={{
                  width: "100%",
                  height: "90%",
                  border: "5px solid #fae2e2",
                }}
              />
            </Box>
            <Box sx={{ width: "90%", height: "15%", display: "flex" }}>
              <Grid container style={{ marginLeft: "2px" }}>
                {buttonText.map((text, index) => (
                  <Grid item xs={4} key={index} sx={{ textAlign: "center" }}>
                    <Button
                      variant={
                        parseInt(kidInfo.kid_state) === index + 1
                          ? "contained"
                          : "outlined"
                      }
                      value={index + 1}
                      size="small"
                      color="warning"
                      onClick={buttonClickHandler}
                    >
                      <Typography variant="body2">{text}</Typography>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid container item xs>
          <Grid item xs={12}>
            <Typography variant="h5" id="font_test" textAlign="center">
              🍀 아이 정보 🍀
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              id="font_test"
              ml="10px"
              mt="20px"
              sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}
            >
              반 : {groupName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              id="font_test"
              ml="10px"
              mt="15px"
              sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}
            >
              이름 : {kidInfo.kid_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              id="font_test"
              ml="10px"
              mt="15px"
              sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}
            >
              생년월일 : {kidInfo.kid_birth}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              id="font_test"
              ml="10px"
              mt="15px"
              sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}
            >
              부모님 성함 : {parentInfo.user_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              id="font_test"
              ml="10px"
              mt="15px"
              mb="15px"
              sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.3)" }}
            >
              전화번호 : {parentInfo.user_phone}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentInfo;
