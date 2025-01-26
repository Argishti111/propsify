import { Typography } from "@mui/material";
import React from "react";

export function DropdownItem({
  Icon,
  iconColor = "#BEB082",
  onClick,
  text,
  disabled,
}) {
  return (
    <span
      className={disabled ? "disabled" : ""}
      onClick={onClick}
      style={containerStyle}
    >
      <Icon htmlColor={disabled ? "#AFAFAF" : iconColor} fontSize="inherit" />
      <Typography style={textStyle} variant="p">
        {text}
      </Typography>
    </span>
  );
}

const containerStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: "0.963rem",
};

const textStyle = { paddingTop: 0, paddingBottom: 0 };
