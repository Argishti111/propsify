import { Edit } from "@mui/icons-material";
import React from "react";

export function EditIcon({ onClick, fontSize = "small", ...rest }) {
  return (
    <span {...rest} className="my-mui-icon" onClick={onClick}>
      <Edit fontSize={fontSize} htmlColor="inherit" />
    </span>
  );
}
