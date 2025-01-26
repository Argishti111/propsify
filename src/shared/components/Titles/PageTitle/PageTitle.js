import { Typography } from "@mui/material";
import React from "react";

export function PageTitle({ children }) {
  return (
    <Typography
      fontWeight="500"
      fontFamily="MinervaModern-Bold"
      variant="p"
      fontSize="0.938rem"
      display="inline-block"
      letterSpacing={1.2}
      px={2}
      py={{ md: 4, sm: 2, xs: 2 }}
      position="relative"
    >
      {children}
    </Typography>
  );
}
