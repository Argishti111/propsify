import { Delete } from "@mui/icons-material";
import React from "react";

export function DeleteIcon({ onClick, fontSize = "small", ...rest }) {
  return (
    <span {...rest} className="my-mui-icon" onClick={onClick}>
      <Delete fontSize={fontSize} htmlColor="inherit" />
    </span>
  );
}
