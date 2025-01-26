import { Box, Typography } from "@mui/material";
import React from "react";
import { PageContainer } from "../../components";
import { ManageGoogleAds } from "./components";

export function Campaigns({ goNext }) {
  return (
    <PageContainer onNext={goNext}>
      <Box display="flex" flexDirection="column">
        <Typography textAlign="center" mt={4} variant="h6" fontStyle="italic">
          Cancelling your account <br /> will not cancel any Digital Marketing
          campaigns.
        </Typography>
        <Box alignSelf="center" sx={{ mt: 6 }}>
          <ManageGoogleAds />
        </Box>
      </Box>
    </PageContainer>
  );
}
