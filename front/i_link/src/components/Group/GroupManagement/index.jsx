// 원장>반관리>반관리 컴포넌트
// create by 김국진
import { useState } from 'react';
import GroupListItem from '../GroupListItem/';
import GroupInsert from '../GroupInsert/';
import Button from '@mui/material/Button';
import { Box, Grid } from '@mui/material';
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// 테스트용 데이터
const subData = [
  {
    id: 1,
    className: '장미반',
    studentNum: 20,
    teacherNum: 2,
  },
  {
    id: 2,
    className: '햇살반',
    studentNum: 15,
    teacherNum: 1,
  },
  {
    id: 3,
    className: '양념반',
    studentNum: 15,
    teacherNum: 2,
  },
  {
    id: 4,
    className: '후라이드반',
    studentNum: 16,
    teacherNum: 2,
  },
  {
    id: 5,
    className: '배지우반',
    studentNum: 10,
    teacherNum: 1,
  },
];

let newId = 6;

const GroupManagement = () => {
  // 반 등록 컴포넌트에 대한 state 값
  const [insertFlag, setInsertFlag] = useState(false);
  // 통합 반 정보 state 값
  const [classData, setClassData] = useState(subData);

  // 반 등록 버튼 클릭 시 핸들러함수
  const insertClicked = () => {
    // 반 등록 컴포넌트에 대한 state값 toggle
    insertComponentToggle();
  };

  // 반 삭제 버튼 클릭 시 핸들러함수
  const deleteClicked = (className) => {
    // 현재 state에서 해당 반 삭제
    const newClass = classData.filter((data) => data.className !== className);
    setClassData(newClass);
  };

  // 반 추가하기 컴포넌트 toggle
  function insertComponentToggle() {
    setInsertFlag((insertFlag) => !insertFlag);
  }

  // props용 반 추가 함수
  const insertClass = (data) => {
    console.log(data, newId);
    const newClass = classData.concat({ id: newId, className: data });
    setClassData(newClass);
    newId = newId + 1;
    console.log(classData);
  };

  return (
    /* 화면 크게 감싸주는 Part */
    <Box style={{ textAlign: 'left' }}>
      <Box style={{ textAlign: 'right', marginBottom: '1%' }}>
        {/* 반 추가하기 그리드 시작*/}
        <Button
          variant="outlined"
          onClick={insertClicked}
          size="large"
          style={{ marginRight: '5%', marginTop: '2%' }}
        >
          반 추가하기
        </Button>
      </Box>
      {/* 반 추가하기 그리드 종료*/}
      {/* 반 정보 그리드 시작 */}
      <List
        sx={{ width: '100%', maxWidth: '100%', bgcolor: 'rgba(0, 0, 0, 0.05)' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          /* 테이블 헤더 part */
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ background: 'rgba(0, 0, 0, 0.2)' }}
          >
            <Grid container>
              <Grid item xs={4}>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ color: '#000000' }}>
                      반 이름
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ color: '#000000' }}>
                      반 인원
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ color: '#000000' }}>
                      교사 수
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <ListItemText
                  primary={
                    <Typography variant="h6" style={{ color: '#000000' }}>
                      반 삭제
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </ListSubheader>
        }
      >
        {/* state값에 맞게 반 등록 컴포넌트를 on/off */}
        {insertFlag && (
          <GroupInsert
            insertClass={insertClass}
            cancelClicked={insertComponentToggle}
          />
        )}

        {/* 반의 객체 갯수만큼 반 리스트 컴포넌트를 화면에 렌더링 */}
        {classData.map((sub) => (
          <GroupListItem
            classData={sub}
            className={sub.className}
            studentNum={sub.studentNum}
            teacherNum={sub.teacherNum}
            key={sub.className}
            deleteClicked={deleteClicked}
          ></GroupListItem>
        ))}
      </List>
      {/* 반 정보 그리드 종료 */}
    </Box>
  );
};

export default GroupManagement;
