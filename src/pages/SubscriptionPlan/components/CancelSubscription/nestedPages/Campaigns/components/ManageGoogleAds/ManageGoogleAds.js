import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../../../../../shared/components";

export function ManageGoogleAds() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      px={3}
      py={6}
      border="1px solid #AFAFAF"
      height="100%"
      sx={{ background: "#FEFAF6", borderRadius: "2px" }}
      maxWidth={236}
    >
      <img
        width={24}
        height={24}
        alt="Google ads"
        src={
          require("../../../../../../../../shared/static/icons/icon-google-ads.svg")
            .default
        }
      />
      <Typography my={2} variant="body2">
        Navigate to Google Ads <br /> to manage your <br /> Google Ads
        campaigns.
      </Typography>
      <CustomButton>MANAGE ADS</CustomButton>
    </Box>
  );
}
