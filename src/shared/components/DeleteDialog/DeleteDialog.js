import { Box, Dialog, DialogTitle } from "@mui/material";
import React from "react";
import { TinyButton } from "../TinyButton";

export function DeleteDialog({
  open,
  onYes,
  onNo,
  onClose,
  title = "Are you sure?",
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <Box padding={2} display="flex" justifyContent="space-around">
        <TinyButton onClick={onYes}>YES</TinyButton>
        <TinyButton color="info" onClick={onNo}>
          NO
        </TinyButton>
      </Box>
    </Dialog>
  );
}
