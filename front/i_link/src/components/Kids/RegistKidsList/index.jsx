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
} from "@mui/material";

// 반정보 더미 데이터
const groups = [
  {
    id: 1,
    name: "파이썬반",
  },
  {
    id: 2,
    name: "자바반",
  },
];

// 반 선택 드롭다운 컴포넌트
const GroupSelect = ({ groups }) => {
  // selected는 선택한 반이 저장되는 상태
  const [selected, setSelected] = React.useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">반</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label="selected"
          onChange={handleChange}
        >
          {groups.map((group, idx) => (
            <MenuItem value={group.name} key={idx}>
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const RegistKidsList = ({ kid }) => (
  <Card variant="outlined">
    <Grid
      container
      spacing={2}
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={6}>
        <Box>{kid.name}</Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ mb: 1.5 }} color="text.secondary" align="justify">
          <GroupSelect groups={groups}></GroupSelect>
        </Box>
      </Grid>
    </Grid>
  </Card>
);

export default RegistKidsList;
