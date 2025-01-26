import { Typography } from "@mui/material";
import React from "react";

export function Th({ children, style, ...rest }) {
  return (
    <th
      style={{ whiteSpace: "nowrap", ...style, minWidth: 200, width: 200 }}
      {...rest}
    >
      <Typography
        px={1}
        py={0.5}
        variant="subtitle2"
        fontStyle="italic"
        color="#192231CC"
      >
        {children}
      </Typography>
    </th>
  );
}
