import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../../../components";

export function SendNow({ onSend }) {
  return (
    <Box>
      <Typography component="p" variant="p" fontSize={17} mb={4}>
        By choosing “Send Now” I confirm that I have collected explicit email
        marketing consent from each recipient on my list. I understand that
        violation of this policy may result in termination of my Propsify
        account.
      </Typography>
      <CustomButton onClick={() => onSend()} sx={{ width: "100%" }}>
        SEND NOW
      </CustomButton>
    </Box>
  );
}
