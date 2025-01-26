import { Box } from "@mui/material";
import React from "react";
import { TitleWithEdit, TitleWithSubtitle } from "../../../../../../components";

export function TestPrintDetails({ selectedCampaign, onEdit }) {
  console.log(selectedCampaign);
  return (
    <Box display="flex" flexDirection="column" className="data-container">
      <TitleWithEdit
        title="Test print details"
        type="button"
        onIconClick={onEdit}
      />
      <TitleWithSubtitle
        marginTop={2}
        title="Address"
        subtitle={selectedCampaign.address}
      />
      <TitleWithSubtitle
        marginTop={2}
        title="City"
        subtitle={selectedCampaign.city}
      />
      <TitleWithSubtitle
        marginTop={2}
        title="Zip Code"
        subtitle={selectedCampaign.zip}
      />
      <TitleWithSubtitle
        marginTop={2}
        title="State"
        subtitle={selectedCampaign.state}
      />
      <TitleWithSubtitle
        marginTop={2}
        title="Test print cost"
        subtitle={`$${selectedCampaign.price}`}
      />
    </Box>
  );
}
