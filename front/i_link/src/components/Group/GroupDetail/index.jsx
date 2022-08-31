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

const GroupDetail = (props) => {
  const { kid } = props;
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
        {kid.map((data) => (
          <Grid item xs={1} key={data.kid_no}>
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
                  <Typography
                    variant="body2"
                    id="font_test"
                    color="rgba(0, 0, 0, 0.4)"
                  >
                    {data.kid_name}
                  </Typography>
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
