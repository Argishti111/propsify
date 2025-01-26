import { Box, Typography } from "@mui/material";
import React from "react";

export function InfoBox({ Icon, text }) {
  return (
    <Box
      maxWidth={288}
      minWidth={200}
      maxHeight={200}
      display="flex"
      flexDirection="column"
      p={3}
      border="1px solid #AFAFAF"
      height="100%"
    >
      <Icon htmlColor="#AFAFAF" />
      <Typography mt={2} variant="body2">
        {text}
      </Typography>
    </Box>
  );
}
