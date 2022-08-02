//2022 08 01 배지우작성


import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function MemoWriteForm() {           //title과 content를 보여준다.
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    console.log({
      title: data.get('title'),
      content: data.get('content'),
    });
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { mt: 3 },  // 텍스트필드마다 mt 3

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          fullWidth
          label="제목"
          id="title"
          name="title"
          multiline
          maxRows={4}
        />

        <TextField
          fullWidth
          id="content"
          name="content"
          label="내용"
          multiline
          rows={10}
        />
      </div>
      <Button sx={{ mt: 5,mr:3 }} type="submit" variant="contained" color="warning">
        글 작성
      </Button>
    </Box>
  );
}
