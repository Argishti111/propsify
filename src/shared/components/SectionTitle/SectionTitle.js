import { Box, Typography } from "@mui/material";
import React from "react";

export function SectionTitle({ children }) {
  return (
    <Box py={1.1} mb={3} borderBottom="1px solid #ECD9CC">
      <Typography
        fontFamily="MinervaModern-Bold"
        fontWeight="450"
        variant="p"
        component="p"
        color="#192231"
      >
        {children}
      </Typography>
    </Box>
  );
}
