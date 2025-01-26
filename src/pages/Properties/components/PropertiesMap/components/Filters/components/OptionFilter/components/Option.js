import React from "react";
import { Box, Typography } from "@mui/material";

export function Option({ id, name, isSelected, onSelect }) {
  return (
    <Box
      p={2}
      sx={{
        cursor: "pointer",
        background: isSelected ? "#ECD9CC" : "transparent",
      }}
      borderRadius={1}
      border="1px solid #BEB082"
      onClick={() => onSelect(id)}
    >
      <Typography
        variant="p"
        fontFamily="MinervaModern-Regular"
        fontWeight="450"
        fontSize="0.813rem"
        color="#192231"
      >
        {name}
      </Typography>
    </Box>
  );
}
