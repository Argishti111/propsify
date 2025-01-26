import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../shared/components";

export function UnsubscribeAction({ onUnsubscribe, email, error }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxWidth={400}
      width="100%"
      p={2}
    >
      <Typography
        fontFamily="MinervaModern-Regular"
        fontWeight="400"
        mb={2.5}
        variant="h4"
      >
        UNSUBSCRIBE
      </Typography>
      <Typography fontSize="1.25rem" fontWeight="700" variant="p">
        {email}
      </Typography>
      <Typography my={3} textAlign="center" variant="p">
        Are you sure you want to unsubscribe from all email communications?{" "}
      </Typography>
      <CustomButton sx={{ width: "100%" }} onClick={onUnsubscribe}>
        UNSUBSCRIBE
      </CustomButton>
      <Typography position="relative" top={8} variant="p" color="#E55656">
        {error}&nbsp;
      </Typography>
    </Box>
  );
}
