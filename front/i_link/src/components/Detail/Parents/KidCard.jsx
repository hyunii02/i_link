// 2022.08.12 강민재, 안정현
// 아이 사진 및 상태
import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { UserContext } from "../../../context/user";

import {
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import { baseURL } from "../../../api/axios";

const KidCard = () => {
  const { firstKid } = useContext(UserContext);
  // 버튼에 넣어줘야 할 텍스트
  const buttonText = ["등원완료", "하원완료", "설문완료"];

  return (
    <Box sx={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          right: "70px",
          top: "10px",
          zIndex: "100",
        }}
      >
      </div>
      <Card
        sx={{
          maxWidth: 500,
          height: 200,
          border: "10px solid #fae2e2",
          background: "#FAF1DA",
          /* FAE6D7 */
        }}
      >
        <CardMedia
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {
            <Avatar
              src={baseURL + firstKid.kid_profile_url}
              sx={{
                width: 112,
                height: 112,
                border: "3px solid #ffe2e2",
                marginTop: "10px",
              }}
            />
          }
        </CardMedia>
        {/* Card 사진 이미지 파트 */}
        {/*<CardMedia component="img" height="150" src={student.src} />*/}
        {/* Card 이름 파트 */}
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10px",
          }}
        >
          <Typography id="font_test" variant="h5">
            {firstKid.kid_name}
          </Typography>
        </CardContent>
        {/* Card 버튼 파트 */}
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid container style={{ marginLeft: "2px" }}>
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
                  <Typography variant="body2">{text}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default KidCard