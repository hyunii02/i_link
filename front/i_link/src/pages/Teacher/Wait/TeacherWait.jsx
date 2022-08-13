// 선생님이 유치원 가입 승인 요청하고 가입 승인 되기 전까지의 대기화면
// 2022.08.12 김국진
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Avatar,
} from "@mui/material/";
const TeacherWait = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Avatar
        sx={{ width: 380, height: 350 }}
        alt="Academy"
        src="/images/logo.png"
        variant="square"
      ></Avatar>
      <Typography
        variant="h5"
        id="font_test"
        color=" rgba(0, 0, 0, 0.6)"
        textAlign="center"
      >
        가입 승인 대기 중입니다.
        <br />
        승인 받은 후 서비스를 이용하실 수 있습니다.
      </Typography>
    </Box>
  );
};

export default TeacherWait;
