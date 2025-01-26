import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../shared/components";

export function CampaignEmpty({ handleCreatePrintCampaign }) {
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
        maxWidth={368}
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

        <Typography
          marginTop={4}
          textAlign="center"
          fontSize="1.063rem"
          variant="p"
        >
          Print advertising is a form of marketing that uses physically printed
          media to reach customers.
        </Typography>
        <CustomButton
          sx={{ maxWidth: 200, marginTop: 8 }}
          onClick={handleCreatePrintCampaign}
        >
          CREATE NEW CAMPAIGN
        </CustomButton>
      </Box>
    </Box>
  );
}
