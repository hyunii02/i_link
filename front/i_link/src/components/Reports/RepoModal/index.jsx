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
export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState("");

  // 입력할때마다
  const handleChange = (e) => {
    setValue(e.target.value);
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
    if (!value) return;
    props.onSubmit(value);
    setOpen(false); //submit 후 창 닫기
    setValue(""); //submit 후 textfield 창 비우기
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
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
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="attend"
                    control={<Radio />}
                    label="등하원"
                  />
                  <FormControlLabel
                    value="friends"
                    control={<Radio />}
                    label="교우관계"
                  />
                  <FormControlLabel
                    value="allergy"
                    control={<Radio />}
                    label="알레르기(음식)"
                  />
                  <FormControlLabel
                    value="medicine"
                    control={<Radio />}
                    label="약복용"
                  />
                  <FormControlLabel
                    value="etc"
                    control={<Radio />}
                    label="기타"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {/* 특이사항 적는 칸 */}
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  {/* TextField => 칸의 height 기본값 주는 것 필요 */}
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="가정에서 전달하고 싶은 특이사항을 적어주세요"
                    name="text"
                    multiline
                    rows={4}
                    value={value}
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
