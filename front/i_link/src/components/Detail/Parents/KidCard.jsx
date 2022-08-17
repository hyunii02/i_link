// 2022.08.12 강민재, 안정현
// 아이 사진 및 상태
import { useContext, useEffect } from "react";
import { axios, baseURL, urls } from "../../../api/axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UserContext } from "../../../context/user";

import { Box, Grid, Avatar } from "@mui/material";

const KidCard = ({ centerName, setCenterName, groupName, setGroupName }) => {
  const { firstKid } = useContext(UserContext);
  // 버튼에 넣어줘야 할 텍스트
  const buttonText = ["등원완료", "하원완료", "설문완료"];

  const getCenterName = async () => {
    if (firstKid.center_no === null || firstKid.center_no === "") return;

    const response = await axios.get(
      urls.fetchCentersDetial + firstKid.center_no
    );
    setCenterName(response.data.center_name);
  };

  const getGroupName = async () => {
    if (firstKid.group_no === null || firstKid.group_no === "") return;
    const response = await axios.get(
      urls.fetchGroupsDetail + firstKid.group_no
    );
    setGroupName(response.data.group_name);
  };
  useEffect(() => {
    getCenterName();
    getGroupName();
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Grid>
        <Grid container sx={{ justifyContent: "center" }}>
          {
            <Avatar
              src={baseURL + firstKid.kid_profile_url}
              sx={{
                width: 180,
                height: 180,
                border: "3px solid #ffe2e2",
                marginTop: "10px",
              }}
              variant="square"
            />
          }
        </Grid>
        <Grid sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            component="h2"
            id="font_test"
            align="center"
          >
            이름 : {firstKid.kid_name}
          </Typography>
          <Typography
            variant="body2"
            component="h2"
            id="font_test"
            align="center"
          >
            유치원 : {centerName || ""}
          </Typography>
          <Typography
            variant="body2"
            component="h2"
            id="font_test"
            align="center"
          >
            반 : {groupName || ""}
          </Typography>
        </Grid>
        {/* 버튼 파트 */}
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "15px",
          }}
        >
          <Grid container>
            {buttonText.map((text, index) => (
              <Grid item xs={4} key={index} sx={{ textAlign: "center" }}>
                <Button
                  variant={
                    parseInt(firstKid.kid_state) === index + 1
                      ? "contained"
                      : "outlined"
                  }
                  value={index + 1}
                  size="small"
                  color="warning"
                >
                  <Typography variant="body2" id="font_test">
                    {text}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default KidCard;
