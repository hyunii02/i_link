// 2022.08.08 배지우 //


import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchForm from "./searchform";
import { useState ,useContext} from "react";
import { UserContext } from "../../context/user";
import { axios, urls } from "../../api/axios";
import { colorPalette } from "../../constants/constants";
import { Alert } from "@mui/material";


const theme = createTheme();

export default function MasterRegistCenter(props) {
  // 원장회원번호
  const { userNo } = useContext(UserContext);
  console.log(userNo)

  const obj = {
    centerName: "",
    centerAddr: "",
    centerTel: "",
    userNo: userNo ,
  };
  const [address, setAddress] = useState(""); // 주소api를 통해 입력데이터
  const [totalData, setTotalData] = useState(obj); //최종 모집 데이터

  


  // 입력한 주소를 가져오는 함수

  const addAddress = (data) => {
    setAddress(data);
  };

  // 유치원 이름 입력변화

  const handleChangeCenter = (event) => {
    const middleData = {
      ...totalData,

      centerName: event.target.value,
    };
    setTotalData(middleData);
  };
  //유치원 번호 변화

  const handleChangeTel = (event) => {
    const middleData = {
      ...totalData,

      centerTel: event.target.value,
    };
    setTotalData(middleData);
  };

  // 상세주소 입력 함수
  const handleChangeDetail = (event) => {
    const middleData = {
      ...totalData,

      centerAddr: address.fullAddress + " " + event.target.value,
    };

    setTotalData(middleData);
  };
  // 최종 데이터 submit
  const submitAddress = (event) => {
    event.preventDefault();

    const validate = () => {
      
      if (!totalData.centerName) {
        alert = "유치원 명을 입력해주세요.";
        
        
      }
      
      if (!totalData.centerAddr) {
        alert = "유치원 주소를 입력해주세요";
        
      }
      
      if (totalData.centerTel) {
        <Alert severity="error">ㅎㅇㅎㅇ</Alert>
        
      }
    }
    axios
    .post(urls.fetchCentersRegister, totalData)
    .then((response) => console.log(response));
    }
    
    
    


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" id="font_test" sx={{ color : "black" , mb:4}}>유치원 등록</Typography>
          {/* 로고 이미지 */}
          {/* <Typography
            id="font_test"
            component="h6"
            variant="h4"
            sx={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            원과 가정을 잇다
          </Typography>
          <Avatar
            sx={{ width: 250, height: 250 }}
            alt="Academy"
            src="/images/logo.png"
          ></Avatar> */}
          {/* 유치원 등록 form */}
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid  container spacing={2}>
              <Grid  item xs={12} sm={12}>
                {/* 유치원 이름 입력창 */}
                <TextField
                  
                  required
                  fullWidth
                  id="font_test"
                  placeholder="유치원 이름을 입력하세요"
                  name="centername"
                  onChange={handleChangeCenter}
                  autoComplete="centername"
                  autoFocus
                  sx={{ background: "white" }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                {/* 유치원 번호 입력창 */}
                <TextField
                  required
                  fullWidth
                  id="font_test"
                  placeholder="유치원 번호를 입력하세요"
                  name="center_tel"
                  onChange={handleChangeTel}
                  sx={{ background: "white" }}
                />
              </Grid>

              {/*주소찾기 */}
              <Grid sx={{ mt: 10 }} item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="font_test"
                  value={address.zonecode || ""}
                  placeholder="우편번호"
                  sx={{ background: "white" }}
                />
              </Grid>
              {/*우편번호 찾기 버튼*/}
              <Grid sx={{ mt: 10 }} item xs={6} sm={6}>
                <SearchForm addAddress={addAddress} />
              </Grid>

              {/*주소 찾기 완료시 주소 정보 입력*/}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  value={address.fullAddress || ""}
                  name="address"  
                  id="font_test"
                  placeholder="주소를 입력하세요"
                  fullWidth
                  sx={{ background: "white" }}
                ></TextField>
              </Grid>

              {/*상세 주소 입력*/}
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  
                  id="font_test"
                  placeholder="상세주소를 입력하세요"
                  onChange={handleChangeDetail}
                  sx={{ background: "white" }}
                />
              </Grid>
            </Grid>

            {/* 유치원 등록 버튼 */}
            <Button
              fullWidth
              variant="contained"
              onClick={submitAddress}
              style={{ background: colorPalette.BUTTON_COLOR }}
              sx={{ mt: 3, mb: 2 }}
            >
              <Typography id="font_test" component="h6" variant="h6">
                유치원 등록
              </Typography>
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
