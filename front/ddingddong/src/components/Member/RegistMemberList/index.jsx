// 07/27 강민재
// 승인 요청한 목록을 띄워주는 컴포넌트
import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// 반정보 더미 데이터
const groups = [
  {
    id: 1,
    name: '파이썬반',
  },
  {
    id: 2,
    name: '자바반',
  },
];

//
const card = (data) => (
  <React.Fragment>
    <Grid
      container
      spacing={2}
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid item xs={6}>
        <Typography variant="h5" component="div">
          {data.name}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" align="justify">
          <GroupSelect groups={groups}></GroupSelect>
        </Typography>
      </Grid>
    </Grid>
  </React.Fragment>
);

// 반 선택 드롭다운 컴포넌트
const GroupSelect = ({ groups }) => {
  // selected는 선택한 반이 저장되는 상태
  const [selected, setSelected] = React.useState('');

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
          {groups.map((group) => (
            <MenuItem value={group.name}>{group.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

// 신청자 목록 더미 데이터
const RegistMemberList = () => {
  const members = [
    {
      id: 1,
      name: '김국진',
      group: '자바반',
    },
    {
      id: 2,
      name: '강민재',
      group: '파이썬반',
    },
    {
      id: 2,
      name: '강민재',
      group: '파이썬반',
    },
    {
      id: 2,
      name: '강민재',
      group: '파이썬반',
    },
    {
      id: 2,
      name: '강민재',
      group: '파이썬반',
    },
    {
      id: 2,
      name: '강민재',
      group: '파이썬반',
    },
  ];
  return (
    <div>
      <Grid container spacing={2}>
        {members.map((data) => (
          <Grid item xs={4}>
            <Card variant="outlined">{card(data)}</Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RegistMemberList;
