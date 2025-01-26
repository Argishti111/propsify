import { Box, Typography } from "@mui/material";
import React from "react";
import { TinyButton } from "../../../../../../shared/components";

export function AccountPausedMessage({ paused }) {
  if (!paused) return null;
  return (
    <Box
      py={2.5}
      px={3}
      mt={3}
      mb={-1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ background: "#E556560D" }}
      marginX={{ md: 2, sm: 0, xs: 0 }}
      border="1px solid #E55656"
    >
      <Typography variant="p">
        Your Propsify account has been flagged because of unusual activity. For
        security reasons any campaigns you are running will be paused.
      </Typography>
      <TinyButton my={1} style={{ background: "#E556560D", minWidth: 100 }}>
        CONTACT US
      </TinyButton>
    </Box>
  );
}
