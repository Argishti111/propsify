import { Box, Typography } from "@mui/material";
import React from "react";

export function TitleWithSubtitle({ title, subtitle, ...rest }) {
  return (
    <Box {...rest} display="flex" flexDirection="column">
      <Typography
        color="#192231cc"
        variant="subtitle2"
        fontStyle="italic"
        fontWeight="500"
      >
        {title}
      </Typography>
      <Typography color="#192231" variant="body2" fontWeight="400">
        {subtitle}
      </Typography>
    </Box>
  );
}
