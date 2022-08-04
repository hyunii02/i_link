// 원장페이지>반관리>반 리스트>반 디테일 컴포넌트
// create by 김국진
import React from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const detail = [
  {
    id: 1,
    name: "김국진",
    src: "/images/avatar/picachu.png",
  },
  {
    id: 2,
    name: "배지우",
    src: "/images/avatar/jilbbug.png",
  },
  {
    id: 3,
    name: "안정현",
    src: "/images/avatar/Happiny.png",
  },
  {
    id: 4,
    name: "송형근",
    src: "/images/avatar/bkain.png",
  },
  {
    id: 5,
    name: "강민재",
    src: "/images/avatar/ggobu.png",
  },
  {
    id: 6,
    name: "이소영",
    src: "/images/avatar/gora.png",
  },
  {
    id: 7,
    name: "한지우",
  },
  {
    id: 8,
    name: "둘지우",
  },
  {
    id: 9,
    name: "셋지우",
  },
  {
    id: 10,
    name: "넷지우",
  },
  {
    id: 11,
    name: "다섯지우",
  },
  {
    id: 12,
    name: "여섯지우",
  },
  {
    id: 13,
    name: "일곱지우",
  },
];

const GroupDetail = () => {
  const [student, setStudent] = useState(detail);

  let imageIndex = 1;

  return (
    <Box
      style={{
        marginLeft: "3%",
        marginRight: "3%",
        borderRadius: "30px",
        width: "100%",
        background: "rgba(0, 0, 0, 0.07)",
      }}
    >
      <Grid container>
        {student.map((stu) => (
          <Grid item xs={1} key={stu.id}>
            <ListItemButton style={{ borderRadius: "5px" }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/*Avatar src={stu.src} sx={{ width: 66, height: 66 }} />*/}
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">{stu.name}</Typography>
                </Grid>
              </Grid>
            </ListItemButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GroupDetail;
