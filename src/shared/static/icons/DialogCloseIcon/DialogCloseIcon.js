import { Close } from "@mui/icons-material";
import React from "react";
import "./DialogCloseIcon.css";

export function DialogCloseIcon({ className = "", onClick, ...rest }) {
  return (
    <span {...rest} className={`my-mui-icon ${className}`} onClick={onClick}>
      <Close htmlColor="inherit" />
    </span>
  );
}
