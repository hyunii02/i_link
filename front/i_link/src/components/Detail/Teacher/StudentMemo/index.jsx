import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { axios, baseURL, urls } from "../../../../api/axios";
const StudentMemo = ({ kidInfo, reRender, setReRender }) => {
  const [memoState, setMemoState] = useState(false);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    setMemo((memo) => kidInfo.kid_memo);
  }, [kidInfo]);

  const saveButtonClicked = () => {
    const body = {
      kidMemo: memo,
    };
    try {
      const fullURL = urls.fetchKidsMemoUpdate + kidInfo.kid_no;
      axios.put(fullURL, body).then((response) => {
        if (response.status === 200) {
          setReRender((reRender) => !reRender);
          setMemoState(false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={9}>
          <Typography id="font_test" variant="h6">
            {kidInfo.kid_name} 메모
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          textAlign="center"
          sx={{ display: "flex", mb: "5px" }}
        >
          <Button
            variant="contained"
            size="small"
            color="warning"
            sx={{ marginRight: "5px" }}
            onClick={() => setMemoState(true)}
          >
            <Typography id="font_test" variant="body2">
              수정
            </Typography>
          </Button>
          <Button
            variant="contained"
            size="small"
            color="warning"
            onClick={saveButtonClicked}
          >
            <Typography id="font_test" variant="body2">
              저장
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.3)" }}>
          <Box>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={4}
              sx={{ background: "white", mt: "10px" }}
              disabled={!memoState}
              value={memo === null ? "" : memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentMemo;
