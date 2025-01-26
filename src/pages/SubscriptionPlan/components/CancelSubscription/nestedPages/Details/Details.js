import { ContentCopy, DoNotDisturb } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { InfoBox } from "../../../../../../shared/components";
import { PageContainer } from "../../components";

export function Details({ goNext, nextBillingDate }) {
  return (
    <PageContainer onNext={goNext}>
      <Box display="flex" flexDirection="column">
        <Typography textAlign="center" mt={4} variant="h6" fontStyle="italic">
          What to expect when you cancel.
        </Typography>
        <Box
          mt={8}
          alignItems="center"
          justifyContent="center"
          alignSelf="center"
          display="flex"
          flexWrap="wrap"
          gap={3}
        >
          <InfoBox
            Icon={DoNotDisturb}
            text={`Your benefits will continue until ${nextBillingDate} after which, you will lose access to Propsify.`}
          />
          <InfoBox
            Icon={ContentCopy}
            text={`Any print marketing campaigns scheduled for delivery after ${nextBillingDate} that have not been submitted to our partners for fulfillment will be terminated.`}
          />
        </Box>
      </Box>
    </PageContainer>
  );
}
