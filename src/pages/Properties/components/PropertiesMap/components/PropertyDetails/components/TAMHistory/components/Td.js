import { Typography } from "@mui/material";
import React from "react";

export function Td({ children, style, ...rest }) {
  return (
    <td style={{ ...style, minWidth: 200 }} {...rest}>
      <Typography px={1} py={0.5} variant="body2">
        {children}
      </Typography>
    </td>
  );
}
