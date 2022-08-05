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

// 알림 뱃지 스타일링
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 25,
    top: 25,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    width: 30,
    height: 30,
    cursor: "pointer",
  },
}));

const MemberStudent = (props) => {
  // page에서 가져온 원생 정보
  const { student } = props;
  const [studentState, setStudentState] = useState(student);
  // 버튼에 넣어줘야 할 텍스트
  const buttonText = ["등원완료", "하원완료", "설문완료"];

  // 버튼 클릭 이벤트 핸들러. 버튼 클릭에 따라 원생의 상태 변경
  const buttonClickHandler = (e) => {
    // 불변성유지
    setStudentState({
      ...studentState,
      // 버튼의 value값 읽어와 state 저장
      state: e.currentTarget.value,
    });
  };

  // 우측 상단 뱃지 클릭 이벤트 핸들러
  const badgeClickHandler = (e) => {
    // 뱃지를 클릭했는지 유효성 검사
    if (e.target === e.currentTarget.children[1]) {
      alert(`${student.name}의 특이사항`);
    }
  };

  return (
    <StyledBadge
      color="secondary"
      badgeContent={<Typography>{1}</Typography>}
      onClick={badgeClickHandler}
      invisible={false}
      value="se"
      className="badge"
    >
      <Card
        sx={{
          maxWidth: 400,
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
              src={student.src}
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
            {student.name}
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
              <Grid item xs={4} key={index}>
                <Button
                  variant={
                    parseInt(studentState.state) === index + 1
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
      </Card>
    </StyledBadge>
  );
};

export default MemberStudent;
