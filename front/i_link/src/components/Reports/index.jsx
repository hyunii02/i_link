// 안정현

import React, { useState, useEffect, useContext } from "react";
import BasicModal from "./RepoModal";
import RepoItemList from "./RepoItemList";
import { urls, baseURL } from "../../api/axios";
import axios from "axios";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { UserContext } from "../../context/user";

export default function Reports(props) {
  const [repos, setRepos] = useState([]);
  const { firstKid } =useContext(UserContext)

  // 삭제 기능
  const onRemove = (id) => {
    setRepos(repos.filter((repo) => repo.id !== id));
  };

  //서버에서 특이사항 데이터 받아오기(get방식)
  const getReportData = () => {
    axios
      .get(baseURL + urls.fetchKidsReport + firstKid.kid_no)
      .then((response) => setRepos(response.data));
  };
  useEffect(() => {
    getReportData();
  }, []);

  useEffect(() => {}, [repos]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography
            id="font_test"
            component="h1"
            variant="h4"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            특이사항
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            mb: 5,
          }}
        >
          <BasicModal getReportData={getReportData} />
        </Grid>
        <Grid item>
          <RepoItemList
            repos={repos}
            onRemove={onRemove}
            getReportData={getReportData}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
