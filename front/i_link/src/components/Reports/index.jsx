import React, { useRef, useState, useContext } from "react";
import BasicModal from "./RepoModal";
import RepoItemList from "./RepoItemList";
import { UserContext } from "../../context/user";
import { axios, urls, baseURL } from "../../api/axios";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export default function Reports() {
  // 임시 데이터
  const [repos, setRepos] = useState([
    {
      id: 1,
      text: "특이사항1",
      value: "attend",
    },
    {
      id: 2,
      text: "특이사항2",
      value: "friends",
    },
  ]);

  const nextId = useRef(3); //임시데이터에 기본 id값을 줘서 일단 3으로 바꿔놓음 => 임시데이터 지우고 0으로 다시 바꾸기!
  const { userNo } = useContext(UserContext);

  const handleSumit = (text, type) => {
    const body = {
      kidNo : '1',
      reportWriter : userNo,
      reportType: type,
      reportContent: text
    }
    // try {
    //   axios.post(
    //     baseURL + urls.fetchReportsRegister,
    //     body
    //   ).then() //
    // }

    const repo = {
      id: nextId.current,
      text,
      type,
    };
    setRepos(repos.concat(repo));
    nextId.current += 1;
  };

  // 삭제 기능
  const onRemove = (id) => {
    setRepos(repos.filter((repo) => repo.id !== id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 특이사항 title */}
      <Typography id="font_test" component="h1" variant="h4">
        특이사항
      </Typography>
      <BasicModal handleSubmit={handleSumit} />
      <RepoItemList repos={repos} onRemove={onRemove} />
    </Box>
  );
}
