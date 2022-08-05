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
          {groups.map((group, idx) => (
            <MenuItem value={group.name} key={idx}>
              <Typography id="font_test" color="rgba(0, 0, 0, 0.6)">
                {group.name}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const RegistKidsList = ({ kid }) => (
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
        <GroupSelect groups={groups}></GroupSelect>
      </Grid>
    </Grid>
  </Card>
);

export default RegistKidsList;
