// 모달창을 열었을때, 메모 작성 폼
// index -> creatememo -> creatememoform -> addmemocomponent

import React from "react";
import { useState, useContext } from "react";
import CreateMemo from "./creatememo";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddMemoContent from "./addmemocontent";
import DatePicker from "react-datepicker";
import { UserContext } from "../../context/user";
import { axios,baseURL, urls } from "../../api/axios";

import Grid from "@mui/material/Grid";

let id_index = 1;
// 2022 08 03 김국진
const CreateMemoForm = (props) => {
  const { userGroup } = useContext(UserContext);
  const [memoTitle, setMemoTitle] = useState("");
  const [memoContent, setMemoContent] = useState("");
  const [contentList, setContentList] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const { getMemoList, handleClose, selectValue, clickGroupHandler } = props;

  //날짜 입력 제목

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const memo_date = `${year}-${month}-${day}`;

  // 엔터누를때마다 값을 하나씩 저장.
  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      const content = {
        id: id_index++,

        content: memoContent,
      };
      setContentList([...contentList, content]);
      
      setMemoContent("");
    }
  };

  const eachMemoAdd = () => {
    const content = {
      id: id_index++,

      content: memoContent,
    };
    setContentList([...contentList, content]);
    
    setMemoContent("");
  };

  const buttonClickHandler = (e) => {
    const subData = [];
    contentList.map((content) => subData.push(content.content));

    e.preventDefault();
    const lastMemoContent = subData.join(",");

    const newData = {
      groupNo: selectValue,
      memoDate: memoTitle,
      memoContent: lastMemoContent,
    };
    const validate = () => {
      const errors = {};
      let flag = false;
      if (!newData.memoDate) {
        errors.memoTitle = "날짜를 선택해 주세요";
        flag = true;
      }

      if (!newData.memoContent) {
        errors.lastMemoContent = "항목을 추가해 주세요";
        flag = true;
      }

      setFormErrors(errors);
      if (flag) {
        return false;
      }
      return true;
    };
    if (validate()) {
      try {
        axios
          .post(baseURL + urls.fetchMemosRegister, newData)
          .then((response) => {
            if (response.status === 200) {
              

              clickGroupHandler();
              handleClose();
            }
          });
      } catch (e) {
        console.log(e);
      }
    }

    
  };

  const onRemove2 = (id) => {
    
    setContentList(contentList.filter((content) => content.id !== id));
  };

  return (
    <div>
      <h3 style={{ display: "flex", justifyContent: "center" }}>알림장 등록</h3>
      <Box
        sx={{
          "& .MuiTextField-root": { mt: 2 }, // 텍스트필드마다 mt 3
          height: 300,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={5.9}>
            <TextField
              id="font_test"
              type="date"
              sx={{
                background: "#F2EFDA",
                width: 200,
              }}
              value={memoTitle}
              onChange={(e) => setMemoTitle(e.target.value)}
            ></TextField>
            <p id="font_test">{formErrors.memoTitle}</p>
          </Grid>

          <Grid item xs={8}>
            <TextField
              id="font_test"
              sx={{
                width: 200,
                background: "#F2EFDA",
              }}
              value={memoContent}
              type="text"
              placeholder="내용을 입력하세요"
              onChange={(e) => setMemoContent(e.target.value)}
              onKeyDown={keyDownHandler}
            ></TextField>
            <p id="font_test">{formErrors.lastMemoContent}</p>
          </Grid>
          <Grid item xs={3}>
            {memoContent !== "" && (
              <Button
                id="font_test"
                onClick={eachMemoAdd}
                sx={{
                  mt: 2,
                  width: 90,
                  height: 58,
                  background: "#6E5203",
                  color: "white",
                }}
              >
                항목추가
              </Button>
            )}
          </Grid>
        </Grid>
        <br />
        <Box>
          {contentList.map((content) => (
            <AddMemoContent
              key={content.id}
              content={content}
              onRemove2={onRemove2}
            />
          ))}
        </Box>

        <Button
          id="font_test"
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
