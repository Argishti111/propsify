import React from "react";
import { Dialog, Typography, Box } from "@mui/material";
import { DialogCloseIcon } from "../../static/icons";
import "./Modal.css";

export function Modal({
  children,
  open,
  onClose,
  style,
  titleChildren,
  title,
  fullScreenOnSM = false,
  PaperProps = {},
  titleProps,
  titleContainerStyle,
  ...rest
}) {
  if (fullScreenOnSM) {
    PaperProps.sx = { ...PaperProps.sx, ...fullScreenProps.sx };
  }
  return (
    <Dialog {...rest} style={style} PaperProps={PaperProps} open={open}>
      <Box
        className="dialog-title-content"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={titleContainerStyle}
      >
        {titleChildren}
        <Typography
          position="absolute"
          display="block"
          textAlign="center"
          margin="auto"
          left={0}
          right={0}
          maxWidth={260}
          whiteSpace="nowrap"
          alignSelf="center"
          fontStyle="italic"
          variant="h6"
          {...titleProps}
        >
          {title}
        </Typography>
        <DialogCloseIcon
          style={{ marginRight: 9.5, height: "1.5rem" }}
          onClick={onClose}
        />
      </Box>
      {children}
    </Dialog>
  );
}

const fullScreenProps = {
  sx: {
    maxHeight: {
      md: "calc(100% - 64px)",
      sm: "none",
      xs: "none",
    },
    margin: { md: 4, sm: 0, xs: 0 },
    maxWidth: { sm: "100%", xs: "100%" },
    height: { sm: "100%", xs: "100%" },
    justifyContent: { sm: "space-between", xs: "space-between" },
  },
};
