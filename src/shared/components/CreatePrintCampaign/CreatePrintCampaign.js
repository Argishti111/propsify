import React from "react";
import { withCreatePrintCampaign } from "../../higherOrderComponents";

export const CreatePrintCampaign = withCreatePrintCampaign(
  ({ setCreatePrintCampaignOpen, WrappedComponent }) => {
    return (
      <WrappedComponent
        setCreatePrintCampaignOpen={setCreatePrintCampaignOpen}
      />
    );
  }
);
