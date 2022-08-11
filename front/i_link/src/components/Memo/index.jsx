//2022 08 03 배지우
// map으로 알림장 메인에서 뿌려주는 컴포넌트
// index -> creatememo -> creatememoform -> addmemocomponent

import * as React from "react";
import { useState, useRef,useEffect, useContext } from "react";
import { UserContext } from "../../context/user";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateMemo from "./creatememo";
import Box from "@mui/material/Box";
import { baseURL, urls } from "../../api/axios";






const theme = createTheme();

export default function Album() {




  const { userGroup,userCenter,userType } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [groupNo, setGroupNo] = useState(null);
  const [selectValue,setSelectValue] = useState('');

  //반정보받아오기
  const getGroupList = () => {
    const fullURL = baseURL + urls.fetchGroupsList + userCenter;
    const newArray = [];
    axios.get(fullURL).then((response) => {
      response.data.map((data) => {
        const newObj = {
          value: data.group_no,
          content: data.group_name,
        };
        newArray.push(newObj);
      });
      console.log(newArray)
      setGroupList(newArray);
      setSelectValue(newArray[0].value)
    });
  };
  


  // 반 목록 선택 시 반에 맞는 정보
 
  const clickGroupHandler=()=>{
    if (selectValue===''){
      return
    }
    
    try {
      axios
        
        .get(baseURL + urls.fetchMemosList + (userType === '2' ? userGroup : selectValue))
        .then((response) => setCards(response.data));

        
    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    clickGroupHandler();
  }, [selectValue]);


  useEffect(() => {
    getGroupList();
  }, []);


  //axios 로 정보를 받아온다.
  const getMemoList = (e) => {
    
    try {
      axios
        .get(baseURL + urls.fetchMemosList + userGroup)
        .then((response) => setCards(response.data));
        
    } catch (e) {
      console.log(e);
    }
    
  };
   ///삭제함수
  
  const handleDelete = (memoNo) => {
    

    try {
      axios
        .delete(baseURL + urls.fetchMemosDelete + memoNo)
        .then((response) => {
          if (response.status === 200) {
            clickGroupHandler();
          }
        });
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
      {userType===1 && (
      <FormControl fullWidth>
      <Select
        onChange={(e)=>setSelectValue(e.target.value)}
        value={selectValue}
        sx={{
          
          height: "60px",
          border: "6px solid #fae2e2",
          background: "#FAF1DA",
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        {groupList.map((list, index) => (
          <MenuItem
            value={list.value}
            key={index}
            sx={{ background: "#FAF1DA" }}
            
          >
            <Typography id="font_test" variant="h6">
              {list.content}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      )}





        {/* Hero unit */}



        
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <CreateMemo selectValue={selectValue}getMemoList={getMemoList} clickGroupHandler={clickGroupHandler}  />
            {cards.map((card) => (
              <Grid item key={card.memo_no} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: 240, display: "flex", flexDirection: "column" }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      sx={{ background: "#F2FADC", mb: 4 }}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {card.memo_date}
                    </Typography>
                    {card.memo_content.split(",").map((card, key) => (
                      <Typography key={key}>🏳️‍🌈 {card}</Typography>
                    ))}
                  </CardContent>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    
                    <Button onClick={() => handleDelete(card.memo_no)}
                      sx={{
                        background: "#C5EDFD",
                        width: 20,
                        height: 20,
                        color: "#591E59",
                      }}
                    >
                      삭제
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
