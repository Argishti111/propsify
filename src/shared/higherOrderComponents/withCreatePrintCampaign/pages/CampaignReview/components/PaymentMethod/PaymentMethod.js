import { Box } from "@mui/material";
import React from "react";
import { TitleWithSubtitle } from "../../../../../../components";

export function PaymentMethod({ name }) {
  return (
    <Box display="flex" flexDirection="column" className="data-container">
      <TitleWithSubtitle marginBottom={1} title="Payment method" />
      <TitleWithSubtitle subtitle={name} />
    </Box>
  );
}
