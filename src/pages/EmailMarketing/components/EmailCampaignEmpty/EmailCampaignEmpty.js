import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../shared/components";

export function EmailCampaignEmpty({ onCreateEmailCampaign }) {
  return (
    <Box
      marginTop={30}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxWidth={500}
      >
        <Typography
          textAlign="center"
          variant="p"
          fontSize="2.125rem"
          fontFamily="MinervaModern-Regular"
          letterSpacing={1.7}
        >
          GET STARTED
        </Typography>

        <Typography marginTop={4} textAlign="center" fontSize={17} variant="p">
          Reach your clients at scale using an email template designed by one of
          our real estate marketing experts, or create your own.
        </Typography>
        <CustomButton
          sx={{ maxWidth: 200, marginTop: 8 }}
          onClick={onCreateEmailCampaign}
        >
          CREATE NEW CAMPAIGN
        </CustomButton>
      </Box>
    </Box>
  );
}
