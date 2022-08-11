// 모달창을 열었을때, 메모 작성 폼
// index -> creatememo -> creatememoform -> addmemocomponent

import React from "react";
import { useState,useContext } from "react";
import CreateMemo from "./creatememo";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddMemoContent from "./addmemocontent";
import DatePicker from "react-datepicker";
import { UserContext } from "../../context/user";
import { baseURL, urls } from "../../api/axios";
import axios from "axios";

let id_index = 1;
// 2022 08 03 김국진
const CreateMemoForm = (props) => {
  const { userGroup } = useContext(UserContext);
  const [memoTitle, setMemoTitle] = useState("");
  const [memoContent, setMemoContent] = useState("");
  const [contentList, setContentList] = useState([]);
  const { getMemoList, handleClose, selectValue,clickGroupHandler} = props;


  //날짜 입력 제목

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const memo_date = `${year}-${month}-${day}`
  
  

  // 엔터누를때마다 값을 하나씩 저장.
  const keyDownHandler = (e) => {
    
    if (e.key === "Enter") {
      const content = {
        id: id_index++,

        content: memoContent,
      };
      setContentList([...contentList, content]);
      console.log(content)
      setMemoContent('');
      
      
      
    }
  };

  const buttonClickHandler = (e) => {
    const subData = [];
    contentList.map((content) => subData.push(content.content));
    
    e.preventDefault();
    const lastMemoContent =subData.join(',')
    
    const newData = {
      groupNo: selectValue,
      memoDate: memo_date,
      memoContent: lastMemoContent,
    };
    try {
      axios
        .post(baseURL + urls.fetchMemosRegister,newData)
        .then((response) => {
          if (response.status===200) {
            console.log(response)
            
            clickGroupHandler();
            handleClose();
            
          }
        }
        );
    } catch (e) {
      console.log(e);
    }
    
    console.log(newData)
    
    
    
  };


  const onRemove2 = (id) => {
    console.log(id)
    setContentList(contentList.filter((content) => content.id !== id));
  
  };


  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { mt: 2 }, // 텍스트필드마다 mt 3
          height: 300,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          sx={{
            background: "#F2EFDA",
          }}
          value = {memo_date}
          type="text"
          placeholder="제목을 입력하세요"
          // onChange={(e) => setMemoTitle(e.target.value)}
        ></TextField>
        
        <TextField
          sx={{
            background: "#F2EFDA",
          }}
          value={memoContent}
          type="text"
          placeholder="내용"
          onChange={(e) => setMemoContent(e.target.value)}
          onKeyDown={keyDownHandler}
        ></TextField>

        <br />
        <Box>
          {contentList.map((content) => (
            <AddMemoContent key={content.id} content={content} onRemove2={onRemove2} />
          ))}
        </Box>
        <Button
          sx={{
            background: "#FCE99A",
            fontSize: 15,
            fontWeight: 700,
            color: "black",
          }}
          type="submit"
          variant="contained"
          
          onClick={buttonClickHandler}
            
        >
          메모추가
        </Button>
      </Box>
    </div>
  );
};

export default CreateMemoForm;
