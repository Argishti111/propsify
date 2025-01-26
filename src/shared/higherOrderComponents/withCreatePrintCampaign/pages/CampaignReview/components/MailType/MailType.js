import { Box } from "@mui/material";
import React from "react";
import { TitleWithSubtitle } from "../../../../../../components";

export function MailType() {
  return (
    <Box display="flex" flexDirection="column" className="data-container">
      <TitleWithSubtitle title="Mail Type" subtitle="USPS Standard Mail" />
    </Box>
  );
}
