import { Box, Typography } from "@mui/material";
import React from "react";

export function UnsubscribeMessage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
      p={2}
    >
      <Typography
        fontFamily="MinervaModern-Regular"
        fontWeight="400"
        textAlign="center"
        mb={5}
        variant="h4"
      >
        YOU’VE BEEN UNSUBSCRIBED!
      </Typography>
      <Typography textAlign="center" variant="p">
        Please keep in mind it may take up to 10 days to process your request.
      </Typography>
    </Box>
  );
}
