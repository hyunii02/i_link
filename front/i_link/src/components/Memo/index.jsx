//2022 08 03 배지우
// map으로 알림장 메인에서 뿌려주는 컴포넌트
// index -> creatememo -> creatememoform -> addmemocomponent

import * as React from "react";
import { useState, useRef, useEffect, useContext } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateMemo from "./creatememo";
import Box from "@mui/material/Box";
import { AppBar, Tabs, Tab } from "@mui/material";
import { axios,baseURL, urls } from "../../api/axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';

const theme = createTheme();

export default function Album() {
  const { userGroup, userCenter, userType } = useContext(UserContext);
  const [cards, setCards] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [groupNo, setGroupNo] = useState(null);
  const [selectValue, setSelectValue] = useState("");
  const space = " "
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
      
      setGroupList(newArray);
      setSelectValue(newArray[0].value);
    });
  };

  // 반 목록 선택 시 반에 맞는 정보
  
  const clickGroupHandler = () => {
    if (selectValue === "") {
      return;
    }

    try {
      axios

        .get(
          baseURL +
            urls.fetchMemosList +
            (userType === "2" ? userGroup : selectValue)
        )
        .then((response) => setCards(response.data));
    } catch (e) {
      console.log(e);
    }
  };

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

  const handleChange = (event, newValue) => {
    setSelectValue(newValue);
  };
  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* {userType == 1 && (
          <FormControl sx={{pt:5,pl:18,pr:18}}fullWidth>
            <Select
              onChange={(e) => setSelectValue(e.target.value)}
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
        )} */}
        {userType !== 2 && userType !== "2" &&(
        <AppBar  position="static" color="default" elevation={0} >
          <Tabs
            TabIndicatorProps={{
              style: {
                height:"3px",
                background: "#FF8A7B",
                fontColor: "#D97D54",
              },
            }}
            
            value={selectValue}
            onChange={handleChange}
            indicatorColor="inherit"
            textColor="inherit"
            variant="fullWidth"
            
            
            aria-label="action tabs example"
            sx={{ background: "#FDFDF6 ",}}
            
            
          > 
          
            {groupList.map((list, index) => (
              <Tab
                
                sx={{
                  
                  color:"#ssf33",
                  fontSize:"10px"
                }}
                label={
                  <Typography id="font_test" fontSize="20px">
                    {list.content}
                  </Typography>
                }
                value={list.value}
                key={index}
               
              />
            ))}
          </Tabs>
        </AppBar>
)}

        {/* Hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <CreateMemo
              selectValue={selectValue}
              getMemoList={getMemoList}
              clickGroupHandler={clickGroupHandler}
            />
            {cards.map((card) => (
              <Grid item key={card.memo_no} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: 240, display: "flex", flexDirection: "column" }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography

                      id="font_test"  
                      sx={{ background: "#F2FADC", mb: 4 ,textAlign:"center",borderRadius:"10px"}}
                      gutterBottom
                      fontSize="17px"
                      component="h2"
                    >
                     {card.memo_date}
                    </Typography>
                    {card.memo_content.split(",").map((card, key) => (
                      <Box sx={{ml:1.2,mb:0.4}}id="font_test" key={key}>
                        
                        🌱{space}{card}
                      </Box>
                    ))}
                  </CardContent>
                  {userType !== 3 && (
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      <Button
                        id="font_test"
                       
                        onClick={() => handleDelete(card.memo_no)}
                        sx={{
                          mr: 0.7,
                          mb: 1.5,
                          
                          width: 20,
                          height: 20,
                          color: "#FF8A7B",
                          
                          

                          
                        }}
                      >
                       삭제
                      </Button>
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
