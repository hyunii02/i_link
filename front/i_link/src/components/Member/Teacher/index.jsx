// 원생관리에 쓸 프로필
// create by 김국진
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, IconButton, Badge, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { baseURL } from "../../../api/axios";

// 알림 뱃지 스타일링
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 10,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    width: 30,
    height: 30,
    cursor: "pointer",
  },
}));

const MemberTeacher = (props) => {
  // page에서 가져온 원생 정보
  const { teacher } = props;
  console.log(teacher);
  const [teacherState, setTeacherState] = useState(teacher);

  return (
    <Card
      sx={{
        maxWidth: 300,
        width: "100%",
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
            src={baseURL + teacher.user_profile_url}
            sx={{
              width: 112,
              height: 112,
              border: "3px solid #ffe2e2",
              marginTop: "10px",
            }}
          />
        }
      </CardMedia>
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
          {teacher.user_name} 선생님
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
      ></Box>
    </Card>
  );
};

export default MemberTeacher;
