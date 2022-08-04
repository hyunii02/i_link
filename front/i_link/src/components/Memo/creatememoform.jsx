// 모달창을 열었을때, 메모 작성 폼
// index -> creatememo -> creatememoform -> addmemocomponent 

import React from "react";
import { useState } from "react";
import CreateMemo from "./creatememo";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddMemoContent from "./addmemocontent";
import DatePicker from "react-datepicker";
let id_index = 1;
// 2022 08 03 김국진
const CreateMemoForm = (props) => {
  const [memoTitle, setMemoTitle] = useState("");
  const [memoContent, setmemoContent] = useState("");
  const [contentList, setContentList] = useState([]);
  const { addMemo, idCount } = props;

  // 엔터누를때마다 값을 하나씩 저장.
  const keyDownHandler = (e) => {
  

    if (e.key === "Enter") {
      
      const content = {
        id: id_index++,

        content: memoContent,
      };
      setContentList([...contentList, content]);
      
    }
  };

  const buttonClickHandler = (e) => {
    
    const subData = [];
    contentList.map((content) => (
      subData.push(content.content)
    ))
    
    e.preventDefault();
    const newData = {
      cards_id: idCount,
      cards_title: memoTitle,
      cards_content: subData,
    };
    console.log(subData);
    addMemo(newData);
  };

  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { mt: 3 }, // 텍스트필드마다 mt 3

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          value={memoTitle}
          type="text"
          placeholder="제목"
          onChange={(e) => setMemoTitle(e.target.value)}
        ></TextField>

        <TextField
          value={memoContent}
          type="text"
          placeholder="내용"
          onChange={(e) => setmemoContent(e.target.value)}
          onKeyDown={keyDownHandler}
        ></TextField>
        <br />
        <Box>
          {contentList.map((content) => (
            <AddMemoContent key={content.id} content={content} />
          ))}
        </Box>
        <Button
          sx={{ mt: 5, mr: 3 }}
          type="submit"
          variant="contained"
          color="warning"
          onClick={buttonClickHandler}
        >
          메모추가
        </Button>
      </Box>
    </div>
  );
};

export default CreateMemoForm;
