import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Member from "../../../components/Member/";

const detail = [
  {
    id: 1,
    name: "김국진",
    src: "/images/avatar/picachu.png",
    state: 1,
  },
  {
    id: 2,
    name: "배지우",
    src: "/images/avatar/jilbbug.png",
    state: 1,
  },
  {
    id: 3,
    name: "안정현",
    src: "/images/avatar/Happiny.png",
    state: 1,
  },
  {
    id: 4,
    name: "송형근",
    src: "/images/avatar/bkain.png",
    state: 1,
  },
  {
    id: 5,
    name: "강민재",
    src: "/images/avatar/ggobu.png",
    state: 1,
  },
  {
    id: 6,
    name: "이소영",
    src: "/images/avatar/gora.png",
    state: 2,
  },
  {
    id: 7,
    name: "한지우",
    src: "",
    state: 0,
  },
  {
    id: 8,
    name: "둘지우",
    src: "",
    state: 0,
  },
  {
    id: 9,
    name: "셋지우",
    src: "",
    state: 0,
  },
  {
    id: 10,
    name: "넷지우",
    src: "",
    state: 0,
  },
  {
    id: 11,
    name: "다섯지우",
    src: "",
    state: 0,
  },
  {
    id: 12,
    name: "여섯지우",
    src: "",
    state: 0,
  },
];

const TeacherManagement = () => {
  const [student, setStudent] = useState(detail);

  return (
    <Box>
      <Grid container style={{ display: "flex" }} spacing={0.5}>
        {student.map((stu) => (
          <Grid item xs={3} key={stu.id} style={{ marginBottom: "10px" }}>
            <Member key={stu.id} student={stu} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeacherManagement;
