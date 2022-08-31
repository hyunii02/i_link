// 공통부문 활동사진 페이지
// 2022.08.11 김국진
import { Box, Avatar, Typography } from "@mui/material";

const PictureBoard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar
        sx={{ width: 380, height: 350 }}
        alt="Academy"
        src="/images/working.png"
        variant="square"
      ></Avatar>
      <Typography id="font_test" variant="h3">
        페이지 공사중
      </Typography>
    </Box>
  );
};

export default PictureBoard;
