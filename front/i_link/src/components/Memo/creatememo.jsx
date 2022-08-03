//2022 08 02 배지우
// +버튼 있는 메모장 한개의 컴포넌트

import * as React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import MemoWriteForm from "./memowriteform";
import CreateMemoForm from "./creatememoform";

export default function CreateMemo(props) {
  const {addMemo,idCount} = props;
  
  const style = {
    // 모달창 스타일 지정
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false); //모달창 열고닫기 관리
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid item={true} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: 300,
          display: "flex",
          flexDirection: "column",
          background: "yellow",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          <Fab color="secondary" aria-label="add">
            <AddIcon onClick={handleOpen}></AddIcon>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CreateMemoForm idCount={idCount}addMemo={addMemo}/>
                <div>
                  <Button onClick={handleClose}>
                    close
                  </Button>
                </div>
              </Box>
            </Modal>
          </Fab>
        </Box>
      </Card>
    </Grid>
  );
}
