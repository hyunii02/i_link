// 2022.08.02 강민재
// 반복되는 카드 내용 컴포넌트
import React from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  Typography,
} from "@mui/material";

// 반 선택 드롭다운 컴포넌트
const GroupSelect = ({ kidId, classList, submitListStateChange }) => {
  // selected는 선택한 반이 저장되는 상태
  const [selected, setSelected] = React.useState("");

  const handleChange = (event) => {
    setSelected((selected) => event.target.value);
    submitListStateChange(kidId, event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          <Typography id="font_test">반</Typography>
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label="selected"
          onChange={handleChange}
        >
          {classList.map((list, idx) => (
            <MenuItem value={list.id} key={idx}>
              <Typography id="font_test" color="rgba(0, 0, 0, 0.6)">
                {list.group_name}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const RegistKidsList = ({ kid, classList, submitListStateChange }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: "5px" }}>
      <Grid
        container
        spacing={2}
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
      >
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Typography id="font_test" color="rgba(0, 0, 0, 0.6)">
            {kid.name}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <GroupSelect
            classList={classList}
            kidId={kid.no}
            submitListStateChange={submitListStateChange}
          ></GroupSelect>
        </Grid>
      </Grid>
    </Card>
  );
};

export default RegistKidsList;
