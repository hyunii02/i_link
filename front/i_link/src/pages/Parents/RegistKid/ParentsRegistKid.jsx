import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

//이미지 업로드
const Uploader = () => {
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "/images/user.png",
  });

  let inputRef;
  //이미지 저장
  const saveImage = (e) => {
    e.preventDefault();
    if(e.target.files[0]){
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => (
        {
          image_file: e.target.files[0],
          preview_URL: preview_URL
        }
      ))
    }
  }
  // 이미지 삭제
  // const deleteImage = () => {
  //   // createObjectURL()을 통해 생성한 기존 URL을 폐기
  //   URL.revokeObjectURL(image.preview_URL);
  //   setImage({
  //     image_file: "",
  //     preview_URL: "/images/user.png",
  //   });
  // }

  useEffect(()=> {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL)
    }
  }, [])
  //이미지 서버로 보내기
  // const sendImageToServer = async () => {
  //   if (image.image_file) {
  //     const formData = new FormData()
  //     formData.append('file', image.image_file);
  //     await axios.post('/api/image/upload', formData);
  //     alert("서버에 등록이 완료되었습니다!");
  //     setImage({
  //       image_file: "",
  //       preview_URL: "img/default_image.png",
  //     });
  //   } else {
  //     alert("사진을 등록하세요!")
  //   }
  // }

  return (
    <div className="uploader-wrapper">
      <input type="file" accept="image/*"
        onChange={saveImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
        onClick={(e) => e.target.value = null}
        ref={refParam => inputRef = refParam}
        style={{display: "none"}}
      />
      <div className="img-wrapper">
        <img src={image.preview_URL}/>
      </div>
      <Grid className="upload-button" container justifyContent="flex-end">
        <Fab color="primary" aria-label="add" variant="contained" onClick={() => inputRef.click()} justifyContent="flex-end">
          <AddIcon />
        </Fab>
        {/* <Button color="error" variant="contained" onClick={deleteImage}>
          Delete
        </Button> */}
        {/* <Button color="success" variant="contained" onClick={sendImageToServer}>
          Upload
        </Button> */}
      </Grid>
      
    </div>
  );
}

// radio_button(남여 성별 체크)
const RadioButtonsGroup = () => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="male" control={<Radio />} label="남자" />
        <FormControlLabel value="female" control={<Radio />} label="여자" />
      </RadioGroup>
    </FormControl>
  );
}

const theme = createTheme();

export default function ParentsRegistKid() {
  // validation
  const initialValues = { kidsname: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // 에러메시지(아이 이름 미입력시)
  const validate = target => {
    console.log(target.name, target.value);
    const errors = {};
    if (target.name === 'kidsname') {
      errors.kidsname = '이름을 입력해주세요.';
      if (target.value.length > 1) {
        errors.kidsname = '';
      }
    }
    return errors;
  };
  // 아이 등록 form 제출
  const handleSubmit = event => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  //아이 등록 form 입력 시
  const handleChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(event.target);
    setFormErrors(validate(event.target));
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* 로고 이미지 */}
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt="Academy"
            src="/images/login.png"
          ></Avatar>
          <Typography component="h1" variant="h5">
            아이등록
          </Typography>
          {/* 아이등록 form */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* 이미지 업로드 */}
              <Grid item xs={12} sm={12}>
                <Uploader></Uploader>
              </Grid>
              {/* 아이 이름 입력창 */}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="kidsname"
                  label="아이 이름"
                  name="kidsname"
                  autoComplete="kidsname"
                  autoFocus
                  value={formValues.kidsname}
                  onChange={handleChange}
                />
                <p>{formErrors.kidsname}</p>
              </Grid>
              {/* 아이 생년월일 입력창 */}
              <Grid item xs={12} sm={12}>
                <p>아이의 생년월일을 입력해주세요</p>
                <TextField
                  required
                  fullWidth
                  id="date"
                  label=""
                  autoComplete="date"
                  name="date"
                  autoFocus
                  type='date'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <p>아이의 성별을 선택해주세요</p>
                <RadioButtonsGroup></RadioButtonsGroup>
              </Grid>
            </Grid>
            {/* 아이등록 버튼 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
              onChange={handleChange}
            >
              아이등록
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
