import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import { DialogCloseIcon } from "../../static/icons";

import "./SlideModal.css";

export function SlideModal({
  style,
  className = "",
  open,
  children,
  onClose,
  title,
  titleChildren,
  containerStyle,
}) {
  return ReactDOM.createPortal(
    <div
      style={style}
      className={`slide-modal ${open ? "slide-modal-open" : ""} ${className}`}
    >
      <Box
        style={containerStyle}
        className="dialog-title-content"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
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
        >
          {title}
        </Typography>
        <DialogCloseIcon
          onClick={onClose}
          style={{ marginRight: 9.5, height: "1.5rem" }}
        />
      </Box>
      {children}
    </div>,
    document.getElementById("modal-portal")
  );
}
