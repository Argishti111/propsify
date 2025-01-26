import { Box, Typography } from "@mui/material";
import React from "react";
import { connectGoogleAccount, HOST } from "../../../../services";
import { CustomButton, TinyButton } from "../../../../shared/components";
let timeout = 0;

export function Empty({ setToken, setNewAccountOpen }) {
  const handleConnectAccount = () => {
    connectGoogleAccount();
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      height="80vh"
      flexDirection="column"
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        maxWidth={386}
      >
        <Typography
          textAlign="center"
          fontFamily="MinervaModern-Regular"
          variant="h4"
        >
          CONNECT AD ACCOUNT
        </Typography>
        <Typography mt={4} mb={8} textAlign="center" variant="body1">
          Connect a Google Ads account to Propsify to get started. Don’t have a
          Google Ads account yet? <br />
          We’ll guide you through creating one.
        </Typography>
        <CustomButton
          onClick={() => {
            setNewAccountOpen(false);
            handleConnectAccount();
          }}
          sx={{ px: 4, mb: 4 }}
        >
          CONNECT ACCOUNT
        </CustomButton>
        <TinyButton
          onClick={() => {
            setNewAccountOpen(true);
            handleConnectAccount();
          }}
        >
          CREATE AD ACCOUNT
        </TinyButton>
      </Box>
    </Box>
  );
}
