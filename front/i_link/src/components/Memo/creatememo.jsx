//2022 08 02 배지우
// +버튼 있는 메모장 한개의 컴포넌트
// index -> creatememo -> creatememoform -> addmemocomponent

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
import CreateMemoForm from "./creatememoform";
import { borderColor } from "@mui/system";

export default function CreateMemo(props) {
  const {addMemo,idCount} = props;
  
  const style = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    // 모달창 스타일 지정
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 500,
    bgcolor: "#F8FAD7",
    border: "5px solid #FCE6D4",
    boxShadow: 24,
    p: 4,
  };
  //모달창 열고닫기 관리
  const [open, setOpen] = useState(false); 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid item={true} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: 240,
          display: "flex",
          flexDirection: "column",
          background: "#F1FAB7",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            border : 2 ,
            color : "#FCCACA",
            
          }}
        >
          <Fab sx={{background:"#FBF6F6"}} aria-label="add">
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
