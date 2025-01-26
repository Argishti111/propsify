import { Box } from "@mui/material";
import React from "react";
import { TitleWithEdit, TitleWithSubtitle } from "../../../../../../components";

export function CampaignDetails({ selectedCampaign, onEdit }) {
  const cost = selectedCampaign.price;
  return (
    <Box display="flex" flexDirection="column" className="data-container">
      <TitleWithEdit
        title="Campaign details"
        type="button"
        onIconClick={onEdit}
      />
      <TitleWithSubtitle
        marginTop={2}
        title="Impressions"
        subtitle={selectedCampaign.recipientCount}
      />
      <TitleWithSubtitle
        marginTop={2}
        title="Cost per impression"
        subtitle={cost > 1 ? `$${cost}` : `${cost}¢`}
      />
      <TitleWithSubtitle
        marginTop={2}
        title="Campaign total"
        subtitle={
          selectedCampaign.budget > 1
            ? `$${selectedCampaign.budget}`
            : `${selectedCampaign.budget}¢`
        }
      />
      <TitleWithSubtitle
        marginTop={2}
        title="Postcard size"
        subtitle={selectedCampaign.product}
      />
      {!!selectedCampaign.schedule && (
        <TitleWithSubtitle
          marginTop={2}
          title="Postcard scheduled for"
          subtitle={selectedCampaign.schedule}
        />
      )}
    </Box>
  );
}
