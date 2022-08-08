import React, { useRef, useState } from "react";
import BasicModal from "./RepoModal";
import RepoItemList from "./RepoItemList";

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

  const nextId = useRef(0);
  const handleSumit = (text, value) => {
    const repo = {
      id: nextId.current,
      text,
      value,
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
      <BasicModal onSubmit={handleSumit} />
      <RepoItemList repos={repos} onRemove={onRemove} />
    </Box>
  );
}
