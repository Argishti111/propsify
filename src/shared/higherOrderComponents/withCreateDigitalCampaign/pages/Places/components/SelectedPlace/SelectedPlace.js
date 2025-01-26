import { Cancel, CheckCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React from "react";

export function SelectedPlace({ data, onClick }) {
  return (
    <Typography
      mr={1}
      mb={1}
      style={{ padding: 5, paddingLeft: 8 }}
      className="keyword"
      fontSize={13}
      variant="p"
    >
      <CheckCircle sx={{ mr: 1 }} fontSize="small" htmlColor="#BEB082" />
      {data.displayName}
      <IconButton
        sx={{
          ml: 0.5,
          p: 0,
          "&:hover": {
            color: "#BEB082",
          },
        }}
        color="success"
        onClick={() => onClick(data)}
      >
        <Cancel fontSize="small" />
      </IconButton>
    </Typography>
  );
}
