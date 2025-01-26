import { Add } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import "./Keyword.css";

export function Keyword({ data, onClick, ...rest }) {
  return (
    <Typography
      style={{ padding: 5, paddingRight: 8 }}
      onClick={() => onClick(data)}
      mr={1}
      mb={1}
      className="keyword"
      fontSize={13}
      variant="p"
      {...rest}
    >
      <Add fontSize="small" htmlColor="#BEB082" />
      {data.displayName}
    </Typography>
  );
}
