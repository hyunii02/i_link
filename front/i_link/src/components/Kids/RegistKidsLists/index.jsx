// 2022.08.02 강민재
// 승인 요청한 목록을 띄워주는 컴포넌트
import React from "react";
import Grid from "@mui/material/Grid";
import RegistKidsList from "../RegistKidsList";

// 신청자 목록 더미 데이터
const RegistKidsLists = () => {
  const kids = [
    {
      id: 1123,
      name: "김국진",
      group: "자바반",
    },
    {
      id: 21252,
      name: "강민재",
      group: "파이썬반",
    },
    {
      id: 22346,
      name: "강민재",
      group: "파이썬반",
    },
    {
      id: 212,
      name: "강민재",
      group: "파이썬반",
    },
    {
      id: 237,
      name: "강민재",
      group: "파이썬반",
    },
    {
      id: 123,
      name: "강민재",
      group: "파이썬반",
    },
  ];
  return (
    <div>
      <Grid container spacing={2}>
        {kids.map((kid) => (
          <Grid item xs={4} key={kid.id}>
            <RegistKidsList kid={kid} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RegistKidsLists;
