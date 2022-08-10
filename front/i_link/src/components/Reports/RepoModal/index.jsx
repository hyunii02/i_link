// 모달창으로 입력하는 부분
import React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

//라디오 버튼
const RowRadioButtonsGroup = ({type, setType}) => {
  const selectChange = (event) => {
    setType(event.target.value);
  };
  return (
  <FormControl>
    <RadioGroup
      value={type}
      onChange={selectChange}
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
    >
      <FormControlLabel
        value="1"
        control={<Radio />}
        label="등하원"
      />
      <FormControlLabel
        value="2"
        control={<Radio />}
        label="교우관계"
      />
      <FormControlLabel
        value="3"
        control={<Radio />}
        label="알레르기(음식)"
      />
      <FormControlLabel
        value="4"
        control={<Radio />}
        label="약복용"
      />
      <FormControlLabel
        value="5"
        control={<Radio />}
        label="수면"
      />
      <FormControlLabel
        value="6"
        control={<Radio />}
        label="기타"
      />
    </RadioGroup>
  </FormControl>
  )
}

// 모달창 스타일
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// 모달창
export default function BasicModal({handleSubmit}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [text, setText] = useState("");
  const [type, setType] = useState("");

  // 입력할때마다
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // enter칠 때 submit 되게 하고싶은데 안되네용.. 왜죵? 일단 보류
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSumit();
    }
  };


  const handleSumit = (e) => {
    e.preventDefault(); //새로고침 방지
    // 아무것도 입력하지 않았을 때, submit 방지
    if (!text) return;
    handleSubmit(text, type);
    setOpen(false); //submit 후 창 닫기
    setText(""); //submit 후 textfield 창 비우기
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} align="left" >
        글쓰기
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* 모달창 내부 */}
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Box sx={{ m: 2 }}>
              {/* 특이사항 title */}
              <Typography
                id="font_test"
                gutterBottom
                variant="h5"
                component="div"
              >
                특이사항
              </Typography>
              {/* 특이사항 선택 창(라디오 버튼) */}
              <RowRadioButtonsGroup type={type} setType={setType}/>
            </Box>
            {/* 특이사항 적는 칸 */}
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="가정에서 전달하고 싶은 특이사항을 적어주세요"
                    name="text"
                    multiline
                    rows={4}
                    value={text}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress} //enter시 저장하고싶은데 안되니까 일단 보류욤
                  ></TextField>
                </Grid>
              </Grid>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
              <Button onClick={handleSumit}>Save</Button>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
