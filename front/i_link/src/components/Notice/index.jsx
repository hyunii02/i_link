import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function createData(id, title, user, createdate, look) {
  return { id, title, user, createdate, look };
}

const rows = [
  createData('1', '안녕하세요', '배지우', 24, 4),
  createData('2', '안녕하세요2', '배지우', 37, 35),
  createData('3', '안녕하세요3', '배지우', 24, 26234),
  createData('4', '안녕하세요4', '배지우', 67, 433),
  createData('5', '안녕하세요5', '배지우', 49, 6454),
  createData('6', '안녕하세요6', '배지우', 49, 23),
];

 // 글작성 버튼 
const WriteButton =() => { 
  return(
  <div>
    <Button className="writebutton" 
    style={{background:'red',
    margin : "10px"}}>글작성</Button>
  </div>)
}



export default function Notice() {
    const date= new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
  return (
    <div className="Notice-page" >
      <h2>공지사항</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell align='left'>제목</TableCell>
              <TableCell align="left">작성인</TableCell>
              <TableCell align="left">작성일</TableCell>
              <TableCell align="left">조회</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.user}</TableCell>
                <TableCell align="left">{year}년{month}월{day}일</TableCell>
                <TableCell align="left">{row.look}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>   
      </TableContainer>
      <WriteButton/>
    </div>
    
    
  );
}
