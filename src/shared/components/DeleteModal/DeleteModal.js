import { Box, Typography } from "@mui/material";
import React from "react";

import { Modal, ModalActions } from "../";

export function DeleteModal({
  open,
  modalTitle,
  title,
  subtitle,
  onDelete = () => {},
  onClose = () => {},
  firstAction = "CANCEL",
  secondAction = "DELETE",
  style,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={modalTitle}
      titleChildren={<div />}
      style={style}
    >
      <Box
        px={5}
        py={7}
        sx={{ overflowY: "scroll" }}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Typography mb={3} maxWidth={368} textAlign="center" variant="h5">
          {title}
        </Typography>

        <Typography maxWidth={368} textAlign="center" variant="body1">
          {subtitle}
        </Typography>
      </Box>
      <ModalActions
        secondAction={secondAction}
        firstAction={firstAction}
        onFirstAction={onClose}
        onSecondAction={onDelete}
      />
    </Modal>
  );
}
