import { Box, Typography } from "@mui/material";
import React from "react";

export function OptionNavItem({ title, onSelect, isSelected, style, id }) {
  return (
    <Box
      id={id}
      onClick={onSelect}
      py={1.1}
      sx={{ background: isSelected ? "#ECD9CC4D" : "#FFF", cursor: "pointer" }}
      style={style}
    >
      <Typography
        textAlign="center"
        fontFamily="MinervaModern-Bold"
        fontWeight="450"
        variant="p"
        component="p"
        color="#192231"
      >
        {title}
      </Typography>
    </Box>
  );
}
