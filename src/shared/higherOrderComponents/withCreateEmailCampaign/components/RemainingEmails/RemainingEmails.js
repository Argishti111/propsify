import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Info } from "../../../../components";
import { numberWithCommas } from "../../../../helpers";
import { EmailCampaignContext } from "../../withCreateEmailCampaign";

export function RemainingEmails({ style }) {
  const { remainedEmails } = useContext(EmailCampaignContext);
  return (
    <Box
      display="flex"
      style={style}
      flexDirection="row"
      sx={{ background: "#FEFAF6" }}
      mt={2.5}
      py={1}
      maxWidth={{ md: "100%", sm: 400, xs: "100%" }}
      pl={2}
      pr={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography mr={0.2} fontSize="15px" variant="body2" fontWeight="400">
        {numberWithCommas(remainedEmails.count)} email sends remaining until{" "}
        {remainedEmails.minDate}
      </Typography>
      <Info
        sx={{ height: 16, width: 16, mt: 0.3 }}
        value="Your Propsify subscription comes with 10,000 emails per month"
      />
    </Box>
  );
}
