//2022 08 01 배지우작성

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState, useContext } from "react";
import { UserContext } from "../../context/user";

import { axios, baseURL, urls } from "../../api/axios";
import AddNotice from "./addnotice";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Typography } from "@mui/material";
let id_index = 1; //리스트 저장

const defaultImageState = {
  image_file: "",
  preview_URL: "",
};

const Uploader = ({ image, setImage }) => {
  let inputRef; //이미지 미리보기를 위해서 Ref를 사용

  //이미지 저장
  const saveImage = (event) => {
    //event.preventDefault();

    // 이미지를 가져 올 시
    if (event.target.files[0]) {
      //setSendImage((sendImage) => event.target.files[0]);
      // 새로운 이미지를 올리면 createObjectURL()을 통해 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(event.target.files[0]);
      setImage(() => ({
        image_file: event.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  return (
    <Box>
      {/* 이미지 삽입 */}
      <input
        id="noticefileeurl"
        type="file"
        accept="image/*"
        onChange={saveImage}
        onClick={(event) => (event.target.value = null)} // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: "none" }}
      />
      {/* 이미지 창 */}
      <Button id="font_test" onClick={() => inputRef.click()} sx={{ cursor: "pointer",mt:1,pr:2 }}>
        사진첨부
      </Button>
    </Box>
  );
};

export default function NoticeWriteForm(props) {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [contentList, setContentList] = useState([]);
  const { getNoticeList, handleClose2 } = props;
  const { userCenter } = useContext(UserContext);
  const [formErrors, setFormErrors] = useState({});
  const [NoticeImage, setNoticeImage] = useState(defaultImageState);

  //여러개의 파일을 받기위한 함수
  const eachMemoAdd = () => {
    const content = {
      id: id_index++,

      content: noticeContent,
    };
    setContentList([...contentList, content]);
    console.log(content);
    
  };

  // 이미지 저장

  // const CkEditorForm = () => {
  //   return (
  //     <CKEditor
  //       editor={ClassicEditor}
  //       data="<p></p>"

  //       onChange={(event, editor) => {

  //         const data = editor.getData();
  //         console.log({ event, editor, data });
  //       }}

  //     />
  //   );
  // };

  //제목 내용 유효성 검사
  const validate = (noticeData) => {
    const errors = {};
    let flag = false;
    if (!noticeData.noticeTitle) {
      errors.noticeTitle = "제목을 입력해주세요";
      flag = true;
    }

    if (!noticeData.noticeContent) {
      errors.noticeContent = "내용을 입력해주세요";
      flag = true;
    }

    setFormErrors(errors);
    if (flag) {
      return false;
    }
    return true;
  };

  // 정보를 보내는 함수
  const handleSubmit = (event) => {
    event.preventDefault();

    // 서버에 요청보낼 Body
    const body = {
      centerNo: userCenter,
      noticeTitle: noticeTitle,
      noticeContent: noticeContent,
      files: NoticeImage.image_file,
    };
    console.log(body);
    // 사진 전송을 위해 헤더에 Multi-part로 type 설정
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    //유효성 검사 후 데이터 보낸다.

    if (validate(body)) {
      try {
        axios
          .post(baseURL + urls.fetchNoticsRegister, body, config)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              getNoticeList();
              handleClose2();
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Box id="font_test"
      sx={{
        "& .MuiTextField-root": { mt: 0 }, // 텍스트필드마다 mt 5

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      autoComplete="off"
    >
      <Box>
        <h1>공지사항</h1>
      </Box>

      <TextField
        sx={{
          background: "white",
          width: 500,
          borderBottom: "2px solid #8E8F91",
          
        }}
        id="font_test"
        onChange={(e) => setNoticeTitle(e.target.value)}
        
        placeholder="  제목을 입력하세요"
        name="title"
        multiline
        maxRows={4}
        variant="standard"
      />
      <p id="font_test">{formErrors.noticeTitle}</p>
      {/* <CkEditorForm
      sx={{ background: "white" }}
        
        onChange={(e) => setNoticeContent(e.target.value)}
        id="content"
        name="content"
        
        multiline
        rows={10}
      />
      <p id="font_test">{formErrors.noticeContent}</p> */}

      <TextField
        sx={{ background: "white", width: 500 ,border: "2px solid #8E8F91"}}
        onChange={(e) => setNoticeContent(e.target.value)}
        id="font_test"
        name="content"
        placeholder="내용을 입력하세요"
        multiline
        
        rows={10}
      />

      <Box sx={{ width: 500, display: "flex", justifyContent: "flex-start" }}>
        <Uploader image={NoticeImage} setImage={setNoticeImage} />
        <p>{NoticeImage.image_file.name}</p>
        <AddNotice />
      </Box>

      <Box sx={{ width: 300 }}>
        <p id="font_test">{formErrors.noticeContent}</p>
      </Box>
      <Box sx={{ width: 500, display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{}}
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="warning"
          
        >
          글 작성
        </Button>
        <Button id="font_test" sx={{ ml: 2 }} onClick={handleClose2}>
          닫기
        </Button>
      </Box>
    </Box>
  );
}
