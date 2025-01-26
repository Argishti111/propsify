import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import "./SelectedItem.css";

export function SelectedItem({ containerStyle = {}, text, onClose, ...rest }) {
  return (
    <Box
      style={containerStyle}
      className="selected-item"
      display="inline-flex"
      alignItems="center"
      {...rest}
    >
      <CheckCircle fontSize="small" htmlColor="#BEB082" />
      <Typography fontSize={13} padding="0 5px" variant="p">
        {text}
      </Typography>
      <span className="cursor-pointer flex-row" onClick={onClose}>
        <Cancel fontSize="small" htmlColor="#BEB082" />
      </span>
    </Box>
  );
}
