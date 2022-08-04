import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import MemberStudent from "../../../components/Member/Student";
import MemberTeacher from "../../../components/Member/Teacher";

const memberStudent = [
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
    name: "김국진",
    src: "/images/avatar/picachu.png",
    state: 1,
  },
  {
    id: 8,
    name: "배지우",
    src: "/images/avatar/jilbbug.png",
    state: 1,
  },
  {
    id: 9,
    name: "안정현",
    src: "/images/avatar/Happiny.png",
    state: 1,
  },
  {
    id: 10,
    name: "송형근",
    src: "/images/avatar/bkain.png",
    state: 1,
  },
  {
    id: 11,
    name: "강민재",
    src: "/images/avatar/ggobu.png",
    state: 1,
  },
  {
    id: 12,
    name: "이소영",
    src: "/images/avatar/gora.png",
    state: 2,
  },
  {
    id: 13,
    name: "김국진",
    src: "/images/avatar/picachu.png",
    state: 1,
  },
  {
    id: 14,
    name: "배지우",
    src: "/images/avatar/jilbbug.png",
    state: 1,
  },
  {
    id: 15,
    name: "안정현",
    src: "/images/avatar/Happiny.png",
    state: 1,
  },
  {
    id: 16,
    name: "송형근",
    src: "/images/avatar/bkain.png",
    state: 1,
  },
  {
    id: 17,
    name: "강민재",
    src: "/images/avatar/ggobu.png",
    state: 1,
  },
  {
    id: 18,
    name: "이소영",
    src: "/images/avatar/gora.png",
    state: 2,
  },
];

const memberTeacher = [
  {
    id: 1,
    name: "설리반",
    src: "",
  },
  {
    id: 2,
    name: "에디슨",
    src: "",
  },
];

const MasterManageMember = () => {
  const [student, setStudent] = useState(memberStudent);
  const [teacher, setTeacher] = useState(memberTeacher);

  return (
    <Box>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: "30px",
        }}
        spacing={0.5}
      >
        {teacher.map((tea) => (
          <Grid item xs={4} key={tea.id}>
            <MemberTeacher teacher={tea} />
          </Grid>
        ))}
      </Grid>
      <Grid container style={{ display: "flex" }} spacing={0.5}>
        {student.map((stu) => (
          <Grid item xs={3} key={stu.id} style={{ marginBottom: "10px" }}>
            <MemberStudent key={stu.id} student={stu} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MasterManageMember;
