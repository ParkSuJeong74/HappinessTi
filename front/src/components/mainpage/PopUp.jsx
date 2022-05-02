import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function PopUp() {
  const [open, setOpen] = useState(true);
  //취소버튼
  const handleClickCancel = () => {
    handleClose();
  };
  //기타 위치 클릭으로 취소
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>삭제 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>정말 삭제하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions >
            <Button onClick={handleClickCancel}>
              취소
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
