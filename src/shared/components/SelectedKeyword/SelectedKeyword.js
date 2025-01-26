import { Close } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React from "react";

export function SelectedKeyword({ data, onClick }) {
  return (
    <Typography
      mr={1}
      mb={1}
      style={{ padding: 5, paddingLeft: 8, background: "#BEB0821A" }}
      className="keyword"
      fontSize="0.813rem"
      minHeight="2rem"
      variant="p"
    >
      {data.displayName}
      <IconButton
        sx={{
          fontSize: "1rem",
          ml: 0.5,
          p: 0,
          color: "#BEB082",
          "&:hover": {
            color: "#192231",
          },
        }}
        color="success"
        onClick={() => onClick(data)}
      >
        <Close fontSize="inherit" />
      </IconButton>
    </Typography>
  );
}
